import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { localeCopy, sv, useGetter, useLegacy, useWatch } from '../runtime/context';

const routes = [localeCopy.routes.home, localeCopy.routes.about, localeCopy.routes.work];

/** Ported from the original TheMenu component (scope 7823738c). */
export function TheMenu() {
  const { gsap, store, audio, root, engine } = useLegacy();
  const isOpen = useGetter<boolean>('menu/isOpen');
  const location = useLocation();
  const el = useRef<HTMLDivElement>(null);
  const logoContainer = useRef<HTMLDivElement>(null);
  const diamondTop = useRef<HTMLDivElement>(null);
  const diamondBottom = useRef<HTMLDivElement>(null);
  const navItems = useRef<HTMLLIElement[]>([]);
  const links = useRef<HTMLAnchorElement[]>([]);
  const routeNames = useRef<HTMLSpanElement[]>([]);
  const s = useRef({ timelineIn: null as any, timelineOut: null as any }).current;

  useWatch(isOpen, (open) => {
    if (open) {
      // open()
      store.dispatch('scroll/lock');
      s.timelineOut?.kill();
      const timeline = new gsap.timeline();
      s.timelineIn = timeline;
      timeline.timeScale(0.75);
      timeline.to(audio, { duration: 2, lowPassFrequency: 1000 }, 0);
      timeline.set(diamondTop.current, { y: '-500%' }, 0);
      timeline.set(diamondBottom.current, { y: '500%' }, 0);
      timeline.call(() => { store.dispatch('menu/setIsClosing', false); }, null);
      timeline.call(() => { store.dispatch('menu/setIsOpening', true); }, null);
      timeline.add(engine().showMenu(), 0);
      timeline.set(el.current, { autoAlpha: 1 }, 0);
      timeline.set(navItems.current, { alpha: 1 }, 0);
      timeline.fromTo(routeNames.current, { alpha: 0 }, { duration: 2, alpha: 1, ease: 'sine.inOut', stagger: 0.1 }, 0.5);
      for (let i = 0; i < navItems.current.length; i++) {
        const chars = navItems.current[i].querySelectorAll('.chars');
        const link = links.current[i];
        const stagger = 0.5 / chars.length;
        const sub = new gsap.timeline();
        sub.fromTo(chars, { alpha: 0 }, { duration: 1.3, alpha: 1, ease: 'sine.inOut', stagger }, 0);
        if (!link.classList.contains('nuxt-link-exact-active')) sub.to(chars, { duration: 1.3, alpha: 0, ease: 'sine.inOut', stagger }, 0.8);
        timeline.add(sub, 1.2 + 0.2 * i);
      }
      timeline.to(logoContainer.current, { duration: 1.8, alpha: 1, ease: 'sine.inOut' }, 1.7);
      timeline.to(diamondTop.current, { duration: 2, y: '0%', ease: 'power3.inOut' }, 1.7);
      timeline.to(diamondBottom.current, { duration: 2, y: '0%', ease: 'power3.inOut' }, 1.7);
      timeline.call(() => { store.dispatch('menu/setIsOpening', false); }, null);
    } else {
      // close()
      store.dispatch('scroll/unlock');
      s.timelineIn?.kill();
      const timeline = new gsap.timeline();
      s.timelineOut = timeline;
      if (root.getRouteBaseName() === 'index') timeline.to(audio, { duration: 2, lowPassFrequency: 0 }, 0);
      timeline.call(() => { store.dispatch('menu/setIsOpening', false); }, null);
      timeline.call(() => { store.dispatch('menu/setIsClosing', true); }, null);
      timeline.to(logoContainer.current, { duration: 0.8, alpha: 0, ease: 'sine.out' }, 0);
      timeline.to(navItems.current, { duration: 0.8, alpha: 0, ease: 'sine.out', stagger: -0.1 }, 0);
      timeline.to(el.current, { duration: 1.5, autoAlpha: 0, ease: 'sine.out' }, 0.6);
      const app = engine();
      if (app.viewManager.active && app.viewManager.active.name === 'Home') timeline.add(app.hideMenu(root.getRouteBaseName()), 0.6);
      timeline.call(() => { store.dispatch('menu/setIsClosing', false); }, null);
    }
  });

  // watch $route -> close
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      previousPath.current = location.pathname;
      store.dispatch('menu/setClose');
    }
  }, [location.pathname, store]);

  const attrs = sv('7823738c');
  const isActive = (path: string) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));
  const isExact = (path: string) => location.pathname.replace(/\/$/, '') === path.replace(/\/$/, '') || (path === '/' && location.pathname === '/');

  return (
    <div ref={el} className={`menu${isOpen ? ' is-open' : ''}`} {...sv('7823738c', '6d28008c')}>
      <div className="container" {...attrs}>
        <div ref={logoContainer} className="logo-container" {...attrs}>
          <div className="logo-icon" {...attrs}>
            <div ref={diamondTop} className="diamond" {...attrs} />
            <div ref={diamondBottom} className="diamond" {...attrs} />
          </div>
          <div className="name" {...attrs}>
            <span className="name-span" {...attrs}>
              Tianlu
              <br {...attrs} />
              Zhang
            </span>
          </div>
        </div>
        <nav className="navigation" {...attrs}>
          <ul className="navigation-list" {...attrs}>
            {routes.map((route, i) => (
              <li key={route.path} className="navigation-list-item" {...attrs} ref={(node) => { if (node) navItems.current[i] = node; }}>
                <Link
                  to={route.path}
                  className={`button link${isActive(route.path) ? ' nuxt-link-active' : ''}${isExact(route.path) ? ' nuxt-link-exact-active' : ''}`}
                  aria-current={isExact(route.path) ? 'page' : undefined}
                  {...attrs}
                  ref={(node) => { if (node) links.current[i] = node; }}
                  onClick={(event) => {
                    if (event.currentTarget.classList.contains('nuxt-link-exact-active')) store.dispatch('menu/setClose');
                  }}
                >
                  <span className="route-name" {...attrs} ref={(node) => { if (node) routeNames.current[i] = node; }}>
                    {Array.from(route.name).map((c, k) => <span key={k} {...attrs}>{c}</span>)}
                  </span>
                  <span className="route-name-chars" {...attrs}>
                    {Array.from(route.name).map((c, k) => <span key={k} className="chars" {...attrs}>{c}</span>)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
