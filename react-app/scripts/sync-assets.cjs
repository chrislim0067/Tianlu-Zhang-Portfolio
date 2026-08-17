// Copies the shared site assets from the repo root into public/ (gitignored).
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..', '..');
const app = path.resolve(__dirname, '..');
const pub = path.join(app, 'public');
fs.rmSync(pub, { recursive: true, force: true });
fs.mkdirSync(pub, { recursive: true });
for (const entry of ['fonts', 'images', 'audio', 'webgl', 'favicon.svg']) {
  fs.cpSync(path.join(root, entry), path.join(pub, entry), { recursive: true });
}
console.log('assets synced into public/');
