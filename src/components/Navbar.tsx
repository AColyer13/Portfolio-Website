import { useState } from 'react'

interface NavbarProps {
  activeSection: string
  onNavigate: (section: string) => void
}

const base = import.meta.env.BASE_URL

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

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light headroom headroom--top headroom--not-bottom sticky-top">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
            id="navbarNav"
          >
            <ul className="navbar-nav mx-auto">
              {navItems.map((item) => (
                <li key={item.section} className="nav-item">
                  <a
                    href={`${base}#${item.hash}`}
                    className={`nav-link ${activeSection === item.section ? 'active' : ''}`}
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
