/**
 * Keep in sync with src/theme/colorScheme.ts (loadStoredPreference + applyTheme).
 * Runs synchronously before React/CSS so the first paint matches the final theme (no black→light flash).
 */
;(function () {
  var THEME_STORAGE_KEY = 'portfolio-color-scheme-v2'
  var LEGACY_THEME_STORAGE_KEY = 'portfolio-color-scheme'

  function loadPreference() {
    try {
      var v2 = localStorage.getItem(THEME_STORAGE_KEY)
      if (v2 === 'light' || v2 === 'dark' || v2 === 'system') return v2

      var v1 = localStorage.getItem(LEGACY_THEME_STORAGE_KEY)
      if (v1 === 'dark' || v1 === 'system') {
        localStorage.setItem(THEME_STORAGE_KEY, v1)
        return v1
      }
      if (v1 === 'light') {
        localStorage.setItem(THEME_STORAGE_KEY, 'system')
        return 'system'
      }
    } catch (_) {}
    return null
  }

  var pref = loadPreference() || 'system'
  document.documentElement.setAttribute('data-theme', pref)
})()
