import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { timeline } from '../data/portfolio'
import { Experiences } from './Experiences'

describe('Experiences', () => {
  it('renders every timeline entry', () => {
    render(<Experiences />)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(timeline.length)
    for (const item of timeline) {
      expect(screen.getByText(item.company)).toBeInTheDocument()
    }
  })

  it('exposes the experience landmark id', () => {
    const { container } = render(<Experiences />)
    expect(container.querySelector('#experience')).toBeInTheDocument()
  })
})
