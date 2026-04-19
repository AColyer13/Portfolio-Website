# Portfolio Website

Personal portfolio — React, TypeScript, Vite.

**Live:** https://acolyer13.github.io/Portfolio-Website/

## Stack

- React (TS) + Vite; Bootstrap / Font Awesome / Unicons (CDN)
- Contact: EmailJS · Map: Google embed

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173

| Script | |
|--------|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `npm run preview:pages` | Build then preview (like Pages) |
| `npm run lint` | ESLint |
| `npm run test` | Vitest |

## Customize

- **Projects, skills, timeline:** [`src/data/portfolio.ts`](src/data/portfolio.ts)
- **Sections / copy:** [`src/components/`](src/components/)
- **Theme:** [`src/App.css`](src/App.css), [`src/index.css`](src/index.css)

## GitHub Pages deploy

On push to **`main`**, CI runs tests, builds with `VITE_BASE_PATH=/Portfolio-Website/`, then commits **`dist/`** to the **repo root** on **`main`** (see [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). You work in **`src/`** and **`public/`**; root **`index.html`**, **`assets/`**, **`images/`**, **`files/`**, etc. are the published site.

**Pages settings:** Branch **`main`**, folder **`/` (root)** — not `/docs`. Use **Deploy from a branch**, not “GitHub Actions” as the Pages source (the workflow commits artifacts; Pages reads the branch).

Production-like build locally:

```bash
VITE_BASE_PATH=/Portfolio-Website/ npm run build
```

Compare output in **`dist/`** to what lands at root on deploy.

## Contributing

Run `npm run lint` and `npm run test` before PRs.

## License

MIT — see [LICENSE](LICENSE).
