/**
 * Boots the shared runtime for the site: store context, device tracking,
 * resource loaders and the WebGL engine — the same sequence the original app
 * ran across its Nuxt plugins, layout and preloader.
 */
import { loadLegacy, type Legacy } from './index';

export interface RouteInfo {
  fullPath: string;
  path: string;
  name: string; // 'index' | 'about' | 'work' | 'work-slug'
  params: Record<string, string>;
}

export interface NuxtRootShim {
  $store: Legacy['store'];
  $route: RouteInfo;
  $router: { push: (location: { path: string } | string) => void };
  getRouteBaseName: () => string;
  cursorWork: { hover: (isHovering: boolean) => void } | null;
  webglApp: any;
  logoAnimation: any;
}

export interface Runtime {
  legacy: Legacy;
  root: NuxtRootShim;
  resourceLoader: any;
  /** Called by the preloader flow once resources are loaded and the engine may set up. */
  setupEngine: (onReady?: () => void) => void;
  createEngine: (canvas: HTMLCanvasElement) => any;
}

export function routeInfoFromPath(pathname: string): RouteInfo {
  const path = pathname.replace(/\/$/, '') || '/';
  const project = path.match(/^\/work\/([^/]+)$/);
  const name = path === '/' ? 'index' : path === '/about' ? 'about' : path === '/work' ? 'work' : project ? 'work-slug' : 'index';
  return { fullPath: pathname, path, name, params: project ? { slug: project[1] } : {} };
}

let runtimePromise: Promise<Runtime> | null = null;

export function bootRuntime(navigate: (path: string) => void): Promise<Runtime> {
  if (runtimePromise) return runtimePromise;
  runtimePromise = loadLegacy().then((legacy) => {
    const { store, require } = legacy;

    // Context (production build, no debug).
    store.dispatch('context/setProduction', true);
    store.dispatch('context/setDevelopment', false);
    store.dispatch('context/setDebug', false);

    // Device plugin: sizes, breakpoint, touch, browser, mouse.
    const windowObserver = require(55).a; // resize observer with .width/.height/addEventListener('resize')
    const breakpoints = require(69).a; // reads the CSS breakpoint token (small/medium/large)
    const touch = require(59).a;
    const browser = require(105).a; // browser detection (getClassName/isSafari/...)
    const applySizes = () => {
      store.dispatch('device/setSizes', { width: windowObserver.width, height: windowObserver.height });
      store.dispatch('device/setBreakpoint', breakpoints.current);
    };
    const isTouch = touch.isTouch();
    store.dispatch('device/setTouch', isTouch);
    document.body.classList.add(isTouch ? 'is-touch' : 'no-touch');
    store.dispatch('device/browser/setName', browser.getClassName());
    store.dispatch('device/browser/setSafari', browser.isSafari());
    store.dispatch('device/browser/setEdge', browser.isEdge());
    store.dispatch('device/browser/setIE', browser.isInternetExplorer());
    store.dispatch('device/browser/setFirefox', browser.isFirefox());
    applySizes();
    windowObserver.addEventListener('resize', applySizes);
    window.addEventListener('mousemove', (event) => {
      store.dispatch('mouse/setPosition', { x: event.clientX, y: event.clientY });
    });

    // Loaders (layout.registerLoaders).
    const renderer = new legacy.THREE.WebGLRenderer();
    const { ResourceLoader, loaders } = legacy;
    ResourceLoader.registerLoader(loaders.image, 'image');
    ResourceLoader.registerLoader(loaders.hdr, 'hdr');
    ResourceLoader.registerLoader(loaders.texture, 'texture');
    ResourceLoader.registerLoader(loaders.BMFont, 'BMFont');
    ResourceLoader.registerLoader(loaders.audio, 'audio');
    ResourceLoader.registerLoader(loaders.json, 'json');
    ResourceLoader.registerLoader(loaders.basis, 'basis', { transcoderPath: '/webgl/libs/basis/', renderer });
    ResourceLoader.registerLoader(loaders.gltf, 'gltf', { dracoDecoderPath: '/webgl/libs/draco/' });
    ResourceLoader.registerLoader(loaders.ktx, 'ktx', { transcoderPath: '/webgl/libs/basis/', renderer });

    // Resource manifest (preloader.createResourceLoader), production flags.
    const resourceLoader = new ResourceLoader();
    resourceLoader.add({ resources: legacy.resources.global, preload: true });
    for (const view of legacy.resources.views) {
      resourceLoader.add({ resources: view.resources.items, namespace: view.name, preload: Boolean(view.resources.preload.production) });
    }
    for (const landscape of legacy.resources.landscapes) {
      resourceLoader.add({ resources: landscape.resources.items, namespace: landscape.name, preload: Boolean(landscape.resources.preload.production) });
    }

    const root: NuxtRootShim = {
      $store: store,
      $route: routeInfoFromPath(window.location.pathname),
      $router: { push: (location) => navigate(typeof location === 'string' ? location : location.path) },
      getRouteBaseName: () => root.$route.name,
      cursorWork: null,
      webglApp: null,
      logoAnimation: null
    };

    const runtime: Runtime = {
      legacy,
      root,
      resourceLoader,
      createEngine(canvas) {
        root.webglApp = new legacy.Engine({
          canvas,
          nuxtRoot: root,
          isDebug: false,
          isDevelopment: false,
          gpuTier: store.getters['device/gpuTier']
        });
        return root.webglApp;
      },
      setupEngine(onReady) {
        root.webglApp.setup(onReady);
      }
    };
    return runtime;
  });
  return runtimePromise;
}
