import { describe, expect, it } from 'vitest'
import { pictureSrcSet } from './pictureSources'

const base = import.meta.env.BASE_URL

describe('pictureSrcSet', () => {
  it('returns a plain src when the source is not an image extension', () => {
    expect(pictureSrcSet('files/resume.pdf', [640], 'original')).toBe(
      `${base}files/resume.pdf`,
    )
  })

  it('emits only avif URLs for the avif format', () => {
    const url = pictureSrcSet('images/foo.png', [640], 'avif')
    expect(url).toBe(`${base}images/foo-640.avif 640w`)
    expect(url).not.toContain('.webp')
    expect(url).not.toContain('.png')
  })

  it('emits only webp URLs for the webp format', () => {
    const url = pictureSrcSet('images/foo.png', [640, 1280], 'webp')
    expect(url).toContain(`${base}images/foo-640.webp 640w`)
    expect(url).toContain(`${base}images/foo-1280.webp 1280w`)
    expect(url).not.toContain('.avif')
    expect(url).not.toContain('.png')
  })

  it('emits only original raster URLs for the original format', () => {
    const url = pictureSrcSet('images/foo.png', [640, 1280], 'original')
    expect(url).toContain(`${base}images/foo-640.png 640w`)
    expect(url).toContain(`${base}images/foo-1280.png 1280w`)
    expect(url).not.toContain('.avif')
    expect(url).not.toContain('.webp')
  })

  it('uses .jpeg not .jpg for jpeg sources', () => {
    const url = pictureSrcSet('images/IMG_4874.JPEG', [960], 'original')
    expect(url).toContain('IMG_4874-960.jpeg 960w')
    expect(url).not.toContain('IMG_4874-960.jpg ')
  })
})
