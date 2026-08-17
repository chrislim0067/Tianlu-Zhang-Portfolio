const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const PORTFOLIO_CONTENT = require('./portfolio-content');

const ROOT = __dirname;
const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 4173);
const PUBLIC_DIRECTORIES = new Set([
  'en',
  '_nuxt',
  'webgl',
  'audio',
  'fonts',
  'images'
]);
const PUBLIC_FILES = new Set([
  'favicon.svg',
  'local-bootstrap.js',
  'page-data.js',
  'portfolio-content.js'
]);
const MENU_SCOPE = 'data-v-7823738c';
const LOCAL_ASSET_VERSION = 'tianlu-content-9';
const WORK_PLACEHOLDER_URL = '/images/work-placeholder.png?placeholder=1';

// Case-study photo for a work item; French cases share the English photo by index.
function caseImage(index) {
  const item = PORTFOLIO_CONTENT.work.en.cases[index];
  return (item && item.image) || WORK_PLACEHOLDER_URL;
}
// Neutral names for the five decorative marks rendered inside the home page
// interactions (registered as Vue components in _nuxt/939a6db.js).
const HOME_LOGO_COMPONENTS = [
  'pillar-one',
  'pillar-two',
  'pillar-three',
  'pillar-four',
  'pillar-five'
];

const PAGE_FILES = {
  '/': path.join(ROOT, 'en', 'index.html'),
  '/about': path.join(ROOT, 'en', 'about', 'index.html'),
  '/work': path.join(ROOT, 'en', 'work', 'index.html')
};
const PROJECT_TEMPLATE = path.join(ROOT, 'templates', 'project.html');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.fnt': 'text/plain; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.wasm': 'application/wasm',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.hdr': 'application/octet-stream',
  '.ktx2': 'image/ktx2',
  '.basis': 'application/octet-stream',
  '.ico': 'image/x-icon'
};

function publicPath(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  if (decoded.includes('\0')) return null;

  const relative = decoded.replace(/^[/\\]+/, '');
  const firstSegment = relative.split(/[/\\]/, 1)[0];
  if (!PUBLIC_DIRECTORIES.has(firstSegment) && !PUBLIC_FILES.has(relative)) return null;

  const resolved = path.resolve(ROOT, relative);
  if (resolved !== ROOT && !resolved.startsWith(`${ROOT}${path.sep}`)) return null;
  return resolved;
}

function routeLocale(pathname) {
  return 'en';
}

function findPortfolioCase(slug) {
  for (const locale of ['en', 'fr']) {
    const index = PORTFOLIO_CONTENT.work[locale].cases.findIndex(
      (item) => item.slug === slug
    );
    if (index !== -1) return { locale, index };
  }
  return null;
}

function resolveRequest(pathname) {
  const localizedRoute = pathname.match(/^\/(?:en|fr)(\/.*)?$/);
  if (localizedRoute) {
    return { redirect: localizedRoute[1] || '/' };
  }

  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/';
  const projectRoute = normalizedPath.match(/^\/work\/([^/]+)$/);
  if (projectRoute) {
    const portfolioCase = findPortfolioCase(projectRoute[1]);
    if (!portfolioCase) return { redirect: '/work' };
    if (portfolioCase.locale === 'fr') {
      const englishCase = PORTFOLIO_CONTENT.work.en.cases[portfolioCase.index];
      return { redirect: englishCase ? `/work/${englishCase.slug}` : '/work' };
    }
    return { file: PROJECT_TEMPLATE };
  }

  const pageFile = PAGE_FILES[normalizedPath];
  if (pageFile && fs.existsSync(pageFile)) return { file: pageFile };

  const direct = publicPath(pathname);
  if (direct && fs.existsSync(direct) && fs.statSync(direct).isFile()) return { file: direct };

  return null;
}

