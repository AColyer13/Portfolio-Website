import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

/** Vite expects base with leading and trailing slashes. */
function normalizeBase(raw: string): string {
  const withSlash = raw.startsWith('/') ? raw : `/${raw}`
  return withSlash.endsWith('/') ? withSlash : `${withSlash}/`
}

// `base` in production: set VITE_BASE_PATH to match your Pages URL (see README).
export default defineConfig(({ mode }) => {
  const productionBase = normalizeBase(
    process.env.VITE_BASE_PATH ?? '/Portfolio-Website/',
  )
  const base =
    mode === 'development' || mode === 'test' ? '/' : productionBase
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
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },
  }
})
