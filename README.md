# Portfolio Website

Personal portfolio (React + TypeScript + Vite).

**Live site:** https://acolyer13.github.io/Portfolio-Website/

## Tech stack

- React (TypeScript), Vite
- Custom CSS + Bootstrap (CDN)
- Icons: Font Awesome, Unicons (CDN)
- Contact: EmailJS (client-side)
- Map: Google Maps embed

## Project layout

```
public/          # Static assets (PDF, images); copied to dist/
src/
  components/    # UI sections
  data/          # portfolio.ts — projects, skills, timeline
  utils/         # e.g. base URL helpers for GitHub Pages
```

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run preview:pages` | Build then preview (useful before deploy) |
| `npm run lint` | ESLint |
| `npm run test` | Unit tests (Vitest) |

## Customize

- **Projects / skills / timeline:** `src/data/portfolio.ts`
- **Copy & sections:** `src/components/`
- **Theme:** `src/App.css`, `src/index.css`

## Deployment (GitHub Pages)

On push to **`main`** (not when only the published root files change), CI runs tests, builds with **`VITE_BASE_PATH=/Portfolio-Website/`**, then commits the **`dist/`** output to the **repository root** on **`main`** — **`index.html`**, **`assets/`**, **`images/`**, **`files/`**, etc. (see **`.github/workflows/deploy.yml`**). You edit the app only under **`src/`** and static inputs under **`public/`**; the root copies are the live site.

**GitHub Pages (what to select in the UI):**

1. **Settings** → **Pages** → **Build and deployment**
2. **Source:** **Deploy from a branch**
3. **Branch:** **`main`**
4. **Folder:** **`/ (root)`** — not `/docs`

Do **not** set **Source: GitHub Actions** for this repo; the workflow only **commits** the build to **`main`**. Pages reads those files from the branch.

Manual production-like build:

```bash
VITE_BASE_PATH=/Portfolio-Website/ npm run build
```

Compare **`dist/`** to what will be copied to the repo root on the next deploy.

## Contributing

PRs welcome; match existing style and run `npm run lint` and `npm run test` before submitting.

## License

MIT — see [LICENSE](LICENSE).
