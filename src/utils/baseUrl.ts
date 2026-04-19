/** Prefix paths to files in `public/` so they work with `base` (e.g. GitHub Pages subpath). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL
  return path ? `${base}${path.replace(/^\/+/, '')}` : base
}
