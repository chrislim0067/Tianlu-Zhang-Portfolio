import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { localeCopy, sv, useGetter, useLegacy, useWatch } from '../../runtime/context';
import { content } from '../../content/portfolio';
import { ScrollContainer } from '../../components/ScrollContainer';
import { ButtonHome, type ButtonHomeHandle } from '../../components/ButtonHome';
import { ButtonMenu, type ButtonMenuHandle } from '../../components/ButtonMenu';
import { useIntersection } from '../../components/useIntersection';
import type { PageHandle } from '../../components/PageOutlet';
import createSticky from '../../legacy/vendor/sticky.js';

/* ---------- SectionIntro (scope b4f6bda8) ---------- */

interface SectionIntroHandle {
  el: HTMLElement | null;
  transitionIn: () => any;
  transitionOut: () => any;
}

const SectionIntro = forwardRef<SectionIntroHandle, { title: string; paragraphs: readonly string[]; scope: string }>(function SectionIntro({ title, paragraphs, scope }, ref) {
  const { gsap, windowObserver, require } = useLegacy();
  const el = useRef<HTMLElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const paragraph = useRef<HTMLDivElement>(null);
  const s = useRef({ splitTexts: [] as any[], lines: [] as HTMLElement[] }).current;

  useEffect(() => {
    const SplitText = require(585).a;
    s.splitTexts = [];
    s.lines = [];
    heading.current?.querySelectorAll(':scope > *').forEach((element) => {
      const split = new SplitText(element, { type: 'lines', linesClass: 'line' });
      s.splitTexts.push(split);
      s.lines.push(...split.lines);
    });
    const resize = () => { for (const split of s.splitTexts) split.revert(); };
    windowObserver.addEventListener('resize', resize);
    return () => windowObserver.removeEventListener('resize', resize);
  }, [require, windowObserver, s]);

  useImperativeHandle(ref, () => ({
    get el() { return el.current; },
    transitionIn() {
      const timeline = new gsap.timeline({ delay: 0.3 });
      timeline.to(heading.current, { duration: 3.5, alpha: 1, ease: 'sine.out' }, 0);
      s.lines.forEach((line, i) => timeline.to(line, { duration: 3, alpha: 1, ease: 'sine.out' }, 0.12 * i));
      timeline.to(paragraph.current, { duration: 2, alpha: 1, ease: 'sine.inOut' }, 1);
      return timeline;
    },
    transitionOut: () => new gsap.timeline()
  }), [gsap, s]);

  const attrs = sv('b4f6bda8');
  return (
    <section ref={el} className="section-intro section-intro" {...sv('b4f6bda8', scope)}>
      <div className="container container-max-width" {...attrs}>
        <div className="row-heading" {...attrs}>
          <div ref={heading} className="heading" {...sv('b4f6bda8', 'b4f6bda8')}>
            <h1>{title}</h1>
          </div>
        </div>
        <div className="row-paragraph" {...attrs}>
          <div ref={paragraph} className="paragraph" {...sv('b4f6bda8', 'b4f6bda8')}>
            {paragraphs.map((text, i) => <p key={i}>{text}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
});

/* ---------- SectionCompanies (scope 3af7f9b8) — the five expertise pillars ---------- */

interface Expertise { heading: string; word: string; icon: string; description: string }

const SectionCompanies = forwardRef<HTMLElement, { data: readonly Expertise[]; scope: string }>(function SectionCompanies({ data, scope }, ref) {
  const { gsap, windowObserver, require } = useLegacy();
  const breakpoint = useGetter<string>('device/breakpoint');
  const isTouch = useGetter<boolean>('device/isTouch');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const el = useRef<HTMLElement>(null);
  const colRight = useRef<HTMLDivElement>(null);
  const listRight = useRef<HTMLUListElement>(null);
  const itemsLeft = useRef<HTMLLIElement[]>([]);
  const itemsRight = useRef<HTMLLIElement[]>([]);
  const descriptionsMobile = useRef<HTMLDivElement[]>([]);
  const s = useRef({
    triggers: [] as Array<{ position: number; offset: number; el: HTMLElement; index: number }>,
    triggersMobile: [] as Array<{ position: number; offset: number; el: HTMLElement; index: number; isVisible: boolean }>,
    isVisible: false,
    activeIndex: null as number | null,
    sticky: null as any,
    timelineShow: null as any, timelineHide: null as any, timelineShowMobile: null as any,
    timelines: {} as Record<string, any>
  }).current;
  const breakpointRef = useRef(breakpoint);
  breakpointRef.current = breakpoint;
  useImperativeHandle(ref, () => el.current as HTMLElement);

  const setup = useCallback(() => {
    const scrollPosition = require(129).a.position;
    const height = windowObserver.height;
    s.triggers = itemsLeft.current.map((item, index) => ({ position: item.getBoundingClientRect().y + scrollPosition, offset: height * 0.5, el: item, index }));
    s.triggersMobile = itemsRight.current.map((item, index) => ({ position: item.getBoundingClientRect().y + scrollPosition, offset: height * 1, el: item, index, isVisible: false }));
  }, [require, windowObserver, s]);

  useEffect(() => {
    setup();
    if (breakpointRef.current === 'large' && colRight.current && el.current) {
      const Sticky = createSticky(require);
      s.sticky = new Sticky({
        el: colRight.current,
        trigger: el.current,
        end: isTouch ? 'auto' : '120%',
        start: isTouch ? '0%' : '50%',
        anticipationDistance: { top: '10%', bottom: '30%' },
        anticipationOffsetSize: { top: '2%', bottom: '10%' },
        onProgress: (state: any) => {
          if (breakpointRef.current !== 'large' || !listRight.current || typeof state !== 'object') return;
          const progress = state.globalProgress ?? 0;
          listRight.current.style.transform = `translateY(${-progress * (isTouch ? 0 : 150)}%)`;
        },
        markers: false
      });
    }
    windowObserver.addEventListener('resize', setup);
    return () => {
      s.sticky?.destroy();
      windowObserver.removeEventListener('resize', setup);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showCompany = (index: number) => {
    s.timelines[`hide_${index}`]?.kill();
    const spans = itemsRight.current[index].querySelectorAll('span');
    s.timelines[`show_${index}`] = new gsap.timeline();
    s.timelines[`show_${index}`].to(spans, { duration: 0.5, alpha: 1, stagger: 0.05, ease: 'sine.inOut' }, 0);
  };
  const hideCompany = (index: number) => {
    s.timelines[`show_${index}`]?.kill();
    const spans = itemsRight.current[index].querySelectorAll('span');
    s.timelines[`hide_${index}`] = new gsap.timeline();
    s.timelines[`hide_${index}`].to(spans, { duration: 0.5, alpha: 0.2, stagger: 0.05, ease: 'sine.inOut' }, 0);
  };
  const showCompanyMobile = (index: number) => {
    const spans = itemsRight.current[index].querySelectorAll('span');
    s.timelineShowMobile = new gsap.timeline();
    s.timelineShowMobile.to(spans, { duration: 1, alpha: 1, stagger: 0.05, ease: 'sine.inOut' }, 0);
    s.timelineShowMobile.to(descriptionsMobile.current[index], { duration: 1, alpha: 1, ease: 'sine.inOut' }, 0.1);
  };
  const setActive = (index: number | null) => {
    if (s.activeIndex === index) return;
    const previous = s.activeIndex;
    s.activeIndex = index;
    setActiveIndex(index);
    if (breakpointRef.current === 'large') {
      if (index !== null) showCompany(index);
      if (previous !== null) hideCompany(previous);
    }
  };
  useIntersection(el, {
    threshold: 0,
    scrollTriggerProgressPosition: 1,
    onScrollThrough: ({ position }) => {
      if (breakpointRef.current !== 'large') return;
      // scrollThroughLarge — resolve the last passed trigger first (Vue batched the
      // repeated assignments into one watcher call; do the same here so the tweens
      // are not restarted on every scroll event)
      let next: number | null = s.activeIndex;
      for (const trigger of s.triggers) if (position + trigger.offset > trigger.position) next = trigger.index;
      if (next !== null) setActive(next);
      if (s.triggers.length > 0) {
        if (position + s.triggers[0].offset < s.triggers[0].position) {
          if (!s.isVisible) return;
          setActive(null);
          s.isVisible = false;
          s.timelineHide = new gsap.timeline();
          s.timelineHide.to(colRight.current, { duration: 0.25, alpha: 0, ease: 'sine.inOut' });
        } else {
          s.isVisible = true;
          s.timelineHide?.kill();
          s.timelineShow = new gsap.timeline();
          s.timelineShow.to(colRight.current, { duration: 0.25, alpha: 1, ease: 'sine.inOut' });
        }
      }
      // scrollThroughSmall is a no-op at the large breakpoint
      void showCompanyMobile;
    }
  });

  const attrs = sv('3af7f9b8');
  return (
    <section ref={el} className={`section-companies section-companies${isTouch ? ' is-touch' : ''}`} {...sv('3af7f9b8', scope)}>
      <div className="container container-max-width" {...attrs}>
        <div className="line" {...attrs} />
        <div className="row" {...attrs}>
          <div className="col-left" {...attrs}>
            <ul className="companies-description-list" {...attrs}>
              {data.map((item, i) => (
                <li key={i} className={`companies-description-list-item${activeIndex === i ? ' is-active' : ''}`} {...attrs} ref={(node) => { if (node) itemsLeft.current[i] = node; }}>
                  <div className="pictogram" {...attrs}>
                    <img src={item.icon} width={512} height={512} className="logo" alt="" {...attrs} />
                  </div>
                  <div className="company-description large" {...attrs}>
                    <div className="subtitle" {...attrs}>{item.heading}</div>
                    <div className="paragraph paragraph--small" {...sv('3af7f9b8', '3af7f9b8')}><p>{item.description}</p></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div ref={colRight} className="col-right" {...attrs}>
            <ul ref={listRight} className="companies-name-list" {...attrs}>
              {data.map((item, i) => (
                <li key={i} className={`companies-name-list-item${activeIndex === i ? ' is-active' : ''}`} {...attrs} ref={(node) => { if (node) itemsRight.current[i] = node; }}>
                  <div className="pictogram small" {...attrs}>
                    <img src={item.icon} width={512} height={512} className="logo" alt="" {...attrs} />
                  </div>
                  <div className="name" {...sv('3af7f9b8', '3af7f9b8')}>
                    <p>{Array.from(item.word).map((c, k) => <span key={k}>{c}</span>)}</p>
                  </div>
                  <div className={`company-description small${activeIndex === i ? ' is-active' : ''}`} {...attrs} ref={(node) => { if (node) descriptionsMobile.current[i] = node; }}>
                    <div className="subtitle" {...attrs}>{item.heading}</div>
                    <div className="paragraph paragraph--small" {...sv('3af7f9b8', '3af7f9b8')}><p>{item.description}</p></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
});

/* ---------- SectionContact (scope cf44b1ea) ---------- */

interface Contact { text: string; href: string; label: string }

const SectionContact = forwardRef<HTMLElement, { data: readonly Contact[]; scope: string }>(function SectionContact({ data, scope }, ref) {
  const { gsap } = useLegacy();
  const el = useRef<HTMLElement>(null);
  const emails = useRef<HTMLAnchorElement[]>([]);
  const labels = useRef<HTMLSpanElement[]>([]);
  useImperativeHandle(ref, () => el.current as HTMLElement);
  useIntersection(el, {
    threshold: 0.5,
    onShow: () => {
      const timeline = new gsap.timeline();
      emails.current.forEach((email, i) => {
        timeline.to(email.querySelectorAll('.char'), { duration: 2, stagger: 0.028, alpha: 1, ease: 'sine.out' }, 0.05 * i);
        timeline.set(labels.current[i], { alpha: 1 }, 0.05 * i + 0.5);
      });
      timeline.call(() => { if (el.current) el.current.style.pointerEvents = 'all'; });
    }
  });
  const dim = (active: number, on: boolean) => {
    emails.current.forEach((link, i) => {
      if (i === active) return;
      link.style.opacity = on ? '0.6' : '1';
      labels.current[i].style.opacity = on ? '0.4' : '1';
    });
  };
  const attrs = sv('cf44b1ea');
  return (
    <section ref={el} className="section-contact section-contact" {...sv('cf44b1ea', scope)}>
      <div className="container container-max-width" {...attrs}>
        <div className="row" {...attrs}>
          <ul className="contact-list" {...attrs}>
            {data.map((contact, i) => {
              const first = contact.text[0];
              return (
                <li key={i} className="contact-list-item" {...attrs}>
                  <a
                    href={contact.href}
                    className="contact-email button"
                    {...attrs}
                    ref={(node) => { if (node) emails.current[i] = node; }}
                    onMouseEnter={() => dim(i, true)}
                    onMouseLeave={() => dim(i, false)}
                  >
                    {Array.from(contact.text).map((c, k) => <span key={`char-${k}`} className="char" {...attrs}>{c}</span>)}
                  </a>
                  <br {...attrs} />
                  <span className={`contact-label${first === 'c' || first === 'b' ? ' is-offset' : ''}`} {...attrs} ref={(node) => { if (node) labels.current[i] = node; }}>
                    {contact.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
});

/* ---------- About page (scope deb2de74) ---------- */

export const AboutPage = forwardRef<PageHandle, { params: Record<string, string> }>(function AboutPage(_props, ref) {
  const { gsap, audio, engine } = useLegacy();
  const isMenuOpen = useGetter<boolean>('menu/isOpen');
  const about = content.about.en;
  const el = useRef<HTMLDivElement>(null);
  const pageTitle = useRef<HTMLDivElement>(null);
  const sectionIntro = useRef<SectionIntroHandle>(null);
  const sectionCompanies = useRef<HTMLElement>(null);
  const sectionContact = useRef<HTMLElement>(null);
  const buttonHome = useRef<ButtonHomeHandle>(null);
  const buttonMenu = useRef<ButtonMenuHandle>(null);

  useWatch(isMenuOpen, (open) => {
    if (open) {
      const timeline = new gsap.timeline();
      timeline.to(pageTitle.current, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
      timeline.to(sectionIntro.current!.el, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
      timeline.to(sectionCompanies.current, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
      timeline.to(sectionContact.current, { duration: 1, alpha: 0, ease: 'sine.inOut' }, 0);
      timeline.add(buttonHome.current!.transitionOut(), 0);
    } else {
      const timeline = new gsap.timeline({ delay: 1 });
      timeline.to(pageTitle.current, { duration: 1.7, alpha: 1, ease: 'sine.inOut' }, 0);
      timeline.to(sectionIntro.current!.el, { duration: 1.7, alpha: 1, ease: 'sine.inOut' }, 0);
      timeline.to(sectionCompanies.current, { duration: 1.7, alpha: 1, ease: 'sine.inOut' }, 0);
      timeline.to(sectionContact.current, { duration: 1.7, alpha: 1, ease: 'sine.inOut' }, 0);
      timeline.add(buttonHome.current!.menuIn(), 0);
    }
  });

  useImperativeHandle(ref, () => ({
    transitionIn(done) {
      const timeline = new gsap.timeline({ onComplete: done ?? undefined });
      timeline.to(audio, { duration: 2, lowPassFrequency: 1000 }, 0);
      timeline.to(el.current, { duration: 2, alpha: 1, ease: 'sine.inOut' }, 0);
      timeline.add(buttonHome.current!.transitionIn(), 0);
      timeline.add(buttonMenu.current!.transitionIn(), 0);
      timeline.add(sectionIntro.current!.transitionIn(), 0.2);
      timeline.call(() => engine().viewManager.show('About'), null, 0);
    },
    transitionOut(done) {
      const timeline = new gsap.timeline({ onComplete: done });
      timeline.to(el.current, { duration: 1.5, alpha: 0, ease: 'sine.inOut' }, 0);
      timeline.add(buttonHome.current!.transitionOut(1.5), 0);
      timeline.add(buttonMenu.current!.transitionOut(), 0);
      timeline.add(sectionIntro.current!.transitionOut(), 0);
      timeline.call(() => engine().viewManager.hide('About'), null, 0);
    }
  }));

  return (
    <div ref={el} className="page about" {...sv('deb2de74', '6d28008c')}>
      <ScrollContainer scope="deb2de74">
        <div ref={pageTitle} className="page-title" {...sv('13d0e9d2', 'deb2de74')}>{localeCopy.routes.about.name}</div>
        <SectionIntro ref={sectionIntro} title={about.summary} paragraphs={about.paragraphs} scope="deb2de74" />
        <SectionCompanies ref={sectionCompanies} data={about.expertise} scope="deb2de74" />
        <SectionContact ref={sectionContact} data={content.contact.en} scope="deb2de74" />
        {/* SectionCredits (scope 03ffcf42): empty in the original too, kept for the page's bottom spacing */}
        <section className="section-credits" {...sv('03ffcf42', 'deb2de74')}>
          <div className="container container-max-width" {...sv('03ffcf42')}>
            <div className="row" {...sv('03ffcf42')}><span className="credits" {...sv('03ffcf42')} /></div>
          </div>
        </section>
        <ButtonHome ref={buttonHome} scope="deb2de74" />
        <ButtonMenu ref={buttonMenu} scope="deb2de74" />
      </ScrollContainer>
    </div>
  );
});
