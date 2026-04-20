import { useEffect, useState } from 'react'
import {
  applyTheme,
  type ResolvedTheme,
  type ThemePreference,
} from '../theme/colorScheme'

/** Session-only; reload returns to system / prefers-color-scheme (sunset scheduling, etc.). */
type SessionOverride = 'light' | 'dark' | null

interface NavbarProps {
  activeSection: string
  onNavigate: (section: string) => void
  /** Hide-on-scroll-down (class on header, driven by App) */
  headerScrollHidden?: boolean
  onMenuOpenChange?: (open: boolean) => void
}

const base = import.meta.env.BASE_URL

/**
 * Cycle forced light → forced dark → match system → forced …
 * From system, first step forces the opposite of the OS scheme so each click is visible.
 */
function cycleSessionOverride(
  override: SessionOverride,
  osDark: boolean,
): SessionOverride {
  if (override === 'light') return 'dark'
  if (override === 'dark') return osDark ? 'light' : null
  return osDark ? 'light' : 'dark'
}

/** Track the OS color-scheme preference reactively. */
function useOsDark(): boolean {
  const [osDark, setOsDark] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => setOsDark(mq.matches)
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return osDark
}

function resolveTheme(
  override: SessionOverride,
  osDark: boolean,
): ResolvedTheme {
  if (override === 'light') return 'light'
  if (override === 'dark') return 'dark'
  return osDark ? 'dark' : 'light'
}

function domTheme(override: SessionOverride): ThemePreference {
  return override ?? 'system'
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
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experiences' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export function Navbar({
  activeSection,
  onNavigate,
  headerScrollHidden = false,
  onMenuOpenChange,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [sessionOverride, setSessionOverride] = useState<SessionOverride>(null)
  const osDark = useOsDark()
  const effectiveTheme = resolveTheme(sessionOverride, osDark)
  const appliedTheme = domTheme(sessionOverride)

  useEffect(() => {
    applyTheme(appliedTheme)
  }, [appliedTheme])

  const nextOverride = cycleSessionOverride(sessionOverride, osDark)
  const nextThemeLabel =
    nextOverride === 'light'
      ? 'light only for this visit'
      : nextOverride === 'dark'
        ? 'dark only for this visit'
        : 'match system appearance'
  const currentThemeLabel =
    sessionOverride === null
      ? `System (${effectiveTheme})`
      : sessionOverride === 'light'
        ? 'Light override, this visit only'
        : 'Dark override, this visit only'
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
              onClick={() =>
                setSessionOverride((o) => cycleSessionOverride(o, osDark))
              }
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
                <li key={item.id}>
                  <a
                    href={`${base}#${item.id}`}
                    className={`site-nav__link ${
                      activeSection === item.id ? 'active' : ''
                    }`}
                    onClick={() => {
                      onNavigate(item.id)
                      setIsMenuOpen(false)
                      onMenuOpenChange?.(false)
                    }}
                  >
                    <span data-hover={item.label}>{item.label}</span>
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
