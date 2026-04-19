import { skills } from '../data/portfolio'

export function Skills() {
  return (
    <section className="skills section-block" id="skills">
      <div className="container" id="skills-container">
        <div className="skills__intro">
          <h2>Skills</h2>
        </div>
        <div className="skills-grid" id="skills-row">
          {skills.map((skill) => (
            <div key={skill.name} className="services-item">
              <div className="skill-card">
                <h4>{skill.name}</h4>
                {skill.icon.includes('fa') ? (
                  <i className={skill.icon} />
                ) : (
                  <i className="skill-card__emoji" aria-hidden>
                    {skill.icon}
                  </i>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
