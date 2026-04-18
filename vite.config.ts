import fs from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const DEBUG_LOG =
  '/home/adam/Desktop/portfolio website/Portfolio-Website/.cursor/debug-9d1759.log'

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

// https://vite.dev/config/
// GitHub Pages needs /Portfolio-Website/; local `vite` uses mode "development" and must use / or the app is blank at localhost:5173/
// `vite build` / `vite preview` use production mode and keep the Pages base (preview still serves dist paths correctly).
export default defineConfig(({ mode, command }) => {
  const base = mode === 'development' ? '/' : '/Portfolio-Website/'
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
