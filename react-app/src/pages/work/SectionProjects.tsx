import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localeCopy, sv, useLegacy, useWatch } from '../../runtime/context';
import type { TransitionRoutes } from '../../components/PageOutlet';
import { ProjectSlider, type ProjectSliderHandle } from './ProjectSlider';
import { projects as allProjects, tags as allTags, type Tag } from './workData';

export interface SectionProjectsHandle {
  el: HTMLDivElement | null;
  transitionIn: (routes?: TransitionRoutes | null) => any;
  transitionOut: (routes?: TransitionRoutes | null) => any;
  enableClick: () => void;
  disableClick: () => void;
}

/** Ported from the original SectionProjects component (scope 453c53fc): slider + category filters. */
export const SectionProjects = forwardRef<SectionProjectsHandle, { initialTag: string; scope: string }>(function SectionProjects({ initialTag, scope }, ref) {
  const { gsap, windowObserver, require } = useLegacy();
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState(initialTag);
  // The slider is swapped out-in (fade) when the active tag changes, like the original <transition>.
  const [displayedTag, setDisplayedTag] = useState(initialTag);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [filterButtonLabel, setFilterButtonLabel] = useState(localeCopy.work.filterLabel);
  const el = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);
  const buttonFilter = useRef<HTMLButtonElement>(null);
  const buttonFilterIcon = useRef<HTMLSpanElement>(null);
  const formFilters = useRef<HTMLFormElement>(null);
  const inputContainers = useRef<HTMLDivElement[]>([]);
  const slider = useRef<ProjectSliderHandle>(null);
  const s = useRef({ isSectionVisible: true, isSectionActive: true, timelineShowFilters: null as any, timelineHideFilters: null as any, activeTagIndex: 0 }).current;

  const tags: Tag[] = useMemo(() => {
    const all: Tag = { uid: '', data: { tag_name: 'All' } };
    const used = allTags.filter((tag) => allProjects.some((entry) => entry.project.data.tags.map((t) => t.tag.uid).includes(tag.uid)));
    return [all, ...used];
  }, []);
  const filteredProjects = useMemo(() => allProjects.filter((entry) => displayedTag === '' || entry.project.data.tags.map((t) => t.tag.uid).includes(displayedTag)), [displayedTag]);
  const gridOffset = useMemo(() => {
    const index = tags.findIndex((tag) => tag.uid === displayedTag);
    s.activeTagIndex = index < 0 ? 0 : index;
    if (s.activeTagIndex === 0) return 0;
    const seedrandom = require(634);
    const random = (seedrandom.default ?? seedrandom)(99 * s.activeTagIndex);
    return Math.round(6 * random());
  }, [displayedTag, tags, require, s]);

  // out-in swap of the slider on tag change
  const latestTag = useRef(activeTag);
  useWatch(activeTag, (tag) => {
    latestTag.current = tag;
    // like <transition mode="out-in">, only the latest requested tag is mounted once the leave finishes
    const timeline = new gsap.timeline({ onComplete: () => { if (latestTag.current === tag) setDisplayedTag(tag); } });
    if (slider.current) timeline.add(slider.current.transitionOut());
  });
  const mountedTag = useRef(initialTag);
  useEffect(() => {
    if (mountedTag.current === displayedTag) return;
    mountedTag.current = displayedTag;
    new gsap.timeline().add(slider.current?.transitionIn());
  }, [displayedTag, gsap]);

  // Filters open/close animation (watch isFilterOpen)
  useWatch(isFilterOpen, (open) => {
    if (open) {
      s.timelineHideFilters?.kill();
      s.timelineShowFilters = new gsap.timeline();
      s.timelineShowFilters.to(buttonFilter.current, { autoAlpha: 0 }, 0);
      s.timelineShowFilters.call(() => setFilterButtonLabel(localeCopy.work.closeFilterLabel), null);
      s.timelineShowFilters.set(buttonFilterIcon.current, { rotation: '90deg' });
      s.timelineShowFilters.to(buttonFilter.current, { autoAlpha: 1 });
      s.timelineShowFilters.set(formFilters.current, { autoAlpha: 1 }, 0);
      s.timelineShowFilters.to(inputContainers.current, { duration: 1.5, stagger: 0.1, alpha: 1, ease: 'sine.inOut' }, 0);
    } else {
      s.timelineShowFilters?.kill();
      s.timelineHideFilters = new gsap.timeline();
      s.timelineHideFilters.to(buttonFilter.current, { autoAlpha: 0 }, 0);
      s.timelineHideFilters.call(() => setFilterButtonLabel(localeCopy.work.filterLabel), null);
      s.timelineHideFilters.set(buttonFilterIcon.current, { rotation: '0deg' });
      s.timelineHideFilters.to(buttonFilter.current, { autoAlpha: 1 });
      s.timelineHideFilters.to(inputContainers.current, { duration: 1.5, stagger: -0.1, alpha: 0, ease: 'sine.inOut' }, 0);
      s.timelineHideFilters.set(formFilters.current, { autoAlpha: 0 });
    }
  });

  // Scroll: hide/deactivate the section as the project detail scrolls in.
  useEffect(() => {
    const scroll = require(129).a;
    const handler = (event: { position: number }) => {
      const visible = !(event.position > windowObserver.height * 0.1 || event.position < 0.05 * -windowObserver.height);
      if (visible !== s.isSectionVisible) {
        s.isSectionVisible = visible;
        gsap.killTweensOf(header.current);
        if (visible) {
          gsap.to(header.current, { duration: 0.3, alpha: 1, ease: 'sine.out' });
          slider.current?.activate();
        } else {
          gsap.to(header.current, { duration: 0.3, alpha: 0, ease: 'sine.out' });
          setFilterOpen(false);
          slider.current?.deactivate();
        }
      }
      const active = !(event.position > windowObserver.height * 0.8);
      if (active !== s.isSectionActive) {
        s.isSectionActive = active;
        if (slider.current?.el) slider.current.el.style.pointerEvents = active ? 'all' : 'none';
      }
    };
    scroll.addEventListener('scroll', handler);
    return () => scroll.removeEventListener('scroll', handler);
  }, [gsap, windowObserver, require, s]);

  useImperativeHandle(ref, () => ({
    get el() { return el.current; },
    transitionIn(routes) {
      const name = routes?.current ? String(routes.current.name).split('___')[0] : null;
      const timeline = new gsap.timeline();
      if (name !== 'work-slug') timeline.to(header.current, { duration: 1, alpha: 1, ease: 'sine.inOut' }, 1.5);
      timeline.add(slider.current?.transitionIn(routes), 0);
      return timeline;
    },
    transitionOut(routes) {
      const timeline = new gsap.timeline();
      timeline.to(header.current, { duration: 0.4, alpha: 0, ease: 'sine.inOut' });
      timeline.add(slider.current?.transitionOut(routes), 0);
      return timeline;
    },
    enableClick: () => slider.current?.enableClick(),
    disableClick: () => slider.current?.disableClick()
  }));

  const filterInputHandler = (uid: string) => {
    setActiveTag(uid);
    navigate({ pathname: '/work', search: uid ? `?tag=${uid}` : '' });
    setFilterOpen(false);
  };

  const attrs = sv('453c53fc');
  return (
    <div ref={el} className="section-projects" {...sv('453c53fc', scope)}>
      <div className="container" {...attrs}>
        {filteredProjects.length > 0 && (
          <ProjectSlider key={displayedTag} ref={slider} projects={filteredProjects} isFiltersOpen={isFilterOpen} gridOffset={gridOffset} scope="453c53fc" containerRef={el} />
        )}
        <div ref={header} className="header" {...attrs}>
          <button ref={buttonFilter} className="button button-filter" {...attrs} onClick={() => setFilterOpen((open) => !open)}>
            {filterButtonLabel}
            <span ref={buttonFilterIcon} className="button-filter-icon" {...attrs} />
          </button>
          <form ref={formFilters} className="form-filters" {...attrs} onSubmit={(event) => event.preventDefault()}>
            {tags.map((tag, i) => (
              <div key={i} className="input-container" {...attrs} ref={(node) => { if (node) inputContainers.current[i] = node; }}>
                <input
                  id={tag.uid}
                  type="radio"
                  name="category"
                  disabled={!isFilterOpen}
                  value={tag.uid}
                  checked={activeTag === tag.uid}
                  className="tag-input"
                  {...attrs}
                  onChange={() => filterInputHandler(tag.uid)}
                />
                <label htmlFor={tag.uid} className="tag-label" {...attrs}>{tag.data.tag_name}</label>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
});
