/**
 * EmailJS is ~40 KB gzipped. None of it is needed until the user submits
 * the contact form — by which point the section may be many scrolls down.
 *
 * This module:
 *   - Stores the public key + service + template IDs (configured here so
 *     the data-shape stays in one place).
 *   - Lazy-imports `@emailjs/browser` on first send so the SDK only lands
 *     in the bundle on demand. Vite emits the dynamic import as a
 *     separate chunk that the browser fetches when the user actually
 *     submits the form.
 *   - Wraps the call in `retryWithBackoff` so transient network failures
 *     don't surface to the user.
 */

import { retryWithBackoff } from './retryWithBackoff'

const EMAILJS_PUBLIC_KEY = 'S590pep4moIqEJb8m'
const EMAILJS_SERVICE_ID = 'default_service'
const EMAILJS_TEMPLATE_ID = 'template_6dk6wl5'

let emailjsPromise: Promise<typeof import('@emailjs/browser')> | null = null
let initialized = false

/** Load `@emailjs/browser` on first use; cached for subsequent calls. */
async function loadEmailJS() {
  if (!emailjsPromise) {
    emailjsPromise = import('@emailjs/browser')
  }
  const mod = await emailjsPromise
  if (!initialized) {
    mod.default.init({ publicKey: EMAILJS_PUBLIC_KEY })
    initialized = true
  }
  return mod.default
}

export async function sendContactForm(form: HTMLFormElement): Promise<void> {
  const emailjs = await loadEmailJS()
  await retryWithBackoff(() =>
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form),
  )
}