function baseHeaders(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return {
    'Content-Type': MIME_TYPES[extension] || 'application/octet-stream',
    'Cache-Control':
      extension === '.html' || extension === '.js'
        ? 'no-store, max-age=0'
        : 'public, max-age=3600',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
}

function menuLetters(label, className = '') {
  const classAttribute = className ? ` class="${className}"` : '';
  return Array.from(label, (character) =>
    `<span${classAttribute} ${MENU_SCOPE}>${character}</span>`
  ).join('');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function characterSpans(value, attributes = '') {
  const suffix = attributes ? ` ${attributes}` : '';
  return Array.from(value, (character) =>
    `<span class="char"${suffix}>${escapeHtml(character)}</span>`
  ).join('');
}

// Rewrites the per-character <span> children of a container with new text.
function replaceCharSpans(container, text) {
  const template = container.match(/<span[^>]*>/);
  if (!template) return container;
  const open = container.slice(0, container.indexOf(template[0]));
  const close = container.slice(container.lastIndexOf('</span>') + '</span>'.length);
  const spans = Array.from(text, (character) =>
    `${template[0]}${character === ' ' ? '' : escapeHtml(character)}</span>`
  ).join('');
  return `${open}${spans}${close}`;
}

function replaceHomeContent(source, locale) {
  const home = PORTFOLIO_CONTENT.home[locale];
  let statementIndex = 0;
  return source
    .replace(
      /(<div class="section-home[\s\S]*?<h1 class="heading"[^>]*>)[\s\S]*?(<\/h1>)/,
      `$1\n            ${escapeHtml(home.summary)}\n        $2`
    )
    .replace(
      /(<span class="the-end-title"[^>]*>)[\s\S]*?(<\/span>)/,
      `$1${escapeHtml(home.endScreen)}$2`
    )
    // Home interaction statements (one .interaction block per statement).
    .replace(
      /(<div class="interaction"[\s\S]*?<div class="content"[^>]*>)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/div>)/g,
      (match, start, chars, end) => {
        const statement = home.statements[statementIndex++];
        return statement ? `${start}${replaceCharSpans(chars, statement)}${end}` : match;
      }
    )
    // "Click to …" tutorial hint.
    .replace(
      /(<div class="tutorial"[^>]*>\s*<div class="content"[^>]*>)([\s\S]*?)(<\/div>\s*<\/div>)/,
      (match, start, chars, end) => `${start}${replaceCharSpans(chars, home.interaction)}${end}`
    );
}

// Preloader logo words (present on every page).
function replacePreloaderName(source) {
  let wordIndex = 0;
  const words = ['Tianlu', 'Zhang'];
  return source.replace(
    /(<div class="logo-animation[\s\S]*?<div class="name"[^>]*>)([\s\S]*?)(<\/div>\s*<\/div>\s*<div class="cursor-intro")/,
    (match, start, body, end) => {
      const rewritten = body.replace(
        /(<div class="word"[^>]*>)([\s\S]*?)(<\/div>)/g,
        (word, open, chars, close) => `${open}${replaceCharSpans(chars, words[wordIndex++] || '')}${close}`
      );
      return `${start}${rewritten}${end}`;
    }
  );
}

function replaceSectionIntro(source, summary, paragraphs) {
  return source.replace(
    /<section class="section-intro[\s\S]*?<\/section>/,
    (section) => {
      let paragraphIndex = 0;
      return section
        .replace(
          /(<h1 class="heading"[^>]*>)[\s\S]*?(<\/h1>)/,
          `$1\n            ${escapeHtml(summary)}\n        $2`
        )
        .replace(
          /(<div class="paragraph"[^>]*>\s*<p>)[\s\S]*?(<\/p>)/g,
          (match, start, end) => {
            const paragraph = paragraphs[paragraphIndex++];
            return paragraph ? `${start}${escapeHtml(paragraph)}${end}` : match;
          }
        );
    }
  );
}

function replaceExpertiseMarkup(source, locale) {
  const expertise = PORTFOLIO_CONTENT.about[locale].expertise;
  return source.replace(
    /<section class="section-companies[\s\S]*?<\/section>/,
    (section) => {
      let logoIndex = 0;
      let headingIndex = 0;
      let descriptionIndex = 0;
      let wordIndex = 0;
      return section
        .replace(/<img [^>]*class="logo"[^>]*>/g, (image) => {
          const item = expertise[logoIndex++ % expertise.length];
          return image
            .replace(/src="[^"]*"/, `src="${item.icon}"`)
            .replace(/width="[^"]*"/, 'width="512"')
            .replace(/height="[^"]*"/, 'height="512"');
        })
        .replace(
          /(<div class="subtitle"[^>]*>)[\s\S]*?(<\/div>)/g,
          (match, start, end) => {
            const item = expertise[headingIndex++ % expertise.length];
            return `${start}\n                                ${escapeHtml(item.heading)}\n                            ${end}`;
          }
        )
        .replace(
          /(<div class="paragraph paragraph--small"[^>]*>\s*<p>)[\s\S]*?(<\/p>)/g,
          (match, start, end) => {
            const item = expertise[descriptionIndex++ % expertise.length];
            return `${start}${escapeHtml(item.description)}${end}`;
          }
        )
        .replace(
          /(<div class="name"[^>]*>\s*<p>)[\s\S]*?(<\/p>)/g,
          (match, start, end) => {
            const item = expertise[wordIndex++ % expertise.length];
            const letters = Array.from(item.word, (letter) =>
              `<span>${escapeHtml(letter)}</span>`
            ).join('');
            return `${start}${letters}${end}`;
          }
        );
    }
  );
}

function replaceContactMarkup(source, locale) {
  const contacts = PORTFOLIO_CONTENT.contact[locale];
  let index = 0;
  return source.replace(
    /<li class="contact-list-item"[\s\S]*?<\/li>/g,
    (item) => {
      const contact = contacts[index++];
      if (!contact) return item;
      return item
        .replace(
          /(<a )href="[^"]*"( class="contact-email button"[^>]*>)[\s\S]*?(<\/a>)/,
          `$1href="${escapeHtml(contact.href)}"$2${characterSpans(
            contact.text,
            'data-v-cf44b1ea'
          )}$3`
        )
        .replace(
          /(<span class="contact-label is-offset"[^>]*>)[\s\S]*?(<\/span>)/,
          `$1${escapeHtml(contact.label)}$2`
        );
    }
  );
}

function replaceAboutContent(source, locale) {
  const about = PORTFOLIO_CONTENT.about[locale];
  let localized = replaceSectionIntro(source, about.summary, about.paragraphs);
  localized = replaceExpertiseMarkup(localized, locale);
  return replaceContactMarkup(localized, locale).replace(
    /<section class="section-credits[\s\S]*?<\/section>/,
    ''
  );
}

function replaceFilterMarkup(source, locale) {
  const filters = PORTFOLIO_CONTENT.work[locale].filters;
  let inputIndex = 0;
  let labelIndex = 0;
  return source
    .replace(/<input [^>]*class="tag-input"[^>]*>/g, (input) => {
      const filter = filters[inputIndex++];
      if (!filter) return input;
      return input
        .replace(/id="[^"]*"/, `id="${filter.uid}"`)
        .replace(/value="[^"]*"/, `value="${filter.uid}"`);
    })
    .replace(
      /(<label )for="[^"]*"( class="tag-label"[^>]*>)[\s\S]*?(<\/label>)/g,
      (match, start, middle, end) => {
        const filter = filters[labelIndex++];
        return filter
          ? `${start}for="${filter.uid}"${middle}${escapeHtml(filter.label)}${end}`
          : match;
      }
    );
}

function replaceWorkCards(source, locale) {
  const cases = PORTFOLIO_CONTENT.work[locale].cases;
  let index = 0;
  return source.replace(
    /<div data-uid="[^"]+" class="block"[\s\S]*?<\/a><\/div>/g,
    (block) => {
      const item = cases[index++];
      if (!item) return '';
      return block
        .replace(/data-uid="[^"]+"/, `data-uid="${item.slug}"`)
        .replace(/href="\/(?:(?:en|fr)\/)?work\/[^"]+"/, `href="/work/${item.slug}"`)
        .replace(
          /(<img )src="[^"]*" alt(?:="[^"]*")?( class="image")/,
          `$1src="${caseImage(index - 1)}" alt="${escapeHtml(item.title)}"$2`
        )
        .replace(
          /(<div class="name js-name"[^>]*>)[\s\S]*?(<\/div>)/,
          `$1\n                    ${escapeHtml(item.title)}\n                $2`
        );
    }
  );
}

