/**
 * Typed access to the pieces of the original compiled application that the
 * React app keeps using unchanged: the WebGL engine, its resource loader and
 * asset manifests, the audio manager, GSAP (one shared ticker with the engine),
 * and the Vuex store modules the engine reads/dispatches.
 */
import { loadLegacyRuntime, type LegacyRequire } from './runtime';
import createLoaders from './vendor/loaders.js';

// Module ids in the original bundles.
const ID = {
  three: 0,
  gsap: 7,
  resourceLoader: 8,
  vue: 16,
  audio: 29,
  vuex: 61,
  landscapesManifest: 126,
  viewsManifest: 127,
  globalResources: 179,
  detectGpu: 354,
  engine: 522
} as const;

const STORE_FILES: Array<[number, string]> = [
  [477, 'context/actions.js'], [478, 'context/getters.js'], [479, 'context/mutations.js'], [480, 'context/state.js'],
  [481, 'device/actions.js'], [482, 'device/getters.js'], [483, 'device/mutations.js'], [484, 'device/state.js'],
  [485, 'home/actions.js'], [486, 'home/getters.js'], [487, 'home/mutations.js'], [488, 'home/state.js'],
  [489, 'menu/actions.js'], [490, 'menu/getters.js'], [491, 'menu/mutations.js'], [492, 'menu/state.js'],
  [493, 'mouse/actions.js'], [494, 'mouse/getters.js'], [495, 'mouse/mutations.js'], [496, 'mouse/state.js'],
  [497, 'preloader/actions.js'], [498, 'preloader/getters.js'], [499, 'preloader/mutations.js'], [500, 'preloader/state.js'],
  [501, 'router/actions.js'], [502, 'router/getters.js'], [503, 'router/mutations.js'], [504, 'router/state.js'],
  [505, 'scroll/actions.js'], [506, 'scroll/getters.js'], [507, 'scroll/mutations.js'], [508, 'scroll/state.js'],
  [509, 'webgl/actions.js'], [510, 'webgl/getters.js'], [86, 'webgl/mutation-types.js'], [511, 'webgl/mutations.js'], [512, 'webgl/state.js'],
  [513, 'device/browser/actions.js'], [514, 'device/browser/getters.js'], [515, 'device/browser/mutations.js'], [516, 'device/browser/state.js'],
  [517, 'webgl/views/actions.js'], [518, 'webgl/views/getters.js'], [519, 'webgl/views/mutations.js'], [520, 'webgl/views/state.js']
];


export interface LegacyStore {
  state: Record<string, any>;
  getters: Record<string, any>;
  dispatch: (type: string, payload?: any) => Promise<any>;
  commit: (type: string, payload?: any) => void;
  watch: (getter: (state: any, getters: any) => any, cb: (value: any, old: any) => void, options?: { immediate?: boolean }) => () => void;
  subscribe: (fn: (mutation: { type: string; payload: any }, state: any) => void) => () => void;
}

export interface Legacy {
  require: LegacyRequire;
  Vue: any;
  Vuex: any;
  gsap: any;
  THREE: any;
  Engine: new (options: { canvas: HTMLCanvasElement; nuxtRoot: any; isDebug: boolean; isDevelopment: boolean; gpuTier: number }) => any;
  ResourceLoader: any; // class with static registerLoader
  loaders: Record<string, any>;
  resources: { global: any[]; views: any[]; landscapes: any[] };
  audio: any;
  detectGpu: (options: { benchmarksURL: string }) => Promise<{ tier: number; gpu?: string }>;
  store: LegacyStore;
}

function pickDefault(mod: any) {
  if (mod && mod.__esModule && 'default' in mod) return mod.default;
  // Mangled single-export ES modules expose their default as `a`.
  if (mod && mod.a !== undefined && Object.keys(mod).length === 1) return mod.a;
  return mod;
}

/** Vuex's default export and mapGetters are exported under mangled names; find them by shape. */
function findVuex(mod: any) {
  for (const key of Object.keys(mod)) {
    const value = mod[key];
    if (value && typeof value === 'object' && typeof value.Store === 'function') return value;
  }
  throw new Error('Legacy: Vuex export not found');
}

function findGsap(mod: any) {
  for (const key of Object.keys(mod)) {
    const value = mod[key];
    if (value && typeof value.timeline === 'function' && value.ticker) return value;
  }
  throw new Error('Legacy: gsap export not found');
}

