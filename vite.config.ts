import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: 'docs', // Use docs/ as the project root
  base: '/Portfolio-Website/', // Set base for GitHub Pages
  plugins: [react()],
  build: {
    outDir: '../docs/dist', // Output build to docs/dist
    emptyOutDir: true,
  },
  publicDir: '../public', // Serve static assets from public/
})
