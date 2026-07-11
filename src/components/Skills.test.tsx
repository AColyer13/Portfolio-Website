import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skills } from './Skills'

describe('Skills', () => {
  it('renders curated skill groups as typographic lists', () => {
    render(<Skills />)

    expect(screen.getByRole('heading', { name: 'Build', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Data & cloud', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Quality', level: 3 })).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Gemini API')).toBeInTheDocument()
    expect(screen.queryByText('FastAPI')).not.toBeInTheDocument()
  })
})
