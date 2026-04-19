import { useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experiences } from './components/Experiences'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('about')

  return (
    <div className="App">
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />
      <About />
      <Skills />
      <Experiences />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
