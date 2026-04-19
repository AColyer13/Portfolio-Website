import { describe, expect, it } from 'vitest'
import { joinPublicPath, withBase } from './baseUrl'

describe('joinPublicPath', () => {
  it('prefixes a relative path with base', () => {
    expect(joinPublicPath('/', 'files/resume.pdf')).toBe('/files/resume.pdf')
  })

  it('strips leading slashes from the path segment', () => {
    expect(joinPublicPath('/', '/images/x.png')).toBe('/images/x.png')
  })

  it('returns base when path is empty', () => {
    expect(joinPublicPath('/', '')).toBe('/')
  })

  it('works with GitHub Pages subpath base', () => {
    expect(joinPublicPath('/Portfolio-Website/', 'images/x.png')).toBe(
      '/Portfolio-Website/images/x.png',
    )
  })
})

describe('withBase', () => {
  it('delegates to joinPublicPath with import.meta.env.BASE_URL', () => {
    expect(withBase('files/resume.pdf')).toBe(
      joinPublicPath(import.meta.env.BASE_URL, 'files/resume.pdf'),
    )
  })
})
