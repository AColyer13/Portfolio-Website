# Browser support

Static portfolio on GitHub Pages. English, LTR only.

## Supported browsers

From `package.json` `browserslist`: last 2 versions of Chrome, Firefox, Safari (16+), and Edge.

CI runs axe on a production build (`npm run test:a11y`). Spot-check on a real phone before each release to `main`.

## Feature detection in use

| Pattern | Where | Why |
| ------- | ----- | --- |
| `prefers-color-scheme` | `src/index.css` | System theme when toggle is "system" |
| `prefers-reduced-motion` | `src/index.css` | Disable animations |
| `prefers-contrast: more` | `src/index.css` | Higher contrast |
| `forced-colors: active` | `src/index.css` | Windows High Contrast |
| `hover` / `pointer` media | `src/index.css` | Touch vs mouse feedback |
| `env(safe-area-inset-*)` | Navbar, layout classes | iPhone notch |
| `scrollbar-gutter: stable` | `src/index.css` | No layout shift from scrollbars |
| `startViewTransition` (View Transitions API) | `useSectionNavigation` | Cross-fade between section jumps |

## Known quirks

- **iOS input zoom** — Form fields use `text-base` (16px) so Safari does not zoom on focus.
- **`prefers-reduced-transparency`** — Ignored by Safari; decorative overlays only.
- **`content-visibility: auto`** — Used on Skills / Experience / Contact, not Projects (BFCache tab-restore bug with links).
- **Map iframe** — `loading="eager"` when shown; lazy iframes break inside `content-visibility` parents.

## Pre-release checklist

- [ ] Chrome — console clean, visual pass
- [ ] iPhone Safari — safe areas, tap feedback
- [ ] Android Chrome — keyboard resize, dark mode
- [ ] `npm run test:a11y` — zero critical / serious violations
