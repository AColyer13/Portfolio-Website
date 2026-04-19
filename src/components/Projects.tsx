import { projects } from '../data/portfolio'
import { withBase } from '../utils/baseUrl'

export function Projects() {
  return (
    <section className="project section-block" id="projects">
      <div className="container">
        <div className="section-heading section-heading--center">
          <h2>My Projects</h2>
        </div>
        <div className="portfolio-grid">
          {projects.map((project) => {
            const overlayHref = project.liveUrl ?? project.githubUrl
            const overlayIcon = project.liveUrl
              ? 'fas fa-external-link-alt'
              : 'fab fa-github-alt'
            return (
              <div key={project.id} className="portfolio-item">
                <div className="portfolio-item-inner">
                  <div className="portfolio-item-img">
                    <img
                      src={withBase(project.imageUrl)}
                      alt=""
                      className="media-fluid"
                    />
                    <a
                      href={overlayHref}
                      className="portfolio-zoom-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} (external)`}
                    >
                      <i className={overlayIcon} aria-hidden />
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
                      aria-label={`${project.title} on GitHub`}
                    >
                      <i className="fab fa-github-alt" aria-hidden />
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
