import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experiences } from './components/Experiences'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

/** DOM order — must match section `id`s and Navbar `section` keys */
const SECTION_IDS = [
  'about',
  'skills',
  'experience',
  'projects',
  'contact',
] as const

function isSectionId(id: string): id is (typeof SECTION_IDS)[number] {
  return (SECTION_IDS as readonly string[]).includes(id)
}

function getActiveSectionId(header: HTMLElement): (typeof SECTION_IDS)[number] {
  const scrollEl = document.documentElement
  // When the last section is shorter than the viewport, its top may never move above
  // the header threshold at max scroll, so the loop would keep an earlier section.
  if (
    scrollEl.scrollHeight > window.innerHeight &&
    window.scrollY + window.innerHeight >= scrollEl.scrollHeight - 2
  ) {
    return SECTION_IDS[SECTION_IDS.length - 1]
  }

  const line = window.scrollY + header.offsetHeight
  let active: (typeof SECTION_IDS)[number] = 'about'
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id)
    if (!el) continue
    const top = window.scrollY + el.getBoundingClientRect().top
    if (top <= line + 2) {
      active = id
    }
  }
  return active
}

/** Ignore sub-pixel / overscroll jitter so the header doesn’t flicker at the document bottom. */
const SCROLL_DIR_THRESHOLD_PX = 6
/** When this close to the max scroll position, require a larger upward move to reveal the nav. */
const NEAR_BOTTOM_PX = 56
/** Upward scroll distance (px) required to show the bar when near the bottom — filters rubber-band noise. */
const SHOW_HEADER_UP_NEAR_BOTTOM_PX = 22

function App() {
  const [activeSection, setActiveSection] = useState<string>('about')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [headerScrollHidden, setHeaderScrollHidden] = useState(false)
  const lastScrollYRef = useRef(0)

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

    const hash = window.location.hash.replace(/^#/, '')
    if (hash && isSectionId(hash)) {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' })
    }

    // Sync scroll spy after layout + optional hash jump; must run in this layout effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time init after DOM measurements
    setActiveSection(getActiveSectionId(header))
    lastScrollYRef.current = window.scrollY

    const observer = new ResizeObserver(() => {
      syncOffset()
      setActiveSection(getActiveSectionId(header))
    })
    observer.observe(header)
    window.addEventListener('resize', syncOffset)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncOffset)
    }
  }, [])

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header')
    if (!header) return

    const update = () => {
      setActiveSection(getActiveSectionId(header))

      const y = window.scrollY
      const last = lastScrollYRef.current
      const navH = header.offsetHeight
      const delta = y - last

      const scrollEl = document.documentElement
      const maxScrollY = Math.max(
        0,
        scrollEl.scrollHeight - window.innerHeight,
      )
      const nearBottom = y >= maxScrollY - NEAR_BOTTOM_PX

      if (mobileMenuOpen) {
        setHeaderScrollHidden(false)
      } else if (y <= 0) {
        setHeaderScrollHidden(false)
      } else if (nearBottom) {
        // At the end of the page, tiny “up” movements from overscroll/bounce read as scroll-up — don’t reveal.
        if (delta <= -SHOW_HEADER_UP_NEAR_BOTTOM_PX) {
          setHeaderScrollHidden(false)
        }
        // Deliberate scroll down still hides (when not pinned at max — e.g. short last section).
        if (delta >= SCROLL_DIR_THRESHOLD_PX && y > navH && y < maxScrollY - 2) {
          setHeaderScrollHidden(true)
        }
      } else if (delta <= -SCROLL_DIR_THRESHOLD_PX) {
        setHeaderScrollHidden(false)
      } else if (delta >= SCROLL_DIR_THRESHOLD_PX && y > navH) {
        setHeaderScrollHidden(true)
      }

      lastScrollYRef.current = y
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          update()
          ticking = false
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [mobileMenuOpen])

  return (
    <div
      className={`App${headerScrollHidden ? ' app--header-hidden' : ''}`}
    >
      <Navbar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        headerScrollHidden={headerScrollHidden}
        onMenuOpenChange={setMobileMenuOpen}
      />
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
