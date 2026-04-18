import { describe, it, expect } from 'vitest'
import { withBase } from './baseUrl'

describe('withBase', () => {
  it('prefixes a relative public path with BASE_URL', () => {
    expect(withBase('files/resume.pdf')).toBe('/files/resume.pdf')
  })

  it('strips leading slashes from the path segment', () => {
    expect(withBase('/images/x.png')).toBe('/images/x.png')
  })

  it('returns base when path is empty', () => {
    expect(withBase('')).toBe('/')
  })
})
