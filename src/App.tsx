import { useState } from 'react';
import {
  Navbar,
  About,
  Skills,
  Resume,
  Projects,
  Contact,
  Footer,
} from './components';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('about');

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  return (
    <>
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      <About />
      <Skills />
      <Resume />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
