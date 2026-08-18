import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { sv, useGetter, useLegacy } from '../../runtime/context';

export interface InteractionHandle {
  show: () => any;
  hide: () => any;
  targets: Array<{ position: { x: number; y: number; center: { x: number; y: number } }; width: number; height: number }>;
  bounds: DOMRect[];
}

/** The five decorative marks (two animated diamonds each), keyed by the payload's `logo` name. */
const PILLARS: Record<string, { height: number; rect: number; diamonds: [string, string] }> = {
  'pillar-one': { height: 96, rect: 95.64, diamonds: ['M96.9 0L73 23.91L96.9 47.82L120.81 23.91L96.9 0Z', 'M96.9 47.82L73 71.73L96.9 95.64L120.81 71.73L96.9 47.82Z'] },
  'pillar-two': { height: 96, rect: 95.65, diamonds: ['M97 0L73.07 23.91L97 47.84L120.93 23.93L97 0Z', 'M97 47.82L73.07 71.75L97 95.65L120.91 71.73L97 47.82Z'] },
  'pillar-three': { height: 96, rect: 95.64, diamonds: ['M96.9 0L73 23.91L96.9 47.82L120.81 23.91L96.9 0Z', 'M96.9 47.82L73 71.73L96.9 95.64L120.81 71.73L96.9 47.82Z'] },
  'pillar-four': { height: 96, rect: 95.64, diamonds: ['M96.9 0L73 23.91L96.9 47.82L120.81 23.91L96.9 0Z', 'M96.9 47.82L73 71.73L96.9 95.64L120.81 71.73L96.9 47.82Z'] },
  'pillar-five': { height: 97, rect: 96.38, diamonds: ['M96.58 0L72.44 24.09L96.58 48.19L120.72 24.09L96.58 0Z', 'M72.43 72.28L96.58 96.38L120.72 72.28L96.58 48.19L72.43 72.28Z'] }
};

/** Ported from the original Interaction component (scope 76dfdfb7). */
export const Interaction = forwardRef<InteractionHandle, { text: string; logo: string; scope: string }>(function Interaction({ text, logo, scope }, ref) {
  const { gsap, math, windowObserver } = useLegacy();
  const isTouch = useGetter<boolean>('device/isTouch');
  const el = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const s = useRef({
    elements: [] as SVGPathElement[],
    targets: [] as InteractionHandle['targets'],
    bounds: [] as DOMRect[],
    originalPositions: [] as Array<{ x: number; y: number; center: { x: number; y: number } }>,
    offsetPositions: [] as Array<{ x: number; y: number }>,
    rotations: [] as number[],
    center: { x: 0, y: 0 },
    settings: { minRelativeDistance: 0.4, maxRelativeDistance: 0.7, maxAngle: 360 },
    timelineShow: null as any,
    timelineHide: null as any
  }).current;

  const getBounds = useCallback(() => {
    if (!el.current) return;
    const containerBounds = el.current.getBoundingClientRect();
    s.center = { x: containerBounds.x + containerBounds.width / 2, y: containerBounds.y + containerBounds.height / 2 };
    for (const element of s.elements) {
      const bounds = element.getBoundingClientRect();
      s.bounds.push(bounds);
      const position = { x: bounds.x, y: bounds.y, center: { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.width / 2 } };
      s.originalPositions.push(position);
      s.targets.push({ position, width: bounds.width, height: bounds.height });
    }
  }, [s]);

  const setRandomPositions = useCallback(() => {
    s.offsetPositions = [];
    s.rotations = [];
    const size = Math.min(windowObserver.width, windowObserver.height);
    for (let i = 0; i < s.elements.length; i++) {
      const element = s.elements[i];
      const original = s.originalPositions[i];
      const angle = math.angle(original.center, s.center);
      const distance = s.settings.minRelativeDistance * size + Math.random() * s.settings.maxRelativeDistance * size;
      const rotation = Math.random() * s.settings.maxAngle;
      const x = distance * Math.cos(angle);
      const y = distance * Math.sin(angle);
      element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
      s.offsetPositions.push({ x, y });
      s.rotations.push(rotation);
    }
  }, [s, math, windowObserver]);

  useEffect(() => {
    s.elements = Array.from(el.current?.querySelectorAll('path') ?? []);
    s.targets = [];
    s.bounds = [];
    s.originalPositions = [];
    getBounds();
    setRandomPositions();
    if (isTouch) svgRef.current?.classList.add('is-touch');
    const resize = () => {
      s.targets = [];
      s.bounds = [];
      s.originalPositions = [];
      for (const element of s.elements) element.style.transform = 'none';
      getBounds();
      setRandomPositions();
    };
    windowObserver.addEventListener('resize', resize);
    return () => windowObserver.removeEventListener('resize', resize);
  }, [isTouch, getBounds, setRandomPositions, windowObserver, s]);

  useImperativeHandle(ref, () => ({
    get targets() { return s.targets; },
    get bounds() { return s.bounds; },
    show() {
      const chars = content.current?.querySelectorAll('.char') ?? [];
      s.timelineShow = new gsap.timeline();
      s.timelineShow.to(s.elements, { duration: 2, x: 0, y: 0, rotation: '0deg', stagger: -0.1, ease: 'power3.out' }, 0);
      s.timelineShow.to(s.elements, { duration: 2, alpha: 1, stagger: -0.1, ease: 'power3.inOut' }, 0);
      s.timelineShow.set(s.elements, { 'shape-rendering': 'crispEdges' }, 1.6);
      s.timelineShow.to(content.current, { duration: 1, alpha: 1, ease: 'sine.inOut' }, 1);
      s.timelineShow.to(chars, { duration: 0.8, alpha: 1, stagger: 0.09, ease: 'sine.inOut' }, 1);
      s.timelineShow.to(chars, { duration: 0.8, alpha: 0.3, stagger: 0.09, ease: 'sine.inOut' }, 1.7);
      return s.timelineShow;
    },
    hide() {
      s.timelineHide = new gsap.timeline();
      s.timelineHide.set(s.elements, { 'shape-rendering': 'auto' }, 0.1);
      for (let i = 0; i < s.elements.length; i++) {
        const offset = s.offsetPositions[i];
        s.timelineHide.to(s.elements[i], { duration: 2, x: offset.x, y: offset.y, rotation: `${s.rotations[i]}deg`, ease: 'power3.inOut' }, 0);
      }
      s.timelineHide.to(s.elements, { duration: 0.7, alpha: 0, stagger: 0.1, ease: 'power3.inOut' }, 0);
      s.timelineHide.to(content.current, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
      return s.timelineHide;
    }
  }), [gsap, s]);

  const pillar = PILLARS[logo] ?? PILLARS['pillar-one'];
  const attrs = sv('76dfdfb7');
  return (
    <div ref={el} className="interaction" {...sv('76dfdfb7', scope)}>
      <svg ref={svgRef} width={155} height={pillar.height} viewBox={`0 0 155 ${pillar.height}`} fill="none" xmlns="http://www.w3.org/2000/svg" {...sv('76dfdfb7', '76dfdfb7')}>
        <g {...attrs}>
          <path d={pillar.diamonds[0]} fill="white" className="diamond" {...attrs} />
          <path d={pillar.diamonds[1]} fill="white" className="diamond" {...attrs} />
        </g>
        <rect width={154.71} height={pillar.rect} fill="transparent" {...attrs} />
      </svg>
      <div className="content-container" {...attrs}>
        <div ref={content} className="content" {...attrs}>
          {Array.from(text).map((c, i) => <span key={i} className="char" {...attrs}>{c}</span>)}
        </div>
      </div>
    </div>
  );
});
