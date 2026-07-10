import { describe, expect, it } from 'vitest'
import { pictureSrcSet } from './pictureSources'

describe('pictureSrcSet', () => {
  it('returns a plain src when the source is not an image extension', () => {
    expect(pictureSrcSet('files/resume.pdf', [640])).toBe(
      `${import.meta.env.BASE_URL}files/resume.pdf`,
    )
  })

  it('emits avif + webp + original variants for a single width', () => {
    const url = pictureSrcSet('images/foo.png', [640])
    const base = import.meta.env.BASE_URL
    expect(url).toContain(`${base}images/foo-640.avif 640w`)
    expect(url).toContain(`${base}images/foo-640.webp 640w`)
    expect(url).toContain(`${base}images/foo-640.png 640w`)
  })

  it('emits variants for multiple widths in ascending order', () => {
    const url = pictureSrcSet('images/foo.png', [640, 1280])
    const idx640 = url.indexOf('foo-640.avif')
    const idx1280 = url.indexOf('foo-1280.avif')
    expect(idx640).toBeGreaterThan(-1)
    expect(idx1280).toBeGreaterThan(-1)
    expect(idx640).toBeLessThan(idx1280)
  })

  it('uses .jpeg not .jpg for jpeg sources', () => {
    const url = pictureSrcSet('images/IMG_4874.JPEG', [960])
    expect(url).toContain('IMG_4874-960.jpeg 960w')
    expect(url).not.toContain('IMG_4874-960.jpg ')
  })

  it('honors .webp sources', () => {
    const url = pictureSrcSet('images/foo.webp', [640])
    expect(url).toContain('foo-640.avif 640w')
    expect(url).toContain('foo-640.webp 640w')
    expect(url).toContain('foo-640.webp 640w')
  })
})
