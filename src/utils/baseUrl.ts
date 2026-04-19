/** Join a Vite `base` (e.g. `/` or `/Portfolio-Website/`) with a `public/` path. */
export function joinPublicPath(base: string, path: string): string {
  if (!path) return base
  const normalized = path.replace(/^\/+/, '')
  return `${base}${normalized}`
}

/** Prefix paths to files in `public/` so they work with `base` (e.g. GitHub Pages subpath). */
export function withBase(path: string): string {
  return joinPublicPath(import.meta.env.BASE_URL, path)
}
