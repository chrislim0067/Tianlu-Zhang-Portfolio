import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sv, useLegacy } from '../runtime/context';

export interface ButtonHomeHandle {
  transitionIn: () => any;
  transitionOut: (duration?: number) => any;
  menuIn: () => any;
}

/** Ported from the original ButtonHome component (scope 45cad912). */
export const ButtonHome = forwardRef<ButtonHomeHandle, { scope: string }>(function ButtonHome({ scope }, ref) {
  const { gsap, root } = useLegacy();
  const location = useLocation();
  const el = useRef<HTMLAnchorElement>(null);
  const isIndex = () => root.getRouteBaseName() === 'index';
  const transitionIn = () => gsap.to(el.current, { duration: 1, autoAlpha: isIndex() ? 0 : 1, ease: 'sine.out' });

  // watch $route -> transitionIn
  const previous = useRef(location.pathname);
  useEffect(() => {
    if (previous.current !== location.pathname) {
      previous.current = location.pathname;
      transitionIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useImperativeHandle(ref, () => ({
    transitionIn,
    transitionOut: (duration = 1) => gsap.to(el.current, { duration, autoAlpha: 0, ease: 'sine.inOut' }),
    menuIn: () => gsap.to(el.current, { duration: 1.7, autoAlpha: isIndex() ? 0 : 1, ease: 'sine.inOut' })
  }));

  return (
    <Link ref={el} to="/" className="button button-home nuxt-link-active" {...sv('45cad912', scope)}>
      Tianlu
      <br {...sv('45cad912')} />
      Zhang
    </Link>
  );
});
