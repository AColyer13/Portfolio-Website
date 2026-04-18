import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Vite expects base with leading and trailing slashes. */
function normalizeBase(raw: string): string {
  const withSlash = raw.startsWith('/') ? raw : `/${raw}`
  return withSlash.endsWith('/') ? withSlash : `${withSlash}/`
}

// Production `base` must match the Pages URL path:
// - Project site: https://<user>.github.io/<repo>/  → e.g. VITE_BASE_PATH=/Portfolio-Website/
// - User site:   https://<user>.github.io/         → VITE_BASE_PATH=/
// CI sets VITE_BASE_PATH for this repo’s GitHub Pages project URL.
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const productionBase = normalizeBase(
    process.env.VITE_BASE_PATH ?? '/Portfolio-Website/',
  )
  const base = mode === 'development' ? '/' : productionBase
  return {
    base,
    plugins: [
      react(),
      {
        name: 'html-favicon-base',
        transformIndexHtml(html) {
          return html.replace(
            /href="vite\.svg"/,
            `href="${base}vite.svg"`,
          )
        },
      },
    ],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    publicDir: 'public',
  }
})
