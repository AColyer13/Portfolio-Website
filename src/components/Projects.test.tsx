import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Projects } from './Projects'

describe('Projects', () => {
  it('renders titles from portfolio data', () => {
    render(<Projects />)
    expect(screen.getByText('Valley Forge Automotive')).toBeInTheDocument()
    expect(screen.getByText('MissionCtrl')).toBeInTheDocument()
  })
})
