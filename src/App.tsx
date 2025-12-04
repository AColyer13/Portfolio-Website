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
    // Removed JS padding logic; now handled by CSS for responsive spacing
  }, []);

  return (
    <>
      <Navbar ref={navbarRef as React.Ref<HTMLElement>} activeSection={activeSection} onNavigate={handleNavigate} />
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
