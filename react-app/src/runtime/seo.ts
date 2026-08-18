import { content } from '../content/portfolio';
import { routeInfoFromPath } from '../legacy/boot';

/** Same head() output as the original pages: title + description/og/twitter tags. */
export function applySeo(pathname: string) {
  const seo = content.seo.en;
  const info = routeInfoFromPath(pathname);
  let title: string = seo.defaultTitle;
  if (info.name === 'about') title = seo.aboutTitle;
  else if (info.name === 'work') title = seo.workTitle;
  else if (info.name === 'work-slug') {
    const item = content.work.en.cases.find((entry) => entry.slug === info.params.slug);
    title = item ? `${item.title} | Tianlu Zhang` : seo.workTitle;
  }
  const description = seo.description;
  document.title = title;
  const set = (selector: string, attributes: Record<string, string>, value: string) => {
    let meta = document.head.querySelector<HTMLMetaElement>(selector);
    if (!meta) {
      meta = document.createElement('meta');
      for (const [key, attribute] of Object.entries(attributes)) meta.setAttribute(key, attribute);
      document.head.appendChild(meta);
    }
    if (meta.getAttribute('content') !== value) meta.setAttribute('content', value);
  };
  set('meta[name="description"]', { name: 'description', property: 'description' }, description);
  set('meta[property="og:title"]', { property: 'og:title', name: 'og:title' }, title);
  set('meta[property="og:description"]', { property: 'og:description', name: 'og:description' }, description);
  set('meta[property="og:type"]', { property: 'og:type', name: 'og:type' }, 'website');
  set('meta[property="og:url"]', { property: 'og:url', name: 'og:url' }, window.location.origin + info.path);
  set('meta[name="twitter:card"]', { name: 'twitter:card', property: 'twitter:card' }, 'summary_large_image');
  set('meta[name="twitter:title"]', { name: 'twitter:title', property: 'twitter:title' }, title);
  set('meta[name="twitter:description"]', { name: 'twitter:description', property: 'twitter:description' }, description);
}
