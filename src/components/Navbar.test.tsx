import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Navbar } from './Navbar'

describe('Navbar', () => {
  it('renders all section links', () => {
    render(<Navbar activeSection="about" onNavigate={vi.fn()} />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Experiences')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('marks the active section', () => {
    render(<Navbar activeSection="projects" onNavigate={vi.fn()} />)
    const activeProjects = screen
      .getAllByRole('link')
      .filter(
        (a) =>
          a.classList.contains('active') &&
          a.getAttribute('href')?.endsWith('#projects'),
      )
    expect(activeProjects.length).toBeGreaterThan(0)
  })
})
