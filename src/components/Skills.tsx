import { skillBlocks } from '../data/portfolio'
import { withBase } from '../utils/baseUrl'
import { Section, SubsectionHeading } from './Section'

function SkillIcon({ icon }: { icon: string }) {
  if (icon.includes('fa')) {
    return <i className={icon} aria-hidden />
  }
  if (icon === 'images/fastapi.svg') {
    return (
      <svg className="skill-card__inline-logo" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 .039C5.373.038.0003 5.393 0 11.999c-.001 6.607 5.372 11.963 12 11.963 6.628 0 12.001-5.356 12-11.963C24 5.393 18.628.039 12 .039zm-.829 5.415h7.55l-7.58 5.328h5.183L5.279 18.544q2.947-6.544 5.892-13.09" />
      </svg>
    )
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
    <i className="skill-card__emoji" aria-hidden>
      {icon}
    </i>
  )
}

export function Skills() {
  return (
    <Section id="skills" title="Skills" variant="skills">
      <div className="skills-blocks">
        {skillBlocks.map((block) => (
          <div key={block.title} className="skills-block">
            <SubsectionHeading title={block.title} />
            <div className="skills-grid">
              {block.skills.map((skill) => (
                <div key={skill.name} className="services-item">
                  <div className="skill-card">
                      <div className="skill-card__body">
                        <h4>{skill.name}</h4>
                        <SkillIcon icon={skill.icon} />
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
