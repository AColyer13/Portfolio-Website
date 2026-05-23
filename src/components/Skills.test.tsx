import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skills } from './Skills'

describe('Skills', () => {
  it('renders FastAPI with the official logo asset mask', () => {
    render(<Skills />)

    const heading = screen.getByRole('heading', { name: 'FastAPI', level: 4 })
    const body = heading.closest('.skill-card__body')
    const icon = body?.querySelector<HTMLElement>('.skill-card__logo')

    expect(body?.querySelector('i.images\\/fastapi\\.svg')).toBeNull()
    expect(icon).toBeTruthy()
    expect(icon).toHaveStyle({
      maskImage: 'url("/images/fastapi.svg")',
      WebkitMaskImage: 'url("/images/fastapi.svg")',
    })
  })
})
