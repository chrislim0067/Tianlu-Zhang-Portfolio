const PORTFOLIO_CONTENT = require('../portfolio-content');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const FOREIGN_TRACES = /artisan|mardi8|lundi8|mercredi8|jeudi8|vendredi8|prismic\.io|immersive-g|G-8ERKEWB1L1|googletagmanager/i;

function projectRoutes() {
  return PORTFOLIO_CONTENT.work.en.cases.map((item) => `/work/${item.slug}`);
}

async function check(route, expectedType) {
  const response = await fetch(`${BASE_URL}${route}`);
  if (!response.ok) throw new Error(`${route} returned ${response.status}`);
  const type = response.headers.get('content-type') || '';
  if (expectedType && !type.includes(expectedType)) {
    throw new Error(`${route} returned ${type}, expected ${expectedType}`);
  }
  return response;
}

async function checkClean(route) {
  const body = await (await check(route)).text();
  const match = body.match(FOREIGN_TRACES);
  if (match) throw new Error(`${route} still contains "${match[0]}"`);
}

(async () => {
  const routes = ['/', '/about', '/work', ...projectRoutes()];
  for (const route of routes) await check(route, 'text/html');

  const assets = [
    ['/_nuxt/27e0753.js', 'javascript'],
    ['/_nuxt/acefdce.js', 'javascript'],
    ['/portfolio-content.js', 'javascript'],
    ['/page-data.js', 'javascript'],
    ['/local-bootstrap.js', 'javascript'],
    ['/favicon.svg', 'image/svg+xml'],
    ['/webgl/libs/draco/draco_decoder.wasm', 'application/wasm'],
    ['/webgl/scenes/shared/bird.glb', 'model/gltf-binary'],
    ['/audio/audio-main.mp3', 'audio/mpeg'],
    ['/fonts/Barlow-Regular.woff2', 'font/woff2']
  ];
  for (const [asset, type] of assets) await check(asset, type);

  const scanned = [
    ...routes,
    '/_nuxt/acefdce.js',
    '/_nuxt/939a6db.js',
    '/_nuxt/bd00b3a.js',
    '/page-data.js',
    '/local-bootstrap.js'
  ];
  for (const route of scanned) await checkClean(route);

  for (const [legacy, canonical] of [
    ['/en', '/'],
    ['/en/about', '/about'],
    ['/en/work', '/work'],
    ['/fr', '/'],
    ['/fr/about', '/about'],
    ['/fr/work', '/work'],
    ['/work/some-old-project-slug', '/work'],
    [`/fr/work/${PORTFOLIO_CONTENT.work.fr.cases[0].slug}`, `/work/${PORTFOLIO_CONTENT.work.fr.cases[0].slug}`],
    [`/work/${PORTFOLIO_CONTENT.work.fr.cases[0].slug}`, `/work/${PORTFOLIO_CONTENT.work.en.cases[0].slug}`]
  ]) {
    const response = await fetch(`${BASE_URL}${legacy}`, { redirect: 'manual' });
    if (response.status !== 302 || response.headers.get('location') !== canonical) {
      throw new Error(`${legacy} did not redirect to ${canonical}`);
    }
  }

  const missing = await fetch(`${BASE_URL}/this-route-does-not-exist`);
  if (missing.status !== 404) throw new Error(`Missing route returned ${missing.status}, expected 404`);

  console.log(
    `Smoke test passed: ${routes.length} pages, ${assets.length} assets, ${scanned.length} responses scanned for foreign traces.`
  );
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
