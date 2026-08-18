import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { localeCopy, sv, useGetter, useLegacy, useWatch } from '../../runtime/context';
import { ScrollContainer } from '../../components/ScrollContainer';
import { ButtonHome, type ButtonHomeHandle } from '../../components/ButtonHome';
import { ButtonMenu, type ButtonMenuHandle } from '../../components/ButtonMenu';
import type { PageHandle, TransitionRoutes } from '../../components/PageOutlet';
import { CursorWork, type CursorWorkHandle } from './CursorWork';
import { SectionProjects, type SectionProjectsHandle } from './SectionProjects';
import { ProjectPage, type ProjectChildHandle } from './ProjectPage';
import { findProject } from './workData';

/** Work index child (scope bba5609a): empty overview that refreshes the smooth scroll. */
function WorkOverview() {
  const { root } = useLegacy();
  useEffect(() => { (root as any).updateScroll?.(); }, [root]);
  return <div className="work-overview" {...sv('bba5609a', '3bfbd569', '3bfbd569')} />;
}

/**
 * Work layout (scope 3bfbd569): hosts the project slider and, nested inside
 * its scroll container, either the empty overview or a project detail page.
 */
export const WorkLayout = forwardRef<PageHandle, { params: Record<string, string> }>(function WorkLayout({ params }, ref) {
  const { gsap, audio, engine, store, root } = useLegacy();
  const location = useLocation();
  const isMenuOpen = useGetter<boolean>('menu/isOpen');
  const el = useRef<HTMLDivElement>(null);
  const cursor = useRef<CursorWorkHandle>(null);
  const pageTitle = useRef<HTMLDivElement>(null);
  const buttonHome = useRef<ButtonHomeHandle>(null);
  const buttonMenu = useRef<ButtonMenuHandle>(null);
  const sectionProjects = useRef<SectionProjectsHandle>(null);
  const child = useRef<ProjectChildHandle>(null);
  const childEl = useRef<HTMLDivElement>(null);
  const [displayedSlug, setDisplayedSlug] = useState<string | null>(params.slug ?? null);
  const leaving = useRef(false);
  const pendingSlug = useRef<string | null | undefined>(undefined);
  const initialTag = new URLSearchParams(location.search).get('tag') || '';

  useEffect(() => {
    root.cursorWork = cursor.current;
    return () => { root.cursorWork = null; };
  }, [root]);

  const routesSnapshot = (): TransitionRoutes => ({ previous: store.state.router.previous, current: store.state.router.current, isLangSwitch: false });

  // Nested child transitions (enterWork / leaveWork with mode out-in).
  const targetSlug = params.slug ?? null;
  useEffect(() => {
    if (targetSlug === displayedSlug && pendingSlug.current === undefined) return;
    if (leaving.current) {
      pendingSlug.current = targetSlug;
      return;
    }
    const swap = () => {
      leaving.current = false;
      const next = pendingSlug.current !== undefined ? pendingSlug.current : targetSlug;
      pendingSlug.current = undefined;
      setDisplayedSlug(next);
    };
    if (displayedSlug && child.current) {
      leaving.current = true;
      child.current.transitionOut(swap, routesSnapshot());
    } else swap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetSlug]);

  const mountedSlug = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (mountedSlug.current === displayedSlug) return;
    const first = mountedSlug.current === undefined;
    mountedSlug.current = displayedSlug;
    if (displayedSlug && child.current && store.getters['preloader/isCompleted'] && !first) {
      child.current.transitionIn(null, routesSnapshot());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedSlug]);

  useWatch(isMenuOpen, (open) => {
    if (open) {
      const timeline = new gsap.timeline();
      timeline.to(pageTitle.current, { duration: 1, alpha: 0, ease: 'sine.inOut' });
      timeline.add(buttonHome.current!.transitionOut(), 0);
      timeline.to(sectionProjects.current!.el, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
      if (childEl.current) timeline.to(childEl.current, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
    } else {
      const timeline = new gsap.timeline({ delay: 1 });
      timeline.to(pageTitle.current, { duration: 1.7, alpha: 1, ease: 'sine.inOut' }, 0);
      timeline.add(buttonHome.current!.menuIn(), 0);
      timeline.to(sectionProjects.current!.el, { duration: 1.7, alpha: 1, ease: 'sine.inOut' }, 0);
      if (childEl.current) timeline.to(childEl.current, { duration: 1.7, alpha: 1, ease: 'sine.inOut' }, 0);
    }
  });

  useImperativeHandle(ref, () => ({
    transitionIn(done, routes) {
      const timeline = new gsap.timeline({ onComplete: done ?? undefined });
      timeline.to(pageTitle.current, { duration: 1, alpha: 1, ease: 'sine.inOut' });
      timeline.to(audio, { duration: 2, lowPassFrequency: 1000 }, 0);
      timeline.add(buttonHome.current!.transitionIn(), 0);
      timeline.add(buttonMenu.current!.transitionIn(), 0);
      timeline.add(sectionProjects.current!.transitionIn(routes), 0);
      if (!routes.isLangSwitch) timeline.call(() => engine().viewManager.show('Work'), null, 0);
      timeline.call(() => { child.current?.transitionIn(null, routes); }, null, 0);
      timeline.call(() => { sectionProjects.current?.enableClick(); }, null);
    },
    transitionOut(done, routes) {
      const timeline = new gsap.timeline({ onComplete: done });
      child.current?.transitionOut(null, routes);
      timeline.to(pageTitle.current, { duration: 1, alpha: 0, ease: 'sine.inOut' });
      timeline.add(buttonHome.current!.transitionOut(), 0);
      timeline.add(buttonMenu.current!.transitionOut(), 0);
      timeline.add(sectionProjects.current!.transitionOut(routes), 0);
      timeline.add(cursor.current!.hide(), 0);
      if (!routes.isLangSwitch) timeline.call(() => engine().viewManager.hide('Work'), null);
    }
  }));

  const project = displayedSlug ? findProject(displayedSlug) : null;
  const layoutAttrs = sv('3bfbd569');
  return (
    <div ref={el} className="page work-overview-layout" {...sv('3bfbd569', '6d28008c')}>
      <CursorWork ref={cursor} scope="3bfbd569" />
      <ScrollContainer scope="3bfbd569">
        <div ref={pageTitle} className="page-title" {...sv('13d0e9d2', '3bfbd569')}>{localeCopy.routes.work.name}</div>
        <div ref={childEl} {...layoutAttrs} {...layoutAttrs}>
          {project ? <ProjectPage key={displayedSlug} ref={child} data={project} sectionProjects={sectionProjects} /> : <WorkOverview key="overview" />}
        </div>
        <ButtonHome ref={buttonHome} scope="3bfbd569" />
        <ButtonMenu ref={buttonMenu} scope="3bfbd569" />
      </ScrollContainer>
      <SectionProjects ref={sectionProjects} initialTag={initialTag} scope="3bfbd569" />
    </div>
  );
});
