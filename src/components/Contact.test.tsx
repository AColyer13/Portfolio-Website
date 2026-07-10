import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

// Mock the lazy emailjs wrapper so we can drive the form submit
// deterministically without touching the network or the EmailJS SDK.
vi.mock('../utils/contact', () => ({
  sendContactForm: vi.fn().mockResolvedValue(undefined),
}))

import { Contact } from './Contact'
import { sendContactForm } from '../utils/contact'

beforeEach(() => {
  vi.mocked(sendContactForm).mockClear()
})

describe('Contact form', () => {
  it('renders all required fields with matching labels', () => {
    render(<Contact />)
    expect(screen.getByLabelText(/^Name$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Message$/i)).toBeInTheDocument()
  })

  it('blocks submit when fields are empty and surfaces inline errors', async () => {
    const { container } = render(<Contact />)
    // `noValidate` is set; simulate a real user click on the Send button.
    const submit = container.querySelector<HTMLInputElement>('input[type="submit"]')!
    fireEvent.click(submit)
    await waitFor(() => {
      const nameInput = screen.getByLabelText(/^Name$/i)
      expect(nameInput.getAttribute('aria-invalid')).toBe('true')
    })
    expect(screen.getAllByRole('alert').length).toBeGreaterThanOrEqual(1)
    expect(sendContactForm).not.toHaveBeenCalled()
  })

  it('does not depend on any FontAwesome class (replaced by Icon)', () => {
    const { container } = render(<Contact />)
    expect(container.querySelector('[class*="fa-"]')).toBeNull()
  })

  it('renders the map placeholder until clicked — iframe is lazy', () => {
    const { container } = render(<Contact />)
    // No iframe rendered until the user opts in (saves ~150 KB on first paint).
    expect(container.querySelector('iframe')).toBeNull()
    expect(
      container.querySelector('button[aria-label*="interactive map" i]'),
    ).toBeInTheDocument()
  })
})
