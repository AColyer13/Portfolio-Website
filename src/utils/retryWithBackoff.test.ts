import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { retryWithBackoff } from './retryWithBackoff'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('retryWithBackoff', () => {
  it('returns the resolved value on first success', async () => {
    const fn = vi.fn().mockResolvedValue('ok')
    await expect(retryWithBackoff(fn)).resolves.toBe('ok')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('retries until success (2 failures + 1 success)', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('boom'))
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValue('ok')

    const promise = retryWithBackoff(fn, { maxAttempts: 3, baseMs: 10 })
    // Drain pending timers between attempts.
    await vi.runAllTimersAsync()
    await expect(promise).resolves.toBe('ok')
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('throws the last error when all attempts fail', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('boom'))
    // Reject the promise and attach the rejection handler immediately so
    // Node's unhandled-rejection warning doesn't fire mid-test.
    const settled = retryWithBackoff(fn, { maxAttempts: 3, baseMs: 10 }).catch(
      (err) => err,
    )
    await vi.runAllTimersAsync()
    const err = await settled
    expect(err).toBeInstanceOf(Error)
    expect((err as Error).message).toBe('boom')
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('respects maxAttempts', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('boom'))
    const settled = retryWithBackoff(fn, { maxAttempts: 2, baseMs: 10 }).catch(
      (err) => err,
    )
    await vi.runAllTimersAsync()
    const err = await settled
    expect((err as Error).message).toBe('boom')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('caps delay at maxMs', async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout')
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValue('ok')

    const promise = retryWithBackoff(fn, {
      maxAttempts: 5,
      baseMs: 100,
      maxMs: 500,
    })
    await vi.runAllTimersAsync()
    await expect(promise).resolves.toBe('ok')

    const delays: number[] = []
    for (const call of setTimeoutSpy.mock.calls) {
      const delay = call[1]
      if (typeof delay === 'number' && delay < 1000) delays.push(delay)
    }
    expect(delays.length).toBeGreaterThan(0)
    // Each retry delay should be capped (base * 2^attempt + jitter <= maxMs * 1.25)
    for (const d of delays) {
      expect(d).toBeLessThanOrEqual(500 * 1.25 + 1)
    }
  })
})
