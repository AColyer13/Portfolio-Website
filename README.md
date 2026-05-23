# Portfolio Website

Personal portfolio — React, TypeScript, Vite.

**Live:** https://acolyer13.github.io/Portfolio-Website/

## Stack

- React (TS) + Vite; Tailwind CSS v4 (design tokens in OKLCH) · Font Awesome
- Contact: EmailJS · Map: Google embed

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173

- `npm run dev` — Dev server
- `npm run build` — Production build
- `npm run preview` — Preview build
- `npm run preview:pages` — Build then preview production output
- `npm run lint` — ESLint
- `npm run test` — Vitest

## Customize

- **Projects, skills, timeline:** [`src/data/portfolio.ts`](src/data/portfolio.ts)
- **Sections / copy:** [`src/components/`](src/components/)
- **Styles:** single [`src/index.css`](src/index.css) (tokens, Tailwind, layout utilities)

## GitHub Pages deploy

On push to **`main`**, CI runs tests, builds, uploads **`dist/`** as a Pages artifact, and deploys with `deploy-pages` (see [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

**Pages settings (required):** Repository → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions** (not “Deploy from a branch”). If deploy fails with `401 Bad credentials`, this setting is almost always the cause.

**Local testing:**
- Day-to-day work: `npm run dev` (http://localhost:5173)
- Production-like check: `npm run build && npm run preview` (http://localhost:4173)

## Contributing

Run `npm run lint` and `npm run test` before PRs.

## License

MIT — see [LICENSE](LICENSE).
