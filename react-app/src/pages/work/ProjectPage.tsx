import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { localeCopy, sv, useGetter, useLegacy, useWatch } from '../../runtime/context';
import type { TransitionRoutes } from '../../components/PageOutlet';
import type { ProjectData } from './workData';

/* ---------- ImageWebGL (scope 2314c2b0) / ImageLazy (scope 8a0b5b46) ---------- */

interface ImageHandle {
  isInView: boolean;
  webglImage: any;
  transitionOut?: () => any;
}

interface ImageProps {
  source: string;
  width: number;
  height: number;
  alt: string;
  scope: string;
}

const placeholderFor = (width: number, height: number) =>
  `data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="transparent"/></svg>`;

const ImageWebGL = forwardRef<ImageHandle, ImageProps>(function ImageWebGL({ source, width, height, alt, scope }, ref) {
  const { gsap, windowObserver, store, engine, require } = useLegacy();
  const breakpoint = useGetter<string>('device/breakpoint');
  const el = useRef<HTMLDivElement>(null);
  const s = useRef({ isInView: false, webglImage: null as any, bounds: null as DOMRect | null }).current;
  const sizes: Record<string, number> = { small: 400, medium: 500, large: 1000 };

  useEffect(() => {
    const scroll = require(129).a;
    const getBounds = () => { s.bounds = el.current!.getBoundingClientRect(); };
    const createWebGLImage = () => {
      const ui = engine().viewManager.get('work').instance.ui;
      requestAnimationFrame(() => {
        if (!s.bounds) return;
        s.webglImage = ui.createImage({
          source: `${source}&w=${sizes[breakpoint] ?? 1000}`,
          width: s.bounds.width,
          height: s.bounds.height,
          position: { x: s.bounds.x, y: s.bounds.y + scroll.position }
        });
        if (s.isInView) s.webglImage.show();
      });
    };
    const observer = new IntersectionObserver((entries) => {
      if (!s.isInView && entries[0].isIntersecting) {
        s.isInView = true;
        const timeline = new gsap.timeline();
        if (s.webglImage) timeline.call(s.webglImage.show, null, 0);
      }
    }, {});
    observer.observe(el.current!);
    getBounds();
    const resize = () => {
      getBounds();
      s.webglImage?.resize({ width: s.bounds!.width, height: s.bounds!.height, position: { x: s.bounds!.x, y: s.bounds!.y + scroll.position }, viewport: { width: windowObserver.width, height: windowObserver.height } });
    };
    windowObserver.addEventListener('resize', resize);
    if (store.state.webgl.views.work.isAvailable) createWebGLImage();
    const unwatch = store.watch((state: any) => state.webgl.views.work.isAvailable, (available: boolean) => { if (available) createWebGLImage(); });
    return () => {
      observer.disconnect();
      windowObserver.removeEventListener('resize', resize);
      unwatch();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    get isInView() { return s.isInView; },
    get webglImage() { return s.webglImage; },
    transitionOut() {
      const timeline = new gsap.timeline();
      if (s.webglImage) timeline.add(s.webglImage.hide(), 0);
      return timeline;
    }
  }), [gsap, s]);

  return (
    <div ref={el} className="image-webgl" {...sv('2314c2b0', scope)}>
      <img src={placeholderFor(width, height)} width={width} height={height} alt={alt} className="placeholder" {...sv('2314c2b0')} />
    </div>
  );
});

const ImageLazy = forwardRef<ImageHandle, ImageProps>(function ImageLazy({ source, width, height, alt, scope }, ref) {
  const { gsap } = useLegacy();
  const el = useRef<HTMLDivElement>(null);
  const [isInView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) setInView(true); }, {});
    observer.observe(el.current!);
    return () => observer.disconnect();
  }, []);
  useImperativeHandle(ref, () => ({ isInView, webglImage: null }), [isInView]);
  return (
    <div ref={el} className="image-lazy" {...sv('8a0b5b46', scope)}>
      {isInView
        ? <img draggable={false} src={source} alt={alt} width={width} height={height} onLoad={() => gsap.to(el.current, { duration: 0.5, alpha: 1, ease: 'sine.inOut' })} {...sv('8a0b5b46')} />
        : <img className="placeholder" src={placeholderFor(width, height)} width={width} height={height} alt={alt} {...sv('8a0b5b46')} />}
    </div>
  );
});

/* ---------- SectionProject (scope 7a643e9c) ---------- */

const IMAGE_LAYOUTS = [
  { large: { width: '1204px', aspectRatio: 'auto', marginLeft: '294px' }, small: { width: null, aspectRatio: 'auto', marginLeft: 'auto' } },
  { large: { width: '1204px', aspectRatio: 'auto', marginLeft: '-27.6px' }, small: { width: null, aspectRatio: 'auto', marginLeft: 'auto' } }
];

interface SectionProjectHandle {
  targetPosition: number;
  transitionIn: () => any;
  transitionOut: () => any;
}

