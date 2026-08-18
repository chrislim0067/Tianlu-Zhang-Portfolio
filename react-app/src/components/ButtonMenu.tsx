import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { localeCopy, sv, useGetter, useLegacy, useWatch } from '../runtime/context';
import { LineMenu, type LineMenuHandle } from './LineMenu';

export interface ButtonMenuHandle {
  transitionIn: () => any;
  transitionOut: () => any;
}

/** Ported from the original TheButtonMenu component (scope 5912ac32). */
export const ButtonMenu = forwardRef<ButtonMenuHandle, { scope: string }>(function ButtonMenu({ scope }, ref) {
  const { gsap, math, easing, windowObserver, store } = useLegacy();
  const isMenuOpen = useGetter<boolean>('menu/isOpen');
  const isTouch = useGetter<boolean>('device/isTouch');
  const el = useRef<HTMLButtonElement>(null);
  const svgOpen1 = useRef<LineMenuHandle>(null);
  const svgOpen2 = useRef<LineMenuHandle>(null);
  const svgClose = useRef<LineMenuHandle>(null);
  const labelOpen = useRef<HTMLDivElement>(null);
  const labelClose = useRef<HTMLDivElement>(null);
  const s = useRef({
    isTransitioning: false,
    isHovering: false,
    isMenuOpen: false,
    mousePosition: { target: { x: 0, y: 0 }, current: { x: 0, y: 0 } },
    mouseAlphaFactor: 0,
    bounds: null as DOMRect | null,
    chars: [] as HTMLElement[],
    charBounds: [] as DOMRect[],
    timelineOpen: null as any,
    timelineClose: null as any,
    timelineEnter: null as any,
    timelineLeave: null as any
  }).current;
  s.isMenuOpen = isMenuOpen;

  const getBounds = useCallback(() => {
    if (!el.current) return;
    s.bounds = el.current.getBoundingClientRect();
    s.chars = [];
    s.charBounds = [];
    for (const container of [labelOpen.current, labelClose.current]) {
      container?.querySelectorAll('span').forEach((span) => {
        s.chars.push(span);
        s.charBounds.push(span.getBoundingClientRect());
      });
    }
  }, [s]);

  // mounted: mouse-follow char opacity (non touch)
  useEffect(() => {
    if (isTouch) return;
    getBounds();
    const mousemove = (event: MouseEvent) => {
      s.mousePosition.target.x = event.clientX;
      s.mousePosition.target.y = event.clientY;
    };
    const tick = () => {
      s.mousePosition.current.x = math.lerp(s.mousePosition.current.x, s.mousePosition.target.x, 0.1);
      s.mousePosition.current.y = math.lerp(s.mousePosition.current.y, s.mousePosition.target.y, 0.1);
      if (!s.bounds) return;
      for (let i = 0; i < s.chars.length; i++) {
        const bounds = s.charBounds[i];
        const distance = math.distance({ x: s.mousePosition.current.x, y: 0 }, { x: bounds.x + bounds.width / 2, y: 0 });
        const alpha = easing.easeInOutQuad(math.clamp(Math.abs((0.1 * s.bounds.width) / distance), 0, 1)) * s.mouseAlphaFactor;
        s.chars[i].style.opacity = String(math.clamp(alpha, 0.45, 1));
      }
    };
    window.addEventListener('mousemove', mousemove);
    windowObserver.addEventListener('resize', getBounds);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener('mousemove', mousemove);
      windowObserver.removeEventListener('resize', getBounds);
      gsap.ticker.remove(tick);
    };
  }, [isTouch, gsap, math, easing, windowObserver, getBounds, s]);

  // watch isMenuOpen
  useWatch(isMenuOpen, (open) => {
    const duration = 0.6;
    const delay = 0.6;
    if (open) {
      s.timelineClose?.kill();
      s.timelineOpen = new gsap.timeline();
      s.timelineOpen.call(() => { s.isTransitioning = true; }, null, 0);
      s.timelineOpen.to(labelOpen.current, { duration, alpha: 0, ease: 'sine.out' }, 0);
      s.timelineOpen.to(labelClose.current, { duration, alpha: 1, ease: 'sine.out' }, delay);
      s.timelineOpen.to(svgOpen1.current!.el, { duration, alpha: 0, ease: 'sine.out' }, 0);
      s.timelineOpen.add(svgOpen1.current!.transitionOut(), 0);
      s.timelineOpen.to(svgOpen2.current!.el, { duration, alpha: 0, ease: 'sine.out' }, 0);
      s.timelineOpen.add(svgOpen2.current!.transitionOut(), 0);
      s.timelineOpen.to(svgClose.current!.el, { duration, alpha: 1, ease: 'sine.out' }, delay);
      s.timelineOpen.add(svgClose.current!.transitionIn(), delay);
      s.timelineOpen.call(() => { s.isTransitioning = false; }, null);
    } else {
      s.timelineOpen?.kill();
      s.timelineClose = new gsap.timeline();
      s.timelineClose.call(() => { s.isTransitioning = true; }, null, 0);
      s.timelineClose.to(labelClose.current, { duration, alpha: 0, ease: 'sine.out' }, 0);
      s.timelineClose.to(labelOpen.current, { duration, alpha: 1, ease: 'sine.out' }, delay);
      s.timelineClose.to(svgClose.current!.el, { duration, alpha: 0, ease: 'sine.out' }, 0);
      s.timelineClose.add(svgClose.current!.transitionOut(), 0);
      s.timelineClose.to(svgOpen1.current!.el, { duration, alpha: 1, ease: 'sine.out' }, delay);
      s.timelineClose.add(svgOpen1.current!.transitionIn(), delay);
      s.timelineClose.to(svgOpen2.current!.el, { duration, alpha: 1, ease: 'sine.out' }, delay);
      s.timelineClose.add(svgOpen2.current!.transitionIn(), delay);
      s.timelineClose.call(() => { s.isTransitioning = false; }, null);
    }
  });

  useImperativeHandle(ref, () => ({
    transitionIn() {
      const timeline = new gsap.timeline();
      timeline.call(() => { s.isTransitioning = true; }, null, 0);
      timeline.to(el.current, { duration: 1, alpha: 1, ease: 'sine.out' }, 0);
      timeline.add(svgOpen1.current!.transitionIn(), 1);
      timeline.call(() => { s.isTransitioning = false; }, null);
      return timeline;
    },
    transitionOut() {
      const timeline = new gsap.timeline();
      timeline.call(() => { s.isTransitioning = true; }, null, 0);
      timeline.to(el.current, { duration: 1, alpha: 0, ease: 'sine.out' }, 0);
      timeline.call(() => { s.isTransitioning = false; }, null);
      return timeline;
    }
  }), [gsap, s]);

  const clickHandler = () => {
    if (s.isTransitioning) return;
    store.dispatch(s.isMenuOpen ? 'menu/setClose' : 'menu/setOpen');
  };
  const mouseenterHandler = () => {
    s.isHovering = true;
    s.timelineLeave?.kill();
    s.timelineEnter = new gsap.timeline();
    if (!s.isMenuOpen) s.timelineEnter.add(svgOpen2.current!.transitionIn(), 0);
    s.timelineEnter.to(s, { duration: 0.3, mouseAlphaFactor: 1, ease: 'sine.inOut' }, 0);
  };
  const mouseleaveHandler = () => {
    s.isHovering = false;
    s.timelineEnter?.kill();
    s.timelineLeave = new gsap.timeline();
    if (!s.isMenuOpen) s.timelineLeave.add(svgOpen2.current!.transitionOut(), 0);
    s.timelineLeave.to(s, { duration: 0.3, mouseAlphaFactor: 0, ease: 'sine.inOut' }, 0);
  };

  const attrs = sv('5912ac32');
  return (
    <button ref={el} className="button button-menu" {...sv('5912ac32', scope)} onClick={clickHandler} onMouseEnter={mouseenterHandler} onMouseLeave={mouseleaveHandler}>
      <div className="container" {...attrs}>
        <LineMenu ref={svgOpen1} className="svg-open svg-open--1" direction={-1} color="grey" scope="5912ac32" />
        <LineMenu ref={svgOpen2} className="svg-open svg-open--2" direction={-1} color="white" scope="5912ac32" />
        <LineMenu ref={svgClose} className="svg-close" direction={-1} color="white" scope="5912ac32" />
        <div ref={labelOpen} className="label label-open" {...attrs}>
          {Array.from(localeCopy.menu.open).map((c, i) => <span key={i} {...attrs}>{c}</span>)}
        </div>
        <div ref={labelClose} className="label label-close" {...attrs}>
          {Array.from(localeCopy.menu.close).map((c, i) => <span key={i} {...attrs}>{c}</span>)}
        </div>
      </div>
    </button>
  );
});
