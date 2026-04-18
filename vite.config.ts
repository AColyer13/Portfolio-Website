import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

/** Vite expects base with leading and trailing slashes. */
function normalizeBase(raw: string): string {
  const withSlash = raw.startsWith('/') ? raw : `/${raw}`
  return withSlash.endsWith('/') ? withSlash : `${withSlash}/`
}

// `base` in production: set VITE_BASE_PATH to match your Pages URL (see README).
// `index.html` lives under `src/` so the repo root has no dev entrypoint — GitHub Pages
// must not serve a root `index.html` that references `*.tsx` (wrong MIME for raw files).
export default defineConfig(({ mode }) => {
  const productionBase = normalizeBase(
    process.env.VITE_BASE_PATH ?? '/Portfolio-Website/',
  )
  const base =
    mode === 'development' || mode === 'test' ? '/' : productionBase
  return {
    root: path.join(projectRoot, 'src'),
    base,
    plugins: [
      react(),
      {
        name: 'html-favicon-base',
        transformIndexHtml(html) {
          return html.replace(
            /href="(?:\/)?vite\.svg"/,
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
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },
  }
})
