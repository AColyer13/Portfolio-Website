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
}

const base = import.meta.env.BASE_URL

function readThemeFromDocument(): Theme {
  const t = document.documentElement.getAttribute('data-theme')
  if (t === 'light' || t === 'dark') return t
  return getDefaultTheme()
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

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(readThemeFromDocument)

  useEffect(() => {
    applyTheme(theme)
    persistTheme(theme)
  }, [theme])

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary">
        <div className="container site-nav__inner">
          <div className="site-nav__toolbar">
            <button
              type="button"
              className="theme-toggle"
              onClick={() =>
                setTheme((t) => (t === 'light' ? 'dark' : 'light'))
              }
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <i
                className={
                  theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
                }
                aria-hidden
              />
            </button>
            <button
              type="button"
              className="site-nav__toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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

