import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type ReactNode } from 'react';
import { sv, useGetter, useLegacy, useWatch } from '../runtime/context';

export interface ScrollContainerHandle {
  update: () => void;
  getPosition: () => number;
}

/** Ported from the original ScrollContainer component (scope 13d0e9d2): smooth scroll host for About/Work/Project. */
export const ScrollContainer = forwardRef<ScrollContainerHandle, { scope: string; children: ReactNode }>(function ScrollContainer({ scope, children }, ref) {
  const { store, windowObserver, require, root } = useLegacy();
  const isLocked = useGetter<boolean>('scroll/isLocked');
  const isTouch = useGetter<boolean>('device/isTouch');
  const [smooth, setSmooth] = useState(true);
  const el = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const s = useRef({ smooth: true, contentHeight: 0 }).current;
  const scroll = () => require(129).a;

  const transformY = (target: HTMLElement | null, y: number | null, use3d?: boolean) => {
    if (!target) return;
    if (y === null) {
      target.style.transform = 'none';
      return;
    }
    target.style.transform = use3d ? `translate3d(0px, ${y}px, 0px)` : `translate(0px, ${y}px)`;
  };
  const setupSmoothScroll = () => {
    if (store.getters['scroll/isLocked'] || !content.current || !el.current) return;
    s.contentHeight = content.current.offsetHeight;
    el.current.style.height = `${s.contentHeight}px`;
    transformY(content.current, -scroll().position, false);
    scroll().enable();
  };
  const resize = () => {
    if (s.smooth) setupSmoothScroll();
  };

  useEffect(() => {
    if (!store.getters['scroll/isLocked']) scroll().enable();
    let mounted = true;
    const smoothScrollHandler = (event: { position: number }) => { if (s.smooth) transformY(content.current, -event.position, true); };
    const smoothScrollEndHandler = (event: { position: number }) => { if (s.smooth) transformY(content.current, -event.position, false); };
    const resizeHandler = () => requestAnimationFrame(resize);
    const timer = setTimeout(() => {
      if (!mounted) return;
      s.smooth = !isTouch;
      setSmooth(s.smooth);
      store.dispatch('scroll/setLockPosition', 0);
      scroll().setPosition(window.scrollY);
      if (s.smooth) setupSmoothScroll();
      else scroll().disableSmooth();
      scroll().addEventListener('scroll', smoothScrollHandler);
      scroll().addEventListener('scroll:end', smoothScrollEndHandler);
      windowObserver.addEventListener('resize', resizeHandler);
      (root as any).updateScroll = resize;
    }, 500);
    return () => {
      mounted = false;
      clearTimeout(timer);
      scroll().removeEventListener('scroll', smoothScrollHandler);
      scroll().removeEventListener('scroll:end', smoothScrollEndHandler);
      windowObserver.removeEventListener('resize', resizeHandler);
      (root as any).updateScroll = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch]);

  useWatch(isLocked, (locked) => {
    if (!el.current) return;
    if (locked) {
      el.current.style.height = `${windowObserver.viewportHeight}px`;
      el.current.style.overflow = 'hidden';
      scroll().disable();
      const position = scroll().position;
      store.dispatch('scroll/setLockPosition', position);
      transformY(content.current, -position);
    } else {
      el.current.style.overflow = 'visible';
      if (s.smooth) setupSmoothScroll();
      else {
        el.current.style.height = 'auto';
        transformY(content.current, null);
      }
      scroll().setPosition(store.getters['scroll/lockPosition']);
      scroll().enable();
    }
  });

  useImperativeHandle(ref, () => ({ update: resize, getPosition: () => scroll().position }));

  return (
    <div ref={el} className={`scroll-container${smooth ? ' is-smooth' : ''}`} {...sv('13d0e9d2', scope)}>
      <div ref={content} className="scroll-content" {...sv('13d0e9d2')}>
        {children}
      </div>
    </div>
  );
});
