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

  it('renders the map placeholder until clicked — iframe is gated, not lazy', () => {
    const { container } = render(<Contact />)
    // No iframe rendered until the user opts in (saves ~150 KB on first paint).
    expect(container.querySelector('iframe')).toBeNull()
    expect(
      container.querySelector('button[aria-label*="interactive map" i]'),
    ).toBeInTheDocument()
  })

  it('loads the map iframe eagerly once the placeholder is clicked', () => {
    // Regression: the iframe must use loading="eager". A lazy iframe inside a
    // section that uses content-visibility: auto can stick at about:blank on
    // Chromium because the IntersectionObserver never decides it's near the
    // viewport. Since the iframe only mounts after an explicit user click,
    // eager is the right default.
    const { container } = render(<Contact />)
    const placeholder = container.querySelector<HTMLButtonElement>(
      'button[aria-label*="interactive map" i]',
    )!
    fireEvent.click(placeholder)
    const iframe = container.querySelector('iframe')
    expect(iframe).not.toBeNull()
    expect(iframe?.getAttribute('loading')).toBe('eager')
    expect(iframe?.getAttribute('title')).toMatch(/Edina/i)
  })
})
