import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { sv, useGetter, useLegacy, useWatch } from '../../runtime/context';
import type { TransitionRoutes } from '../../components/PageOutlet';
import type { ProjectEntry } from './workData';

const SIZES: Record<string, number> = { small: 400, medium: 500, large: 700 };
const SLIDES_PER_CONFIG = 8;

interface BlockConfig { width: string; aspectRatio: number; speed: number; order: number; data?: any; uid?: string }
interface SlideConfig { width: string; blocks: BlockConfig[] }

/** Original slide layout pattern (widths/aspect ratios per column), repeated for every 8 projects. */
const CONFIG: SlideConfig[] = [
  { width: '30%', blocks: [{ width: '100%', aspectRatio: 1, speed: 0.98, order: 1 }] },
  { width: '35%', blocks: [{ width: '100%', aspectRatio: 0.69, speed: 0.99, order: 0 }, { width: '80%', aspectRatio: 9 / 16, speed: 0.92, order: 1 }] },
  { width: '35%', blocks: [{ width: '100%', aspectRatio: 1, speed: 1.07, order: 0 }] },
  { width: '30%', blocks: [{ width: '100%', aspectRatio: 9 / 16, speed: 0.94, order: -1 }, { width: '90%', aspectRatio: 1, speed: 0.98, order: 0 }] },
  { width: '40%', blocks: [{ width: '100%', aspectRatio: 9 / 16, speed: 1.1, order: 1 }] },
  { width: '30%', blocks: [{ width: '100%', aspectRatio: 1, speed: 1.04, order: 2 }] }
];

export function buildSlides(projects: ProjectEntry[], gridOffset: number): SlideConfig[] {
  let config: SlideConfig[] = [];
  for (let n = 0; n < projects.length; n += SLIDES_PER_CONFIG) config = config.concat(CONFIG);
  const clone: SlideConfig[] = JSON.parse(JSON.stringify(config));
  const slides: SlideConfig[] = [];
  let r = 0;
  for (let i = gridOffset; i < gridOffset + clone.length; i++) {
    const slide = clone[i % clone.length];
    const blocks = clone[i % clone.length].blocks;
    slide.blocks = [];
    for (const block of blocks) {
      const entry = projects[r];
      if (entry) {
        block.data = entry.project.data;
        block.uid = entry.project.uid;
        slide.blocks.push(block);
        r++;
      }
    }
    if (slide.blocks.length !== 0) slides.push(slide);
  }
  return slides;
}

export interface ProjectSliderHandle {
  el: HTMLDivElement | null;
  transitionIn: (routes?: TransitionRoutes | null) => any;
  transitionOut: (routes?: TransitionRoutes | null) => any;
  activate: () => void;
  deactivate: () => void;
  enableClick: () => void;
  disableClick: () => void;
  update: () => void;
}

interface Props {
  projects: ProjectEntry[];
  isFiltersOpen: boolean;
  gridOffset: number;
  scope: string;
  containerRef: React.RefObject<HTMLElement | null>;
}

