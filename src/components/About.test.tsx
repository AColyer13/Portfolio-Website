import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { About } from './About'

describe('About', () => {
  it('renders the hero heading and intro copy', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Adam Colyer')
    expect(screen.getByText(/Full-stack developer/i)).toBeInTheDocument()
  })

  it('does not depend on any FontAwesome class (replaced by Icon)', () => {
    const { container } = render(<About />)
    expect(container.querySelector('[class*="fa-"]')).toBeNull()
  })

  it('offers the resume as a downloadable link with a real filename', () => {
    const { container } = render(<About />)
    const links = container.querySelectorAll<HTMLAnchorElement>('a[download]')
    expect(links.length).toBeGreaterThan(0)
    const link = links[0]
    expect(link.getAttribute('download')).toMatch(/AdamColyerResume.*\.pdf$/)
    expect(link.getAttribute('href')).toContain('AdamColyerResume')
  })

  it('does not render a hero image', () => {
    const { container } = render(<About />)
    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelector('picture')).toBeNull()
  })
})
