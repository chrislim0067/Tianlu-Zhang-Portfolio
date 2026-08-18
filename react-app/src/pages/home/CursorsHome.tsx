import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { sv, useGetter, useLegacy } from '../../runtime/context';
import { Interaction, type InteractionHandle } from './Interaction';

export interface CursorsHomeHandle {
  transitionIn: () => any;
  transitionOut: () => any;
  clickHandler: () => void;
}

const DIAMOND_PATH = 'M24.0367 -0.376568L0.127747 23.5324L24.0367 47.4414L47.9457 23.5324L24.0367 -0.376568Z';

function DiamondCursor({ className, innerRef }: { className: string; innerRef: React.Ref<SVGSVGElement> }) {
  return (
    <svg ref={innerRef} width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...sv('63c79a1b', '63c79a1b')}>
      <path d={DIAMOND_PATH} fill="#FFFFFF" {...sv('63c79a1b', '63c79a1b')} />
    </svg>
  );
}

/** Ported from the original CursorsHome component (scope 63c79a1b). */
export const CursorsHome = forwardRef<CursorsHomeHandle, { data: Array<{ text: string; logo: string }>; scope: string }>(function CursorsHome({ data, scope }, ref) {
  const { gsap, math, windowObserver, root, require, store } = useLegacy();
  const isTouch = useGetter<boolean>('device/isTouch');
  const el = useRef<HTMLDivElement>(null);
  const cursor0 = useRef<HTMLDivElement>(null);
  const cursor1 = useRef<HTMLDivElement>(null);
  const diamond0 = useRef<SVGSVGElement>(null);
  const diamond1 = useRef<SVGSVGElement>(null);
  const interactions = useRef<InteractionHandle[]>([]);
  const s = useRef({
    previousIndex: null as number | null,
    activeIndex: 0,
    activeInteraction: null as InteractionHandle | null,
    settings: { dampings: [0.04, 0.03], radius: 50, duration: 5000 },
    isTweening: false,
    positions: [
      { current: { x: 0, y: 0 }, target: { x: 0, y: 0 } },
      { current: { x: 0, y: 0 }, target: { x: 0, y: 0 } }
    ],
    mousePosition: { x: 0, y: 0 },
    targetPosition: { x: 0, y: 0 },
    sizes: [] as number[],
    initialPositions: [] as any[],
    offsetY: 0,
    initialWidth: 0,
    initialScale: 1,
    timeout: 0 as any,
    timelineActivation: null as any,
    timelineDeactivation: null as any
  }).current;

  useEffect(() => {
    const cursors = [cursor0.current!, cursor1.current!];
    const diamonds = [diamond0.current!, diamond1.current!];
    if (isTouch) cursors.forEach((cursor) => { cursor.style.display = 'none'; });
    (root as any).cursorHome = { transitionIn: () => gsap.to(el.current, { duration: 1, alpha: 1, ease: 'sine.inOut' }) };
    const CustomEase = require(150).a;
    CustomEase.create('cursorSnap', 'M0,0 C0.173,0 0.234,0.104 0.262,0.17 0.298,0.254 0.352,0.416 0.402,0.53 0.451,0.643 0.564,0.824 0.67,0.916 0.743,0.98 0.869,1 1,1');
    const initial = store.getters['mouse/position'];
    s.mousePosition = { x: initial.x, y: initial.y };
    s.targetPosition = { x: initial.x, y: initial.y };

    const setupCursors = () => {
      const logo = root.logoAnimation;
      if (!logo || !logo.cursorsBounds || logo.cursorsBounds.length < 2 || !interactions.current[0]) return;
      s.sizes = [];
      s.initialPositions = [];
      if (!store.getters['preloader/isCompleted']) {
        s.mousePosition.x = logo.cursorsBounds[0].x;
        s.mousePosition.y = logo.cursorsBounds[0].y;
        s.targetPosition.x = s.mousePosition.x;
        s.targetPosition.y = s.mousePosition.y;
      }
      s.mousePosition.x = logo.cursorsBounds[0].x;
      s.mousePosition.y = logo.cursorsBounds[0].y;
      s.offsetY = logo.cursorsBounds[1].y - logo.cursorsBounds[0].y;
      s.initialWidth = interactions.current[0].bounds[0].width;
      s.initialScale = logo.cursorsBounds[1].width / s.initialWidth;
      for (let i = 0; i < cursors.length; i++) {
        const bounds = logo.cursorsBounds[i];
        const x = bounds.x;
        const y = bounds.y;
        cursors[i].style.width = `${s.initialWidth}px`;
        cursors[i].style.height = `${s.initialWidth}px`;
        s.initialPositions.push({ current: { x, y }, target: { x, y } });
        s.sizes.push(s.initialWidth);
        s.positions[i].current.x = x;
        s.positions[i].current.y = y;
        s.positions[i].target.x = x;
        s.positions[i].target.y = y;
        cursors[i].style.transform = `translate(${x}px, ${y}px)`;
        diamonds[i].style.transform = `scale(${s.initialScale})`;
      }
    };
    const updatePositions = () => {
      for (let i = 0; i < s.positions.length; i++) {
        s.positions[i].target.x = s.targetPosition.x;
        s.positions[i].target.y = s.targetPosition.y + s.offsetY * i;
        s.positions[i].current.x = math.lerp(s.positions[i].current.x, s.positions[i].target.x, s.settings.dampings[i]);
        s.positions[i].current.y = math.lerp(s.positions[i].current.y, s.positions[i].target.y, s.settings.dampings[i]);
        cursors[i].style.transform = `translate(${s.positions[i].current.x}px, ${s.positions[i].current.y}px)`;
      }
    };
    const deactivateInteraction = (interaction: InteractionHandle) => {
      s.isTweening = false;
      s.timelineDeactivation = new gsap.timeline();
      s.timelineDeactivation.add(interaction.hide(), 0);
      s.timelineDeactivation.to(diamonds, { duration: 1, scale: s.initialScale }, 0);
    };
    (s as any).activate = (interaction: InteractionHandle) => {
      s.isTweening = true;
      s.timelineActivation = new gsap.timeline();
      s.timelineActivation.add(interaction.show(), 0.5);
      for (let i = 0; i < cursors.length; i++) {
        const target = interaction.targets[i];
        const scale = target.width / s.sizes[i];
        const from = { x: s.positions[i].current.x, y: s.positions[i].current.y };
        s.positions[i].current.x = target.position.x;
        s.positions[i].current.y = target.position.y;
        s.positions[i].target.x = target.position.x;
        s.positions[i].target.y = target.position.y;
        s.timelineActivation.fromTo(cursors[i], { x: from.x, y: from.y }, { duration: 2, x: target.position.x, y: target.position.y, ease: 'cursorSnap' }, 0.1 * i);
        s.timelineActivation.to(diamonds[i], { duration: 2, scale, ease: 'sine.inOut' }, 0);
      }
    };
    (s as any).deactivate = deactivateInteraction;

    const mousemove = (event: MouseEvent) => {
      s.mousePosition.x = event.clientX;
      s.mousePosition.y = event.clientY;
      s.targetPosition.x = s.mousePosition.x + s.settings.radius;
      s.targetPosition.y = s.mousePosition.y + s.settings.radius;
    };
    const resize = () => {
      if (s.activeInteraction) {
        clearTimeout(s.timeout);
        deactivateInteraction(s.activeInteraction);
        s.activeInteraction = null;
      }
      setupCursors();
    };
    const tick = () => {
      if (store.getters['preloader/isCompleted'] && !s.isTweening) updatePositions();
    };
    let listening = false;
    const setupTimer = setTimeout(() => {
      setupCursors();
      if (!isTouch) {
        listening = true;
        window.addEventListener('mousemove', mousemove);
        windowObserver.addEventListener('resize', resize);
        gsap.ticker.add(tick);
      }
    }, 1000);
    return () => {
      clearTimeout(setupTimer);
      clearTimeout(s.timeout);
      if (listening) {
        window.removeEventListener('mousemove', mousemove);
        windowObserver.removeEventListener('resize', resize);
        gsap.ticker.remove(tick);
      }
      if ((root as any).cursorHome) (root as any).cursorHome = null;
    };
  }, [isTouch, gsap, math, windowObserver, root, require, store, s]);

  useImperativeHandle(ref, () => ({
    transitionIn: () => gsap.to(el.current, { duration: 1, alpha: 1, ease: 'sine.inOut' }),
    transitionOut: () => gsap.to(el.current, { duration: 1, alpha: 0, ease: 'sine.inOut' }),
    clickHandler() {
      clearTimeout(s.timeout);
      if (s.activeInteraction) (s as any).deactivate(s.activeInteraction);
      s.activeInteraction = interactions.current[s.activeIndex];
      (s as any).activate(s.activeInteraction);
      s.timeout = setTimeout(() => {
        if (s.activeInteraction) (s as any).deactivate(s.activeInteraction);
        s.activeInteraction = null;
      }, s.settings.duration);
      s.previousIndex = s.activeIndex;
      s.activeIndex = (s.activeIndex + 1) % interactions.current.length;
    }
  }), [gsap, s]);

  const attrs = sv('63c79a1b');
  return (
    <div ref={el} className="cursors-home" {...sv('63c79a1b', scope)}>
      <div ref={cursor0} className="cursor" {...attrs}>
        <DiamondCursor innerRef={diamond0} className="cursor-diamond" />
      </div>
      <div ref={cursor1} className="cursor" {...attrs}>
        <DiamondCursor innerRef={diamond1} className="cursor-diamond" />
      </div>
      {data.map((item, i) => (
        <Interaction key={i} ref={(node) => { if (node) interactions.current[i] = node; }} text={item.text} logo={item.logo} scope="63c79a1b" />
      ))}
    </div>
  );
});
