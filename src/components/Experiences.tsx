import { timeline } from '../data/portfolio'

export function Experiences() {
  return (
    <section
      className="resume py-5 d-lg-flex justify-content-center align-items-center"
      id="experience"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            <h2 className="mb-4">Experiences</h2>

            <div className="timeline">
              {timeline.map((item) => (
                <div
                  key={`${item.year}-${item.title}`}
                  className="timeline-wrapper"
                >
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
      </div>
    </section>
  )
}
