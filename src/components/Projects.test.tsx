import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { featuredProjects } from '../data/portfolio'
import { Projects } from './Projects'

describe('Projects', () => {
  it('renders featured project titles by default', () => {
    render(<Projects />)
    expect(screen.getByText('Valley Forge Automotive')).toBeInTheDocument()
    expect(screen.getByText('MissionCtrl')).toBeInTheDocument()
    expect(screen.getByText('Legal Eagle Project')).toBeInTheDocument()
  })

  it('hides non-featured projects until expanded', () => {
    render(<Projects />)

    expect(screen.queryByText('Dream Vacation App')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /View all projects/i }))
    expect(screen.getByText('Dream Vacation App')).toBeInTheDocument()
  })

  it('resolves image src for public assets', () => {
    const { container } = render(<Projects />)
    const imgs = container.querySelectorAll('img')
    expect(imgs.length).toBe(featuredProjects.length)
    expect(imgs[0].getAttribute('src')).toContain(
      'images/missionctrl-tr41-groundctrl',
    )
  })

  it('uses format-specific srcSet on each picture source', () => {
    const { container } = render(<Projects />)
    const picture = container.querySelector('picture')!
    const [avif, webp] = picture.querySelectorAll('source')
    const img = picture.querySelector('img')!

    expect(avif.getAttribute('type')).toBe('image/avif')
    expect(avif.getAttribute('srcset')).toMatch(/\.avif /)
    expect(avif.getAttribute('srcset')).not.toMatch(/\.webp |\.png /)

    expect(webp.getAttribute('type')).toBe('image/webp')
    expect(webp.getAttribute('srcset')).toMatch(/\.webp /)
    expect(webp.getAttribute('srcset')).not.toMatch(/\.avif |\.png /)

    expect(img.getAttribute('srcset')).toMatch(/\.png /)
    expect(img.getAttribute('srcset')).not.toMatch(/\.avif |\.webp /)
  })

  it('prioritizes only the first card image; others load eagerly when featured', () => {
    const { container } = render(<Projects />)
    const imgs = container.querySelectorAll<HTMLImageElement>('img')
    expect(imgs[0].getAttribute('fetchpriority')).toBe('high')
    expect(imgs[0].getAttribute('loading')).toBe('eager')
    for (let i = 1; i < featuredProjects.length; i++) {
      expect(imgs[i].getAttribute('fetchpriority')).toBeNull()
      expect(imgs[i].getAttribute('loading')).toBe('eager')
    }
  })

  it('lazy-loads images for projects revealed after expand', () => {
    const { container } = render(<Projects />)
    fireEvent.click(screen.getByRole('button', { name: /View all projects/i }))
    const imgs = container.querySelectorAll<HTMLImageElement>('img')
    expect(imgs.length).toBeGreaterThan(featuredProjects.length)
    for (let i = featuredProjects.length; i < imgs.length; i++) {
      expect(imgs[i].getAttribute('loading')).toBe('lazy')
      expect(imgs[i].getAttribute('fetchpriority')).toBeNull()
    }
  })

  it('renders live demo and source links for featured projects', () => {
    render(<Projects />)
    expect(screen.getAllByRole('link', { name: /Live demo/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /source on GitHub/i }).length).toBe(3)
  })

  it('links expanded live demos to verified URLs', () => {
    render(<Projects />)
    fireEvent.click(screen.getByRole('button', { name: /View all projects/i }))

    const liveLinks = screen.getAllByRole('link', { name: /Live demo/i })
    const ufoLive = liveLinks.find((link) =>
      link.getAttribute('href')?.includes('moovellous'),
    )
    expect(ufoLive).toHaveAttribute('href', 'https://acolyer13.github.io/moovellous/')
  })

  it('no longer renders any FontAwesome classes (font icons migrated to SVG Icon)', () => {
    const { container } = render(<Projects />)
    expect(container.querySelector('[class*="fa-"]')).toBeNull()
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0)
  })
})
