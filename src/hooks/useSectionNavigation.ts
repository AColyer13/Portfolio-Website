import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  getActiveSectionId,
  headerScrollInset,
  isSectionId,
  scrollToSection,
  SECTION_IDS,
  syncLocationHashWithActiveSection,
  viewDirection,
  type SectionId,
} from '../utils/sections'

/** Ignore sub-pixel / overscroll jitter so the header doesn't flicker. */
const SCROLL_DIR_THRESHOLD_PX = 6
/**
 * While scrollY is still this many px above `#contact`, don't reveal the
 * header on scroll-up. Stops the bar popping in after a small nudge up
 * from the contact/footer on mobile.
 */
const CONTACT_SCROLL_UP_REVEAL_BUFFER_PX = 200

interface UseSectionNavigationOptions {
  /** Re-show the header when true (e.g. mobile menu is open). */
  forceHeaderVisible?: boolean
}

interface UseSectionNavigationResult {
  activeSection: SectionId
  headerScrollHidden: boolean
  navigateToSection: (section: string) => void
}

/**
 * Owns the three pieces of scroll behaviour that used to live inline in
 * `App.tsx`:
 *   1. On mount + on resize + on header resize: sync the `--header-offset`
 *      CSS var, jump to any hash on first paint, and publish the active
 *      section to state + URL.
 *   2. On scroll: rAF-throttled update of the active section + URL hash,
 *      and toggle the header hide-on-scroll-down rule.
 *   3. On `navigateToSection`: scroll to the section under the header and
 *      wrap the jump in a View-Transitions API call when available so CSS
 *      can pick directional keyframes.
 *
 * Each piece can be tested in isolation:
 *   - The pure helpers live in `src/utils/sections.ts` (no DOM mutation
 *     beyond `history`).
 *   - This hook only wires them to the DOM event loop.
 */
export function useSectionNavigation(
  options: UseSectionNavigationOptions = {},
): UseSectionNavigationResult {
  const { forceHeaderVisible = false } = options

  const [activeSection, setActiveSection] = useState<SectionId>('about')
  const [headerScrollHidden, setHeaderScrollHidden] = useState(false)
  const lastScrollYRef = useRef(0)

  useLayoutEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header')
    if (!header) return

    const syncOffset = () => {
      document.documentElement.style.setProperty(
        '--header-offset',
        `${headerScrollInset(header)}px`,
      )
    }

    syncOffset()

    const hash = window.location.hash.replace(/^#/, '')
    if (!hash) {
      window.scrollTo(0, 0)
      requestAnimationFrame(() => window.scrollTo(0, 0))
    } else if (isSectionId(hash)) {
      scrollToSection(hash, header)
    }

    // Sync scroll spy after layout + optional hash jump; must run in this
    // layout effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time init after DOM measurements
    setActiveSection(getActiveSectionId(header))
    lastScrollYRef.current = window.scrollY

    const observer = new ResizeObserver(() => {
      syncOffset()
      setActiveSection(getActiveSectionId(header))
    })
    observer.observe(header)
    window.addEventListener('resize', syncOffset)

    void document.fonts?.ready?.then(() => {
      syncOffset()
      if (!window.location.hash) window.scrollTo(0, 0)
    })

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncOffset)
    }
  }, [])

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header')
    if (!header) return

    const update = () => {
      const active = getActiveSectionId(header)
      setActiveSection(active)
      syncLocationHashWithActiveSection(active)

      const y = window.scrollY
      const last = lastScrollYRef.current
      const navH = header.offsetHeight
      const delta = y - last

      const contactEl = document.getElementById('contact')
      const contactTopDoc =
        contactEl != null
          ? window.scrollY + contactEl.getBoundingClientRect().top
          : null
      const suppressRevealOnScrollUp =
        contactTopDoc != null &&
        y > contactTopDoc - CONTACT_SCROLL_UP_REVEAL_BUFFER_PX

      if (forceHeaderVisible) {
        setHeaderScrollHidden(false)
      } else if (y <= 0) {
        setHeaderScrollHidden(false)
      } else if (suppressRevealOnScrollUp) {
        // In contact / lower page: only hide on scroll-down; ignore
        // scroll-up until well into projects.
        if (delta >= SCROLL_DIR_THRESHOLD_PX && y > navH) {
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
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [forceHeaderVisible])

  const navigateToSection = (section: string) => {
    const header = document.querySelector<HTMLElement>('.site-header')
    const target: SectionId = isSectionId(section) ? section : 'about'
    const direction = viewDirection(activeSection, target)

    const run = () => {
      if (header) scrollToSection(target, header)
      setActiveSection(target)
      syncLocationHashWithActiveSection(target)
    }

    // View Transitions API (Baseline 2024+) — opt in for a smooth
    // cross-fade when navigating between sections. `types`
    // (Chrome 125+/FF 147+/Safari 18.2+) lets CSS pick directional
    // keyframes via :active-view-transition-type().
    const doc = document as Document & {
      startViewTransition?: (
        cb: () => void,
        opts?: { types?: readonly string[] },
      ) => unknown
    }
    if (typeof doc.startViewTransition === 'function') {
      try {
        void doc.startViewTransition(run, { types: [direction] })
        return
      } catch {
        // API rejected (e.g. unsupported types) — fall through to plain run.
      }
    }
    run()
  }

  return { activeSection, headerScrollHidden, navigateToSection }
}

export const NAV_SECTION_IDS = SECTION_IDS
