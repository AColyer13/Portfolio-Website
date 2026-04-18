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

On push to `main` (changes outside `docs/` only), CI runs tests, builds with `VITE_BASE_PATH=/Portfolio-Website/`, and commits the output into **`docs/`** on `main` (see `.github/workflows/deploy.yml`).

**GitHub Pages:** Settings → Build and deployment → **Deploy from a branch** → Branch **main**, folder **`/docs`**.  
Do not use **`/` (root)** on `main` for the published site—that would serve the repo’s source `index.html` instead of the built bundle.

Manual production-like build:

```bash
VITE_BASE_PATH=/Portfolio-Website/ npm run build
```

Then compare `dist/` to what CI publishes into `docs/`.

## Contributing

PRs welcome; match existing style and run `npm run lint` and `npm run test` before submitting.

## License

MIT — see [LICENSE](LICENSE).