function replaceProjectDetailMarkup(source, locale, item) {
  if (!item) return source;
  return source.replace(
    /<section class="section-project js-section-project"[\s\S]*?<\/section>/,
    (section) =>
      section
        .replace(
          /(<h1 class="heading"[^>]*>)[\s\S]*?(<\/h1>)/,
          `$1\n            ${escapeHtml(item.title)}\n        $2`
        )
        .replace(
          /(<div class="description"[^>]*>\s*<div[^>]*>)[\s\S]*?(<\/div>\s*<\/div>)/,
          `$1${item.detail
            .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
            .join('')}$2`
        )
  );
}

function replaceWorkContent(source, locale, pathname) {
  const work = PORTFOLIO_CONTENT.work[locale];
  let localized = replaceFilterMarkup(replaceWorkCards(source, locale), locale)
    .replaceAll('Our Work', work.heading)
    .replaceAll('See Our Work', work.seeWork);

  const projectMatch = pathname.match(/^\/work\/([^/]+)\/?$/);
  if (projectMatch) {
    const match = findPortfolioCase(projectMatch[1]);
    const item = match ? work.cases[match.index] : null;
    localized = replaceProjectDetailMarkup(localized, locale, item);
  }

  return localized;
}

function cloneData(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function setPayloadSeo(data, pathname) {
  if (!data) return data;
  const seo = pageSeo(pathname);
  data.seo_meta_title = seo.title;
  data.seo_meta_description = seo.description;
  data.seo_og_image = {};
  return data;
}

function localizeHomeData(data, locale, pathname) {
  const home = PORTFOLIO_CONTENT.home[locale];
  data.title = home.summary;
  data.interaction_indication = home.interaction;
  data.end_screen = home.endScreen;
  data.interactions = home.statements.map((statement, index) => ({
    ...(data.interactions?.[index] || {}),
    text: statement,
    logo: HOME_LOGO_COMPONENTS[index % HOME_LOGO_COMPONENTS.length]
  }));
  return setPayloadSeo(data, pathname);
}

function localizeAboutData(data, locale, pathname) {
  const about = PORTFOLIO_CONTENT.about[locale];
  data.title = [{ type: 'heading1', text: about.summary, spans: [] }];
  data.description = about.paragraphs.map((text) => ({
    type: 'paragraph',
    text,
    spans: []
  }));

  const expertise = about.expertise;
  const sourceCompanies = Array.isArray(data.companies) ? data.companies : [];
  data.companies = expertise.map((item, index) => ({
    ...(sourceCompanies[index] || {}),
    logo: {
      dimensions: { width: 512, height: 512 },
      alt: item.heading,
      copyright: null,
      url: item.icon
    },
    name: [{ type: 'paragraph', text: item.word, spans: [] }],
    short_description: item.heading,
    long_description: [{ type: 'paragraph', text: item.description, spans: [] }]
  }));

  data.contacts = PORTFOLIO_CONTENT.contact[locale].map((contact) => ({
    email: contact.text,
    label: contact.label
  }));
  return setPayloadSeo(data, pathname);
}

function localizeWorkData(data, locale, pathname) {
  const work = PORTFOLIO_CONTENT.work[locale];
  const sourceProjects = Array.isArray(data.projects) ? data.projects : [];
  data.projects = work.cases.map((item, index) => {
    const sourceEntry = sourceProjects[index % Math.max(sourceProjects.length, 1)];
    const entry = cloneData(sourceEntry) || { project: {} };
    const project = entry.project || (entry.project = {});
    project.id = `tianlu-${locale}-${index + 1}`;
    project.uid = item.slug;
    project.slug = item.slug;
    project.lang = locale === 'fr' ? 'fr-fr' : 'en-gb';
    project.data = project.data || {};
    project.data.name = item.title;
    project.data.title = item.title;
    project.data.short_description = item.short;
    project.data.main_image = {
      dimensions: { width: 2048, height: 1365 },
      alt: item.title,
      copyright: null,
      url: caseImage(index)
    };
    project.data.tags = [
      {
        tag: {
          id: `tianlu-tag-${item.category}`,
          uid: item.category,
          slug: item.category,
          type: 'project_tag',
          lang: project.lang,
          link_type: 'Document',
          isBroken: false
        }
      }
    ];
    return entry;
  });
  data.tags = work.filters.slice(1).map((filter) => ({
    id: `tianlu-tag-${filter.uid}`,
    uid: filter.uid,
    type: 'project_tag',
    lang: locale === 'fr' ? 'fr-fr' : 'en-gb',
    data: { tag_name: filter.label }
  }));
  return setPayloadSeo(data, pathname);
}

function localizeProjectData(data, locale, pathname, slug) {
  const match = findPortfolioCase(slug);
  if (!match) return data;
  const item = PORTFOLIO_CONTENT.work[locale].cases[match.index];
  const localized = data || {};
  localized.title = item.title;
  localized.name = item.title;
  localized.short_description = item.short;
  localized.description = item.detail.map((text) => ({
    type: 'paragraph',
    text,
    spans: []
  }));
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
  return setPayloadSeo(localized, pathname);
}

function parseNuxtPayload(source, pathname) {
  const match = source.match(/<script>window\.__NUXT__=([\s\S]*?);<\/script>/);
  if (!match) return null;
  try {
    return {
      raw: match[0],
      // Parenthesised so both the captured IIFE form and a baked JSON literal parse.
      payload: vm.runInNewContext(`(${match[1]})`, Object.create(null), { timeout: 1000 })
    };
  } catch (error) {
    console.error(`Unable to parse Nuxt payload for ${pathname}: ${error.message}`);
    return null;
  }
}

function localizePayloadData(payload, pathname) {
  const locale = routeLocale(pathname);
  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  const isHome = normalizedPath === '/';
  const isAbout = normalizedPath === '/about';
  const projectMatch = normalizedPath.match(/^\/work\/([^/]+)$/);
  const isWork = /^\/work(?:\/|$)/.test(normalizedPath);

  if (Array.isArray(payload.data)) {
    payload.data.forEach((entry) => {
      if (!entry?.data) return;
      if (isHome) entry.data = localizeHomeData(entry.data, locale, pathname);
      else if (isAbout) {
        entry.data = localizeAboutData(entry.data, locale, pathname);
      } else if (isWork && Array.isArray(entry.data.projects)) {
        entry.data = localizeWorkData(entry.data, locale, pathname);
      } else if (projectMatch) {
        entry.data = localizeProjectData(
          entry.data,
          locale,
          pathname,
          projectMatch[1]
        );
      }
    });
  }
  payload.routePath = pathname;
  return payload;
}

function localizeNuxtPayload(source, pathname) {
  const parsed = parseNuxtPayload(source, pathname);
  if (!parsed) return source;
  const payload = localizePayloadData(parsed.payload, pathname);
  const serialized = JSON.stringify(payload).replaceAll('<', '\\u003c');
  return source.replace(parsed.raw, `<script>window.__NUXT__=${serialized};</script>`);
}

function replaceAssignedObject(source, key, replacement) {
  let offset = 0;
  let result = source;
  const marker = `${key}:`;

  while ((offset = result.indexOf(marker, offset)) !== -1) {
    const start = offset + marker.length;
    if (result[start] !== '{') {
      offset = start;
      continue;
    }

    let depth = 0;
    let quote = null;
    let escaped = false;
    let end = start;
    for (; end < result.length; end++) {
      const character = result[end];
      if (quote) {
        if (escaped) escaped = false;
        else if (character === '\\') escaped = true;
        else if (character === quote) quote = null;
        continue;
      }
      if (character === '"' || character === "'") quote = character;
      else if (character === '{') depth++;
      else if (character === '}' && --depth === 0) {
        end++;
        break;
      }
    }

    result = `${result.slice(0, start)}${replacement}${result.slice(end)}`;
    offset = start + replacement.length;
  }

  return result;
}

function pageSeo(pathname) {
  const locale = routeLocale(pathname);
  const seo = PORTFOLIO_CONTENT.seo[locale];
  const projectMatch = pathname.match(/^\/work\/([^/]+)\/?$/);
  if (projectMatch) {
    const match = findPortfolioCase(projectMatch[1]);
    const item = match && PORTFOLIO_CONTENT.work[locale].cases[match.index];
    return {
      locale,
      title: item ? `${item.title} | Tianlu Zhang` : seo.workTitle,
      description: seo.description
    };
  }
  if (/^\/about\/?$/.test(pathname)) {
    return { locale, title: seo.aboutTitle, description: seo.description };
  }
  if (/^\/work\/?$/.test(pathname)) {
    return { locale, title: seo.workTitle, description: seo.description };
  }
  return { locale, title: seo.defaultTitle, description: seo.description };
}

function replaceSeoMetadata(source, pathname, requestUrl) {
  const seo = pageSeo(pathname);
  const removeMeta = (html, selector) =>
    html.replace(new RegExp(`<meta\\b(?=[^>]*${selector})[^>]*>`, 'gi'), '');
  let localized = source.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(seo.title)}</title>`
  );

  for (const selector of [
    '(?:data-hid|name|property)="description"',
    '(?:data-hid|name|property)="og:title"',
    '(?:data-hid|name|property)="og:description"',
    '(?:data-hid|name|property)="og:url"',
    '(?:data-hid|name|property)="og:image[^\"]*"',
    '(?:data-hid|name|property)="twitter:title"',
    '(?:data-hid|name|property)="twitter:description"',
    '(?:data-hid|name|property)="twitter:image[^\"]*"'
  ]) {
    localized = removeMeta(localized, selector);
  }

  const metadata = [
    `<meta data-hid="description" name="description" property="description" content="${escapeHtml(seo.description)}">`,
    `<meta data-hid="og:title" property="og:title" content="${escapeHtml(seo.title)}">`,
    `<meta data-hid="og:description" property="og:description" content="${escapeHtml(seo.description)}">`,
    `<meta data-hid="og:url" property="og:url" content="${escapeHtml(requestUrl)}">`,
    `<meta data-hid="twitter:title" name="twitter:title" content="${escapeHtml(seo.title)}">`,
    `<meta data-hid="twitter:description" name="twitter:description" content="${escapeHtml(seo.description)}">`
  ].join('');

  localized = localized
    .replace('</title>', `</title>${metadata}`)
    .replace(/<html([^>]*)\slang="[^"]*"/i, `<html$1 lang="${seo.locale}"`)
    .replace(
      /seo_meta_title:"(?:[^"\\]|\\.)*"/g,
      `seo_meta_title:${JSON.stringify(seo.title)}`
    )
    .replace(
      /seo_meta_description:"(?:[^"\\]|\\.)*"/g,
      `seo_meta_description:${JSON.stringify(seo.description)}`
    );

  return replaceAssignedObject(localized, 'seo_og_image', '{}');
}

function applyLocalBranding(source) {
  let branded = source.replace(/<title>.*?<\/title>/i, '<title>Tianlu Zhang</title>');

  const labels = [
    ['About us', 'About me'],
    ['Our Work', 'My Work']
  ];
  for (const [original, replacement] of labels) {
    branded = branded.replaceAll(menuLetters(original), menuLetters(replacement));
    branded = branded.replaceAll(
      menuLetters(original, 'chars'),
      menuLetters(replacement, 'chars')
    );
  }

  branded = branded
    .replace(/<div class="lang-switch\b[\s\S]*?<\/div>\s*<\/div>/g, '')
    .replace(
      /href="\/(?:en|fr)(\/[^\"]*)?"/g,
      (match, suffix) => `href="${suffix || '/'}"`
    )
    .replace(
      /<link\b[^>]*rel="icon"[^>]*>/i,
      '<link data-n-head="ssr" rel="icon" type="image/svg+xml" href="/favicon.svg">'
    );

  return branded.replace(
    /(\/_nuxt\/[a-z0-9]+\.js)(?:\?[^"']*)?/g,
    `$1?v=${LOCAL_ASSET_VERSION}`
  );
}

const CONTENT_SCRIPT = `<script src="/portfolio-content.js?v=${LOCAL_ASSET_VERSION}"></script>`;
const PAGE_DATA_SCRIPT = `<script src="/page-data.js?v=${LOCAL_ASSET_VERSION}"></script>`;
const BOOTSTRAP_SCRIPT = `<script src="/local-bootstrap.js?v=${LOCAL_ASSET_VERSION}"></script>`;

/**
 * Applies every portfolio transform to a captured HTML page. Used both at
 * request time and by scripts/bake.js to persist the result on disk. All
 * replacements are positional, so applying them repeatedly is safe.
 */
function transformHtml(source, pathname, requestUrl) {
  const locale = routeLocale(pathname);
  const isHome = /^\/?$/.test(pathname);
  const isAbout = /^\/about\/?$/.test(pathname);
  const isWork = /^\/work(?:\/|$)/.test(pathname);
  let pageSource = replacePreloaderName(applyLocalBranding(source));
  if (isHome) pageSource = replaceHomeContent(pageSource, locale);
  if (isAbout) pageSource = replaceAboutContent(pageSource, locale);
  if (isWork) pageSource = replaceWorkContent(pageSource, locale, pathname);
  pageSource = localizeNuxtPayload(pageSource, pathname);
  pageSource = replaceSeoMetadata(pageSource, pathname, requestUrl);

  pageSource = pageSource.replace(
    /<script src="\/(?:portfolio-content|page-data|local-bootstrap)\.js[^"]*"><\/script>\s*/g,
    ''
  );
  return pageSource.replace(
    '</body>',
    `${CONTENT_SCRIPT}\n${PAGE_DATA_SCRIPT}\n${BOOTSTRAP_SCRIPT}\n</body>`
  );
}

const NUXT_ROUTES =
  'routes:[{path:"/",component:C,name:"index___en"},{path:"/about",component:O,name:"about___en"},{path:"/error",component:L,name:"error___en"},{path:"/legal-mentions",component:k,name:"legal-mentions___en"},{path:"/not-supported",component:M,name:"not-supported___en"},{path:"/work",component:T,children:[{path:"",component:P,name:"work___en"},{path:"overview-layout/script",component:R,name:"work-overview-layout-script___en"},{path:"overview/script",component:D,name:"work-overview-script___en"},{path:":slug",component:A,name:"work-slug___en"},{path:":slug/script",component:E,name:"work-slug-script___en"}]},{path:"/about/script",component:I,name:"about-script___en"},{path:"/error/script",component:j,name:"error-script___en"},{path:"/home/script",component:F,name:"home-script___en"},{path:"/legal-mentions/script",component:B,name:"legal-mentions-script___en"},{path:"/not-supported/script",component:U,name:"not-supported-script___en"}],fallback:!1';

const WORK_ASYNC_DATA =
  'data=n.data;data.tags=r.results;return {data:window.__TIANLU_LOCALIZE_WORK__(data)}';
// Earlier bakes forced a placeholder image inside the work asyncData; strip it.
const LEGACY_PLACEHOLDER_LOOP =
  /for\(var i=0;i<data\.projects\.length;i\+\+\)\{var p=data\.projects\[i\]\.project;p&&p\.data&&p\.data\.main_image&&\(p\.data\.main_image\.url="[^"]*"\)\}/g;

/**
 * Patches a captured Nuxt chunk so it runs entirely against local content:
 * single-locale routes, local page data instead of the CMS client, no
 * analytics, and neutral names for the decorative home-page marks.
 */
function transformNuxtScript(source, fileName) {
  let patched = source
    .replace(LEGACY_PLACEHOLDER_LOOP, '')
    // Every page chunk builds og:url from a hardcoded absolute origin.
    .replace(
      /content:"https?:\/\/[^"]+"\.concat\(this\.\$route\.path\)/g,
      'content:window.location.origin.concat(this.$route.path)'
    )
    // Page chunks fetch CMS documents on client-side navigation.
    .replace(
      /t\.\$api\.getSingleDocumentByType\("(home|about)"\)/g,
      'window.__TIANLU_PAGE__("$1")'
    )
    .replace(
      /e\.getSingleDocumentByType\("work",\{fetchLinks:\[[^\]]*\]\}\)/g,
      'window.__TIANLU_PAGE__("work")'
    )
    .replace(/e\.getDocumentsByType\("project_tag"\)/g, 'window.__TIANLU_PAGE__("project_tag")')
    .replace(/e\.getDocumentsByType\("project"\)/g, 'window.__TIANLU_PAGE__("project")');

  if (fileName === 'acefdce.js') {
    patched = patched
      .replace(
        /routes:\[\{path:"\/en",component:C,name:"index___en"\}[\s\S]*?\],fallback:!1/,
        NUXT_ROUTES
      )
      .replaceAll('About us', 'About me')
      .replaceAll('Our Work', 'My Work')
      .replace(/head:\{title:"[^"]*"/, 'head:{title:"Tianlu Zhang"')
      .replace(/name:\["[^"]*","[^"]*"\],cursorsBounds/, 'name:["Tianlu","Zhang"],cursorsBounds')
      .replace(
        /\[e\._v\("\\n\s+[^"]*"\),n\("br"\),e\._v\("[^"]*\\n\s+"\)\]/,
        '[e._v("\\n                    Tianlu"),n("br"),e._v("Zhang\\n                ")]'
      )
      .replace(/\{rel:"icon",type:"image\/png",href:"\/favicon\.png"\}/, '{rel:"icon",type:"image/svg+xml",href:"/favicon.svg"}')
      .replace(/https?:\/\/[a-z0-9.-]+\.prismic\.io\/api\/v2/g, '/cms/api/v2')
      // Do not install the analytics plugin at all, and drop the two bootstrap()
      // calls (preloader mount + click) that would load the tag script.
      .replace(/l\.a\.use\(Me\.b,\{appName:"[^"]*",config:\{id:"[^"]*"\}[\s\S]*?\},t\.router\)/, 'void 0')
      .replaceAll('Object(Me.a)().then((function(){console.log("GTAG Enabled")}))', 'void 0')
      .replace(/new O\.a\("[a-z0-9]+"\),this\._menuOrder/, 'new O.a("tianlu"),this._menuOrder');
  }

  if (fileName === '607f2e3.js') {
    patched = patched.replace(
      /\[t\._v\("\\n\s+[^"]*"\),n\("br"\),t\._v\("[^"]*\\n"\)\]/,
      '[t._v("\\n    Tianlu"),n("br"),t._v("Zhang\\n")]'
    );
  }

  if (fileName === '58a2963.js') {
    patched = patched.replace('data=n.data;return data.tags=r.results,{data:data}', WORK_ASYNC_DATA);
  }
  if (fileName === '10bd36f.js') {
    patched = patched.replace(
      'data=n.data;return data.tags=o.results,{data:data}',
      WORK_ASYNC_DATA.replace('r.results', 'o.results')
    );
  }
  if (fileName === '1c27ea9.js' || fileName === 'af1605f.js') {
    patched = patched.replace(
      'return{data:Object(r.a)(t,1)[0].data}',
      'return{data:window.__TIANLU_LOCALIZE_HOME__(Object(r.a)(t,1)[0].data)}'
    );
  }
  if (fileName === 'e80e561.js' || fileName === '4fcd311.js') {
    patched = patched.replace(
      'return{data:Object(r.a)(t,1)[0].data}',
      'return{data:window.__TIANLU_LOCALIZE_ABOUT__(Object(r.a)(t,1)[0].data)}'
    );
  }
  if (fileName === '939a6db.js') {
    patched = patched
      // Newer Chrome throws when getTotalLength() runs on a non-rendered SVG
      // path (the menu line while hidden); a throw here would abort every other
      // resize listener, so guard it.
      .replace(
        'resize:function(){this.lineLength=this.$refs.line.getTotalLength(),',
        'resize:function(){var line=this.$refs.line;if(!line||!line.isConnected||!line.getClientRects().length)return;this.lineLength=line.getTotalLength(),'
      )
      .replace(
        /components:\{[A-Za-z0-9]+:P\.a,[A-Za-z0-9]+:\$\.a,[A-Za-z0-9]+:j\.a,[A-Za-z0-9]+:T\.a,[A-Za-z0-9]+:M\.a\}/,
        'components:{PillarOne:P.a,PillarTwo:$.a,PillarThree:j.a,PillarFour:T.a,PillarFive:M.a}'
      )
      // Keep only the two animated diamonds of each decorative mark; drop the
      // letterform paths that followed them.
      .replace(
        /(staticClass:"diamond",attrs:\{d:"[^"]+",fill:"white"\}\}\))((?:,n\("path",\{attrs:\{d:"[^"]+",fill:"white"\}\}\))+)\]\)/g,
        '$1])'
      );
  }
  if (fileName === 'bd00b3a.js') {
    patched = patched
      .replace(/components:\{[A-Za-z0-9]+:c\.a\}/, 'components:{PillarOne:c.a}')
      // Empty the site-credits component instead of rendering a studio link.
      .replace(
        /\[t\._v\("Website by "\),o\("a",\{attrs:\{href:"[^"]*",target:"_blank"\}\},\[t\._v\("[^"]*"\)\]\)\]/,
        '[]'
      );
  }

  return patched;
}

function sendFile(req, res, filePath, pathname) {
  const stats = fs.statSync(filePath);
  const headers = baseHeaders(filePath);
  const extension = path.extname(filePath).toLowerCase();
  const range = req.headers.range;

  if (extension === '.html') {
    const source = fs.readFileSync(filePath, 'utf8');
    const protocol = String(req.headers['x-forwarded-proto'] || 'http')
      .split(',')[0]
      .trim();
    const host = req.headers.host || `${HOST}:${PORT}`;
    const html = transformHtml(source, pathname, `${protocol}://${host}${pathname}`);
    const body = Buffer.from(html, 'utf8');
    res.writeHead(200, { ...headers, 'Content-Length': body.length });
    if (req.method === 'HEAD') return res.end();
    res.end(body);
    return;
  }

  if (extension === '.js' && filePath.startsWith(path.join(ROOT, '_nuxt'))) {
    const source = fs.readFileSync(filePath, 'utf8');
    const body = Buffer.from(transformNuxtScript(source, path.basename(filePath)), 'utf8');
    res.writeHead(200, {
      ...headers,
      'Cache-Control': 'no-store, max-age=0',
      'Content-Length': body.length
    });
    if (req.method === 'HEAD') return res.end();
    res.end(body);
    return;
  }

  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!match) {
      res.writeHead(416, { ...headers, 'Content-Range': `bytes */${stats.size}` });
      res.end();
      return;
    }

    const start = match[1] ? Number(match[1]) : 0;
    const end = match[2] ? Math.min(Number(match[2]), stats.size - 1) : stats.size - 1;
    if (start > end || start >= stats.size) {
      res.writeHead(416, { ...headers, 'Content-Range': `bytes */${stats.size}` });
      res.end();
      return;
    }

    res.writeHead(206, {
      ...headers,
      'Accept-Ranges': 'bytes',
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Content-Length': end - start + 1
    });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(filePath, { start, end }).pipe(res);
    return;
  }

  res.writeHead(200, {
    ...headers,
    'Accept-Ranges': 'bytes',
    'Content-Length': stats.size
  });
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(filePath).pipe(res);
}

function createServer() {
  return http.createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD' });
      res.end();
      return;
    }

    let pathname;
    try {
      pathname = new URL(req.url, 'http://localhost').pathname;
    } catch {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad request');
      return;
    }

    const resolved = resolveRequest(pathname);
    if (resolved?.redirect) {
      res.writeHead(302, { Location: resolved.redirect });
      res.end();
      return;
    }

    if (!resolved?.file) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Not found: ${pathname}`);
      return;
    }

    try {
      sendFile(req, res, resolved.file, pathname);
    } catch (error) {
      console.error(error);
      if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal server error');
    }
  });
}

module.exports = {
  ROOT,
  PAGE_FILES,
  PROJECT_TEMPLATE,
  transformHtml,
  transformNuxtScript,
  parseNuxtPayload,
  localizePayloadData
};

if (require.main === module) {
  const server = createServer();
  server.on('error', (error) => {
    console.error(`Unable to start the portfolio server: ${error.message}`);
    process.exitCode = 1;
  });
  server.listen(PORT, HOST, () => {
    console.log(`Tianlu Zhang portfolio: http://${HOST}:${PORT}/`);
  });
}
