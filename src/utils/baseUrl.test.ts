import { describe, expect, it } from 'vitest'
import { withBase } from './baseUrl'

describe('withBase', () => {
  it('prefixes a path with import.meta.env.BASE_URL', () => {
    expect(withBase('files/resume.pdf')).toBe(
      `${import.meta.env.BASE_URL}files/resume.pdf`,
    )
  })

  it('returns base when path is empty', () => {
    expect(withBase('')).toBe(import.meta.env.BASE_URL)
  })
})
