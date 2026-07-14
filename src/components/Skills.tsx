import { useId } from 'react'
import { skillBlocks, type Skill, type SkillBlock } from '../data/portfolio'
import { withBase } from '../utils/baseUrl'
import { skillCardClass } from '../utils/layoutClasses'
import { Icon, isRegisteredIcon } from './Icons'
import { Section } from './Section'

function SkillIcon({ icon }: { icon: string }) {
  if (isRegisteredIcon(icon)) {
    return <Icon name={icon} className="shrink-0 text-[2rem] leading-none text-text-muted" />
  }
  if (/\.(?:svg|png|jpe?g|webp)$/i.test(icon)) {
    const logoUrl = withBase(icon)
    return (
      <span
        className="skill-card__logo"
        style={{
          maskImage: `url("${logoUrl}")`,
          WebkitMaskImage: `url("${logoUrl}")`,
        }}
        aria-hidden
      />
    )
  }
  return (
    <i className="skill-card__emoji shrink-0 text-[1.625rem] not-italic" aria-hidden>
      {icon}
    </i>
  )
}

interface SkillPopoverProps {
  skill: Skill
  /** Unique id pairing the trigger button to the popover region. */
  popoverId: string
  onClose: () => void
}

/**
 * Detailed view of a skill, rendered inside a native `popover` element so the
 * browser handles light-dismiss, focus management, and stacking automatically.
 */
function SkillPopover({ skill, popoverId, onClose }: SkillPopoverProps) {
  return (
    <div
      id={popoverId}
      popover="auto"
      className="skill-popover w-[min(22rem,calc(100vw-2rem))] rounded-md border border-border-default bg-surface-0 p-4 text-text-default shadow-[0_1rem_2.5rem_rgb(0_0_0_/0.18)]"
      role="dialog"
      aria-label={`${skill.name} — details`}
    >
      <div className="mb-2 flex items-center gap-2">
        <SkillIcon icon={skill.icon} />
        <h4 className="m-0 text-fluid-3 font-bold leading-snug">{skill.name}</h4>
      </div>
      <p className="m-0 mb-2 text-fluid-1 leading-relaxed text-text-default">
        {skill.description}
      </p>
      <p className="m-0 text-fluid-1 leading-relaxed text-text-muted">
        <span className="font-medium text-text-default">In practice:</span>{' '}
        {skill.application}
      </p>
      <button
        type="button"
        className="skill-popover__close mt-3 inline-flex min-h-9 cursor-pointer items-center rounded-sm border border-border-default bg-surface-50 px-3 py-1 text-copyright font-medium text-text-default transition-colors duration-150 ease-in-out hover:border-text-muted"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  )
}

interface SkillCardProps {
  skill: Skill
}

/**
 * One skill tile: logo, name, and an (i) trigger button that opens a popover
 * with the description and a one-line professional application.
 */
function SkillCard({ skill }: SkillCardProps) {
  const popoverId = useId()
  const triggerId = `${popoverId}-trigger`

  return (
    <div className="flex w-full min-w-0 self-stretch">
      <div className={`${skillCardClass} skill-card--with-info`}>
        <div className="skill-card__body flex max-h-full w-full min-w-0 flex-col items-center justify-center gap-2">
          <div className="flex w-full items-start justify-center gap-2">
            <h4 className="m-0 grow shrink basis-0 overflow-wrap-anywhere text-center text-fluid-3 font-medium leading-snug text-text-default">
              {skill.name}
            </h4>
            <button
              type="button"
              id={triggerId}
              className="skill-info-btn inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-default bg-surface-50 text-copyright font-medium leading-none text-text-muted transition-colors duration-150 ease-in-out hover:border-text-default hover:text-text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              aria-label={`About ${skill.name} — show description and how I use it`}
              aria-describedby={popoverId}
              popoverTarget={popoverId}
              data-tooltip={`What ${skill.name} is and how I use it`}
            >
              i
            </button>
          </div>
          <SkillIcon icon={skill.icon} />
        </div>
      </div>
      <SkillPopover
        skill={skill}
        popoverId={popoverId}
        onClose={() => {
          const popover = document.getElementById(popoverId)
          if (popover && 'hidePopover' in popover) {
            ;(popover as HTMLElement & { hidePopover: () => void }).hidePopover()
          }
        }}
      />
    </div>
  )
}

interface SkillBlockSectionProps {
  block: SkillBlock
  /** Stable id prefix so the open/close animation can target the contents. */
  index: number
}

/**
 * One collapsible discipline block. Compact by default — heading + summary +
 * chevron only. The skill grid slides open when the user expands the row.
 *
 * The animation is pure CSS: the body height transitions between 0 and its
 * natural size using `interpolate-size: allow-keywords` (Baseline 2024) so
 * we don't need JavaScript-measured heights. `prefers-reduced-motion` users
 * get an instant open/close.
 */
function SkillBlockSection({ block, index }: SkillBlockSectionProps) {
  const blockId = useId()
  const headerId = `${blockId}-header`
  const bodyId = `${blockId}-body`
  const regionClass = `skills-block skills-block--${index} w-full`

  return (
    <details
      // Unique id so a status bar/screen-reader can target an individual block.
      id={`${blockId}-details`}
      className={regionClass}
      name="skills-blocks"
    >
      <summary
        id={headerId}
        aria-controls={bodyId}
        className="skills-block__summary mx-auto mb-3 flex w-full max-w-[60rem] cursor-pointer list-none items-center justify-between gap-3 rounded-md border border-border-default bg-surface-0 px-4 py-3 text-text-default transition-colors duration-150 ease-in-out hover:border-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 [&::-webkit-details-marker]:hidden"
      >
        <span className="flex min-w-0 grow flex-col gap-0.5 text-start">
          <h3 className="m-0 text-fluid-3 font-bold leading-tight tracking-tight text-text-default">
            {block.title}
          </h3>
          <span className="m-0 truncate text-fluid-1 text-text-muted @[40rem]:whitespace-normal">
            {block.summary}
          </span>
        </span>
        <span className="skills-block__chevron inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border-default bg-surface-50 text-text-muted transition-transform duration-200 ease-out" aria-hidden>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
      </summary>

      <div
        id={bodyId}
        role="region"
        aria-labelledby={headerId}
        className="skills-block__body mx-auto w-full max-w-[60rem] overflow-hidden"
      >
        <div className="skills-block__panel px-1 pb-2 pt-1">
          <div className="grid w-full grid-cols-2 items-stretch justify-items-stretch gap-x-(--container-inline) gap-y-3 @[56rem]:grid-cols-4 @[56rem]:gap-x-3">
            {block.skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </details>
  )
}

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      variant="skills"
      headingClassName="flow-root mb-3 mx-auto max-w-[52ch] text-center"
    >
      <div className="skills-blocks flex w-full flex-col gap-3">
        {skillBlocks.map((block, index) => (
          <SkillBlockSection key={block.title} block={block} index={index} />
        ))}
      </div>
    </Section>
  )
}
