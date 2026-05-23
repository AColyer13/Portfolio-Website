/** Exponential backoff + jitter — avoids synchronized retries (SUPER GUIDE Ch.9). */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options?: { maxAttempts?: number; baseMs?: number; maxMs?: number },
): Promise<T> {
  const maxAttempts = options?.maxAttempts ?? 3
  const baseMs = options?.baseMs ?? 400
  const maxMs = options?.maxMs ?? 4_000

  let lastError: unknown
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (attempt >= maxAttempts - 1) break
      const delay = Math.min(maxMs, baseMs * 2 ** attempt)
      const jitter = Math.random() * delay * 0.25
      await new Promise((resolve) => setTimeout(resolve, delay + jitter))
    }
  }
  throw lastError
}
