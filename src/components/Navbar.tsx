import React from 'react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="navbar navbar-expand-sm navbar-light headroom headroom--top headroom--not-bottom">
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
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a
                href="#about"
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('about');
                  setIsMenuOpen(false);
                }}
              >
                <span data-hover="About">About</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#skills">Skills</a>
            </li>
            <li className="nav-item">
              <a
                href="#experience"
                className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('experience');
                  setIsMenuOpen(false);
                }}
              >
                <span data-hover="Experiences">Experiences</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#project"
                className={`nav-link ${activeSection === 'project' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('project');
                  setIsMenuOpen(false);
                }}
              >
                <span data-hover="Projects">Projects</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contact"
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('contact');
                  setIsMenuOpen(false);
                }}
              >
                <span data-hover="Contact">Contact</span>
              </a>
            </li>
          </ul>


        </div>
      </div>
    </nav>
  );
};
