import { useEffect, useState } from 'react'
import {
  applyTheme,
  loadStoredPreference,
  persistPreference,
  type ResolvedTheme,
  type ThemePreference,
} from '../theme/colorScheme'

interface NavbarProps {
  activeSection: string
  onNavigate: (section: string) => void
  /** Hide-on-scroll-down (class on header, driven by App) */
  headerScrollHidden?: boolean
  onMenuOpenChange?: (open: boolean) => void
}

const base = import.meta.env.BASE_URL

function cyclePreference(p: ThemePreference): ThemePreference {
  if (p === 'light') return 'dark'
  if (p === 'dark') return 'system'
  return 'light'
}

/** When preference is system, re-resolve when OS appearance changes (Navbar icon + applyTheme). */
function useResolvedTheme(preference: ThemePreference): ResolvedTheme {
  const [osDark, setOsDark] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  useEffect(() => {
    if (preference !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => setOsDark(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [preference])

  if (preference === 'light') return 'light'
  if (preference === 'dark') return 'dark'
  return osDark ? 'dark' : 'light'
}

/** Sun — use in dark mode; click switches to light. */
function IconSun() {
  return (
    <svg
      className="theme-toggle__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

/** Moon — use in light mode; click switches to dark. */
function IconMoon() {
  return (
    <svg
      className="theme-toggle__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

const navItems = [
  { section: 'about', hash: 'about', label: 'About', dataHover: 'About' },
  { section: 'skills', hash: 'skills', label: 'Skills', dataHover: 'Skills' },
  {
    section: 'experience',
    hash: 'experience',
    label: 'Experiences',
    dataHover: 'Experiences',
  },
  { section: 'projects', hash: 'projects', label: 'Projects', dataHover: 'Projects' },
  { section: 'contact', hash: 'contact', label: 'Contact', dataHover: 'Contact' },
] as const

export function Navbar({
  activeSection,
  onNavigate,
  headerScrollHidden = false,
  onMenuOpenChange,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [preference, setPreference] = useState<ThemePreference>(
    () => loadStoredPreference() ?? 'system',
  )
  const effectiveTheme = useResolvedTheme(preference)

  useEffect(() => {
    applyTheme(effectiveTheme)
  }, [effectiveTheme])

  useEffect(() => {
    persistPreference(preference)
  }, [preference])

  const nextThemeLabel =
    preference === 'light'
      ? 'dark only'
      : preference === 'dark'
        ? 'match system'
        : 'light only'
  const currentThemeLabel =
    preference === 'system'
      ? `System (${effectiveTheme})`
      : preference === 'light'
        ? 'Light'
        : 'Dark'
  const themeToggleLabel = `Color theme: ${currentThemeLabel}. Activate to use ${nextThemeLabel}.`
  const themeToggleTitle = `Theme: ${currentThemeLabel}. Next: ${nextThemeLabel}.`

  return (
    <header
      className={`site-header${headerScrollHidden ? ' site-header--scroll-hidden' : ''}`}
    >
      <nav className="site-nav" aria-label="Primary">
        <div className="container site-nav__inner">
          <div className="site-nav__toolbar">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setPreference((p) => cyclePreference(p))}
              aria-label={themeToggleLabel}
              title={themeToggleTitle}
            >
              {effectiveTheme === 'light' ? <IconMoon /> : <IconSun />}
            </button>
            <button
              type="button"
              className="site-nav__toggle"
              onClick={() =>
                setIsMenuOpen((open) => {
                  const next = !open
                  onMenuOpenChange?.(next)
                  return next
                })
              }
              aria-controls="site-nav-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="visually-hidden">Toggle navigation</span>
              <span className="site-nav__toggle-icon" aria-hidden />
            </button>
          </div>

          <div
            className={`site-nav__panel ${isMenuOpen ? 'is-open' : ''}`}
            id="site-nav-menu"
          >
            <ul className="site-nav__list">
              {navItems.map((item) => (
                <li key={item.section}>
                  <a
                    href={`${base}#${item.hash}`}
                    className={`site-nav__link ${
                      activeSection === item.section ? 'active' : ''
                    }`}
                    onClick={() => {
                      onNavigate(item.section)
                      setIsMenuOpen(false)
                      onMenuOpenChange?.(false)
                    }}
                  >
                    <span data-hover={item.dataHover}>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

