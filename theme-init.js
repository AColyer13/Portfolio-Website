/**
 * Keep in sync with src/theme/colorScheme.ts (loadStoredPreference + applyTheme).
 * Runs synchronously before React/CSS so the first paint matches the final theme (no black→light flash).
 */
;(function () {
  var THEME_STORAGE_KEY = 'portfolio-color-scheme-v2'
  try {
    var v = localStorage.getItem(THEME_STORAGE_KEY)
    if (v === 'light' || v === 'dark' || v === 'system') {
      document.documentElement.setAttribute('data-theme', v)
      return
    }
  } catch (_) {}
  document.documentElement.setAttribute('data-theme', 'system')
})()
