/**
 * Builds a fully static copy of the site into dist/ for static hosts
 * (Vercel, Netlify, GitHub Pages…). Every route becomes an HTML file:
 *   /            -> dist/index.html
 *   /about       -> dist/about/index.html
 *   /work        -> dist/work/index.html
 *   /work/<slug> -> dist/work/<slug>/index.html
 * plus the assets. Set SITE_URL to the public origin for og:url metadata.
 */
const fs = require('fs');
const path = require('path');
const server = require('../server');
const PORTFOLIO_CONTENT = require('../portfolio-content');

const ROOT = server.ROOT;
const DIST = path.join(ROOT, 'dist');
const SITE_URL = (process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` || 'http://127.0.0.1:4173').replace(/\/$/, '');

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

function writePage(pathname, sourceFile) {
  const source = fs.readFileSync(sourceFile, 'utf8');
  const html = server.transformHtml(source, pathname, `${SITE_URL}${pathname}`);
  const target = path.join(DIST, pathname === '/' ? 'index.html' : `${pathname.slice(1)}/index.html`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html, 'utf8');
  console.log(`page  ${pathname}`);
}

for (const [pathname, file] of Object.entries(server.PAGE_FILES)) writePage(pathname, file);
for (const item of PORTFOLIO_CONTENT.work.en.cases) writePage(`/work/${item.slug}`, server.PROJECT_TEMPLATE);

const nuxtSource = path.join(ROOT, '_nuxt');
const nuxtTarget = path.join(DIST, '_nuxt');
fs.mkdirSync(nuxtTarget, { recursive: true });
for (const fileName of fs.readdirSync(nuxtSource)) {
  const source = fs.readFileSync(path.join(nuxtSource, fileName));
  const output = fileName.endsWith('.js')
    ? Buffer.from(server.transformNuxtScript(source.toString('utf8'), fileName), 'utf8')
    : source;
  fs.writeFileSync(path.join(nuxtTarget, fileName), output);
}
console.log('dir   _nuxt');

for (const dir of ['webgl', 'audio', 'fonts', 'images']) {
  fs.cpSync(path.join(ROOT, dir), path.join(DIST, dir), { recursive: true });
  console.log(`dir   ${dir}`);
}
for (const file of ['favicon.svg', 'portfolio-content.js', 'page-data.js', 'local-bootstrap.js']) {
  fs.copyFileSync(path.join(ROOT, file), path.join(DIST, file));
  console.log(`file  ${file}`);
}
console.log(`static site written to dist/ (site url: ${SITE_URL})`);