/** Ported from the original ProjectSlider (scope 3f494be0) + ProjectSlide (scope 1a3969dc). */
export const ProjectSlider = forwardRef<ProjectSliderHandle, Props>(function ProjectSlider({ projects, isFiltersOpen, gridOffset, scope, containerRef }, ref) {
  const { gsap, math, windowObserver, store, root, engine, require } = useLegacy();
  const navigate = useNavigate();
  const breakpoint = useGetter<string>('device/breakpoint');
  const isTouch = useGetter<boolean>('device/isTouch');
  const isMenuOpen = useGetter<boolean>('menu/isOpen');
  const el = useRef<HTMLDivElement>(null);
  const touchContainer = useRef<HTMLDivElement>(null);
  const slideContainers = useRef<HTMLDivElement[]>([]);
  const slideEls = useRef<HTMLDivElement[]>([]);
  const progressContainer = useRef<HTMLDivElement>(null);
  const progressLine = useRef<HTMLDivElement>(null);
  const progressCursor = useRef<HTMLDivElement>(null);
  const slides = useMemo(() => buildSlides(projects, gridOffset), [projects, gridOffset]);
  const s = useRef({
    isClickEnable: true,
    isActive: true,
    isReady: false,
    isHoveringProgressBar: false,
    isDraggingProgressBar: false,
    isHoveringSlider: true,
    isDraggable: true,
    damping: 0.15,
    cursorDamping: 0.2,
    position: { current: 0, target: 0 },
    progress: { current: 0, target: 0 },
    cursor: { position: { current: { x: 0, y: 0 }, target: { x: 0, y: 0 } } },
    blocks: [] as any[],
    width: 0, height: 0,
    bounds: null as DOMRect | null,
    progressContainerBounds: null as DOMRect | null,
    progressCursorBounds: null as DOMRect | null,
    slidesBounds: [] as DOMRect[],
    blockBounds: [] as DOMRect[],
    dragWidth: 0,
    slidePadding: 0,
    minPosition: 0,
    maxPosition: 0,
    webglSlider: null as any,
    throwTween: null as any,
    dragManager: null as any,
    progressDragManager: null as any,
    resizeTimeout: 0 as any,
    lastCursorVisible: false
  }).current;

  const isWebGLViewAvailable = () => store.state.webgl.views.work.isAvailable;
  const isCursorVisible = () => s.isActive && s.isHoveringSlider && !s.isDraggingProgressBar && !s.isHoveringProgressBar && store.getters['mouse/hasMoved'];
  const cursorWork = () => root.cursorWork as any;

  const scaleAndTranslate = (target: HTMLElement, scale: number, x: number, y: number) => {
    const matrix = `matrix3d(${scale},0,0.00,0,0.00,${scale},0.00,0,0,0,1,0,${x},${y},0,1)`;
    target.style.transform = matrix;
    (target.style as any).webkitTransform = matrix;
  };
  const getBlocks = () => {
    s.blocks = [];
    slideEls.current.forEach((slideEl, i) => {
      const blockEls = Array.from(slideEl.querySelectorAll<HTMLElement>(':scope > .block'));
      const slide = slides[i];
      blockEls.forEach((blockEl, n) => {
        const config = slide.blocks[n];
        s.blocks.push({
          el: blockEl,
          url: `/work/${config.uid}`,
          data: config.data,
          speed: 1,
          order: config.order,
          wrapper: blockEl.querySelector('.wrapper'),
          image: blockEl.querySelector('img'),
          isInView: false
        });
      });
    });
  };
  const getBounds = () => {
    s.width = windowObserver.width;
    s.height = windowObserver.height;
    s.bounds = el.current!.getBoundingClientRect();
    s.progressContainerBounds = progressContainer.current!.getBoundingClientRect();
    s.progressCursorBounds = progressCursor.current!.getBoundingClientRect();
    s.slidesBounds = [];
    s.dragWidth = 0;
    s.slidePadding = 0;
    slideContainers.current.forEach((container, i) => {
      const bounds = container.getBoundingClientRect();
      s.dragWidth += bounds.width;
      s.slidesBounds.push(bounds);
      if (!s.slidePadding) s.slidePadding = bounds.width - slideEls.current[i].getBoundingClientRect().width;
    });
    s.blockBounds = [];
    for (const block of s.blocks) {
      block.bounds = block.el.getBoundingClientRect();
      s.blockBounds.push(block.bounds);
    }
    s.minPosition = -s.dragWidth + s.width / 2 + s.blockBounds[s.blockBounds.length - 1].width / 2 + s.slidePadding / 2;
    s.maxPosition = s.width / 2 - s.blockBounds[0].width / 2 - s.slidePadding / 2;
  };
  const resetBlocks = () => {
    for (const block of s.blocks) {
      block.el.style.transform = 'none';
      block.image.style.transform = 'none';
      block.wrapper.classList.remove('is-in-view');
      block.isInView = false;
    }
  };
  const setupWebGLSlider = () => {
    s.webglSlider = engine().viewManager.active.ui.createSlider({ blocks: s.blocks, container: containerRef.current });
    s.webglSlider.enableClick();
  };
  const throwSlider = () => {
    s.throwTween = gsap.to(s.position, {
      inertia: { duration: { max: 1 }, target: { min: s.minPosition, max: s.maxPosition } },
      modifiers: { target: (value: number) => math.clamp(value, s.minPosition, s.maxPosition) }
    });
  };
  const setDragState = (value: boolean) => cursorWork()?.setDragState(value);
  const updateBlockPositionWithDoubleParallax = (i: number) => {
    const block = s.blocks[i];
    const bounds = s.blockBounds[i];
    const x = bounds.x;
    const offset = s.width * block.speed - s.width + s.position.current * block.speed;
    const left = x + offset;
    const parallax = -((left + bounds.width) / (s.width + bounds.width) - 0.5) * bounds.width * 0.25;
    scaleAndTranslate(block.el, 1, offset, 0);
    scaleAndTranslate(block.image, 1.25, parallax, 0);
    if (left > -bounds.width && left < s.width) {
      if (block.isInView) return;
      block.isInView = true;
      block.el.classList.add('is-in-view');
      gsap.to(block.wrapper, { duration: 2, alpha: 1, ease: 'sine.out' });
    } else {
      if (!block.isInView) return;
      block.isInView = false;
      block.el.classList.remove('is-in-view');
      gsap.to(block.wrapper, { duration: 2, alpha: 0, ease: 'sine.out' });
    }
  };
  void updateBlockPositionWithDoubleParallax;

  useEffect(() => {
    const InertiaPlugin = require(205).a;
    const DragManager = require(149).a;
    s.isDraggable = true;
    s.damping = isTouch ? 1 : 0.15;
    s.cursorDamping = 0.2;
    s.position = { current: 0, target: 0 };
    s.progress = { current: 0, target: 0 };
    const initial = store.getters['mouse/position'];
    const start = { x: initial.x === 0 ? windowObserver.width / 2 : initial.x, y: initial.y === 0 ? windowObserver.height / 2 : initial.y };
    s.cursor = { position: { current: { x: start.x, y: start.y }, target: { x: start.x, y: start.y } } };
    InertiaPlugin.track(s.position, 'target');
    getBlocks();
    getBounds();
    s.dragManager = new DragManager({ el: touchContainer.current });
    s.progressDragManager = new DragManager({ el: progressContainer.current });

    const dragstartHandler = (event: any) => {
      if (!s.isDraggable) return;
      s.throwTween?.kill();
      s.position.target -= event.delta.x;
      s.position.target = math.clamp(s.position.target, s.minPosition, s.maxPosition);
      setDragState(true);
    };
    const dragHandler = (event: any) => {
      if (!s.isDraggable) return;
      s.position.target -= event.delta.x;
      s.position.target = math.clamp(s.position.target, s.minPosition, s.maxPosition);
    };
    const dragendHandler = () => {
      if (!s.isDraggable) return;
      throwSlider();
      setDragState(false);
    };
    const tapHandler = (event: any) => s.webglSlider?.clickHandler({ position: event.position });
    const progressPosition = (event: any) => ((event.position.x - s.progressContainerBounds!.x) / s.progressContainerBounds!.width) * (s.minPosition - s.maxPosition) + s.maxPosition;
    const progressDragstartHandler = (event: any) => {
      s.throwTween?.kill();
      s.isDraggingProgressBar = true;
      s.position.target = math.clamp(progressPosition(event), s.minPosition, s.maxPosition);
      setDragState(true);
    };
    const progressDragHandler = (event: any) => {
      s.position.target = math.clamp(progressPosition(event), s.minPosition, s.maxPosition);
    };
    const progressDragendHandler = () => {
      s.isDraggingProgressBar = false;
      setDragState(false);
    };
    const mousemoveHandler = (event: MouseEvent) => {
      s.cursor.position.target.x = event.clientX;
      s.cursor.position.target.y = event.clientY;
    };
    const tick = () => {
      // updateCursorPosition
      s.cursor.position.current.x = math.lerp(s.cursor.position.current.x, s.cursor.position.target.x, s.cursorDamping);
      s.cursor.position.current.y = math.lerp(s.cursor.position.current.y, s.cursor.position.target.y, s.cursorDamping);
      cursorWork()?.move(s.cursor.position.current.x - s.width / 2, s.cursor.position.current.y - s.height / 2);
      // updatePosition
      s.position.current = math.lerp(s.position.current, s.position.target, s.damping);
      // updateProgress
      s.progress.target = (s.position.target - s.maxPosition) / (s.minPosition - s.maxPosition);
      s.progress.current = (s.position.current - s.maxPosition) / (s.minPosition - s.maxPosition);
      if (s.progressContainerBounds && s.progressCursorBounds && progressLine.current && progressCursor.current) {
        const scale = math.clamp(s.progress.current, 0, 1 - s.progressCursorBounds.width / s.progressContainerBounds.width);
        progressLine.current.style.transform = `scaleX(${scale})`;
        const x = math.clamp(s.progressContainerBounds.width * s.progress.current, 0, s.progressContainerBounds.width - s.progressCursorBounds.width);
        progressCursor.current.style.transform = `translate3d(${x}px, 0.5px, 0)`;
      }
      // updateWebGLSlider
      if (s.webglSlider) s.webglSlider.sliderPosition = s.position.current;
      // isCursorVisible watcher
      const visible = Boolean(isCursorVisible());
      if (visible !== s.lastCursorVisible) {
        s.lastCursorVisible = visible;
        if (s.isReady) {
          if (visible) cursorWork()?.show();
          else cursorWork()?.hide();
        }
      }
    };
    const resizeHandler = () => {
      const width = windowObserver.width;
      const height = windowObserver.height;
      resetBlocks();
      clearTimeout(s.resizeTimeout);
      s.resizeTimeout = setTimeout(() => {
        getBounds();
        s.webglSlider?.resizeSlides({ blocks: s.blocks, width, height });
        throwSlider();
      }, 100);
    };

    s.dragManager.addEventListener('dragstart', dragstartHandler);
    s.dragManager.addEventListener('drag', dragHandler);
    s.dragManager.addEventListener('dragend', dragendHandler);
    s.dragManager.addEventListener('tap', tapHandler);
    s.progressDragManager.addEventListener('dragstart', progressDragstartHandler);
    s.progressDragManager.addEventListener('drag', progressDragHandler);
    s.progressDragManager.addEventListener('dragend', progressDragendHandler);
    window.addEventListener('mousemove', mousemoveHandler);
    gsap.ticker.add(tick);
    windowObserver.addEventListener('resize', resizeHandler);

    if (!s.isDraggable) {
      s.dragManager.dispose();
      s.progressDragManager.dispose();
    }
    if (s.blocks.length < 3 && breakpoint !== 'small') {
      s.position.target = s.maxPosition;
      s.position.current = s.maxPosition;
    }
    if (s.blocks.length === 3 && breakpoint !== 'small') {
      s.position.target = s.width / 2 - s.blockBounds[0].width - s.slidePadding;
      s.position.current = s.position.target;
      s.isDraggable = false;
    }
    if (isWebGLViewAvailable()) setupWebGLSlider();
    const unwatch = store.watch((state: any) => state.webgl.views.work.isAvailable, (available: boolean) => { if (available) setupWebGLSlider(); });

    return () => {
      unwatch();
      // a slider unmounted while still shown (never transitioned out) must not leave its slides in the scene
      // (skip when the engine already destroyed it, e.g. viewManager.hide('Work') — slides are null then)
      if (s.isReady && s.webglSlider && s.webglSlider.slides) { s.isReady = false; s.webglSlider.hide(); }
      s.dragManager.dispose();
      s.progressDragManager.dispose();
      gsap.ticker.remove(tick);
      windowObserver.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mousemove', mousemoveHandler);
      clearTimeout(s.resizeTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useWatch(isFiltersOpen, (open) => {
    if (open) s.webglSlider?.fadeLeft();
    else s.webglSlider?.removefadeLeft();
  });
  useWatch(isMenuOpen, (open) => {
    if (!el.current) return;
    if (open) {
      el.current.style.pointerEvents = 'none';
      new gsap.timeline().add(s.webglSlider?.hide(false), 0);
    } else {
      el.current.style.pointerEvents = 'all';
      new gsap.timeline().add(s.webglSlider?.show(), 1);
    }
  });

  useImperativeHandle(ref, () => ({
    get el() { return el.current; },
    transitionIn(routes) {
      const name = routes?.current ? String(routes.current.name).split('___')[0] : null;
      const timeline = new gsap.timeline();
      if (s.isDraggable && name !== 'work-slug') timeline.to(progressContainer.current, { duration: 1, alpha: 1, ease: 'sine.inOut' }, 1.5);
      if (isCursorVisible() && name !== 'work-slug') timeline.add(cursorWork()?.show(), 1.5);
      timeline.call(() => { s.isReady = true; }, null);
      return timeline;
    },
    transitionOut() {
      const timeline = new gsap.timeline();
      timeline.call(() => { s.isReady = false; }, null, 0);
      timeline.to(progressContainer.current, { duration: 0.5, alpha: 0, ease: 'sine.out' }, 0);
      if (s.webglSlider) timeline.add(s.webglSlider.hide(), 0);
      return timeline;
    },
    activate() {
      gsap.killTweensOf(progressContainer.current);
      if (s.isReady) gsap.to(progressContainer.current, { duration: 0.7, alpha: 1, ease: 'sine.inOut' });
      s.isActive = true;
    },
    deactivate() {
      gsap.killTweensOf(progressContainer.current);
      gsap.to(progressContainer.current, { duration: 0.3, alpha: 0 });
      cursorWork()?.hide();
      s.isActive = false;
    },
    enableClick() {
      s.isClickEnable = true;
      s.webglSlider?.enableClick();
    },
    disableClick() {
      s.isClickEnable = false;
      s.webglSlider?.disableClick();
    },
    update: () => setupWebGLSlider()
  }));

  const attrs = sv('3f494be0');
  const slideAttrs = sv('1a3969dc');
  return (
    <div
      ref={el}
      className="project-slider"
      {...sv('3f494be0', scope, scope)}
      onMouseEnter={() => { s.isHoveringSlider = true; }}
      onMouseLeave={() => { s.isHoveringSlider = false; }}
    >
      <div ref={touchContainer} className="touch-container" {...attrs}>
        <div className="slides-container" {...attrs}>
          {slides.map((slide, r) => (
            <div key={r} className="slide-container" style={{ width: breakpoint === 'large' ? slide.width : '80%' }} {...attrs} ref={(node) => { if (node) slideContainers.current[r] = node; }}>
              <div className="project-slide" {...sv('1a3969dc', '3f494be0')} ref={(node) => { if (node) slideEls.current[r] = node; }}>
                {slide.blocks.map((block, b) => (
                  <div key={b} className="block" style={{ width: block.width }} data-uid={block.uid} {...slideAttrs}>
                    <div className="wrapper" style={{ paddingTop: `${100 * block.aspectRatio}%` }} {...slideAttrs}>
                      <img className="image" src={`${block.data.main_image.url}&w=${SIZES[breakpoint] ?? 700}`} alt="" {...slideAttrs} />
                      <span {...slideAttrs}>{SIZES[breakpoint] ?? 700}</span>
                    </div>
                    <a
                      href={`/work/${block.uid}`}
                      className="button"
                      {...slideAttrs}
                      onClick={(event) => {
                        event.preventDefault();
                        if (s.isClickEnable) navigate(`/work/${block.uid}`);
                      }}
                    >
                      <div className="name-container" {...slideAttrs}>
                        <div className="name js-name" {...slideAttrs}>{block.data.name}</div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        ref={progressContainer}
        className="progress-container"
        {...attrs}
        onMouseEnter={() => { s.isHoveringProgressBar = true; }}
        onMouseLeave={() => { s.isHoveringProgressBar = false; }}
      >
        <div ref={progressLine} className="progress-line" {...attrs} />
        <div ref={progressCursor} className="progress-cursor" {...attrs} />
      </div>
    </div>
  );
});
