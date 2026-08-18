import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { localeCopy, sv, useGetter, useLegacy } from '../../runtime/context';

export interface CursorWorkHandle {
  show: () => any;
  hide: () => any;
  hover: (isHovering: boolean) => void;
  setDragState: (isDragging: boolean) => void;
  move: (x: number, y: number) => void;
}

/** Ported from the original CursorWork component (scope 2b6bf6b0). */
export const CursorWork = forwardRef<CursorWorkHandle, { scope: string }>(function CursorWork({ scope }, ref) {
  const { gsap } = useLegacy();
  const isTouch = useGetter<boolean>('device/isTouch');
  const el = useRef<HTMLDivElement>(null);
  const circle = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const s = useRef({ position: { x: 0, y: 0 }, scale: 1, isDragging: false, isHover: false, timelineHover: null as any, timelineClick: null as any }).current;

  useEffect(() => {
    if (isTouch) {
      if (el.current) el.current.style.display = 'none';
      return;
    }
    const tick = () => {
      if (el.current) el.current.style.transform = `translate(${s.position.x}px, ${s.position.y}px)`;
      if (circle.current) circle.current.style.transform = `scale(${s.scale})`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [isTouch, gsap, s]);

  useImperativeHandle(ref, () => ({
    show: () => gsap.to(el.current, { duration: 0.3, alpha: 1 }),
    hide: () => gsap.to(el.current, { duration: 0.3, alpha: 0 }),
    hover(isHovering) {
      s.isHover = isHovering;
      if (s.isDragging) return;
      s.timelineHover?.kill();
      s.timelineClick?.kill();
      const scale = s.isHover ? 1 : 0.6;
      const alpha = s.isHover ? 1 : 0;
      const stagger = s.isHover ? 0.05 : 0;
      const duration = s.isHover ? 0.5 : 0.3;
      const chars = content.current?.querySelectorAll('.char');
      if (chars && chars.length > 0) {
        s.timelineHover = new gsap.timeline();
        s.timelineHover.to(chars, { duration, alpha, stagger, ease: 'sine.out' }, 0);
        s.timelineHover.to(s, { duration, scale, ease: 'sine.out' }, 0);
      }
    },
    setDragState(isDragging) {
      s.isDragging = isDragging;
      s.timelineHover?.kill();
      s.timelineClick?.kill();
      let scale = 1;
      let alpha = 1;
      if (s.isDragging && !s.isHover) { scale = 0.5; alpha = 0; }
      if (s.isDragging && s.isHover) { scale = 0.6; alpha = 0; }
      if (!s.isDragging && !s.isHover) { scale = 0.6; alpha = 0; }
      if (!s.isDragging && s.isHover) { scale = 1; alpha = 1; }
      s.timelineClick = new gsap.timeline();
      s.timelineClick.to(s, { duration: 0.3, scale, ease: 'sine.out' });
      s.timelineClick.to(content.current?.querySelectorAll('.char') ?? [], { duration: 0.5, alpha, ease: 'sine.out' }, 0);
    },
    move(x, y) {
      s.position.x = x;
      s.position.y = y;
    }
  }), [gsap, s]);

  const attrs = sv('2b6bf6b0');
  return (
    <div ref={el} className="cursor-work" {...sv('2b6bf6b0', scope)}>
      <div ref={circle} className="circle" {...attrs} />
      <div ref={content} className="content" {...attrs}>
        {Array.from(localeCopy.work.slideButtonLabel).map((c, i) => <span key={i} className="char" {...attrs}>{c}</span>)}
      </div>
    </div>
  );
});
