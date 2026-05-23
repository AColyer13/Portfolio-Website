import path from 'node:path'
import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

// `base` in production: set VITE_BASE_PATH to match your Pages URL (see README).
// `index.html` lives under `src/` so the repo root has no dev entrypoint — GitHub Pages
// must not serve a root `index.html` that references `*.tsx` (wrong MIME for raw files).
export default defineConfig(({ mode }) => {
  const base =
    mode === 'development' || mode === 'test'
      ? '/'
      : (process.env.VITE_BASE_PATH ?? '/Portfolio-Website/')
  return {
    root: path.join(projectRoot, 'src'),
    base,
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['vite.svg', 'theme-init.js'],
        manifest: {
          name: 'Adam Colyer — Portfolio',
          short_name: 'Portfolio',
          description:
            'Full-stack developer portfolio — projects, skills, experience, and contact.',
          theme_color: '#7c3aed',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: 'icons/pwa-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'icons/pwa-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'icons/pwa-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          // Precache app shell; large project screenshots use runtime cache on visit.
          globPatterns: [
            '**/*.{js,css,html,ico,svg,woff,woff2}',
            'icons/**',
            'vite.svg',
            'theme-init.js',
          ],
          navigateFallback: 'index.html',
          runtimeCaching: [
            {
              urlPattern: ({ url }) =>
                url.pathname.includes('/images/') &&
                /\.(?:png|jpe?g|webp)$/i.test(url.pathname),
              handler: 'CacheFirst',
              options: {
                cacheName: 'portfolio-images',
                expiration: {
                  maxEntries: 64,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
          ],
        },
      }),
      {
        name: 'html-csp-production',
        transformIndexHtml(html, ctx) {
          if (ctx.server) return html
          const csp = [
            "default-src 'self'",
            "script-src 'self'",
            "style-src 'self'",
            "font-src 'self' data:",
            "img-src 'self' data: https: blob:",
            "connect-src 'self' https://api.emailjs.com",
            "frame-src https://www.google.com https://www.google.com/maps https://maps.google.com https://www.gstatic.com",
            "worker-src 'self'",
            "manifest-src 'self'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join('; ')
          return html.replace(
            '<head>',
            `<head>\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`,
          )
        },
      },
    ],
    build: {
      // Resolved against projectRoot (repo root), not Vite `root` (src/). Otherwise output
      // lands in src/dist and CI (folder: dist) cannot find it.
      outDir: path.join(projectRoot, 'dist'),
      emptyOutDir: true,
    },
    // Relative to Vite `root` (src/), the default `public` would be src/public — use repo-root public/.
    publicDir: path.join(projectRoot, 'public'),
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      alias: {
        'virtual:pwa-register': path.join(
          projectRoot,
          'src/test/pwa-register-stub.ts',
        ),
      },
    },
  }
})
