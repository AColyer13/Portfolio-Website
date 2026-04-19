export const THEME_STORAGE_KEY = 'portfolio-color-scheme'

export type Theme = 'light' | 'dark'

function prefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
}

/** First visit when nothing is stored — follows OS once, then only explicit light/dark. */
export function getDefaultTheme(): Theme {
  return prefersDark() ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function loadStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY)
    if (v === 'light' || v === 'dark') return v
    if (v === 'system') {
      const resolved = prefersDark() ? 'dark' : 'light'
      localStorage.setItem(THEME_STORAGE_KEY, resolved)
      return resolved
    }
  } catch {
    /* ignore */
  }
  return null
}

export function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

export function cycleTheme(current: Theme): Theme {
  return current === 'light' ? 'dark' : 'light'
}

export function themeButtonLabel(theme: Theme): string {
  return theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
}
