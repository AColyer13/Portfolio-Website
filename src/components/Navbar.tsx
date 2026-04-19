import { useEffect, useState } from 'react'
import {
  applyTheme,
  getDefaultTheme,
  persistTheme,
  type Theme,
} from '../theme/colorScheme'

interface NavbarProps {
  activeSection: string
  onNavigate: (section: string) => void
  /** Hide-on-scroll-down (class on header, driven by App) */
  headerScrollHidden?: boolean
  onMenuOpenChange?: (open: boolean) => void
}

const base = import.meta.env.BASE_URL

function readThemeFromDocument(): Theme {
  const t = document.documentElement.getAttribute('data-theme')
  if (t === 'light' || t === 'dark') return t
  return getDefaultTheme()
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
  const [theme, setTheme] = useState<Theme>(readThemeFromDocument)

  useEffect(() => {
    applyTheme(theme)
    persistTheme(theme)
  }, [theme])

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
                setTheme((t) => (t === 'light' ? 'dark' : 'light'))
              }
              aria-label={
                theme === 'light'
                  ? 'Switch to dark mode'
                  : 'Switch to light mode'
              }
              title={
                theme === 'light'
                  ? 'Switch to dark mode'
                  : 'Switch to light mode'
              }
            >
              {theme === 'light' ? <IconMoon /> : <IconSun />}
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

