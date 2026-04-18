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

On push to **`main`**, CI runs tests, builds with **`VITE_BASE_PATH=/Portfolio-Website/`**, and deploys **`dist/`** via **GitHub Actions** (see **`.github/workflows/deploy.yml`**). Nothing is committed to a **`docs/`** folder — **`public/`** is the only place you keep static assets; the build copies them into **`dist`** on the runner and that artifact is what Pages serves.

**GitHub Pages:** Settings → Build and deployment → **Source: GitHub Actions** (not “Deploy from a branch”).  
There is no duplicate **`docs/`** tree in the repo anymore.

Manual production-like build:

```bash
VITE_BASE_PATH=/Portfolio-Website/ npm run build
```

Inspect **`dist/`** locally; it matches what gets deployed.

## Contributing

PRs welcome; match existing style and run `npm run lint` and `npm run test` before submitting.

## License

MIT — see [LICENSE](LICENSE).
