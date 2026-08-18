import { forwardRef, useEffect, useImperativeHandle, useRef, type ReactNode } from 'react';
import { sv, useGetter, useLegacy, useWatch } from '../../runtime/context';
import type { CursorsHomeHandle } from './CursorsHome';
import type { ScrollIndicatorHandle, SectionHomeHandle, TutorialHandle } from './HomeParts';

export interface HomeParentRefs {
  sectionHome: React.RefObject<SectionHomeHandle | null>;
  scrollIndicator: React.RefObject<ScrollIndicatorHandle | null>;
  cursors: React.RefObject<CursorsHomeHandle | null>;
  tutorial: React.RefObject<TutorialHandle | null>;
  showArrow: () => any;
  hideArrow: () => any;
}

export interface ScrollContainerHomeHandle {
  isFreeScroll: boolean;
  animateIn: (fromMenu?: boolean) => void;
  animateOut: (fromMenu?: boolean) => void;
  scrollIndicatorClickHandler: () => void;
}

/** Ported from the original ScrollContainerHome component (scope c1d646d2). */
export const ScrollContainerHome = forwardRef<ScrollContainerHomeHandle, { parent: HomeParentRefs; scope: string; children: ReactNode }>(function ScrollContainerHome({ parent, scope, children }, ref) {
  const { gsap, math, easing, windowObserver, breakpoints, store, engine, require } = useLegacy();
  const isTouch = useGetter<boolean>('device/isTouch');
  const isMenuOpen = useGetter<boolean>('menu/isOpen');
  const el = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const s = useRef({
    isFreeScroll: false,
    isTriggered: false,
    isAnimating: false,
    isScrollLocked: false,
    isVisible: false,
    isGodraysEnabled: false,
    freeWheelPosition: 0,
    lockScrollPosition: 0,
    cameraProgress: 0,
    direction: null as number | null,
    triggerPosition: 0,
    delta: 0,
    progress: { current: 0, target: 0 },
    freePosition: { current: 0, target: 0 },
    width: 0,
    height: 0,
    bounds: null as DOMRect | null,
    settings: null as any,
    timelineIn: null as any, timelineOut: null as any, timelineOpen: null as any,
    throttleTimeout: 0 as any,
    virtualScroll: null as any
  }).current;

  const isWebGLViewAvailable = () => store.state.webgl.views.home.isAvailable;
  const app = engine;
  const scrollManager = () => require(129).a;

  const setFreeScroll = (value: boolean) => {
    s.isFreeScroll = value;
    if (!el.current) return;
    if (value) {
      if (!s.isScrollLocked) el.current.style.position = 'relative';
      el.current.style.touchAction = 'auto';
    } else {
      el.current.style.position = 'fixed';
      el.current.style.touchAction = 'none';
    }
  };
  const setScrollLocked = (value: boolean) => {
    s.isScrollLocked = value;
    if (!el.current) return;
    if (value) {
      s.lockScrollPosition = s.freePosition.target;
      el.current.style.position = 'fixed';
    } else if (s.isFreeScroll) {
      el.current.style.position = 'relative';
      scrollManager().position = s.lockScrollPosition;
      s.freePosition.current = s.lockScrollPosition;
      s.freePosition.target = s.lockScrollPosition;
    }
  };

  const CustomEase = () => require(150).a;

  const animateIn = (fromMenu?: boolean) => {
    s.isTriggered = true;
    s.isAnimating = true;
    s.isVisible = true;
    s.timelineIn = new gsap.timeline({
      onComplete: () => {
        app().landscapeManager.active.camera.disable();
        s.isAnimating = false;
      }
    });
    s.timelineIn.to(s, {
      duration: 1.5,
      ease: CustomEase().create('custom', s.settings.animateInEasing),
      cameraProgress: 1,
      onUpdate: () => {
        if (isWebGLViewAvailable()) app().landscapeManager.active.camera.scrollProgress = s.cameraProgress;
      }
    });
    s.timelineIn.call(() => { setFreeScroll(true); s.isTriggered = false; }, null, s.settings.enableFreescrollTimeout);
    if (fromMenu) s.timelineIn.add(parent.sectionHome.current!.show(), 0);
    else s.timelineIn.add(parent.sectionHome.current!.transitionIn(), 0);
    s.timelineIn.add(parent.scrollIndicator.current!.setStateScrollUp(), 0);
    s.timelineIn.add(parent.cursors.current!.transitionOut(), 0);
    s.timelineIn.to(parent.tutorial.current!.el, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
    store.dispatch('home/setScrollTriggered', true);
    if (isWebGLViewAvailable()) {
      const post = app().postProcessing;
      s.timelineIn.to(post.passes.lineRender.lines, { duration: 1.5, targetCenterProgress: 1, ease: 'sine.inOut' }, 0.2);
      if (!fromMenu) s.timelineIn.fromTo(post.passes.transition.uniforms.uProgress, { value: 0 }, { duration: 1, value: 1 }, 0.2);
      s.timelineIn.call(() => app().sceneRenderer.disable(), null, 1.2);
      if (breakpoints.active('small')) s.timelineIn.to(post.passes.lineRender.lines, { duration: 1, opacity: 0.2, ease: 'sine.inOut' }, 0.2);
      if (post.passes.godrays.enabled) {
        s.isGodraysEnabled = true;
        s.timelineIn.add(post.passes.godrays.hide(0.4), 0.2);
      }
    }
  };

  const animateOut = (fromMenu?: boolean) => {
    s.isAnimating = true;
    setFreeScroll(false);
    s.isVisible = false;
    s.timelineOut = new gsap.timeline({ onComplete: () => { s.isAnimating = false; } });
    s.timelineOut.call(() => app().landscapeManager.active.camera.enable(), null, 0);
    s.timelineOut.to(s, {
      duration: 3,
      cameraProgress: 0,
      ease: CustomEase().create('custom', s.settings.animateOutEasing),
      onUpdate: () => {
        if (isWebGLViewAvailable()) app().landscapeManager.active.camera.scrollProgress = s.cameraProgress;
      },
      onComplete: () => {
        s.triggerPosition = 0;
        s.progress.current = 0;
        s.progress.target = 0;
      }
    });
    if (fromMenu) s.timelineOut.add(parent.sectionHome.current!.hide(), 0);
    else s.timelineOut.add(parent.sectionHome.current!.transitionOut(), 0);
    s.timelineOut.add(parent.scrollIndicator.current!.setStateScrollDown(), 0);
    s.timelineOut.add(parent.cursors.current!.transitionIn(), 0);
    s.timelineOut.to(parent.tutorial.current!.el, { duration: 1, alpha: 1, ease: 'sine.inOut' }, 1);
    if (isWebGLViewAvailable()) {
      const post = app().postProcessing;
      s.timelineOut.call(() => app().sceneRenderer.enable(), null, 0);
      s.timelineOut.to(post.passes.lineRender.lines, { duration: 1.5, targetCenterProgress: 0, ease: 'sine.inOut' }, 0);
      s.timelineOut.to(post.passes.transition.uniforms.uProgress, { duration: 1, value: 0 }, 0.2);
      if (breakpoints.active('small')) s.timelineOut.to(post.passes.lineRender.lines, { duration: 1, opacity: 1, ease: 'sine.inOut' }, 0);
      if (s.isGodraysEnabled) {
        s.isGodraysEnabled = false;
        s.timelineOut.add(post.passes.godrays.show(), 0);
      }
    }
    store.dispatch('home/setScrollTriggered', false);
  };

  const setMenuOpenState = () => {
    s.isAnimating = true;
    setScrollLocked(true);
    s.timelineOut?.kill();
    s.timelineIn?.kill();
    s.timelineOpen = new gsap.timeline({ onComplete: () => { s.isAnimating = false; } });
    s.timelineOpen.to(s, {
      duration: 3,
      cameraProgress: 0,
      ease: CustomEase().create('custom', s.settings.animateOutEasing),
      onUpdate: () => {
        if (isWebGLViewAvailable()) app().landscapeManager.active.camera.scrollProgress = s.cameraProgress;
      },
      onComplete: () => {
        s.triggerPosition = 0;
        s.progress.current = 0;
        s.progress.target = 0;
      }
    });
    s.timelineOpen.add(parent.sectionHome.current!.hide(), 0);
    s.timelineOpen.add(parent.hideArrow(), 0);
    s.timelineOpen.add(parent.cursors.current!.transitionOut(), 0);
    s.timelineOpen.to(parent.tutorial.current!.el, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
    if (s.isVisible) store.dispatch('home/setMenuTriggeredWithScrollTriggered', true);
    store.dispatch('home/setScrollTriggered', false);
  };
  const setMenuCloseState = () => {
    s.isAnimating = true;
    setScrollLocked(false);
    parent.showArrow();
    store.dispatch('home/setMenuTriggeredWithScrollTriggered', false);
    if (s.isFreeScroll) animateIn(true);
    else animateOut(true);
  };

  useWatch(isMenuOpen, (open) => {
    if (open) setMenuOpenState();
    else setMenuCloseState();
  });

  useEffect(() => {
    s.settings = {
      scrollDamping: isTouch ? 1 : 0.1,
      progressDamping: 1,
      wheelSpeed: 1,
      wheelStep: isTouch ? 1000 : 4000,
      maxProgress: 0.2,
      resistance: isTouch ? 10 : 30,
      enableFreescrollTimeout: 1.3,
      wheelScrollTreshold: 2,
      wheelBackTreshold: 5,
      animateInEasing: 'M0,0 C0.272,0 0.472,0.455 0.496,0.496 0.574,0.63 0.744,1 1,1',
      animateOutEasing: 'M0,0 C0.198,0 0.182,0.088 0.318,0.558 0.445,0.998 0.592,1 1,1'
    };
    const InertiaPlugin = require(205).a;
    InertiaPlugin.track(s, 'cameraProgress');
    const getBounds = () => {
      s.width = windowObserver.width;
      s.height = windowObserver.height;
      s.bounds = content.current!.getBoundingClientRect();
    };
    getBounds();
    const VirtualScroll = require(602);
    s.virtualScroll = new VirtualScroll({ el: el.current, useKeyboard: false });

    const updateTriggerPosition = () => {
      const factor = 1 + easing.easeInCirc(s.progress.current);
      const resistance = easing.easeOutSine(s.progress.current);
      const wheel = (s.direction ?? 0) < 0 ? -s.delta : 0;
      s.triggerPosition += wheel * s.settings.wheelSpeed * factor;
      s.triggerPosition += -s.settings.resistance * resistance;
      s.triggerPosition = math.clamp(s.triggerPosition, 0, s.settings.wheelStep);
      s.progress.target = s.triggerPosition / s.settings.wheelStep;
      s.progress.current = math.lerp(s.progress.current, s.progress.target, s.settings.progressDamping);
      parent.scrollIndicator.current?.setProgress(s.isTriggered ? 1 : s.progress.current);
    };
    void updateTriggerPosition;

    const mousewheelHandler = (event: { deltaY: number }) => {
      if (isTouch) return;
      s.direction = Math.sign(event.deltaY);
      s.delta = event.deltaY;
      if (isMenuOpenRef.current || s.isAnimating || !store.getters['webgl/isLandscapeTransitioningNone']) return;
      if (!s.isFreeScroll && s.direction < 0 && Math.abs(s.delta) > s.settings.wheelScrollTreshold) animateIn();
      if (s.isFreeScroll && s.freePosition.current < 1 && s.direction > 0 && Math.abs(s.delta) > s.settings.wheelBackTreshold) animateOut();
      clearTimeout(s.throttleTimeout);
      s.throttleTimeout = setTimeout(() => { s.delta = 0; }, 100);
    };
    const tick = () => {
      // updateFreeScrollPosition + updatePosition
      s.freeWheelPosition = scrollManager().position;
      s.freePosition.target = s.freeWheelPosition;
      s.freePosition.current = s.freePosition.target;
      if ((s.isAnimating && !s.isFreeScroll) || s.isScrollLocked) return;
      if (isWebGLViewAvailable()) app().viewManager.active.ui.text.position.y = s.freePosition.current;
    };
    const resize = () => {
      getBounds();
      if (s.isFreeScroll) {
        s.freeWheelPosition = math.clamp(s.freeWheelPosition, -s.bounds!.height + s.height, 0);
        s.freePosition.target = s.freeWheelPosition;
      }
    };
    s.virtualScroll.on(mousewheelHandler);
    gsap.ticker.add(tick);
    windowObserver.addEventListener('resize', resize);
    scrollManager().enable();
    if (isTouch) scrollManager().disableSmooth();
    if (el.current) el.current.style.touchAction = 'none';
    return () => {
      s.virtualScroll.off(mousewheelHandler);
      gsap.ticker.remove(tick);
      windowObserver.removeEventListener('resize', resize);
      if (el.current) el.current.style.touchAction = 'auto';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch]);

  const isMenuOpenRef = useRef(isMenuOpen);
  isMenuOpenRef.current = isMenuOpen;

  useImperativeHandle(ref, () => ({
    get isFreeScroll() { return s.isFreeScroll; },
    animateIn,
    animateOut,
    scrollIndicatorClickHandler() {
      if (isMenuOpenRef.current || s.isAnimating || !store.getters['webgl/isLandscapeTransitioningNone']) return;
      if (s.isFreeScroll) animateOut();
      else animateIn();
    }
  }));

  const attrs = sv('c1d646d2');
  return (
    <div ref={el} className="scroll-container-home" {...sv('c1d646d2', scope)}>
      <div className="scroll-indicator-container" {...attrs}>
        <div className="scroll-indicator" {...attrs} />
      </div>
      <div ref={content} className="scroll-content" {...attrs}>
        {children}
      </div>
    </div>
  );
});
