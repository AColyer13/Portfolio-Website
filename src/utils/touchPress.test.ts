import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { initTouchPressFeedback } from './touchPress'

describe('initTouchPressFeedback', () => {
  beforeEach(() => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('registers capture-phase touch listeners on touch-like devices', () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    const cleanup = initTouchPressFeedback()

    expect(addSpy).toHaveBeenCalledWith('touchstart', expect.any(Function), {
      passive: true,
      capture: true,
    })

    cleanup()
  })

  it('no-ops when the device is not touch-like', () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })

    const addSpy = vi.spyOn(document, 'addEventListener')
    initTouchPressFeedback()
    expect(addSpy).not.toHaveBeenCalled()
  })
})
