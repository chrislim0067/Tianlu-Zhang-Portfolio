import { useEffect, type RefObject } from 'react';
import { useLegacy } from '../runtime/context';

interface Options {
  threshold?: number;
  scrollTriggerProgressPosition?: number;
  onShow?: () => void;
  onScrollThrough?: (state: { progress: number; position: number }) => void;
}

/**
 * Port of the original intersection/scroll-progress mixin (module 543):
 * fires `onShow` once when the element becomes visible and reports scroll
 * progress from the shared smooth-scroll manager.
 */
export function useIntersection(ref: RefObject<HTMLElement | null>, { threshold, scrollTriggerProgressPosition, onShow, onScrollThrough }: Options) {
  const { windowObserver, breakpoints, require } = useLegacy();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const scroll = require(129).a;
    let isVisible = false;
    let scrollPosition = 0;
    let bounds = el.getBoundingClientRect();
    let height = windowObserver.height;
    const getBounds = () => {
      bounds = el.getBoundingClientRect();
      (bounds as any).y += window.scrollY;
      height = windowObserver.height;
    };
    const updateScrollProgress = () => {
      const t = typeof scrollTriggerProgressPosition === 'number' ? scrollTriggerProgressPosition : 1;
      const progress = (scrollPosition + height * t - bounds.y) / (bounds.height + height * t);
      onScrollThrough?.({ progress, position: scrollPosition });
    };
    getBounds();
    updateScrollProgress();
    const defaultThreshold = breakpoints.active('medium') ? 0.3 : 0.1;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isVisible) {
        isVisible = true;
        onShow?.();
      }
    }, { threshold: [typeof threshold === 'number' ? threshold : defaultThreshold] });
    observer.observe(el);
    const resizeHandler = () => getBounds();
    const scrollHandler = (event: { position: number }) => {
      scrollPosition = event.position;
      updateScrollProgress();
    };
    windowObserver.addEventListener('resize', resizeHandler);
    scroll.addEventListener('scroll', scrollHandler);
    return () => {
      observer.disconnect();
      windowObserver.removeEventListener('resize', resizeHandler);
      scroll.removeEventListener('scroll', scrollHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
