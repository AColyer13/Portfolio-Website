/**
 * Keep in sync with public/theme-init.js (Vite publicDir copy source).
 */
;(function () {
  var THEME_STORAGE_KEY = 'portfolio-color-scheme-v2'
  try {
    var v = localStorage.getItem(THEME_STORAGE_KEY)
    if (v === 'light' || v === 'dark') {
      localStorage.removeItem(THEME_STORAGE_KEY)
    }
  } catch (_) {}
  document.documentElement.setAttribute('data-theme', 'system')

  var nativeScrollHeader = false
  try {
    nativeScrollHeader =
      typeof CSS !== 'undefined' &&
      CSS.supports('container-type: scroll-state') &&
      CSS.supports('scroll-state(scrolled: bottom)')
  } catch (_) {}
  document.documentElement.setAttribute(
    'data-scroll-header',
    nativeScrollHeader ? 'native' : 'js',
  )
})()
