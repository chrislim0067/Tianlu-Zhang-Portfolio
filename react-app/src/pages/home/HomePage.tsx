import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { sv, useGetter, useGetterEffect, useLegacy } from '../../runtime/context';
import { content } from '../../content/portfolio';
import { ButtonMenu, type ButtonMenuHandle } from '../../components/ButtonMenu';
import type { PageHandle, TransitionRoutes } from '../../components/PageOutlet';
import { CursorsHome, type CursorsHomeHandle } from './CursorsHome';
import { ScrollIndicator, SectionHome, Tutorial, type ScrollIndicatorHandle, type SectionHomeHandle, type TutorialHandle } from './HomeParts';
import { ScrollContainerHome, type ScrollContainerHomeHandle } from './ScrollContainerHome';

const HOME_LOGOS = ['pillar-one', 'pillar-two', 'pillar-three', 'pillar-four', 'pillar-five'];
const INTERACTION_SOUNDS = ['audio-interaction-a', 'audio-interaction-c', 'audio-interaction-d', 'audio-interaction-e', 'audio-interaction-f', 'audio-interaction-g'];

export function homeData() {
  const home = content.home.en;
  return {
    title: home.summary,
    interaction_indication: home.interaction,
    end_screen: home.endScreen,
    interactions: home.statements.map((text, index) => ({ text, logo: HOME_LOGOS[index % HOME_LOGOS.length] }))
  };
}

