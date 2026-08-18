import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { localeCopy, sv, useGetter, useLegacy } from '../runtime/context';

export interface ButtonMuteHandle {
  transitionIn: () => any;
  transitionOut: () => any;
}

const CIRCLE_SIZES: Record<string, number> = { large: 10, medium: 10, small: 10 };
const LINE_SIZES: Record<string, number> = { large: 13, medium: 13, small: 12 };

/** Ported from the original TheButtonMute component (scope 99e23fd8). */
export const ButtonMute = forwardRef<ButtonMuteHandle, object>(function ButtonMute(_props, ref) {
  const { gsap, math, easing, windowObserver, audio } = useLegacy();
  const breakpoint = useGetter<string>('device/breakpoint');
  const isTouch = useGetter<boolean>('device/isTouch');
  const [circleSize, setCircleSize] = useState(50);
  const [lineSize, setLineSize] = useState(15);
  const radius = circleSize / 2;
  const el = useRef<HTMLButtonElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const circle = useRef<SVGCircleElement>(null);
  const circleAnimated = useRef<SVGCircleElement>(null);
  const line = useRef<SVGLineElement>(null);
  const s = useRef({
    isMuted: false,
    isReady: false,
    circleTurnIndex: -1,
    lineRunIndex: -1,
    circleLength: 0,
    lineLength: 0,
    mouseAlphaFactor: 0,
    mousePosition: { target: { x: 0, y: 0 }, current: { x: 0, y: 0 } },
    bounds: null as DOMRect | null,
    charBounds: [] as DOMRect[],
    chars: [] as HTMLElement[],
    timelineIn: null as any, timelineOut: null as any, timelineMute: null as any, timelineUnMute: null as any, timelineEnter: null as any, timelineLeave: null as any
  }).current;

  const getBounds = useCallback(() => {
    if (!el.current) return;
    s.bounds = el.current.getBoundingClientRect();
    s.chars = Array.from(label.current?.querySelectorAll('span') ?? []);
    s.charBounds = s.chars.map((c) => c.getBoundingClientRect());
  }, [s]);

  const resize = useCallback(() => {
    getBounds();
    setCircleSize(CIRCLE_SIZES[breakpoint] ?? 10);
    setLineSize(LINE_SIZES[breakpoint] ?? 13);
    requestAnimationFrame(() => {
      if (!circle.current || !line.current || !circleAnimated.current) return;
      s.circleLength = circle.current.getTotalLength() + 1;
      circle.current.style.strokeDasharray = String(s.circleLength);
      circle.current.style.strokeDashoffset = String(s.circleLength);
      circleAnimated.current.style.strokeDasharray = String(s.circleLength);
      circleAnimated.current.style.strokeDashoffset = String(s.circleLength);
      circle.current.style.strokeDashoffset = String(s.isReady ? 0 : s.circleLength);
      s.lineLength = line.current.getTotalLength() + 1;
      line.current.style.strokeDasharray = String(s.lineLength);
      line.current.style.strokeDashoffset = String(s.isMuted ? 0 : -s.lineLength);
    });
  }, [breakpoint, getBounds, s]);

  useEffect(() => {
    resize();
    if (isTouch) {
      if (el.current) {
        el.current.style.opacity = '0';
        el.current.style.pointerEvents = 'none';
      }
      return;
    }
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
        const alpha = easing.easeInOutQuad(math.clamp(Math.abs((0.2 * s.bounds.width) / distance), 0, 1)) * s.mouseAlphaFactor;
        s.chars[i].style.opacity = String(math.clamp(alpha, 0.45, 1));
      }
    };
    window.addEventListener('mousemove', mousemove);
    windowObserver.addEventListener('resize', resize);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener('mousemove', mousemove);
      windowObserver.removeEventListener('resize', resize);
      gsap.ticker.remove(tick);
    };
  }, [isTouch, resize, gsap, math, easing, windowObserver, s]);

  const mute = () => {
    audio.mute();
    s.timelineUnMute?.kill();
    s.lineRunIndex++;
    s.timelineMute = new gsap.timeline();
    s.timelineMute.to(circle.current, { duration: 0.5, alpha: 0, ease: 'sine.inOut' }, 0);
    s.timelineMute.to(circleAnimated.current, { duration: 0.5, alpha: 0, ease: 'sine.inOut' }, 0);
    s.timelineMute.to(line.current, { duration: 0.5, strokeDashoffset: s.lineLength * s.lineRunIndex, ease: 'sine.out' }, 0.4);
  };
  const unmute = () => {
    audio.unmute();
    s.timelineMute?.kill();
    s.lineRunIndex++;
    s.timelineUnMute = new gsap.timeline();
    s.timelineUnMute.to(line.current, { duration: 0.5, strokeDashoffset: s.lineLength * s.lineRunIndex, ease: 'sine.out' }, 0);
    s.timelineUnMute.to(circle.current, { duration: 0.5, alpha: 0.5, ease: 'sine.inOut' }, 0.5);
    s.timelineUnMute.to(circleAnimated.current, { duration: 0.5, alpha: 1, ease: 'sine.inOut' }, 0.5);
  };

  useImperativeHandle(ref, () => ({
    transitionIn() {
      s.timelineOut?.kill();
      s.timelineIn = new gsap.timeline({ delay: 1 });
      s.timelineIn.call(() => { s.isReady = true; });
      s.timelineIn.set(el.current, { alpha: 1 });
      s.timelineIn.to(circle.current, { duration: 0.8, strokeDashoffset: 0, ease: 'sine.inOut' }, 0);
      s.timelineIn.to(label.current, { duration: 0.8, alpha: 1, ease: 'sine.inOut' }, 0);
      s.timelineIn.to(circle.current, { duration: 0.8, alpha: 0.5, ease: 'sine.inOut' }, 0.5);
      if (s.isMuted) s.timelineIn.to(line.current, { duration: 0.5, strokeDashoffset: s.lineLength * s.lineRunIndex, ease: 'sine.out' }, 1);
      return s.timelineIn;
    },
    transitionOut() {
      s.timelineIn?.kill();
      s.timelineOut = new gsap.timeline();
      s.timelineOut.to(el.current, { duration: 0.5, alpha: 0 });
      return s.timelineOut;
    }
  }), [gsap, s]);

  const clickHandler = () => {
    s.isMuted = !s.isMuted;
    if (s.isMuted) mute();
    else unmute();
  };
  const mouseenterHandler = () => {
    if (isTouch) return;
    s.timelineLeave?.kill();
    s.circleTurnIndex++;
    s.timelineEnter = new gsap.timeline();
    s.timelineEnter.to(circleAnimated.current, { duration: 0.8, strokeDashoffset: s.circleTurnIndex * s.circleLength, ease: 'power3.out' }, 0);
    s.timelineEnter.to(s, { duration: 0.2, mouseAlphaFactor: 1, ease: 'sine.inOut' }, 0);
  };
  const mouseleaveHandler = () => {
    if (isTouch) return;
    s.timelineEnter?.kill();
    s.circleTurnIndex++;
    s.timelineLeave = new gsap.timeline();
    s.timelineLeave.to(circleAnimated.current, { duration: 0.8, strokeDashoffset: s.circleTurnIndex * s.circleLength, ease: 'power3.inOut' }, 0);
    s.timelineLeave.to(s, { duration: 0.3, mouseAlphaFactor: 0, ease: 'sine.inOut' }, 0);
  };

  const attrs = sv('99e23fd8');
  return (
    <button ref={el} className="button button-mute" {...sv('99e23fd8', '6d28008c')} onClick={clickHandler} onMouseEnter={mouseenterHandler} onMouseLeave={mouseleaveHandler}>
      <div className="container" {...attrs}>
        <div ref={label} className="label" {...attrs}>
          {Array.from(localeCopy.misc.mute).map((c, i) => <span key={i} {...attrs}>{c}</span>)}
        </div>
        <div className="circle-container" {...attrs}>
          <svg className="circle-svg" width={circleSize} height={circleSize} {...attrs}>
            <circle ref={circle} className="circle" cx={radius} cy={radius} r={radius} {...attrs} />
            <circle ref={circleAnimated} className="circle animated" cx={radius} cy={radius} r={radius} {...attrs} />
            <line ref={line} className="line" x1={circleSize - lineSize} y1={circleSize / 2} x2={lineSize} y2={circleSize / 2} {...attrs} />
          </svg>
        </div>
      </div>
    </button>
  );
});
