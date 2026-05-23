import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skills } from './Skills'

describe('Skills', () => {
  it('renders FastAPI with the official inline SVG icon', () => {
    render(<Skills />)

    const heading = screen.getByRole('heading', { name: 'FastAPI', level: 4 })
    const body = heading.closest('.skill-card__body')
    const icon = body?.querySelector('.skill-card__icon path')

    expect(body?.querySelector('i.images\\/fastapi\\.svg')).toBeNull()
    expect(icon).toBeTruthy()
    expect(icon).toHaveAttribute('fill', 'currentColor')
    expect(icon?.getAttribute('d')).toContain('3.175 0.53433431')
  })
})
