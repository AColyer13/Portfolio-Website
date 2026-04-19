export const THEME_STORAGE_KEY = 'portfolio-color-scheme'

export type Theme = 'system' | 'light' | 'dark'

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function loadStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY)
    if (v === 'light' || v === 'dark' || v === 'system') return v
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
  if (current === 'system') return 'light'
  if (current === 'light') return 'dark'
  return 'system'
}

export function themeLabel(theme: Theme): string {
  if (theme === 'system') return 'Theme: match system'
  if (theme === 'light') return 'Theme: light'
  return 'Theme: dark'
}

export function themeButtonLabel(theme: Theme): string {
  if (theme === 'system') return 'Switch to light mode'
  if (theme === 'light') return 'Switch to dark mode'
  return 'Use system theme'
}
