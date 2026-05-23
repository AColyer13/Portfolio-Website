import { projects } from '../data/portfolio'
import { withBase } from '../utils/baseUrl'
import { Section } from './Section'

export function Projects() {
  return (
    <Section id="projects" title="My Projects" variant="project">
      <div className="grid grid-cols-1 gap-3 text-center @[36rem]:grid-cols-2 @[60rem]:grid-cols-3">
        {projects.map((project) => {
          const overlayHref = project.liveUrl ?? project.githubUrl
          const overlayIcon = project.liveUrl
            ? 'fas fa-external-link-alt'
            : 'fab fa-github-alt'
          return (
            <div key={project.id}>
              <div className="portfolio-item-inner group mx-auto min-h-[23rem] max-w-full overflow-hidden rounded-lg border border-border-default bg-surface-0 contain-[layout_style] transition-[transform,box-shadow,border-color] duration-200 ease-in-out hover:-translate-y-[0.3125rem] hover:border-primary-600 hover:shadow-card-hover">
                <div className="relative h-[12.5rem] overflow-hidden">
                  <img
                    src={withBase(project.imageUrl)}
                    alt=""
                    className="mx-auto block h-full w-full max-w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                  />
                  <a
                    href={overlayHref}
                    className="portfolio-zoom-link absolute top-1/2 left-1/2 z-2 flex h-[3.75rem] w-[3.75rem] min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-600 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} (external)`}
                  >
                    <i className={`${overlayIcon} text-fluid-3 text-surface-0`} aria-hidden />
                  </a>
                </div>
                <div className="p-3 text-center">
                  <div>
                    <h6 className="tech mb-1 text-copyright uppercase tracking-wide text-primary-600">
                      {project.tech}
                    </h6>
                    <h5 className="mb-2 text-fluid-3 text-text-default">{project.title}</h5>
                  </div>
                  <a
                    href={project.githubUrl}
                    className="portfolio-link mt-2 inline-flex min-h-11 min-w-11 items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on GitHub`}
                  >
                    <i className="fab fa-github-alt text-fluid-3 text-primary-600 transition-colors duration-200 ease-in-out hover:text-primary-700" aria-hidden />
                  </a>
                  <h6 className="mt-1 text-copyright text-text-subtle">Github</h6>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
