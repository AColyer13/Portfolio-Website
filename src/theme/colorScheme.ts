/** Bumped so older “light only” saves don’t stick forever. */
export const THEME_STORAGE_KEY = 'portfolio-color-scheme-v2'

const LEGACY_THEME_STORAGE_KEY = 'portfolio-color-scheme'

/** What we persist: explicit light/dark, or follow OS */
export type ThemePreference = 'light' | 'dark' | 'system'

/** Resolved light/dark for icons / labels only */
export type ResolvedTheme = 'light' | 'dark'

export function applyTheme(theme: ThemePreference) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function loadStoredPreference(): ThemePreference | null {
  try {
    const v2 = localStorage.getItem(THEME_STORAGE_KEY)
    if (v2 === 'light' || v2 === 'dark' || v2 === 'system') return v2

    const v1 = localStorage.getItem(LEGACY_THEME_STORAGE_KEY)
    if (v1 === 'dark' || v1 === 'system') {
      localStorage.setItem(THEME_STORAGE_KEY, v1)
      return v1
    }
    if (v1 === 'light') {
      localStorage.setItem(THEME_STORAGE_KEY, 'system')
      return 'system'
    }
  } catch {
    /* ignore */
  }
  return null
}

export function persistPreference(pref: ThemePreference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, pref)
  } catch {
    /* ignore */
  }
}

/** Apply stored preference. OS changes for `system` are handled in CSS (no extra listeners). */
export function initTheme() {
  const pref = loadStoredPreference() ?? 'system'
  applyTheme(pref)
}
