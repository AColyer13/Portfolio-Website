import { withBase } from './baseUrl'

export type PictureFormat = 'avif' | 'webp' | 'original'

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
  const extMatch = sourceUrl.match(/\.(png|jpe?g|webp)$/i)
  if (!extMatch) return withBase(sourceUrl)

  const ext = extMatch[1]!.toLowerCase()
  const dotExt = ext.startsWith('jp') ? '.jpeg' : `.${ext === 'jpeg' ? 'jpeg' : ext}`

  const parts: string[] = []
  for (const w of widths) {
    const variantPath = sourceUrl.replace(/\.(png|jpe?g|webp)$/i, `-${w}${dotExt}`)
    if (format === 'avif') {
      parts.push(
        `${withBase(variantPath.replace(/\.(png|jpe?g|webp)$/i, '.avif'))} ${w}w`,
      )
    } else if (format === 'webp') {
      parts.push(
        `${withBase(variantPath.replace(/\.(png|jpe?g|webp)$/i, '.webp'))} ${w}w`,
      )
    } else {
      parts.push(`${withBase(variantPath)} ${w}w`)
    }
  }
  return parts.join(', ')
}