const SectionProject = forwardRef<SectionProjectHandle, { data: ProjectData; scope: string }>(function SectionProject({ data, scope }, ref) {
  const { gsap, windowObserver, cssVars, require } = useLegacy();
  const breakpoint = useGetter<string>('device/breakpoint');
  const isTouch = useGetter<boolean>('device/isTouch');
  const isMenuOpen = useGetter<boolean>('menu/isOpen');
  const heading = useRef<HTMLHeadingElement>(null);
  const images = useRef<ImageHandle[]>([]);
  const s = useRef({ targetPosition: 0 }).current;
  const list = [data.main_image, ...data.images.map((entry) => entry.image)].filter((image) => image && image.url);

  const media = breakpoint === 'large' ? 'large' : 'small';
  const viewportWidth = parseFloat(({ small: cssVars.viewportWidthSmall, medium: cssVars.viewportWidthMedium, large: cssVars.viewportWidthLarge } as Record<string, string>)[breakpoint] ?? cssVars.viewportWidthLarge);
  const rem = (value: number) => `${value / (viewportWidth / 100)}rem`;
  const containerStyle = (layout: (typeof IMAGE_LAYOUTS)[number]) => {
    const style: React.CSSProperties = {};
    const m = layout[media];
    if (m.width) style.width = rem(parseFloat(m.width));
    if (m.marginLeft !== 'auto') style.marginLeft = rem(parseFloat(m.marginLeft));
    return style;
  };

  useEffect(() => {
    const scroll = require(129).a;
    const getTargetPosition = () => {
      const bounds = heading.current!.getBoundingClientRect();
      s.targetPosition = bounds.y + scroll.position - 0.2 * windowObserver.height;
    };
    getTargetPosition();
    windowObserver.addEventListener('resize', getTargetPosition);
    return () => windowObserver.removeEventListener('resize', getTargetPosition);
  }, [windowObserver, require, s]);

  useWatch(isMenuOpen, (open) => {
    if (open) {
      const timeline = new gsap.timeline();
      for (const image of images.current) timeline.add(image.webglImage?.hide(false), 0);
    } else {
      const timeline = new gsap.timeline({ delay: 1 });
      for (const image of images.current) if (image.isInView) timeline.add(image.webglImage?.show(), 0);
    }
  });

  useImperativeHandle(ref, () => ({
    get targetPosition() { return s.targetPosition; },
    transitionIn: () => new gsap.timeline(),
    transitionOut() {
      const timeline = new gsap.timeline();
      for (const image of images.current) if (image.transitionOut) timeline.add(image.transitionOut(), 0);
      return timeline;
    }
  }), [gsap, s]);

  const attrs = sv('7a643e9c');
  return (
    <section className="section-project js-section-project" {...sv('7a643e9c', scope)}>
      <div className="container" {...attrs}>
        <h1 ref={heading} className="heading" {...attrs}>{data.title}</h1>
        <div className="description" {...attrs}>
          <div {...sv('7a643e9c', '7a643e9c')}>
            {data.description.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </div>
        </div>
        <div className="images" {...attrs}>
          {list.map((image, i) => (
            <div key={i} className="image-container" style={containerStyle(IMAGE_LAYOUTS[i % IMAGE_LAYOUTS.length])} {...attrs}>
              {isTouch
                ? <ImageLazy ref={(node) => { if (node) images.current[i] = node; }} source={image.url} width={image.dimensions.width} height={image.dimensions.height} alt={image.alt} scope="7a643e9c" />
                : <ImageWebGL ref={(node) => { if (node) images.current[i] = node; }} source={image.url} width={image.dimensions.width} height={image.dimensions.height} alt={image.alt} scope="7a643e9c" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ---------- BackToTop (scope 2c87a218) ---------- */

function BackToTop({ scope }: { scope: string }) {
  const { gsap, math, easing, windowObserver, require } = useLegacy();
  const isTouch = useGetter<boolean>('device/isTouch');
  const el = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const s = useRef({ mousePosition: { target: { x: 0, y: 0 }, current: { x: 0, y: 0 } }, mouseAlphaFactor: 0, bounds: null as DOMRect | null, charBounds: [] as DOMRect[], timelineEnter: null as any, timelineLeave: null as any }).current;

  useEffect(() => {
    if (isTouch) return;
    const chars = () => Array.from(label.current?.querySelectorAll<HTMLElement>('.char') ?? []);
    const getBounds = () => {
      s.bounds = el.current!.getBoundingClientRect();
      s.charBounds = chars().map((c) => c.getBoundingClientRect());
    };
    getBounds();
    const mousemove = (event: MouseEvent) => {
      s.mousePosition.target.x = event.clientX;
      s.mousePosition.target.y = event.clientY;
    };
    const tick = () => {
      s.mousePosition.current.x = math.lerp(s.mousePosition.current.x, s.mousePosition.target.x, 0.1);
      s.mousePosition.current.y = math.lerp(s.mousePosition.current.y, s.mousePosition.target.y, 0.1);
      chars().forEach((c, i) => {
        const bounds = s.charBounds[i];
        if (!bounds || !s.bounds) return;
        const distance = math.distance({ x: s.mousePosition.current.x, y: 0 }, { x: bounds.x + bounds.width / 2, y: 0 });
        const alpha = easing.easeInOutQuad(math.clamp(Math.abs((0.005 * s.bounds.width) / distance), 0, 1)) * s.mouseAlphaFactor;
        c.style.opacity = String(math.clamp(alpha, 0.6, 1));
      });
    };
    window.addEventListener('mousemove', mousemove);
    windowObserver.addEventListener('resize', getBounds);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener('mousemove', mousemove);
      windowObserver.removeEventListener('resize', getBounds);
      gsap.ticker.remove(tick);
    };
  }, [isTouch, gsap, math, easing, windowObserver, s]);

  const attrs = sv('2c87a218');
  return (
    <div
      ref={el}
      className="back-to-top"
      {...sv('2c87a218', scope)}
      onMouseEnter={() => {
        if (isTouch) return;
        s.timelineLeave?.kill();
        s.timelineEnter = new gsap.timeline();
        s.timelineEnter.to(s, { duration: 0.2, mouseAlphaFactor: 1, ease: 'sine.inOut' }, 0);
      }}
      onMouseLeave={() => {
        if (isTouch) return;
        s.timelineEnter?.kill();
        s.timelineLeave = new gsap.timeline();
        s.timelineLeave.to(s, { duration: 0.3, mouseAlphaFactor: 0, ease: 'sine.inOut' }, 0);
      }}
    >
      <button className="button" {...attrs} onClick={() => gsap.to(require(129).a, { duration: 1.5, position: 0, ease: 'power3.inOut' })}>
        <svg width={5} height={28} viewBox="0 0 5 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow" {...sv('2c87a218', '2c87a218')}>
          <g opacity="0.5" {...sv('2c87a218', '2c87a218')}>
            <path d="M0 23H5V28L0 23Z" fill="white" {...sv('2c87a218', '2c87a218')} />
            <rect x={4} width={1} height={24} fill="white" {...sv('2c87a218', '2c87a218')} />
          </g>
        </svg>
        <div ref={label} className="label" {...attrs}>
          {Array.from(localeCopy.misc.backToTop).map((c, i) => <span key={i} className="char" {...attrs}>{c}</span>)}
        </div>
      </button>
    </div>
  );
}

/* ---------- Project page (scope 6367c30e), rendered inside the Work layout ---------- */

export interface ProjectChildHandle {
  transitionIn: (done: (() => void) | null, routes: TransitionRoutes) => void;
  transitionOut: (done: (() => void) | null, routes: TransitionRoutes) => void;
}

export const ProjectPage = forwardRef<ProjectChildHandle, { data: ProjectData; sectionProjects: React.RefObject<{ enableClick: () => void; disableClick: () => void } | null> }>(function ProjectPage({ data, sectionProjects }, ref) {
  const { gsap, windowObserver, root, require } = useLegacy();
  const el = useRef<HTMLDivElement>(null);
  const sectionProject = useRef<SectionProjectHandle>(null);

  useImperativeHandle(ref, () => ({
    transitionIn(done, routes) {
      const scroll = require(129).a;
      const timeline = new gsap.timeline({
        onComplete: () => {
          sectionProjects.current?.enableClick();
          done?.();
        }
      });
      timeline.call(() => sectionProjects.current?.disableClick(), null, 0);
      const updateScroll = (root as any).updateScroll;
      if (updateScroll) timeline.call(updateScroll, null, 0);
      const target = sectionProject.current!.targetPosition;
      if (!routes.previous) {
        timeline.set(scroll, { position: target }, 0);
        timeline.to(el.current, { duration: 1, alpha: 1, ease: 'sine.inOut' }, 0.5);
      } else {
        timeline.to(scroll, { duration: 1.5, position: target, ease: 'power3.inOut' }, 0);
        timeline.to(el.current, { duration: 1, alpha: 1, ease: 'sine.inOut' }, 0);
      }
    },
    transitionOut(done, routes) {
      const scroll = require(129).a;
      const timeline = new gsap.timeline();
      const goingToWork = routes.current && String(routes.current.name).split('___')[0] === 'work';
      if (scroll.position <= 0.01 * windowObserver.height && done) timeline.call(done, null);
      timeline.to(el.current, { duration: 0.5, alpha: 0, ease: 'sine.inOut' }, 0);
      timeline.add(sectionProject.current!.transitionOut(), 0);
      if (goingToWork) timeline.to(scroll, { duration: 1.5, position: 0, ease: 'power3.inOut' }, 0);
      if (done) timeline.call(done, null);
      const updateScroll = (root as any).updateScroll;
      if (goingToWork && updateScroll) timeline.call(updateScroll, null);
    }
  }));

  return (
    <div ref={el} className="page work-detail" {...sv('6367c30e', '3bfbd569', '3bfbd569')}>
      <SectionProject ref={sectionProject} data={data} scope="6367c30e" />
      <BackToTop scope="6367c30e" />
    </div>
  );
});
