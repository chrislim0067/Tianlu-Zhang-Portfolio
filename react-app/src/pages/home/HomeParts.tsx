import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { localeCopy, sv, useGetter, useLegacy, useWatch } from '../../runtime/context';

/* ---------- Tutorial (scope 7efae9ce) ---------- */

export interface TutorialHandle {
  el: HTMLDivElement | null;
  show: () => any;
  hide: () => any;
}

export const Tutorial = forwardRef<TutorialHandle, { data: string; scope: string }>(function Tutorial({ data, scope }, ref) {
  const { gsap } = useLegacy();
  const el = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const s = useRef({ timelineShow: null as any, infiniteTimelineShow: null as any, timelineHide: null as any }).current;
  useImperativeHandle(ref, () => ({
    get el() { return el.current; },
    show() {
      const chars = content.current?.querySelectorAll('.char') ?? [];
      s.infiniteTimelineShow?.kill();
      s.timelineShow = new gsap.timeline();
      s.timelineShow.to(content.current, { duration: 1, alpha: 1, ease: 'sine.inOut' }, 1);
      s.infiniteTimelineShow = new gsap.timeline({ repeat: -1, repeatDelay: 1 });
      s.infiniteTimelineShow.to(chars, { duration: 0.8, alpha: 1, stagger: 0.09, ease: 'sine.inOut' }, 0);
      s.infiniteTimelineShow.to(chars, { duration: 0.8, alpha: 0.3, stagger: 0.09, ease: 'sine.inOut' }, 0.7);
      s.timelineShow.add(s.infiniteTimelineShow, 1);
      return s.timelineShow;
    },
    hide() {
      s.timelineHide = new gsap.timeline();
      s.timelineHide.to(content.current, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
      return s.timelineHide;
    }
  }), [gsap, s]);
  const attrs = sv('7efae9ce');
  return (
    <div ref={el} className="tutorial" {...sv('7efae9ce', scope)}>
      <div ref={content} className="content" {...attrs}>
        {Array.from(data).map((c, i) => <span key={i} className="char" {...attrs}>{c}</span>)}
      </div>
    </div>
  );
});

/* ---------- ScrollIndicator (scope 6acec79f) ---------- */

export interface ScrollIndicatorHandle {
  show: () => any;
  hide: () => any;
  setProgress: (progress: number) => void;
  setStateScrollUp: () => any;
  setStateScrollDown: () => any;
}

export const ScrollIndicator = forwardRef<ScrollIndicatorHandle, { scope: string; onClick: () => void }>(function ScrollIndicator({ scope, onClick }, ref) {
  const { gsap } = useLegacy();
  const isTouch = useGetter<boolean>('device/isTouch');
  const el = useRef<HTMLButtonElement>(null);
  const arrow = useRef<SVGSVGElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const labelBack = useRef<HTMLDivElement>(null);
  const s = useRef({ timelineScrollUp: null as any, timelineScrollDown: null as any }).current;
  const scrollLabel = isTouch ? localeCopy.misc.scroll.touch : localeCopy.misc.scroll.desktop;
  const scrollBackLabel = isTouch ? localeCopy.misc.scrollBack.touch : localeCopy.misc.scrollBack.desktop;

  useImperativeHandle(ref, () => ({
    show() {
      const timeline = new gsap.timeline();
      timeline.to(el.current, { duration: 1, alpha: 1, ease: 'sine.inOut' }, 0);
      return timeline;
    },
    hide() {
      const timeline = new gsap.timeline();
      timeline.to(el.current, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0.2);
      return timeline;
    },
    setProgress() {},
    setStateScrollUp() {
      s.timelineScrollDown?.kill();
      s.timelineScrollUp = new gsap.timeline();
      s.timelineScrollUp.to(arrow.current, { duration: 1, alpha: 0, ease: 'sine.inOut' });
      s.timelineScrollUp.set(arrow.current, { rotation: '180deg' });
      s.timelineScrollUp.to(arrow.current, { duration: 1, alpha: 1, ease: 'sine.inOut' });
      s.timelineScrollUp.to(label.current, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
      s.timelineScrollUp.to(labelBack.current, { duration: 1, alpha: 1, ease: 'sine.inOut' }, 0.7);
      return s.timelineScrollUp;
    },
    setStateScrollDown() {
      s.timelineScrollUp?.kill();
      s.timelineScrollDown = new gsap.timeline();
      s.timelineScrollDown.to(arrow.current, { duration: 1, alpha: 0, ease: 'sine.inOut' });
      s.timelineScrollDown.set(arrow.current, { rotation: 0 });
      s.timelineScrollDown.to(arrow.current, { duration: 1, alpha: 1, ease: 'sine.inOut' });
      s.timelineScrollDown.to(labelBack.current, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
      s.timelineScrollDown.to(label.current, { duration: 1, alpha: 1, ease: 'sine.inOut' }, 0.7);
      return s.timelineScrollDown;
    }
  }), [gsap, s]);

  const attrs = sv('6acec79f');
  return (
    <button ref={el} className="button scroll-indicator" {...sv('6acec79f', scope)} onClick={onClick}>
      <div className="container" {...attrs}>
        <svg ref={arrow} width={5} height={28} viewBox="0 0 5 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...sv('6acec79f', '6acec79f')}>
          <g opacity="0.5" {...sv('6acec79f', '6acec79f')}>
            <path d="M0 23H5V28L0 23Z" fill="white" {...sv('6acec79f', '6acec79f')} />
            <rect x={4} width={1} height={24} fill="white" {...sv('6acec79f', '6acec79f')} />
          </g>
        </svg>
        <div ref={label} className="label" {...attrs}>
          {Array.from(scrollLabel).map((c, i) => <span key={i} className="char" {...attrs}>{c}</span>)}
        </div>
        <div ref={labelBack} className="label back" {...attrs}>
          {Array.from(scrollBackLabel).map((c, i) => <span key={`back-${i}`} className="char" {...attrs}>{c}</span>)}
        </div>
      </div>
    </button>
  );
});

/* ---------- SectionHome (scope 6c212b60) ---------- */

export interface SectionHomeHandle {
  transitionIn: () => any;
  transitionOut: () => any;
  show: () => any;
  hide: () => any;
}

export const SectionHome = forwardRef<SectionHomeHandle, { title: string; endScreen: string; scope: string; onClick: (event: React.MouseEvent) => void }>(function SectionHome({ title, endScreen, scope, onClick }, ref) {
  const { gsap, engine, require, store } = useLegacy();
  const isMenuOpen = useGetter<boolean>('menu/isOpen');
  const isMenuClosing = useGetter<boolean>('menu/isClosing');
  const isTheEndShowStarted = useGetter<boolean>('webgl/isTheEndShowStarted');
  const isTheEndHideStarted = useGetter<boolean>('webgl/isTheEndHideStarted');
  const [isWebGLViewAvailable, setAvailable] = useState<boolean>(() => store.state.webgl.views.home.isAvailable);
  const theEndTitle = useRef<HTMLSpanElement>(null);
  const s = useRef({
    isFadeOutEndTitleTriggered: false,
    split: null as any,
    timelineIn: null as any, timelineOut: null as any,
    timelineShowTheEndTitle: null as any, timelineHideTheEndTitle: null as any, timelineFadeTheEndTitle: null as any
  }).current;

  useEffect(() => store.watch((state: any) => state.webgl.views.home.isAvailable, (value: boolean) => setAvailable(value)), [store]);

  const activeUi = () => engine()?.viewManager?.active?.ui ?? null;
  const setupWebGLText = () => {
    activeUi()?.text.setContent(title);
  };
  useEffect(() => {
    if (isWebGLViewAvailable) setupWebGLText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWebGLViewAvailable]);
  useEffect(() => {
    const SplitText = require(585).a;
    s.split = new SplitText(theEndTitle.current, { type: 'chars,words', charsClass: '.char' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useWatch(isMenuOpen, () => {
    // fadeOutTheEndTitle
    s.isFadeOutEndTitleTriggered = true;
    s.timelineShowTheEndTitle?.kill();
    s.timelineHideTheEndTitle?.kill();
    s.timelineFadeTheEndTitle = new gsap.timeline();
    s.timelineFadeTheEndTitle.to(theEndTitle.current, 1, { alpha: 0, ease: 'sine.inOut' }, 0);
  });
  useWatch(isMenuClosing, () => { s.isFadeOutEndTitleTriggered = false; });
  useWatch(isTheEndShowStarted, (started) => {
    if (!started || s.isFadeOutEndTitleTriggered) return;
    s.timelineShowTheEndTitle = new gsap.timeline();
    s.timelineShowTheEndTitle.set(theEndTitle.current, { color: '#000000' }, 0);
    s.timelineShowTheEndTitle.fromTo(theEndTitle.current, 5, { alpha: 0 }, { alpha: 1, ease: 'sine.inOut' }, 0);
    s.timelineShowTheEndTitle.fromTo(s.split.chars, 0.7, { alpha: 0.5 }, { alpha: 0.9, stagger: { each: 0.05, ease: 'ease.in' }, ease: 'sine.inOut' }, 1.1);
    s.timelineShowTheEndTitle.to(theEndTitle.current, 17, { color: '#ffffff', ease: 'power4.out' }, 2);
    s.timelineShowTheEndTitle.to(s.split.chars, 1.5, { alpha: 0.5, ease: 'sine.inOut' }, 3);
    s.timelineShowTheEndTitle.to(s.split.chars, 0.7, { alpha: 1, stagger: { each: 0.09, ease: 'ease.in' }, ease: 'sine.inOut' }, 4.5);
  });
  useWatch(isTheEndHideStarted, (started) => {
    if (!started) return;
    s.timelineHideTheEndTitle = new gsap.timeline();
    s.timelineHideTheEndTitle.to(s.split.chars, 1.5, { alpha: 0, stagger: { each: 0.03, ease: 'power1.out' }, ease: 'sine.inOut' }, 0);
  });

  useImperativeHandle(ref, () => ({
    transitionIn() {
      s.timelineOut?.kill();
      s.timelineIn = new gsap.timeline();
      const ui = activeUi();
      if (ui) {
        s.timelineIn.call(() => ui.enable(), null, 0);
        s.timelineIn.add(ui.text.transitionIn(), 0);
      }
      return s.timelineIn;
    },
    transitionOut() {
      s.timelineIn?.kill();
      const ui = activeUi();
      s.timelineOut = new gsap.timeline({ onComplete: () => ui?.disable() });
      if (ui) s.timelineOut.add(ui.text.transitionOut(), 0);
      return s.timelineOut;
    },
    show() {
      s.timelineOut?.kill();
      s.timelineIn = new gsap.timeline();
      const ui = activeUi();
      if (ui) {
        s.timelineIn.call(() => ui.enable(), null, 0);
        s.timelineIn.add(ui.text.show(), 0);
      }
      return s.timelineIn;
    },
    hide() {
      s.timelineIn?.kill();
      const ui = activeUi();
      s.timelineOut = new gsap.timeline({ onComplete: () => ui?.disable() });
      if (ui) s.timelineOut.add(ui.text.hide(), 0);
      return s.timelineOut;
    }
  }), [gsap, engine, s]);

  const attrs = sv('6c212b60');
  return (
    <div className="section-home section-home" {...sv('6c212b60', scope)} onClick={onClick}>
      <div className="container " {...attrs}>
        <h1 className="heading" {...attrs}>{title}</h1>
      </div>
      <span ref={theEndTitle} className="the-end-title" {...attrs}>{endScreen}</span>
    </div>
  );
});
