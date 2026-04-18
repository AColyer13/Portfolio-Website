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
    // #region agent log
    const app = document.querySelector('.App')
    fetch('http://127.0.0.1:7463/ingest/a02f0bfb-867b-4f75-8328-dcee3542df58',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1fc8d4'},body:JSON.stringify({sessionId:'1fc8d4',location:'App.tsx:mount',message:'App mounted',data:{appFound:!!app,childCount:app?.children?.length??0,rootInnerLen:document.getElementById('root')?.innerHTML?.length??0},timestamp:Date.now(),hypothesisId:'H4',runId:'pre-fix'})}).catch(()=>{})
    // #endregion
  }, []);

  return (
    <div className="App">
      <Navbar ref={navbarRef as React.Ref<HTMLElement>} activeSection={activeSection} onNavigate={handleNavigate} />
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
