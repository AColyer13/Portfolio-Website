import { withBase } from '../utils/baseUrl'
import {
  containerClass,
  primaryBtnClass,
  secondaryBtnClass,
  sectionContainerClass,
} from '../utils/layoutClasses'
import { Icon } from './Icons'

const base = import.meta.env.BASE_URL
const RESUME_PATH = 'files/AdamColyerResume2026v2.pdf'
const RESUME_FILENAME = 'AdamColyerResume2026v2.pdf'
const resumeUrl = withBase(RESUME_PATH)

export function About() {
  return (
    <section
      id="about"
      className="pt-(--section-hero-padding-top) pb-(--section-padding-y) [contain:layout]"
    >
      <div className={`${containerClass} ${sectionContainerClass} max-w-[42rem]`}>
        <h1 className="m-0 mb-3 text-h1 font-bold leading-tight text-text-default">
          Adam Colyer
        </h1>

        <p className="m-0 mb-4 text-fluid-3 font-medium text-text-muted">
          Full-stack developer
        </p>

        <p className="m-0 text-body leading-relaxed text-text-default">
          Former sales professional with hands-on experience managing $2M+ pipelines. Now
          building full-stack applications and combining business insight with technical
          problem solving.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <a href={resumeUrl} className={primaryBtnClass} download={RESUME_FILENAME}>
            <Icon name="file-alt" aria-hidden />
            Download resume
          </a>
          <a href={`${base}#contact`} className={secondaryBtnClass}>
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
