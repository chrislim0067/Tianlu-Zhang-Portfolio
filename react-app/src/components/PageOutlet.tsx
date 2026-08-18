import { createElement, forwardRef, useEffect, useLayoutEffect, useRef, useState, type ForwardRefExoticComponent, type RefAttributes } from 'react';
import { useLocation } from 'react-router-dom';
import { useLegacy } from '../runtime/context';
import { routeInfoFromPath } from '../legacy/boot';

/** Handle every page component exposes (mirrors the original page mixin + transition hooks). */
export interface PageHandle {
  transitionInit?: () => void;
  transitionIn?: (done: (() => void) | null, routes: TransitionRoutes) => void;
  transitionOut?: (done: () => void, routes: TransitionRoutes) => void;
}

export interface TransitionRoutes {
  previous: any;
  current: any;
  isLangSwitch: boolean;
}

export type PageComponent = ForwardRefExoticComponent<{ params: Record<string, string> } & RefAttributes<PageHandle>>;

interface Entry {
  key: string;
  path: string;
  Component: PageComponent;
  params: Record<string, string>;
}

function isLangSwitch(routes: { previous: any; current: any }) {
  if (!routes.current || !routes.previous || !routes.current.name || !routes.previous.name) return false;
  const [cName, cLocale] = routes.current.name.split('___');
  const [pName, pLocale] = routes.previous.name.split('___');
  return cName === pName && cLocale !== pLocale;
}

/**
 * Re-implements the Nuxt page <transition appear mode="out-in" css=false>:
 * leave(prev) -> unmount -> mount(next) -> transitionInit -> transitionIn(done).
 * On first paint the page's transitionIn runs when the preloader completes.
 */
export function PageOutlet({ resolve }: { resolve: (path: string) => { Component: PageComponent; params: Record<string, string> } }) {
  const location = useLocation();
  const { store, root } = useLegacy();
  const pageRef = useRef<PageHandle>(null);
  const [entry, setEntry] = useState<Entry>(() => {
    const info = routeInfoFromPath(location.pathname);
    const { Component, params } = resolve(location.pathname);
    return { key: info.path, path: info.path, Component, params };
  });
  const pending = useRef<Entry | null>(null);
  const leaving = useRef(false);

  const routesSnapshot = (): TransitionRoutes => {
    const routes = { previous: store.state.router.previous, current: store.state.router.current, isLangSwitch: false };
    routes.isLangSwitch = isLangSwitch(routes);
    return routes;
  };

  const routeObject = (path: string) => {
    const info = routeInfoFromPath(path);
    return { name: `${info.name}___en`, path: info.path, fullPath: info.fullPath, params: info.params };
  };

  // Initial route registration (layout mounted: router/setCurrent).
  useEffect(() => {
    store.dispatch('router/setCurrent', routeObject(location.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Route change: leave current page, then swap.
  useEffect(() => {
    const info = routeInfoFromPath(location.pathname);
    if (info.path === entry.path && !pending.current) return;
    // layout watch $route -> router/setCurrent + router/setPrevious
    store.dispatch('router/setPrevious', store.state.router.current);
    store.dispatch('router/setCurrent', routeObject(location.pathname));
    const { Component, params } = resolve(location.pathname);
    const next: Entry = { key: info.path, path: info.path, Component, params };
    if (leaving.current) {
      pending.current = next;
      return;
    }
    leaving.current = true;
    const routes = routesSnapshot();
    const finish = () => {
      leaving.current = false;
      const latest = pending.current || next;
      pending.current = null;
      setEntry(latest);
    };
    const page = pageRef.current;
    if (page && page.transitionOut) page.transitionOut(finish, routes);
    else finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // After a page mounts: beforeEnter (transitionInit) then enter (transitionIn) if there is a previous route.
  const mountedKey = useRef<string | null>(null);
  useLayoutEffect(() => {
    if (mountedKey.current === entry.key) return;
    mountedKey.current = entry.key;
    root.$route = routeInfoFromPath(entry.path);
    const page = pageRef.current;
    page?.transitionInit?.();
    const routes = routesSnapshot();
    if (routes.previous && page?.transitionIn) page.transitionIn(() => {}, routes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.key]);

  // Initial page: transitionIn when the preloader completes (page mixin watch isCompleted).
  useEffect(() => {
    return store.watch((_s: any, g: any) => g['preloader/isCompleted'], (completed: boolean) => {
      if (!completed) return;
      const routes = routesSnapshot();
      pageRef.current?.transitionIn?.(null, routes);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createElement(entry.Component, { key: entry.key, ref: pageRef, params: entry.params });
}

export const definePage = <P extends { params: Record<string, string> }>(component: ForwardRefExoticComponent<P & RefAttributes<PageHandle>>) => component as unknown as PageComponent;
export { forwardRef };
