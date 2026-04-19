import { timeline } from '../data/portfolio'

export function Experiences() {
  return (
    <section className="resume section-block" id="experience">
      <div className="container">
        <div className="section-heading section-heading--center">
          <h2>Experiences</h2>
        </div>

        <div className="resume__inner">
          <div className="timeline">
            {timeline.map((item) => (
              <div key={`${item.year}-${item.title}`} className="timeline-wrapper">
                <div className="timeline-yr">
                  <span>{item.year}</span>
                </div>
                <div className="timeline-info">
                  <h3 className="timeline-info__title">{item.title}</h3>
                  <p className="timeline-info__company">{item.company}</p>
                  <p className="timeline-info__body">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
