import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { localeCopy, sv, useGetter, useLegacy, useRuntime, useWatch } from '../runtime/context';

/* ---------- TheLogoAnimation (scope 07152e2f) ---------- */

export interface LogoAnimationHandle {
  cursorsBounds: DOMRect[];
  name: string[];
  show: () => any;
  animate: () => any;
  close: (onComplete: () => void) => void;
  transitionIn: () => any;
  transitionOut: () => any;
}

const NAME = ['Tianlu', 'Zhang'];

export const LogoAnimation = forwardRef<LogoAnimationHandle, { scope: string }>(function LogoAnimation({ scope }, ref) {
  const { gsap, windowObserver, root } = useLegacy();
  const breakpoint = useGetter<string>('device/breakpoint');
  const el = useRef<HTMLDivElement>(null);
  const squares = useRef<HTMLDivElement>(null);
  const topSquare = useRef<HTMLDivElement>(null);
  const bottomSquare = useRef<HTMLDivElement>(null);
  const topPlaceholder = useRef<HTMLDivElement>(null);
  const bottomPlaceholder = useRef<HTMLDivElement>(null);
  const words = useRef<HTMLDivElement[]>([]);
  const s = useRef({ cursorsBounds: [] as DOMRect[], offsetX: 0, breakpoint: 'large' }).current;
  s.breakpoint = breakpoint;

  const getBounds = useCallback(() => {
    if (!topPlaceholder.current || !bottomPlaceholder.current) return;
    s.cursorsBounds = [topPlaceholder.current.getBoundingClientRect(), bottomPlaceholder.current.getBoundingClientRect()];
    if (s.breakpoint !== 'large' && squares.current) {
      const bounds = squares.current.getBoundingClientRect();
      s.offsetX = windowObserver.width / 2 - (bounds.x + bounds.width / 2);
    }
  }, [s, windowObserver]);

  useEffect(() => {
    getBounds();
    windowObserver.addEventListener('resize', getBounds);
    return () => windowObserver.removeEventListener('resize', getBounds);
  }, [getBounds, windowObserver]);

  const charsOf = (index: number) => Array.from(words.current[index]?.querySelectorAll('span') ?? []);

  useImperativeHandle(ref, () => ({
    get cursorsBounds() { return s.cursorsBounds; },
    name: NAME,
    show() {
      const timeline = new gsap.timeline({ delay: 2 });
      if (s.breakpoint !== 'large') timeline.set(el.current, { x: s.offsetX }, 0);
      timeline.to(el.current, { duration: 1, alpha: 1, ease: 'sine.inOut' }, 0);
      return timeline;
    },
    animate() {
      const timeline = new gsap.timeline();
      timeline.fromTo(topSquare.current, { y: '-800%' }, { duration: 1, y: '0%', ease: 'power2.inOut' }, 0);
      timeline.fromTo(bottomSquare.current, { y: '800%' }, { duration: 1, y: '0%', ease: 'power2.inOut' }, 0);
      timeline.to(squares.current, { duration: 1.2, rotate: '180deg', ease: 'power3.inOut' }, 1);
      timeline.to(topSquare.current, { duration: 1.2, y: '-800%', ease: 'power3.inOut' }, 1);
      timeline.to(bottomSquare.current, { duration: 1.2, y: '800%', ease: 'power3.inOut' }, 1);
      return timeline;
    },
    close(onComplete) {
      const timeline = new gsap.timeline({ onComplete });
      timeline.fromTo(topSquare.current, { y: '-800%' }, { duration: 1, y: '0%', ease: 'power2.inOut' }, 0);
      timeline.fromTo(bottomSquare.current, { y: '800%' }, { duration: 1, y: '0%', ease: 'power2.inOut' }, 0);
    },
    transitionIn() {
      const timeline = new gsap.timeline();
      timeline.fromTo(squares.current, { rotate: '0deg' }, { duration: 1.2, rotate: '180deg', ease: 'power3.inOut' }, 0);
      timeline.to(topSquare.current, { duration: 1.2, y: '-800%', ease: 'power3.inOut' }, 0);
      timeline.to(bottomSquare.current, { duration: 1.2, y: '800%', ease: 'power3.inOut' }, 0);
      timeline.to(topSquare.current, { duration: 1.2, y: '0%', ease: 'power3.inOut' }, 1.2);
      timeline.to(bottomSquare.current, { duration: 1.2, y: '0%', ease: 'power3.inOut' }, 1.2);
      if (s.breakpoint !== 'large') {
        timeline.to([topSquare.current, bottomSquare.current], { duration: 1, alpha: 0, ease: 'sine.inOut' });
        timeline.set(el.current, { x: 0 });
        timeline.to([topSquare.current, bottomSquare.current], { duration: 1, alpha: 1, stagger: -0.1, ease: 'sine.inOut' });
      }
      const at = s.breakpoint !== 'large' ? 2.9 : 1.2;
      timeline.to(charsOf(0), { duration: 1, alpha: 0.2, stagger: 0.1, ease: 'sine.inOut' }, at);
      timeline.to(charsOf(1), { duration: 1, alpha: 0.2, stagger: 0.1, ease: 'sine.inOut' }, at + 0.2);
      timeline.to(charsOf(0), { duration: 1, alpha: 1, stagger: 0.1, ease: 'sine.inOut' }, at + 1);
      timeline.to(charsOf(1), { duration: 1, alpha: 1, stagger: 0.1, ease: 'sine.inOut' }, at + 1 + 0.2);
      return timeline;
    },
    transitionOut() {
      const timeline = new gsap.timeline();
      if (root.getRouteBaseName() !== 'index') timeline.timeScale(1.2);
      const cursorHome = (root as any).cursorHome;
      if (cursorHome) timeline.add(cursorHome.transitionIn());
      timeline.to(charsOf(0), { duration: 2, alpha: 0, stagger: 0.1, ease: 'sine.inOut' }, 0);
      timeline.to(charsOf(1), { duration: 2, alpha: 0, stagger: 0.1, ease: 'sine.inOut' }, 0.2);
      timeline.to(topSquare.current, { duration: 1.5, alpha: 0, ease: 'sine.inOut' }, 0.5);
      timeline.to(bottomSquare.current, { duration: 1.5, alpha: 0, ease: 'sine.inOut' }, 0.5);
      return timeline;
    }
  }), [gsap, root, s]);

  const attrs = sv('07152e2f');
  return (
    <div ref={el} className="logo-animation logo-animation" {...sv('07152e2f', scope)}>
      <div ref={squares} className="squares" {...attrs}>
        <div ref={topSquare} className="square top" {...attrs} />
        <div ref={bottomSquare} className="square bottom" {...attrs} />
        <div ref={topPlaceholder} className="square top placeholder" {...attrs} />
        <div ref={bottomPlaceholder} className="square bottom placeholder" {...attrs} />
      </div>
      <div className="name" {...attrs}>
        {NAME.map((word, w) => (
          <div key={w} className="word" {...attrs} ref={(node) => { if (node) words.current[w] = node; }}>
            {Array.from(word).map((c, i) => <span key={i} className="char" {...attrs}>{c}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
});

/* ---------- TheCursorIntro (scope cff97910) ---------- */

export interface CursorIntroHandle {
  el: HTMLDivElement | null;
  transitionIn: () => any;
  transitionOut: () => any;
}

export const CursorIntro = forwardRef<CursorIntroHandle, { state: string; scope: string }>(function CursorIntro({ state, scope }, ref) {
  const { gsap, math, windowObserver } = useLegacy();
  const isTouch = useGetter<boolean>('device/isTouch');
  const [content, setContent] = useState(state);
  const el = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorStatic = useRef<HTMLDivElement>(null);
  const cursorMobile = useRef<HTMLDivElement>(null);
  const s = useRef({
    hasMoved: false,
    position: { current: { x: 0, y: 0 }, target: { x: 0, y: 0 } },
    bounds: null as DOMRect | null,
    cursorBounds: null as DOMRect | null,
    timelineIn: null as any, timelineOut: null as any, timelineUpdate: null as any
  }).current;

  const transitionIn = useCallback(() => {
    s.timelineOut?.kill();
    s.timelineIn = new gsap.timeline();
    s.timelineIn.to(cursorStatic.current, { duration: 0.5, alpha: 1, ease: 'sine.inOut' }, 0);
    return s.timelineIn;
  }, [gsap, s]);

  useEffect(() => {
    const getBounds = () => {
      if (isTouch || !el.current || !cursor.current) return;
      s.bounds = el.current.getBoundingClientRect();
      s.cursorBounds = cursor.current.getBoundingClientRect();
    };
    getBounds();
    transitionIn();
    if (isTouch) return;
    const resize = () => {
      if (el.current) el.current.style.transform = 'translate(0px, 0px)';
      getBounds();
    };
    const mousemove = (event: MouseEvent) => {
      if (!s.bounds || !s.cursorBounds) return;
      s.position.target.x = event.clientX - s.bounds.x - s.cursorBounds.width / 2;
      s.position.target.y = event.clientY - s.bounds.y;
      if (!s.hasMoved) {
        s.position.current.x = s.position.target.x;
        s.position.current.y = s.position.target.y;
        s.hasMoved = true;
        const timeline = new gsap.timeline();
        timeline.to(cursorStatic.current, { duration: 0.5, alpha: 0, ease: 'sine.inOut' }, 0);
        timeline.to(cursor.current, { duration: 0.5, alpha: 1, ease: 'sine.inOut' }, 0);
      }
    };
    const tick = () => {
      s.position.current.x = math.lerp(s.position.current.x, s.position.target.x, 0.15);
      s.position.current.y = math.lerp(s.position.current.y, s.position.target.y, 0.15);
      if (cursor.current) cursor.current.style.transform = `translate(${s.position.current.x}px, ${s.position.current.y}px)`;
    };
    windowObserver.addEventListener('resize', resize);
    window.addEventListener('mousemove', mousemove);
    gsap.ticker.add(tick);
    return () => {
      windowObserver.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mousemove);
      gsap.ticker.remove(tick);
    };
  }, [isTouch, gsap, math, windowObserver, transitionIn, s]);

  // watch state
  useWatch(state, () => {
    s.timelineUpdate?.kill();
    s.timelineUpdate = new gsap.timeline();
    s.timelineUpdate.to(el.current, { duration: 0.5, alpha: 0 });
    s.timelineUpdate.call(() => setContent(state), null);
    s.timelineUpdate.to(el.current, { duration: 0.5, alpha: 1 });
    s.timelineUpdate.to(cursorMobile.current, { duration: 1, alpha: 1, ease: 'sine.inOut' }, 0);
    s.timelineUpdate.to(cursorMobile.current?.querySelectorAll('.char') ?? [], { duration: 1.5, alpha: 1, stagger: 0.1, ease: 'sine.inOut' }, 0.3);
  });

  useImperativeHandle(ref, () => ({
    get el() { return el.current; },
    transitionIn,
    transitionOut() {
      s.timelineIn?.kill();
      s.timelineOut = new gsap.timeline();
      s.timelineOut.to(cursorStatic.current, { duration: 0.5, alpha: 0, ease: 'sine.inOut' }, 0);
      s.timelineOut.to(cursor.current, { duration: 0.5, alpha: 0, ease: 'sine.inOut' }, 0);
      return s.timelineOut;
    }
  }), [gsap, s, transitionIn]);

  const attrs = sv('cff97910');
  return (
    <div ref={el} className="cursor-intro" {...sv('cff97910', scope)}>
      <div ref={cursor} className="cursor" {...attrs}>{content}</div>
      <div ref={cursorStatic} className="cursor-static" {...attrs}>{content}</div>
      <div ref={cursorMobile} className="cursor-mobile" {...attrs}>
        <span className="content" {...attrs}>
          {Array.from(localeCopy.misc.enter).map((c, i) => <span key={i} className="char" {...attrs}>{c}</span>)}
        </span>
      </div>
    </div>
  );
});

/* ---------- ThePreloader (scope 278753da) ---------- */

const COOKIE_KEY = 'cookies';
const readCookiesAccepted = () => document.cookie.split(';').some((part) => part.trim().startsWith(`${COOKIE_KEY}=`));
const writeCookiesAccepted = () => {
  const expires = new Date(Date.now() + 2592e6).toUTCString();
  document.cookie = `${COOKIE_KEY}=true; expires=${expires}; max-age=2592000; path=/`;
};

export function Preloader({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  const runtime = useRuntime();
  const { gsap, store, root, detectGpu } = useLegacy();
  const breakpoint = useGetter<string>('device/breakpoint');
  const [isReady, setIsReady] = useState(false);
  const el = useRef<HTMLDivElement>(null);
  const logo = useRef<LogoAnimationHandle>(null);
  const cursor = useRef<CursorIntroHandle>(null);
  const cookies = useRef<HTMLDivElement>(null);
  const s = useRef({
    isReady: false,
    isCookiesAccepted: readCookiesAccepted(),
    timelineIn: null as any, timelineOut: null as any, timelineLoading: null as any, timelineLoadingComplete: null as any
  }).current;

  const cursorText = localeCopy.misc[isReady ? 'explore' : 'loading'][breakpoint] ?? localeCopy.misc[isReady ? 'explore' : 'loading'].large;

  useEffect(() => {
    root.logoAnimation = logo.current;
    store.dispatch('scroll/lock');

    // transitionIn
    s.timelineIn = new gsap.timeline();
    s.timelineIn.to(el.current, { duration: 1, alpha: 1, ease: 'sine.out' }, 2);

    // loadingAnimation
    logo.current!.show();
    let loadingHandled = false;
    const loadingAnimationRepeatHandler = () => {
      if (loadingHandled || !store.getters['preloader/isLoadingCompleted']) return;
      loadingHandled = true;
      s.timelineLoading.kill();
      logo.current!.close(() => {
        runtime.setupEngine(() => {
          // loadingCompleteAnimation
          s.timelineLoadingComplete = new gsap.timeline();
          if (!s.isCookiesAccepted) s.timelineLoadingComplete.to(cookies.current, { duration: 1, alpha: 1, ease: 'sine.out' }, 1.2);
          s.timelineLoadingComplete.add(logo.current!.transitionIn(), 0);
          s.timelineLoadingComplete.call(() => { s.isReady = true; setIsReady(true); }, null);
          s.timelineLoadingComplete.call(() => { if (el.current) el.current.style.cursor = 'pointer'; }, null);
        });
      });
    };
    s.timelineLoading = new gsap.timeline({ onRepeat: loadingAnimationRepeatHandler, repeat: -1, delay: 2 });
    s.timelineLoading.add(logo.current!.animate(), 0);

    // resource loading
    const onComplete = () => store.dispatch('preloader/setLoadingCompleted');
    runtime.resourceLoader.addEventListener('complete', onComplete);
    detectGpu({ benchmarksURL: '/webgl/misc/benchmarks' }).then((result) => {
      let tier = result.tier;
      if (result.gpu === 'apple m1 (Apple M1)') tier = 3;
      store.dispatch('device/setGpuTier', tier);
      // WebglBackground: create the engine once loading starts
      if (canvasRef.current && !root.webglApp) runtime.createEngine(canvasRef.current);
      store.dispatch('preloader/setLoadingStarted');
      runtime.resourceLoader.preload();
    });

    return () => {
      runtime.resourceLoader.removeEventListener('complete', onComplete);
      s.timelineIn?.kill();
      s.timelineOut?.kill();
      s.timelineLoading?.kill();
      s.timelineLoadingComplete?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = () => {
    // transitionOut + scroll unlock
    s.timelineIn?.kill();
    s.timelineOut = new gsap.timeline();
    s.timelineOut.to(cursor.current!.el, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
    s.timelineOut.to(cookies.current, { duration: 1, alpha: 0, ease: 'sine.out' }, 0);
    const remove = () => store.dispatch('preloader/setCompleted');
    if (root.getRouteBaseName() === 'index') {
      s.timelineOut.call(() => { root.webglApp.viewManager.show('Home'); }, null, 0);
      s.timelineOut.add(logo.current!.transitionOut(), 3);
      s.timelineOut.call(remove, null);
    } else {
      s.timelineOut.add(logo.current!.transitionOut(), 0);
      s.timelineOut.call(remove, null);
    }
    store.dispatch('scroll/unlock');
  };

  const clickHandler = () => {
    if (!s.isReady) return;
    start();
    writeCookiesAccepted();
  };

  const attrs = sv('278753da');
  return (
    <div ref={el} className="preloader" {...sv('278753da', '6d28008c')} onClick={clickHandler}>
      <LogoAnimation ref={logo} scope="278753da" />
      <CursorIntro ref={cursor} state={cursorText} scope="278753da" />
      <div ref={cookies} className="cookies-message paragraph" {...attrs}>
        {localeCopy.misc.cookies.message}
      </div>
    </div>
  );
}
