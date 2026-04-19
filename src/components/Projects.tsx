import { projects } from '../data/portfolio'
import { withBase } from '../utils/baseUrl'

export function Projects() {
  return (
    <section className="project py-5" id="projects">
      <div className="container">
        <div className="col-md-6">
          <h2>My Projects</h2>
        </div>
        <div className="row portfolio-grid text-center" id="portfolio-masonry-wrap">
          {projects.map((project) => {
            const overlayHref = project.liveUrl ?? project.githubUrl
            const overlayIcon = project.liveUrl
              ? 'fas fa-external-link-alt'
              : 'fab fa-github-alt'
            return (
              <div
                key={project.id}
                className="col-md-6 col-lg-4 portfolio-item mockup"
              >
                <div className="portfolio-item-inner">
                  <div className="portfolio-item-img">
                    <img
                      src={withBase(project.imageUrl)}
                      alt="Portfolio image"
                      className="img-fluid"
                    />
                    <a
                      href={overlayHref}
                      className="portfolio-zoom-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={overlayIcon}></i>
                    </a>
                  </div>
                  <div className="body">
                    <div className="portfolio-details">
                      <h6 className="tech">{project.tech}</h6>
                      <h5>{project.title}</h5>
                    </div>
                    <a
                      href={project.githubUrl}
                      className="portfolio-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github-alt"></i>
                    </a>
                    <h6>Github</h6>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
