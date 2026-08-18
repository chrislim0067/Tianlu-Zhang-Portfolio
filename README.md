# Tianlu Zhang portfolio

Tianlu Zhang's portfolio: an immersive React + WebGL site (four 3D landscapes,
ambient audio, cinematic transitions) driven entirely by local content — no CMS,
no third-party analytics.

**The site is the React app in ** (see ).
Vercel builds it with the root . The files below at the repo root
are the shared assets and copy the React app consumes, plus the earlier
static/legacy tooling (, ) kept for reference.

## Layout

| Path | Purpose |
| --- | --- |
| `portfolio-content.js` | All copy: SEO, home statements, about/expertise, contacts, case studies (EN + FR). |
| `en/*.html`, `templates/project.html` | Page shells (home, about, work index, project detail). |
| `page-data.js` | Generated payload data used by the app on client-side navigation. |
| `local-bootstrap.js` | Client companion: feeds page data to the app, syncs rendered copy/SEO. |
| `server.js` | Static server + request-time transforms (`transformHtml`, `transformNuxtScript`). |
| `images/work/` | Case-study photographs (real, openly licensed — see `images/work/CREDITS.md`). |
| `_nuxt/`, `webgl/`, `audio/`, `fonts/`, `images/` | App bundles and assets. |
| `scripts/bake.js` | Persists the transforms to disk (pages, bundles, `page-data.js`). |
| `scripts/smoke-test.js` | Route/asset/redirect checks and a scan for foreign traces. |

## Run locally

```powershell
npm run dev
```

Open `http://127.0.0.1:4173/`.

## Editing content

1. Edit `portfolio-content.js`. Each case study has an `image` (2048×1365 JPEG in
   `images/work/`); add the source and license to `images/work/CREDITS.md`.
2. Run `npm run bake` to write the updated pages, bundles and `page-data.js`.
   The server also applies the same transforms at request time, so `npm run dev`
   reflects edits immediately; baking keeps the files on disk in sync.

## Verify

With the server running:

```powershell
npm run smoke
```

## Deploy

`npm run build` (root) installs and builds `react-app/` into `react-app/dist`;
`vercel.json` serves that folder with SPA rewrites and the `/en/*` → `/*`
redirects. `npm run build:legacy` still produces the older static export in `dist/`.
