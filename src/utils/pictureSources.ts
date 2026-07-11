import { withBase } from './baseUrl'

export type PictureFormat = 'avif' | 'webp' | 'original'

const RASTER_RE = /\.(png|jpe?g|webp)$/i
const AVIF_RE = /\.(png|jpe?g|webp)$/i

/**
 * Build a format-specific `srcSet` for `<picture>`:
 *   AVIF source → avif URLs only
 *   WebP source → webp URLs only
 *   `<img>` fallback → original raster (png/jpeg)
 *
 * Width descriptors match `scripts/generate-image-variants.mjs` output.
 */
export function pictureSrcSet(
  sourceUrl: string,
  widths: readonly number[],
  format: PictureFormat,
): string {
  const extMatch = sourceUrl.match(RASTER_RE)
  if (!extMatch) return withBase(sourceUrl)

  // Normalize `.jpg` → `.jpeg` so the variant filename matches the
  // generator's output naming.
  const ext = extMatch[1]!.toLowerCase().replace(/^jpg$/, 'jpeg')
  const dotExt = `.${ext}`

  const parts: string[] = []
  for (const w of widths) {
    const variantPath = sourceUrl.replace(RASTER_RE, `-${w}${dotExt}`)
    if (format === 'avif') {
      parts.push(`${withBase(variantPath.replace(AVIF_RE, '.avif'))} ${w}w`)
    } else if (format === 'webp') {
      parts.push(`${withBase(variantPath.replace(AVIF_RE, '.webp'))} ${w}w`)
    } else {
      parts.push(`${withBase(variantPath)} ${w}w`)
    }
  }
  return parts.join(', ')
}
