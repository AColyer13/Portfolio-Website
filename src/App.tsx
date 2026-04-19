import { useLayoutEffect, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experiences } from './components/Experiences'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
function App() {
  const [activeSection, setActiveSection] = useState('about')

  useLayoutEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header')
    if (!header) return

    const syncOffset = () => {
      document.documentElement.style.setProperty(
        '--header-offset',
        `${header.offsetHeight}px`,
      )
    }

    syncOffset()

    const id = window.location.hash.replace(/^#/, '')
    if (id) {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      })
    }

    const observer = new ResizeObserver(syncOffset)
    observer.observe(header)
    window.addEventListener('resize', syncOffset)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncOffset)
    }
  }, [])

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
