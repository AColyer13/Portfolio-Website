/** Scroll-state header hiding (CSS) vs scroll listener (JS fallback). */
export type ScrollHeaderMode = 'native' | 'js'

export function supportsNativeScrollHeader(): boolean {
  if (typeof CSS === 'undefined' || !CSS.supports) return false
  return (
    CSS.supports('container-type: scroll-state') &&
    CSS.supports('scroll-state(scrolled: bottom)')
  )
}

export function initScrollHeaderMode(): ScrollHeaderMode {
  const mode: ScrollHeaderMode = supportsNativeScrollHeader() ? 'native' : 'js'
  document.documentElement.setAttribute('data-scroll-header', mode)
  return mode
}

export function isNativeScrollHeader(): boolean {
  return document.documentElement.getAttribute('data-scroll-header') === 'native'
}
