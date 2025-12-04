import React from 'react';
import { projects } from '../data/portfolio';

export const Projects: React.FC = () => {
  return (
    <section className="project py-5" id="project">
      <div className="container">
        <div className="col-md-6">
          <h2>My Projects</h2>
        </div>
        <div className="row portfolio-grid text-center" id="portfolio-masonry-wrap">
          {projects.map((project) => (
            <div
              key={project.id}
              className="col-md-6 col-lg-4 portfolio-item mockup"
            >
              <div className="portfolio-item-inner">
                <div className="portfolio-item-img">
                  <img
                    src={project.imageUrl}
                    alt="Portfolio image"
                    className="img-fluid"
                  />
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="portfolio-zoom-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                  {!project.liveUrl && (
                    <a
                      href={project.githubUrl}
                      className="portfolio-zoom-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github-alt"></i>
                    </a>
                  )}
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
          ))}
        </div>
      </div>
    </section>
  );
};
