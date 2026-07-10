import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Projects } from './Projects'

describe('Projects', () => {
  it('renders titles from portfolio data', () => {
    render(<Projects />)
    expect(screen.getAllByText('Valley Forge Automotive').length).toBeGreaterThan(0)
    expect(screen.getAllByText('MissionCtrl').length).toBeGreaterThan(0)
  })

  it('renders private-repo projects that link to source on GitHub', () => {
    render(<Projects />)
    expect(screen.getAllByText('Legal Eagle Project').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Dream Vacation App').length).toBeGreaterThan(0)
    expect(screen.getAllByText('UFO Abductor').length).toBeGreaterThan(0)
    expect(screen.getAllByText('The Office').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Writing Consultant').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Stardust').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Minnesota Snowmobile').length).toBeGreaterThan(0)
  })

  it('resolves image src for public assets', () => {
    const { container } = render(<Projects />)
    const imgs = container.querySelectorAll('img')
    expect(imgs.length).toBeGreaterThan(0)
    expect(imgs[0].getAttribute('src')).toContain(
      'images/missionctrl-tr41-groundctrl',
    )
  })

  it('uses live URL for overlay when present', () => {
    const { container } = render(<Projects />)
    const firstCard = container.querySelector('.portfolio-item-inner')
    const zoom = firstCard?.querySelector('.portfolio-zoom-link')
    expect(zoom).toHaveAttribute('href', 'https://missionctrl.org')
  })

  it('falls back to GitHub overlay when no liveUrl', () => {
    const { container } = render(<Projects />)
    const cards = container.querySelectorAll('.portfolio-item-inner')
    // The Office has no liveUrl — its overlay should target the GitHub repo
    const officeCard = Array.from(cards).find((card) =>
      card.textContent?.includes('The Office'),
    )
    const zoom = officeCard?.querySelector('.portfolio-zoom-link')
    expect(zoom).toHaveAttribute('href', 'https://github.com/AColyer13/the-office')
  })

  it('links UFO Abductor overlay to its GitHub Pages demo', () => {
    const { container } = render(<Projects />)
    const cards = container.querySelectorAll('.portfolio-item-inner')
    const ufoCard = Array.from(cards).find((card) =>
      card.textContent?.includes('UFO Abductor'),
    )
    const zoom = ufoCard?.querySelector('.portfolio-zoom-link')
    expect(zoom).toHaveAttribute(
      'href',
      'https://acolyer13.github.io/moovellous/',
    )
  })

  it('renders GitHub links for all new private-repo projects', () => {
    const { container } = render(<Projects />)
    const expectedLinks = [
      'https://github.com/AColyer13/legaleagleproject',
      'https://github.com/AColyer13/DreamVacationApp',
      'https://github.com/AColyer13/the-office',
      'https://github.com/AColyer13/writing_consultant',
      'https://github.com/AColyer13/Stardust',
      'https://github.com/AColyer13/minnesota-snowmobile',
    ]
    for (const href of expectedLinks) {
      expect(
        container.querySelector(`a.portfolio-link[href="${href}"]`),
      ).toBeTruthy()
    }
  })

  it('links live overlays to verified demo URLs', () => {
    const { container } = render(<Projects />)
    const cards = container.querySelectorAll('.portfolio-item-inner')
    const expectedLiveUrls: Record<string, string> = {
      Stardust: 'https://acolyer13.github.io/Stardust/',
      'Minnesota Snowmobile': 'https://acolyer13.github.io/minnesota-snowmobile/',
      'Legal Eagle Project': 'https://legaleagleproject-mu.vercel.app',
      'UFO Abductor': 'https://acolyer13.github.io/moovellous/',
    }
    for (const [title, href] of Object.entries(expectedLiveUrls)) {
      const card = Array.from(cards).find((c) => c.textContent?.includes(title))
      const zoom = card?.querySelector('.portfolio-zoom-link')
      expect(zoom).toHaveAttribute('href', href)
    }
  })
  it('no longer renders any FontAwesome classes (font icons migrated to SVG Icon)', () => {
    const { container } = render(<Projects />)
    // FA classes use the prefix `fa-` (e.g. `fab fa-github`, `fas fa-external-link-alt`).
    // All project icons must now flow through the lucide/Icon component (svg element).
    expect(container.querySelector('[class*="fa-"]')).toBeNull()
    // Sanity: the GitHub icon is still present (just as an inline SVG).
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0)
  })

  it('marks every card thumb with lazy loading for below-the-fold LCP savings', () => {
    const { container } = render(<Projects />)
    const imgs = container.querySelectorAll<HTMLImageElement>('img')
    for (const img of imgs) {
      expect(img.getAttribute('loading')).toBe('lazy')
      expect(img.getAttribute('decoding')).toBe('async')
    }
  })})