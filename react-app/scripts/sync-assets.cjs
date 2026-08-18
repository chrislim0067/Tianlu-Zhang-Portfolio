// Copies the shared site assets from the repo root into public/ (gitignored)
// and regenerates the typed content module from portfolio-content.js.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..', '..');
const app = path.resolve(__dirname, '..');
const pub = path.join(app, 'public');

fs.rmSync(pub, { recursive: true, force: true });
fs.mkdirSync(pub, { recursive: true });
for (const entry of ['fonts', 'images', 'audio', 'webgl', 'favicon.svg', '_nuxt']) {
  fs.cpSync(path.join(root, entry), path.join(pub, entry), { recursive: true });
}

const content = require(path.join(root, 'portfolio-content.js'));
const banner = '// Generated from ../portfolio-content.js (single source of truth for copy). Regenerate with npm run sync-assets.\n';
const body = `export const content = ${JSON.stringify(content, null, 2)} as const;\n\nexport type CaseStudy = (typeof content)["work"]["en"]["cases"][number];\n`;
fs.mkdirSync(path.join(app, 'src', 'content'), { recursive: true });
fs.writeFileSync(path.join(app, 'src', 'content', 'portfolio.ts'), banner + body);
console.log('assets synced into public/, content regenerated');
