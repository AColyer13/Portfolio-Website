export const THEME_STORAGE_KEY = 'portfolio-color-scheme-v2'

/** Applied to `document.documentElement` — `system` follows `prefers-color-scheme`. */
export type ThemePreference = 'light' | 'dark' | 'system'

/** Resolved light/dark for icons / labels only */
export type ResolvedTheme = 'light' | 'dark'

export function applyTheme(theme: ThemePreference) {
  document.documentElement.setAttribute('data-theme', theme)
}

/** Drop legacy persisted light/dark so scheduled OS themes always apply on load. */
export function migrateLegacyThemeStorage() {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY)
    if (v === 'light' || v === 'dark') {
      localStorage.removeItem(THEME_STORAGE_KEY)
    }
  } catch {
    /* ignore */
  }
}

/** First paint + hydration: always follow the system color scheme (CSS + matchMedia). */
export function initTheme() {
  migrateLegacyThemeStorage()
  applyTheme('system')
}
