/**
 * Loads the original compiled bundles (webpack 4 chunks) without booting the
 * old Nuxt application, and exposes their module `require`.
 *
 * The chunks register their modules on `window.webpackJsonp`; the runtime
 * chunk installs them and would normally execute the Nuxt entry (module 364)
 * once its dependencies are present. We strip that deferred entry so nothing
 * runs until we ask for a module explicitly.
 */

export type LegacyRequire = ((id: number) => any) & {
  n: (module: any) => () => any;
  e: (chunkId: number) => Promise<void>;
  p: string;
};

declare global {
  interface Window {
    webpackJsonp?: any[] & { push: (data: any[]) => any };
    __TIANLU_LEGACY_REQUIRE__?: LegacyRequire;
  }
}

const RUNTIME_CHUNK = '27e0753.js';
const MODULE_CHUNKS = ['1c3739f.js', '4a4ccfc.js', 'b30f9f2.js', 'acefdce.js', '939a6db.js', '4755683.js'];
const NUXT_ENTRY_MODULE = 364;

let pending: Promise<LegacyRequire> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

export function loadLegacyRuntime(base = '/_nuxt/'): Promise<LegacyRequire> {
  if (window.__TIANLU_LEGACY_REQUIRE__) return Promise.resolve(window.__TIANLU_LEGACY_REQUIRE__);
  if (pending) return pending;

  pending = (async () => {
    window.webpackJsonp = window.webpackJsonp || ([] as any);
    await loadScript(`${base}${RUNTIME_CHUNK}`);

    // The runtime replaced push(); wrap it to drop deferred entry declarations.
    const jsonp = window.webpackJsonp!;
    const originalPush = jsonp.push.bind(jsonp);
    jsonp.push = (data: any[]) => {
      if (Array.isArray(data) && data.length > 2 && Array.isArray(data[2])) {
        const deferred = data[2].filter((entry: any[]) => entry[0] !== NUXT_ENTRY_MODULE);
        return originalPush(deferred.length ? [data[0], data[1], deferred] : [data[0], data[1]]);
      }
      return originalPush(data);
    };

    for (const chunk of MODULE_CHUNKS) await loadScript(`${base}${chunk}`);

    // Capture the internal require via a synthetic chunk whose entry runs immediately.
    let captured: LegacyRequire | null = null;
    jsonp.push([
      ['__tianlu_shim__'],
      {
        __tianlu_shim__: (_module: any, _exports: any, require: LegacyRequire) => {
          captured = require;
        }
      },
      [['__tianlu_shim__']]
    ]);
    if (!captured) throw new Error('Legacy runtime: could not capture require()');
    window.__TIANLU_LEGACY_REQUIRE__ = captured;
    return captured;
  })();

  return pending;
}
