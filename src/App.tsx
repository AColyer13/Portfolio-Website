import { useState } from 'react';
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

  return (
    <div className="App">
      <Navbar
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />
      <About />
      <Skills />
      <Experiences />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
