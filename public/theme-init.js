/**
 * Keep in sync with src/theme/colorScheme.ts (migrateLegacyThemeStorage + initTheme).
 * Runs synchronously before React/CSS so the first paint follows prefers-color-scheme.
 */
;(function () {
  var THEME_STORAGE_KEY = 'portfolio-color-scheme-v2'
  var CSS_RELOAD_FLAG_KEY = 'portfolio-css-reload-attempted'

  function hasLoadedStylesheet() {
    var links = document.querySelectorAll('link[rel="stylesheet"]')
    if (!links.length) return false
    for (var i = 0; i < links.length; i += 1) {
      if (links[i].sheet) return true
    }
    return false
  }

  function appendCacheBustedStylesheet(link) {
    var href = link.getAttribute('href')
    if (!href) return false
    var url = href + (href.indexOf('?') === -1 ? '?' : '&') + 'css-retry=' + Date.now()
    var replacement = document.createElement('link')
    replacement.setAttribute('rel', 'stylesheet')
    replacement.setAttribute('href', url)
    if (link.parentNode) {
      link.parentNode.insertBefore(replacement, link.nextSibling)
      return true
    }
    return false
  }

  function tryRecoverStylesheets() {
    if (hasLoadedStylesheet()) {
      try {
        sessionStorage.removeItem(CSS_RELOAD_FLAG_KEY)
      } catch (_) {}
      return
    }

    var links = document.querySelectorAll('link[rel="stylesheet"]')
    var injected = false
    for (var i = 0; i < links.length; i += 1) {
      if (appendCacheBustedStylesheet(links[i])) injected = true
    }

    if (!injected) return

    setTimeout(function () {
      if (hasLoadedStylesheet()) return
      try {
        if (sessionStorage.getItem(CSS_RELOAD_FLAG_KEY) === '1') return
        sessionStorage.setItem(CSS_RELOAD_FLAG_KEY, '1')
      } catch (_) {}
      var next = new URL(window.location.href)
      next.searchParams.set('cssfix', String(Date.now()))
      window.location.replace(next.toString())
    }, 1200)
  }

  try {
    var v = localStorage.getItem(THEME_STORAGE_KEY)
    if (v === 'light' || v === 'dark') {
      localStorage.removeItem(THEME_STORAGE_KEY)
    }
  } catch (_) {}
  document.documentElement.setAttribute('data-theme', 'system')

  if (document.readyState === 'complete') {
    tryRecoverStylesheets()
  } else {
    window.addEventListener('load', tryRecoverStylesheets, { once: true })
  }
})()
