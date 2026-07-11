import { useState } from 'react'
import { featuredProjects, projects } from '../data/portfolio'
import { withBase } from '../utils/baseUrl'
import { pictureSrcSet } from '../utils/pictureSources'
import { imgCardThumbClass, portfolioCardClass } from '../utils/layoutClasses'
import { Section } from './Section'
import { Icon } from './Icons'

const CARD_WIDTHS = [640, 1280] as const
const CARD_SIZES = '(min-width: 60rem) 33vw, (min-width: 36rem) 50vw, 100vw'

type ImagePriority = 'high' | 'eager' | 'lazy'

function imagePriorityForIndex(index: number): ImagePriority {
  if (index === 0) return 'high'
  if (index < featuredProjects.length) return 'eager'
  return 'lazy'
}

function ProjectCard({
  project,
  imagePriority,
}: {
  project: (typeof projects)[number]
  imagePriority: ImagePriority
}) {
  return (
    <article className={`${portfolioCardClass} flex h-full w-full flex-col`}>
      <div className="relative h-[12.5rem] overflow-hidden border-b border-border-default">
        <picture>
          <source
            type="image/avif"
            srcSet={pictureSrcSet(project.imageUrl, CARD_WIDTHS, 'avif')}
            sizes={CARD_SIZES}
          />
          <source
            type="image/webp"
            srcSet={pictureSrcSet(project.imageUrl, CARD_WIDTHS, 'webp')}
            sizes={CARD_SIZES}
          />
          <img
            src={withBase(project.imageUrl)}
            srcSet={pictureSrcSet(project.imageUrl, CARD_WIDTHS, 'original')}
            sizes={CARD_SIZES}
            alt={project.title}
            width={project.imageWidth}
            height={project.imageHeight}
            loading={imagePriority === 'lazy' ? 'lazy' : 'eager'}
            decoding="async"
            {...(imagePriority === 'high' ? { fetchPriority: 'high' as const } : {})}
            className={imgCardThumbClass}
          />
        </picture>
      </div>
      <div className="flex grow flex-col gap-2 p-4">
        <p className="m-0 text-copyright uppercase tracking-wide text-text-subtle">
          {project.tech}
        </p>
        <h3 className="m-0 text-fluid-3 font-bold leading-snug text-text-default">
          {project.title}
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              className="inline-flex min-h-11 items-center gap-1 text-fluid-1 font-medium text-text-default underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="external-link-alt" className="text-fluid-1" aria-hidden />
              Live demo
            </a>
          ) : null}
          <a
            href={project.githubUrl}
            className="inline-flex min-h-11 items-center gap-1 text-fluid-1 font-medium text-text-muted underline-offset-4 hover:text-text-default hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source on GitHub`}
          >
            <Icon name="github-alt" className="text-fluid-1" aria-hidden />
            Source
          </a>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? projects : featuredProjects
  const hiddenCount = projects.length - featuredProjects.length

  return (
    <Section id="projects" title="Projects" variant="project">
      <div className="grid grid-cols-1 gap-3 @[36rem]:grid-cols-2 @[60rem]:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <div key={project.id} className="flex">
            <ProjectCard
              project={project}
              imagePriority={imagePriorityForIndex(index)}
            />
          </div>
        ))}
      </div>

      {hiddenCount > 0 ? (
        <div className="mt-5 text-center">
          <button
            type="button"
            className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-border-default bg-transparent px-4 py-2 text-btn font-medium text-text-default transition-colors duration-150 ease-in-out hover:border-text-muted hover:bg-surface-0"
            onClick={() => setShowAll((open) => !open)}
            aria-expanded={showAll}
          >
            {showAll ? 'Show fewer projects' : `View all projects (${hiddenCount} more)`}
          </button>
        </div>
      ) : null}
    </Section>
  )
}
