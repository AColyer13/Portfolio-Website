import { useState, useRef, useEffect } from 'react';
import {
  Navbar,
  About,
  Skills,
  Experiences,
  Projects,
  Contact,
  Footer,
} from './components';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const navbarRef = useRef<HTMLElement>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const updatePadding = () => {
      const navbar = navbarRef.current;
      if (navbar) {
        const height = navbar.offsetHeight;
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.style.paddingTop = `${height - 10}px`;
        }
      }
    };

    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, []);

  return (
    <>
      <Navbar ref={navbarRef} activeSection={activeSection} onNavigate={handleNavigate} />
      <About />
      <Skills />
      <Experiences />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
