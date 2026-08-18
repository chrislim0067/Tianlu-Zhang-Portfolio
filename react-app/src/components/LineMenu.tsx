import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { sv, useLegacy } from '../runtime/context';

export interface LineMenuHandle {
  el: SVGSVGElement | null;
  transitionIn: () => any;
  transitionOut: () => any;
}

interface LineMenuProps {
  direction: number;
  color: 'grey' | 'white';
  className?: string;
  scope: string; // parent scope attribute id
}

/** Ported from the original LineMenu component (scope 62a34c4d). */
export const LineMenu = forwardRef<LineMenuHandle, LineMenuProps>(function LineMenu({ direction, color, className = '', scope }, ref) {
  const { gsap, windowObserver } = useLegacy();
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const state = useRef({ lineRunIndex: 1, delta: 1, lineLength: 0, timelineIn: null as any, timelineOut: null as any });

  useEffect(() => {
    const s = state.current;
    if (direction < 0 && lineRef.current) lineRef.current.style.transform = 'scaleY(-1)';
    const resize = () => {
      const line = lineRef.current;
      if (!line || !line.isConnected || !line.getClientRects().length) return;
      s.lineLength = line.getTotalLength();
      line.style.strokeDasharray = String(s.lineLength);
      line.style.strokeDashoffset = String(s.lineLength * s.lineRunIndex);
    };
    resize();
    windowObserver.addEventListener('resize', resize);
    return () => windowObserver.removeEventListener('resize', resize);
  }, [direction, windowObserver]);

  useImperativeHandle(ref, () => ({
    get el() {
      return svgRef.current;
    },
    transitionIn() {
      const s = state.current;
      s.lineRunIndex += s.delta;
      s.timelineOut?.kill();
      s.timelineIn = new gsap.timeline();
      s.timelineIn.to(lineRef.current, { duration: 0.5, strokeDashoffset: s.lineRunIndex * s.lineLength });
      return s.timelineIn;
    },
    transitionOut() {
      const s = state.current;
      s.lineRunIndex += s.delta;
      s.timelineIn?.kill();
      s.timelineOut = new gsap.timeline();
      s.timelineOut.to(lineRef.current, { duration: 0.5, strokeDashoffset: s.lineRunIndex * s.lineLength });
      return s.timelineOut;
    }
  }), [gsap]);

  return (
    <svg ref={svgRef} width={10} height={15} className={`line-menu ${className}`} {...sv('62a34c4d', scope)}>
      <line ref={lineRef} x1={5} y1={0} x2={5} y2={14} className={`line ${color}`} {...sv('62a34c4d')} />
    </svg>
  );
});
