import fs from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const DEBUG_LOG =
  '/home/adam/Desktop/portfolio website/Portfolio-Website/.cursor/debug-9d1759.log'

/** Vite expects base with leading and trailing slashes. */
function normalizeBase(raw: string): string {
  const withSlash = raw.startsWith('/') ? raw : `/${raw}`
  return withSlash.endsWith('/') ? withSlash : `${withSlash}/`
}

function debugLog(payload: {
  location: string
  message: string
  hypothesisId: string
  data?: Record<string, unknown>
}) {
  try {
    fs.appendFileSync(
      DEBUG_LOG,
      JSON.stringify({
        sessionId: '9d1759',
        timestamp: Date.now(),
        ...payload,
      }) + '\n',
    )
  } catch {
    /* ignore */
  }
}

// Production `base` must match the Pages URL path:
// - Project site: https://<user>.github.io/<repo>/  → e.g. VITE_BASE_PATH=/Portfolio-Website/
// - User site:   https://<user>.github.io/         → VITE_BASE_PATH=/
// CI sets VITE_BASE_PATH for this repo’s GitHub Pages project URL.
// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const productionBase = normalizeBase(
    process.env.VITE_BASE_PATH ?? '/Portfolio-Website/',
  )
  const base = mode === 'development' ? '/' : productionBase
  // #region agent log
  debugLog({
    location: 'vite.config.ts:defineConfig',
    message: 'vite config resolved',
    hypothesisId: 'H3',
    data: { mode, command, base, cwd: process.cwd() },
  })
  // #endregion
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
      {
        name: 'debug-request-log',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            const url = req.url?.split('?')[0] ?? ''
            if (url.includes('main.tsx') || url.endsWith('.tsx')) {
              // #region agent log
              debugLog({
                location: 'vite.config.ts:middleware',
                message: 'dev server saw tsx request',
                hypothesisId: 'H4',
                data: { url },
              })
              // #endregion
            }
            next()
          })
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
