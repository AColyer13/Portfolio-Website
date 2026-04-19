import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Projects } from './Projects'

describe('Projects', () => {
  it('renders titles from portfolio data', () => {
    render(<Projects />)
    expect(screen.getAllByText('Valley Forge Automotive').length).toBeGreaterThan(0)
    expect(screen.getAllByText('MissionCtrl').length).toBeGreaterThan(0)
  })

  it('resolves image src for public assets', () => {
    const { container } = render(<Projects />)
    const imgs = container.querySelectorAll('img')
    expect(imgs.length).toBeGreaterThan(0)
    expect(imgs[0].getAttribute('src')).toContain('images/mechanicapiicon')
  })

  it('uses live URL for overlay when present', () => {
    const { container } = render(<Projects />)
    const firstCard = container.querySelector('.portfolio-item-inner')
    const zoom = firstCard?.querySelector('.portfolio-zoom-link')
    expect(zoom).toHaveAttribute('href', 'https://valleyforgeautomotive.org')
  })

  it('links the footer GitHub icon to the repo', () => {
    const { container } = render(<Projects />)
    const gh = container.querySelector(
      'a.portfolio-link[href="https://github.com/AColyer13/vikes-quiz-app"]',
    )
    expect(gh).toBeTruthy()
  })
})
