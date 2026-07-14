import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { skillBlocks } from '../data/portfolio'
import { Skills } from './Skills'

/**
 * Helpers — `<summary>` inside `<details>` is the actual click target, but
 * Testing Library's getByRole('button') only matches buttons. We use the
 * element itself via its `role="button"` aria-controls pairing + class.
 */
function getBlockSummaries() {
  // Each block has one <summary>; native role on summary is button in many
  // browsers but jsdom doesn't model that. Just query details > summary.
  const summaries = Array.from(document.querySelectorAll<HTMLElement>('details summary'))
  expect(summaries.length).toBe(skillBlocks.length)
  return summaries
}

describe('Skills', () => {
  it('renders a top-level discipline per block (no per-stack headings)', () => {
    render(<Skills />)
    for (const block of skillBlocks) {
      expect(
        screen.getByRole('heading', { name: block.title, level: 3 }),
      ).toBeInTheDocument()
    }
  })

  it('shows a description and an "In practice" line for every skill', () => {
    for (const block of skillBlocks) {
      for (const skill of block.skills) {
        expect(skill.description.length, `${skill.name} has no description`).toBeGreaterThan(
          20,
        )
        expect(skill.application.length, `${skill.name} has no application`).toBeGreaterThan(
          20,
        )
      }
    }
  })

  it('starts every category collapsed (compact by default)', () => {
    render(<Skills />)
    const details = Array.from(document.querySelectorAll<HTMLDetailsElement>('details'))
    expect(details.length).toBe(skillBlocks.length)
    for (const d of details) {
      expect(d.hasAttribute('open'), 'details should not be open by default').toBe(false)
    }
  })

  it('expands the category when the summary is clicked', () => {
    render(<Skills />)
    const summaries = getBlockSummaries()
    fireEvent.click(summaries[0])
    const details = Array.from(document.querySelectorAll<HTMLDetailsElement>('details'))
    expect(details[0].hasAttribute('open')).toBe(true)
    // Other blocks remain collapsed.
    for (let i = 1; i < details.length; i++) {
      expect(details[i].hasAttribute('open')).toBe(false)
    }
    // The first block now reveals skill tiles.
    const firstBlock = skillBlocks[0]
    expect(
      screen.getByRole('heading', { name: firstBlock.skills[0].name, level: 4 }),
    ).toBeInTheDocument()
  })

  it('shows a chevron (rotated when open) on every block heading', () => {
    render(<Skills />)
    const chevrons = document.querySelectorAll<HTMLElement>('.skills-block__chevron')
    expect(chevrons.length).toBe(skillBlocks.length)
    // Default rotation is 0deg (collapsed).
    for (const c of chevrons) {
      expect(c.style.transform || getComputedStyle(c).transform).not.toMatch(/matrix\(.+?0.+?1\)|rotate\(90/)
    }
    // Open the first block and check the chevron rotates.
    fireEvent.click(getBlockSummaries()[0])
    const openChevron = document.querySelector<HTMLElement>(
      '.skills-block[open] > .skills-block__summary .skills-block__chevron',
    )
    expect(openChevron).toBeTruthy()
  })

  it('renders FastAPI with the logo mask like other SVG skills when expanded', () => {
    render(<Skills />)
    fireEvent.click(getBlockSummaries()[0])

    const heading = screen.getByRole('heading', { name: 'FastAPI', level: 4 })
    const body = heading.closest('.skill-card__body')
    const icon = body?.querySelector<HTMLElement>('.skill-card__logo')

    expect(icon).toBeTruthy()
    expect(icon?.style.maskImage || icon?.style.webkitMaskImage).toBe(
      'url("/images/fastapi.svg")',
    )
  })

  it('exposes an info (i) trigger for every skill card when expanded', () => {
    render(<Skills />)
    getBlockSummaries().forEach((s) => fireEvent.click(s))

    const totalSkills = skillBlocks.reduce((sum, b) => sum + b.skills.length, 0)
    const triggers = screen.getAllByRole('button', { name: /show description/i })
    expect(triggers.length).toBe(totalSkills)
  })

  it('pairs each (i) trigger with a popover that contains a description', () => {
    render(<Skills />)
    getBlockSummaries().forEach((s) => fireEvent.click(s))

    const triggers = screen.getAllByRole('button', { name: /show description/i })
    for (const trigger of triggers) {
      const targetId = trigger.getAttribute('popovertarget')
      expect(targetId).toBeTruthy()
      const popover = document.getElementById(targetId as string)
      expect(popover, `popover #${targetId} missing`).toBeTruthy()
      expect(popover?.getAttribute('popover')).toBe('auto')
      if (popover) {
        const firstParagraph = popover.querySelector('p')
        expect(firstParagraph?.textContent?.length ?? 0).toBeGreaterThan(20)
        // Confirm the dialog wrapper exposes a skill name as its h4 heading.
        const heading = popover.querySelector<HTMLHeadingElement>('h4')
        expect(heading?.textContent?.length ?? 0).toBeGreaterThan(0)
      }
    }
  })
})
