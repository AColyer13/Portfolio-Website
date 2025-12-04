import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Portfolio-Website/', // Set base for GitHub Pages
  plugins: [react()],
  build: {
    outDir: 'docs', // Output build to docs folder
    emptyOutDir: true,
  },
  publicDir: 'public', // Serve static assets from public/
})
