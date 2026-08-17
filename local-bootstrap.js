/**
 * Client-side companion to server.js.
 *
 * - Serves page data to the Nuxt app on client-side navigation (the captured
 *   bundles are patched to call window.__TIANLU_PAGE__ instead of a CMS).
 * - Keeps rendered copy, SEO tags and navigation labels in sync with
 *   portfolio-content.js after hydration.
 * - Nudges the production preloader forward once every asset has loaded.
 */
(function () {
  if (window.__TIANLU_LOCAL_BOOTSTRAP__) return;
  window.__TIANLU_LOCAL_BOOTSTRAP__ = true;
  var portfolioContent = window.__TIANLU_PORTFOLIO_CONTENT__;
  var pageData = window.__TIANLU_PAGE_DATA__ || {};
  var projectPlaceholderUrl = '/images/work-placeholder.png?placeholder=1';
  // Case-study photo; French cases share the English photo by index.
  function caseImage(index) {
    var item = portfolioContent.work.en.cases[index];
    return (item && item.image) || projectPlaceholderUrl;
  }
  // Decorative marks shown inside the home-page interactions (see server.js).
  var homeLogoComponents = ['pillar-one', 'pillar-two', 'pillar-three', 'pillar-four', 'pillar-five'];

  function currentLocale() {
    return 'en';
  }

  function cleanLocalizedPath(pathname) {
    return String(pathname || '').replace(/^\/(?:en|fr)(?=\/|$)/, '') || '/';
  }

  function cloneValue(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function aboutContent() {
    return portfolioContent.about[currentLocale()];
  }

  function portfolioCaseBySlug(slug, locale) {
    var locales = locale ? [locale, locale === 'en' ? 'fr' : 'en'] : ['en', 'fr'];
    for (var localeIndex = 0; localeIndex < locales.length; localeIndex++) {
      var sourceLocale = locales[localeIndex];
      var cases = portfolioContent.work[sourceLocale].cases;
      for (var caseIndex = 0; caseIndex < cases.length; caseIndex++) {
        if (cases[caseIndex].slug === slug) {
          return {
            index: caseIndex,
            sourceLocale: sourceLocale,
            item: portfolioContent.work[locale || sourceLocale].cases[caseIndex]
          };
        }
      }
    }
    return null;
  }

  function applySeoFields(data, title) {
    if (!data) return data;
    var seo = portfolioContent.seo[currentLocale()];
    data.seo_meta_title = title;
    data.seo_meta_description = seo.description;
    data.seo_og_image = {};
    return data;
  }

  window.__TIANLU_LOCALIZE_HOME__ = function (data) {
    if (!data) data = cloneValue(pageData.home) || {};
    var locale = currentLocale();
    var home = portfolioContent.home[locale];
    data.title = home.summary;
    data.interaction_indication = home.interaction;
    data.end_screen = home.endScreen;
    if (!Array.isArray(data.interactions)) data.interactions = [];
    home.statements.forEach(function (statement, index) {
      var interaction = data.interactions[index] || {};
      interaction.text = statement;
      if (!interaction.logo) interaction.logo = homeLogoComponents[index % homeLogoComponents.length];
      data.interactions[index] = interaction;
    });
    data.interactions.length = home.statements.length;
    return applySeoFields(data, portfolioContent.seo[locale].defaultTitle);
  };

  window.__TIANLU_LOCALIZE_WORK__ = function (data) {
    if (!data) data = cloneValue(pageData.work) || {};
    var locale = currentLocale();
    var work = portfolioContent.work[locale];
    var sourceProjects = Array.isArray(data.projects) ? data.projects : [];

    data.projects = work.cases.map(function (portfolioCase, index) {
      var sourceEntry = sourceProjects[index % Math.max(sourceProjects.length, 1)];
      var entry = cloneValue(sourceEntry) || { project: {} };
      var project = entry.project || (entry.project = {});
      project.id = 'tianlu-' + locale + '-' + (index + 1);
      project.uid = portfolioCase.slug;
      project.slug = portfolioCase.slug;
      project.lang = locale === 'fr' ? 'fr-fr' : 'en-gb';
      project.data = project.data || {};
      project.data.name = portfolioCase.title;
      project.data.title = portfolioCase.title;
      project.data.short_description = portfolioCase.short;
      project.data.main_image = {
        dimensions: { width: 2048, height: 1365 },
        alt: portfolioCase.title,
        copyright: null,
        url: caseImage(index)
      };
      project.data.tags = [
        {
          tag: {
            id: 'tianlu-tag-' + portfolioCase.category,
            uid: portfolioCase.category,
            slug: portfolioCase.category,
            type: 'project_tag',
            lang: project.lang,
            link_type: 'Document',
            isBroken: false
          }
        }
      ];
      return entry;
    });

    data.tags = work.filters.slice(1).map(function (filter) {
      return {
        id: 'tianlu-tag-' + filter.uid,
        uid: filter.uid,
        type: 'project_tag',
        lang: locale === 'fr' ? 'fr-fr' : 'en-gb',
        data: { tag_name: filter.label }
      };
    });

    return applySeoFields(data, portfolioContent.seo[locale].workTitle);
  };

  window.__TIANLU_IS_PROJECT_SLUG__ = function (slug) {
    return Boolean(portfolioCaseBySlug(slug));
  };

  window.__TIANLU_LOCALIZE_PROJECT__ = function (data, slug) {
    var locale = currentLocale();
    var projectSlug = slug || window.location.pathname.split('/').filter(Boolean).pop();
    var match = portfolioCaseBySlug(projectSlug, locale);
    if (!match) return data;
    var item = match.item;
    var localized = data || cloneValue(pageData.project) || {};
    localized.title = item.title;
    localized.name = item.title;
    localized.short_description = item.short;
    localized.description = item.detail.map(function (paragraph) {
      return { type: 'paragraph', text: paragraph, spans: [] };
    });
    localized.main_image = {
      dimensions: { width: 2048, height: 1365 },
      alt: item.title,
      copyright: null,
      url: caseImage(match.index)
    };
    localized.images = [];
    localized.tags = [
      {
        tag: {
          uid: item.category,
          slug: item.category,
          link_type: 'Document',
          isBroken: false
        }
      }
    ];
    return applySeoFields(localized, item.title + ' | Tianlu Zhang');
  };

  window.__TIANLU_LOCALIZE_ABOUT__ = function (data) {
    if (!data) data = cloneValue(pageData.about) || {};
    var locale = currentLocale();
    var about = aboutContent();

    data.title = [{ type: 'heading1', text: about.summary, spans: [] }];
    data.description = about.paragraphs.map(function (paragraph) {
      return { type: 'paragraph', text: paragraph, spans: [] };
    });
    if (!Array.isArray(data.companies)) data.companies = [];

    about.expertise.forEach(function (expertise, index) {
      var item = data.companies[index];
      if (!item) item = data.companies[index] = {};
      item.logo = {
        dimensions: { width: 512, height: 512 },
        alt: expertise.heading,
        copyright: null,
        url: expertise.icon
      };
      item.name = [{ type: 'paragraph', text: expertise.word, spans: [] }];
      item.short_description = expertise.heading;
      item.long_description = [
        { type: 'paragraph', text: expertise.description, spans: [] }
      ];
    });

    data.companies.length = about.expertise.length;
    data.contacts = portfolioContent.contact[locale].map(function (contact) {
      return { email: contact.text, label: contact.label };
    });

    return applySeoFields(data, portfolioContent.seo[locale].aboutTitle);
  };

  /**
   * Replacement for the CMS client used by the captured page bundles. Returns
   * promises shaped like the original API responses, built from local content.
   */
  window.__TIANLU_PAGE__ = function (kind) {
    var locale = currentLocale();
    if (kind === 'home') {
      return Promise.resolve({ data: window.__TIANLU_LOCALIZE_HOME__(null) });
    }
    if (kind === 'about') {
      return Promise.resolve({ data: window.__TIANLU_LOCALIZE_ABOUT__(null) });
    }
    if (kind === 'work') {
      return Promise.resolve({ data: window.__TIANLU_LOCALIZE_WORK__(null) });
    }
    if (kind === 'project_tag') {
      return Promise.resolve({ results: window.__TIANLU_LOCALIZE_WORK__(null).tags });
    }
    if (kind === 'project') {
      var results = portfolioContent.work[locale].cases.map(function (item, index) {
        return {
          id: 'tianlu-' + locale + '-' + (index + 1),
          uid: item.slug,
          slug: item.slug,
          type: 'project',
          lang: locale === 'fr' ? 'fr-fr' : 'en-gb',
          alternate_languages: [],
          data: window.__TIANLU_LOCALIZE_PROJECT__(null, item.slug)
        };
      });
      return Promise.resolve({ results: results });
    }
    return Promise.resolve({ data: {}, results: [] });
  };

  function replaceAboutExpertise() {
    var items = aboutContent().expertise;
    var descriptionItems = document.querySelectorAll(
      '.companies-description-list-item'
    );
    var nameItems = document.querySelectorAll('.companies-name-list-item');

    items.forEach(function (expertise, index) {
      [descriptionItems[index], nameItems[index]].forEach(function (item) {
        if (!item) return;
        var image = item.querySelector('.pictogram img');
        var heading = item.querySelector('.subtitle');
        var description = item.querySelector('.paragraph p');
        if (image) {
          if (image.getAttribute('src') !== expertise.icon) image.src = expertise.icon;
          image.width = 512;
          image.height = 512;
          image.alt = expertise.heading;
        }
        if (heading && heading.textContent.trim() !== expertise.heading) {
          heading.textContent = expertise.heading;
        }
        if (
          description &&
          description.textContent.trim() !== expertise.description
        ) {
          description.textContent = expertise.description;
        }
      });

      var wordContainer = nameItems[index]
        ? nameItems[index].querySelector('.name p')
        : null;
      if (
        wordContainer &&
        wordContainer.textContent.trim() !== expertise.word
      ) {
        wordContainer.textContent = '';
        Array.from(expertise.word).forEach(function (letter) {
          var span = document.createElement('span');
          span.textContent = letter;
          wordContainer.appendChild(span);
        });
      }
    });
  }

  function setCharacterText(element, value) {
    if (!element || element.textContent.trim() === value) return;
    var template = element.querySelector('span');
    while (element.firstChild) element.removeChild(element.firstChild);
    Array.from(value).forEach(function (character) {
      var span = template ? template.cloneNode(false) : document.createElement('span');
      if (!template) span.className = 'char';
      span.textContent = character;
      element.appendChild(span);
    });
  }

  function replaceContactDetails() {
    var contacts = portfolioContent.contact[currentLocale()];
    document
      .querySelectorAll('.section-contact .contact-list-item')
      .forEach(function (item, index) {
        var contact = contacts[index];
        if (!contact) return;
        var anchor = item.querySelector('.contact-email');
        var label = item.querySelector('.contact-label');
        if (anchor) {
          if (anchor.getAttribute('href') !== contact.href) {
            anchor.setAttribute('href', contact.href);
          }
          setCharacterText(anchor, contact.text);
        }
        if (label && label.textContent.trim() !== contact.label) {
          label.textContent = contact.label;
        }
      });
  }

  function replaceAboutDom() {
    var about = aboutContent();
    var aboutHeading = document.querySelector('.section-intro h1');
    if (aboutHeading && aboutHeading.textContent.trim() !== about.summary) {
      aboutHeading.textContent = about.summary;
    }

    var aboutParagraphs = document.querySelectorAll('.section-intro .paragraph p');
    about.paragraphs.forEach(function (paragraph, index) {
      if (aboutParagraphs[index] && aboutParagraphs[index].textContent !== paragraph) {
        aboutParagraphs[index].textContent = paragraph;
      }
    });

    replaceAboutExpertise();
    replaceContactDetails();
  }

  function replaceHomeDom() {
    var home = portfolioContent.home[currentLocale()];
    var heading = document.querySelector('.section-home .heading');
    var endTitle = document.querySelector('.the-end-title');
    if (heading && heading.textContent.trim() !== home.summary) {
      heading.textContent = home.summary;
    }
    if (endTitle && endTitle.textContent.trim() !== home.endScreen) {
      endTitle.textContent = home.endScreen;
    }
  }

  function replaceWorkDom() {
    var locale = currentLocale();
    var work = portfolioContent.work[locale];
    document.querySelectorAll('.page-title').forEach(function (title) {
      var value = title.textContent.trim();
      if (value === 'Our Work' || value === 'My Work') {
        title.textContent = work.heading;
      }
    });

    document.querySelectorAll('.tag-label').forEach(function (label, index) {
      var filter = work.filters[index];
      if (!filter) return;
      if (label.textContent.trim() !== filter.label) label.textContent = filter.label;
      label.setAttribute('for', filter.uid);
      var input = label.previousElementSibling;
      if (input && input.classList.contains('tag-input')) {
        input.id = filter.uid;
        input.value = filter.uid;
      }
    });

    var blocks = document.querySelectorAll('.project-slide .block');
    blocks.forEach(function (block, index) {
      var portfolioCase = work.cases[index];
      if (!portfolioCase) {
        block.remove();
        return;
      }
      block.dataset.uid = portfolioCase.slug;
      var anchor = block.querySelector('a.button');
      var name = block.querySelector('.js-name');
      var image = block.querySelector('img');
      if (anchor) anchor.setAttribute('href', '/work/' + portfolioCase.slug);
      if (name && name.textContent.trim() !== portfolioCase.title) {
        name.textContent = portfolioCase.title;
      }
      var imageUrl = caseImage(index);
      if (image && image.getAttribute('src') !== imageUrl) {
        image.src = imageUrl;
        image.alt = portfolioCase.title;
      }
    });

    var pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length !== 2) return;
    var match = portfolioCaseBySlug(pathParts[1], locale);
    if (!match) return;
    var heading = document.querySelector('.section-project .heading');
    var description = document.querySelector('.section-project .description > div');
    if (heading && heading.textContent.trim() !== match.item.title) {
      heading.textContent = match.item.title;
    }
    if (description) {
      var paragraphs = description.querySelectorAll('p');
      match.item.detail.forEach(function (text, index) {
        var paragraph = paragraphs[index];
        if (!paragraph) {
          paragraph = document.createElement('p');
          description.appendChild(paragraph);
        }
        if (paragraph.textContent !== text) paragraph.textContent = text;
      });
      for (var index = paragraphs.length - 1; index >= match.item.detail.length; index--) {
        paragraphs[index].remove();
      }
    }
  }

  function replaceNavigationLabels() {
    var locale = currentLocale();
    var work = portfolioContent.work[locale];
    var replacements = {
      'About us': locale === 'fr' ? 'À propos' : 'About me',
      'About me': locale === 'fr' ? 'À propos' : 'About me',
      'Our Work': work.heading,
      'My Work': work.heading,
      'See Our Work': work.seeWork,
      'See My Work': work.seeWork
    };
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var trimmed = (node.nodeValue || '').trim();
      if (!replacements[trimmed] || replacements[trimmed] === trimmed) continue;
      node.nodeValue = node.nodeValue.replace(trimmed, replacements[trimmed]);
    }
  }

  function pageSeo() {
    var locale = currentLocale();
    var seo = portfolioContent.seo[locale];
    var pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts[0] === 'about') {
      return { title: seo.aboutTitle, description: seo.description };
    }
    if (pathParts[0] === 'work' && pathParts[1]) {
      var match = portfolioCaseBySlug(pathParts[1], locale);
      return {
        title: match ? match.item.title + ' | Tianlu Zhang' : seo.workTitle,
        description: seo.description
      };
    }
    if (pathParts[0] === 'work') {
      return { title: seo.workTitle, description: seo.description };
    }
    return { title: seo.defaultTitle, description: seo.description };
  }

  function setMeta(selector, attributes, content) {
    var meta = document.head.querySelector(selector);
    if (!meta) {
      meta = document.createElement('meta');
      Object.keys(attributes).forEach(function (name) {
        meta.setAttribute(name, attributes[name]);
      });
      document.head.appendChild(meta);
    }
    if (meta.getAttribute('content') !== content) meta.setAttribute('content', content);
  }

  function updateSeo() {
    if (!portfolioContent || !document.head) return;
    var seo = pageSeo();
    if (document.title !== seo.title) document.title = seo.title;
    setMeta('meta[name="description"]', { name: 'description' }, seo.description);
    setMeta('meta[property="og:title"],meta[name="og:title"]', { property: 'og:title' }, seo.title);
    setMeta(
      'meta[property="og:description"],meta[name="og:description"]',
      { property: 'og:description' },
      seo.description
    );
    setMeta(
      'meta[property="og:url"],meta[name="og:url"]',
      { property: 'og:url' },
      window.location.origin + window.location.pathname
    );
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, seo.title);
    setMeta(
      'meta[name="twitter:description"]',
      { name: 'twitter:description' },
      seo.description
    );
    document
      .querySelectorAll(
        'meta[property^="og:image"],meta[name^="og:image"],meta[name^="twitter:image"]'
      )
      .forEach(function (meta) {
        meta.remove();
      });
  }

  function localizeInitialNuxtData() {
    var payload = window.__NUXT__;
    if (!payload || !Array.isArray(payload.data)) return;
    var pathname = window.location.pathname.replace(/\/$/, '') || '/';
    var isHome = pathname === '/';
    var isAbout = pathname === '/about';
    var projectMatch = pathname.match(/^\/work\/([^/]+)$/);
    var isWork = /^\/work(?:\/|$)/.test(pathname);

    payload.data.forEach(function (entry) {
      if (!entry || !entry.data) return;
      if (isHome) entry.data = window.__TIANLU_LOCALIZE_HOME__(entry.data);
      else if (isAbout) entry.data = window.__TIANLU_LOCALIZE_ABOUT__(entry.data);
      else if (isWork && Array.isArray(entry.data.projects)) {
        entry.data = window.__TIANLU_LOCALIZE_WORK__(entry.data);
      } else if (projectMatch) {
        entry.data = window.__TIANLU_LOCALIZE_PROJECT__(entry.data, projectMatch[1]);
      }
    });
    payload.routePath = window.location.pathname;
  }

  function syncRenderedContent() {
    if (!document.body) return;

    document.querySelectorAll('.lang-switch, .section-credits').forEach(function (element) {
      element.remove();
    });

    document
      .querySelectorAll('a[href^="/en"], a[href^="/fr"]')
      .forEach(function (link) {
        var url = new URL(link.getAttribute('href'), window.location.origin);
        link.setAttribute(
          'href',
          cleanLocalizedPath(url.pathname) + url.search + url.hash
        );
      });

    var pathname = window.location.pathname.replace(/\/$/, '') || '/';
    if (pathname === '/about') replaceAboutDom();
    if (pathname === '/') replaceHomeDom();
    if (/^\/work(?:\/|$)/.test(pathname)) replaceWorkDom();

    replaceNavigationLabels();
    updateSeo();
  }

  var syncFrame = null;
  function scheduleSync() {
    if (syncFrame !== null) return;
    syncFrame = window.requestAnimationFrame(function () {
      syncFrame = null;
      syncRenderedContent();
    });
  }

  document.addEventListener(
    'click',
    function (event) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      var target = event.target instanceof Element ? event.target : null;
      var link = target && target.closest('a[href]');
      if (!link || (link.target && link.target !== '_self')) return;

      var url = new URL(link.getAttribute('href'), window.location.href);
      if (url.origin !== window.location.origin) return;

      var pathname = cleanLocalizedPath(url.pathname);
      if (!/^\/(?:$|about\/?$|work(?:\/|$))/.test(pathname)) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      var destination = pathname + url.search + url.hash;
      var router = window.$nuxt && window.$nuxt.$router;
      if (router) {
        var navigation = router.push(destination);
        if (navigation && typeof navigation.catch === 'function') {
          navigation.catch(function () {});
        }
      } else {
        window.location.assign(destination);
      }
    },
    true
  );

  localizeInitialNuxtData();
  updateSeo();
  new MutationObserver(updateSeo).observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true
  });

  function startContentSync() {
    syncRenderedContent();
    new MutationObserver(scheduleSync).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  if (document.body) startContentSync();
  else document.addEventListener('DOMContentLoaded', startContentSync);

  var triggered = false;
  var timer = window.setInterval(function () {
    var element = document.querySelector('.preloader');
    var component = element && element.__vue__;

    if (!component) return;
    if (component.isReady || component.isCompleted) {
      window.clearInterval(timer);
      return;
    }

    if (
      !triggered &&
      component.isLoadingCompleted &&
      typeof component.loadingAnimationRepeatHandler === 'function'
    ) {
      triggered = true;
      component.loadingAnimationRepeatHandler();
    }
  }, 250);

  window.setTimeout(function () {
    window.clearInterval(timer);
  }, 120000);
})();
