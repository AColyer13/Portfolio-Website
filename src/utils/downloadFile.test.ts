import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { downloadFile, shouldDownloadInPlace } from './downloadFile'

describe('shouldDownloadInPlace', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', { standalone: false })
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns true in iOS standalone PWA', () => {
    vi.stubGlobal('navigator', { standalone: true })
    expect(shouldDownloadInPlace()).toBe(true)
  })

  it('returns true when display-mode is standalone', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: query.includes('display-mode: standalone'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )
    expect(shouldDownloadInPlace()).toBe(true)
  })

  it('returns false on desktop pointer/hover', () => {
    expect(shouldDownloadInPlace()).toBe(false)
  })
})

describe('downloadFile', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('fetches the file and triggers a download link', async () => {
    const click = vi.fn()
    const remove = vi.fn()
    const appendChild = vi.fn()
    const revokeObjectURL = vi.fn()

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(new Blob(['pdf'])),
    }))
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:resume'),
      revokeObjectURL,
    })
    vi.stubGlobal('document', {
      body: { appendChild },
      createElement: vi.fn(() => ({
        click,
        remove,
        style: {},
      })),
    })

    await downloadFile('/files/resume.pdf', 'resume.pdf')

    expect(fetch).toHaveBeenCalledWith('/files/resume.pdf')
    expect(click).toHaveBeenCalled()
    expect(remove).toHaveBeenCalled()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:resume')
  })
})
