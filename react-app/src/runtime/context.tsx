import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { bootRuntime, type Runtime } from '../legacy/boot';

const RuntimeContext = createContext<Runtime | null>(null);

export function RuntimeProvider({ navigate, children }: { navigate: (path: string) => void; children: ReactNode }) {
  const [runtime, setRuntime] = useState<Runtime | null>(null);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    bootRuntime(navigate).then(setRuntime, setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error) return <pre style={{ color: '#fff', padding: 20 }}>{String(error.stack || error)}</pre>;
  if (!runtime) return null;
  return <RuntimeContext.Provider value={runtime}>{children}</RuntimeContext.Provider>;
}

export function useRuntime(): Runtime {
  const runtime = useContext(RuntimeContext);
  if (!runtime) throw new Error('useRuntime must be used inside RuntimeProvider');
  return runtime;
}

/** Shared handles to the original libraries/utilities (same instances the engine uses). */
export function useLegacy() {
  const runtime = useRuntime();
  return useMemo(() => {
    const { legacy } = runtime;
    const req = legacy.require;
    return {
      ...legacy,
      math: req(25).a as { clamp: (v: number, a: number, b: number) => number; lerp: (a: number, b: number, t: number) => number; distance: (a: { x: number; y: number }, b: { x: number; y: number }) => number; angle: (a: any, b: any) => number; randomArbitrary: (a: number, b: number) => number; randomInt: (a: number, b: number) => number },
      easing: req(141).a as Record<string, (t: number) => number>,
      cssVars: req(79) as Record<string, string>,
      windowObserver: req(55).a as { width: number; height: number; viewportWidth: number; viewportHeight: number; addEventListener: (type: 'resize', fn: () => void) => void; removeEventListener: (type: 'resize', fn: () => void) => void; triggerResize: () => void },
      breakpoints: req(69).a as { current: string; active: (...names: string[]) => boolean; rem: (v: number) => number; reml: (v: number) => number },
      root: runtime.root,
      engine: () => runtime.root.webglApp
    };
  }, [runtime]);
}

/** Subscribe a React state to a Vuex getter of the shared store. */
export function useGetter<T = any>(name: string): T {
  const { legacy } = useRuntime();
  const [value, setValue] = useState<T>(() => legacy.store.getters[name]);
  useEffect(() => {
    setValue(legacy.store.getters[name]);
    return legacy.store.watch((_state: any, getters: any) => getters[name], (next: T) => setValue(next));
  }, [legacy, name]);
  return value;
}

/** Runs a callback whenever a getter changes (no re-render). */
export function useGetterEffect(name: string, effect: (value: any, previous: any) => void) {
  const { legacy } = useRuntime();
  useEffect(() => legacy.store.watch((_s: any, g: any) => g[name], (next: any, prev: any) => effect(next, prev)), [legacy, name, effect]);
}

/** Vue scoped-style attribute(s) so the original CSS applies verbatim. */
export function sv(...ids: string[]): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (const id of ids) attrs[`data-v-${id}`] = '';
  return attrs;
}

export const localeCopy = {
  routes: {
    home: { name: 'Home', path: '/' },
    about: { name: 'About me', path: '/about' },
    work: { name: 'My Work', path: '/work' }
  },
  work: { filterLabel: 'Filter', closeFilterLabel: 'Close', slideButtonLabel: 'See' },
  menu: { open: 'menu', close: 'close' },
  error: { message: 'Page not found', cta: 'Back to home' },
  misc: {
    backToTop: 'Back',
    mute: 'sound',
    scroll: { desktop: 'scroll', touch: 'discover' },
    scrollBack: { desktop: '', touch: 'back' },
    cookies: { message: 'By entering the site, you agree to our use of cookies.', agree: 'Ok' },
    loading: { large: 'loading', medium: 'loading', small: 'loading' } as Record<string, string>,
    explore: { large: 'explore', medium: 'Tap to explore', small: 'Tap to explore' } as Record<string, string>,
    enter: 'enter'
  }
};

/** Runs `effect` only when `value` changes after mount (Vue `watch` semantics). */
export function useWatch<T>(value: T, effect: (value: T, previous: T) => void) {
  const previous = useRef(value);
  useEffect(() => {
    if (Object.is(previous.current, value)) return;
    const old = previous.current;
    previous.current = value;
    effect(value, old);
  }, [value, effect]);
}