function findAudioManager(mod: any) {
  for (const key of Object.keys(mod)) {
    const value = mod[key];
    if (value && typeof value.playMainTrack === 'function') return value;
  }
  throw new Error('Legacy: audio manager export not found');
}

function findFunctionExport(mod: any, name: string) {
  const direct = pickDefault(mod);
  if (typeof direct === 'function') return direct;
  for (const key of Object.keys(mod)) if (typeof mod[key] === 'function') return mod[key];
  throw new Error(`Legacy: ${name} export not found`);
}

function findArrayExport(mod: any) {
  const direct = pickDefault(mod);
  if (Array.isArray(direct)) return direct;
  for (const key of Object.keys(mod)) if (Array.isArray(mod[key])) return mod[key];
  throw new Error('Legacy: array export not found');
}

function findResourceLoader(mod: any) {
  // module 8 exports { a: BaseLoader, b: ResourceLoader(manager) }
  for (const key of Object.keys(mod)) {
    const value = mod[key];
    if (typeof value === 'function' && typeof value.registerLoader === 'function') return value;
  }
  throw new Error('Legacy: ResourceLoader export not found');
}

/** Replicates Nuxt 2's store builder (files -> namespaced modules). */
function buildStoreOptions(require: LegacyRequire) {
  const PARTS = ['state', 'getters', 'actions', 'mutations'];
  const root: any = { modules: {} };

  const ensure = (target: any, path: string[], isProperty: boolean): any => {
    if (!path.length || (isProperty && path.length === 1)) return target;
    const name = path.shift() as string;
    target.modules[name] = target.modules[name] || {};
    target.modules[name].namespaced = true;
    target.modules[name].modules = target.modules[name].modules || {};
    return ensure(target.modules[name], path, isProperty);
  };
  const assign = (target: any, value: any, key: string) => {
    if (!value) return;
    if (key === 'state') target.state = value || target.state;
    else target[key] = Object.assign({}, target[key], value);
  };
  const normalize = (mod: any) => {
    if (mod.state && typeof mod.state !== 'function') {
      const snapshot = Object.assign({}, mod.state);
      mod = Object.assign({}, mod, { state: () => snapshot });
    }
    return mod;
  };

  for (const [id, file] of STORE_FILES) {
    let mod = pickDefault(require(id));
    const path = file.replace(/\.(js|mjs)$/, '').split('/');
    let last = path[path.length - 1];
    if (last === 'state') {
      if (typeof mod !== 'function') { const snapshot = Object.assign({}, mod); mod = () => snapshot; }
      else mod = normalize(mod);
    } else mod = normalize(mod);

    if (PARTS.includes(last)) {
      assign(ensure(root, path, true), mod, last);
    } else {
      if (last === 'index') { path.pop(); last = path[path.length - 1]; }
      const target = ensure(root, path, false);
      for (const part of PARTS) assign(target, mod[part], part);
      if (mod.namespaced === false) delete target.namespaced;
    }
  }
  return root;
}

let legacyPromise: Promise<Legacy> | null = null;

export function loadLegacy(): Promise<Legacy> {
  if (legacyPromise) return legacyPromise;
  legacyPromise = loadLegacyRuntime().then((require) => {
    const Vue = pickDefault(require(ID.vue));
    const Vuex = findVuex(require(ID.vuex));
    Vue.use(Vuex);
    const store = new Vuex.Store(Object.assign({ strict: false }, buildStoreOptions(require)));

    const gsap = findGsap(require(ID.gsap));
    // Plugins the original entry registered (CustomEase, InertiaPlugin).
    gsap.registerPlugin(require(150).a, require(205).a);

    const legacy: Legacy = {
      require,
      Vue,
      Vuex,
      gsap,
      THREE: require(ID.three),
      Engine: pickDefault(require(ID.engine)),
      ResourceLoader: findResourceLoader(require(ID.resourceLoader)),
      loaders: createLoaders(require),
      resources: {
        global: findArrayExport(require(ID.globalResources)),
        views: findArrayExport(require(ID.viewsManifest)),
        landscapes: findArrayExport(require(ID.landscapesManifest))
      },
      audio: findAudioManager(require(ID.audio)),
      detectGpu: findFunctionExport(require(ID.detectGpu), 'detectGpu'),
      store
    };
    return legacy;
  });
  return legacyPromise;
}