/** Ported from the original Home page (scope 3f930b6d). */
export const HomePage = forwardRef<PageHandle, { params: Record<string, string> }>(function HomePage(_props, ref) {
  const { gsap, audio, engine, store, require } = useLegacy();
  const isMenuOpen = useGetter<boolean>('menu/isOpen');
  const data = useRef(homeData()).current;
  const el = useRef<HTMLDivElement>(null);
  const cursors = useRef<CursorsHomeHandle>(null);
  const tutorial = useRef<TutorialHandle>(null);
  const scrollContainer = useRef<ScrollContainerHomeHandle>(null);
  const sectionHome = useRef<SectionHomeHandle>(null);
  const scrollIndicator = useRef<ScrollIndicatorHandle>(null);
  const buttonMenu = useRef<ButtonMenuHandle>(null);
  const s = useRef({
    webglStateIndex: 0,
    isClickAllowed: true,
    interactionSoundsIndex: 0,
    clickInteractionTimeout: 0 as any,
    debounceTimeout: 0 as any,
    timelineClickInteractionTimeout: null as any,
    tutorialsSecondShowDelayedCall: null as any
  }).current;

  useEffect(() => {
    const offset = Math.round(1000 * Math.random());
    s.interactionSoundsIndex = offset % INTERACTION_SOUNDS.length;
    return () => {
      clearTimeout(s.clickInteractionTimeout);
      clearTimeout(s.debounceTimeout);
      s.tutorialsSecondShowDelayedCall?.kill();
      s.timelineClickInteractionTimeout?.kill();
    };
  }, [s]);

  useGetterEffect('webgl/activeLandscape', () => { s.webglStateIndex = 0; });
  useGetterEffect('webgl/isTheEndShowStarted', (started: boolean) => {
    if (started && tutorial.current?.el) gsap.to(tutorial.current.el, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
  });
  useEffect(() => {
    if (el.current) el.current.style.cursor = isMenuOpen ? 'auto' : 'pointer';
  }, [isMenuOpen]);

  const showArrow = () => {
    const timeline = new gsap.timeline();
    if (scrollIndicator.current) timeline.add(scrollIndicator.current.show(), 1);
    return timeline;
  };
  const hideArrow = () => {
    const timeline = new gsap.timeline();
    if (scrollIndicator.current) timeline.add(scrollIndicator.current.hide(), 0);
    return timeline;
  };
  const waitForClickInteraction = () => {
    if (store.getters['home/isClickInteractionTriggered']) return;
    s.clickInteractionTimeout = setTimeout(() => {
      if (store.getters['home/isClickInteractionTriggered']) return;
      s.timelineClickInteractionTimeout = new gsap.timeline();
      if (tutorial.current) s.timelineClickInteractionTimeout.add(tutorial.current.show(), 0);
    }, 0);
  };

  useImperativeHandle(ref, () => ({
    transitionIn(done: (() => void) | null, routes: TransitionRoutes) {
      const timeline = new gsap.timeline({ onComplete: done ?? undefined });
      if (routes.isLangSwitch) {
        if (store.getters['home/isMenuTriggeredWithScrollTriggered']) scrollContainer.current?.animateIn();
      } else timeline.call(() => engine().viewManager.show('Home'), null, 0);
      timeline.add(showArrow(), 0);
      if (cursors.current) timeline.add(cursors.current.transitionIn(), 0);
      if (buttonMenu.current) timeline.add(buttonMenu.current.transitionIn(), 0);
      timeline.call(waitForClickInteraction, null, routes.previous ? 2 : 0);
    },
    transitionOut(done: () => void, routes: TransitionRoutes) {
      s.tutorialsSecondShowDelayedCall?.kill();
      const timeline = new gsap.timeline({ onComplete: done });
      timeline.add(hideArrow(), 0);
      timeline.add(sectionHome.current!.transitionOut(), 0);
      timeline.add(buttonMenu.current!.transitionOut(), 0);
      timeline.to(engine().landscapeManager.active.camera, { duration: 1.5, scrollProgress: 0, ease: 'sine.inOut' }, 0);
      timeline.add(cursors.current!.transitionOut(), 0);
      timeline.add(tutorial.current!.hide(), 0);
      if (!routes.isLangSwitch) timeline.call(() => engine().viewManager.hide('Home'), null, 0.3);
    }
  }));

  const clickHandler = () => {
    if (isMenuOpen || scrollContainer.current?.isFreeScroll || !store.getters['webgl/isLandscapeTransitioningNone'] || !s.isClickAllowed) return;
    s.isClickAllowed = false;
    clearTimeout(s.debounceTimeout);
    s.debounceTimeout = setTimeout(() => { s.isClickAllowed = true; }, 3000);
    const modulo = require(175).a.modulo;
    s.webglStateIndex = modulo(s.webglStateIndex + 1, 3);
    engine().landscapeManager.active.setState(s.webglStateIndex);
    cursors.current?.clickHandler();
    s.interactionSoundsIndex = (s.interactionSoundsIndex + 1) % INTERACTION_SOUNDS.length;
    audio.playLandscapeEffect(INTERACTION_SOUNDS[s.interactionSoundsIndex]);
    clearTimeout(s.clickInteractionTimeout);
    if (s.tutorialsSecondShowDelayedCall) {
      s.tutorialsSecondShowDelayedCall.kill();
      tutorial.current?.hide();
    }
    if (!store.getters['home/isClickInteractionTriggered']) {
      store.dispatch('home/setClickInteractionTriggered', true);
      s.timelineClickInteractionTimeout?.kill();
      tutorial.current?.hide();
      s.tutorialsSecondShowDelayedCall = gsap.delayedCall(7, () => { tutorial.current?.show(); });
    }
  };

  const parentRefs = { sectionHome, scrollIndicator, cursors, tutorial, showArrow, hideArrow };
  return (
    <div ref={el} className="page home" {...sv('3f930b6d', '6d28008c')}>
      <CursorsHome ref={cursors} data={data.interactions} scope="3f930b6d" />
      <Tutorial ref={tutorial} data={data.interaction_indication} scope="3f930b6d" />
      <ScrollContainerHome ref={scrollContainer} parent={parentRefs} scope="3f930b6d">
        <SectionHome ref={sectionHome} title={data.title} endScreen={data.end_screen} scope="3f930b6d" onClick={clickHandler} />
      </ScrollContainerHome>
      <ScrollIndicator ref={scrollIndicator} scope="3f930b6d" onClick={() => scrollContainer.current?.scrollIndicatorClickHandler()} />
      <ButtonMenu ref={buttonMenu} scope="3f930b6d" />
    </div>
  );
});
