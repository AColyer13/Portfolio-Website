import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// GitHub Pages needs /Portfolio-Website/; local `vite` uses mode "development" and must use / or the app is blank at localhost:5173/
// `vite build` / `vite preview` use production mode and keep the Pages base (preview still serves dist paths correctly).
export default defineConfig(({ mode }) => {
  const base = mode === 'development' ? '/' : '/Portfolio-Website/'
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
