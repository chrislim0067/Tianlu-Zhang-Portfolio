# Tianlu Zhang portfolio — React app

React 19 + TypeScript + Vite rebuild of the portfolio. Every page, component,
transition and interaction is React code in `src/`; the visual result is the
same as the original site.

## Architecture

- **UI (React)** — `src/components` (menu, menu/sound buttons, preloader, scroll
  containers, page outlet), `src/pages` (home, about, work layout + project),
  `src/content/portfolio.ts` (all copy, generated from `../portfolio-content.js`),
  `src/legacy.css` (the site's original stylesheet, extracted verbatim; components
  keep the original class names and `data-v-*` scope attributes so it applies as-is).
- **3D landscapes (vendored engine)** — the original WebGL engine (four scenes,
  post-processing, camera paths, work-slider planes) is a self-contained compiled
  module inside the original bundles. `src/legacy/runtime.ts` loads those bundle
  files (`public/_nuxt/*.js`, copied from the repo root) without booting the old
  app, and `src/legacy/index.ts` exposes the engine, GSAP (one shared ticker),
  the resource loader/manifests, the audio manager and the original Vuex store
  modules to React. `src/legacy/boot.ts` runs the same start-up sequence the old
  app did (context, device, loaders, engine). React talks to the engine through
  the small API the pages always used (`viewManager.show/hide`, `landscapeManager`,
  `postProcessing.passes`, `ui.createSlider/createImage`, `showMenu/hideMenu`).
- Shared state between React and the engine is the original store
  (`useGetter('menu/isOpen')`, `store.dispatch('scroll/lock')`, …).

## Commands

```bash
npm run dev      # syncs assets from the repo root, serves on http://127.0.0.1:5180
npm run build    # syncs assets, type-checks and builds to dist/
npm run preview  # serves the production build on http://127.0.0.1:5181
```

Content changes: edit `../portfolio-content.js`, then `npm run sync-assets`
(also run automatically by dev/build) to regenerate `src/content/portfolio.ts`.
