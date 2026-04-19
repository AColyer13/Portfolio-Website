export const THEME_STORAGE_KEY = 'portfolio-color-scheme-v2'

/** What we persist: explicit light/dark, or follow OS */
export type ThemePreference = 'light' | 'dark' | 'system'

/** Resolved light/dark for icons / labels only */
export type ResolvedTheme = 'light' | 'dark'

export function applyTheme(theme: ThemePreference) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function loadStoredPreference(): ThemePreference | null {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY)
    if (v === 'light' || v === 'dark' || v === 'system') return v
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
