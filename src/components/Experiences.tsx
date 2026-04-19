import { timeline } from '../data/portfolio'

export function Experiences() {
  return (
    <section className="resume section-block" id="experience">
      <div className="container">
        <div className="resume__inner">
          <div className="section-heading">
            <h2>Experiences</h2>
          </div>

          <div className="timeline">
            {timeline.map((item) => (
              <div key={`${item.year}-${item.title}`} className="timeline-wrapper">
                <div className="timeline-yr">
                  <span>{item.year}</span>
                </div>
                <div className="timeline-info">
                  <h3>
                    <span>{item.title}</span>
                    <small>{item.company}</small>
                  </h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
