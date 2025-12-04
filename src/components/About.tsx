import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="about full-screen d-lg-flex justify-content-center align-items-center" id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-12 col-12 d-flex align-items-center">
            <div className="about-text">
              <small className="small-text">
                Welcome to <span className="mobile-block">my portfolio!</span>
              </small>
              <h1>
                <span className="mr-2">Hey folks, I'm</span>
                <br />
                <span className="animated-item">Adam Colyer</span>
              </h1>

              <p>
               Previous sales professional with hands on experience managing $2M+ in pipeline. Now developing full stack applications using React, Python, Flask, and SQL. I can combine my previous business insight with technical problem solving to build solutions that align with future development needs.
              </p>

              <div className="custom-btn-group mt-4">
                <a
                  href="/files/Resume Dec2025.pdf"
                  className="btn mr-lg-2 custom-btn"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="uil uil-file-alt"></span> Download Resume
                </a>
                <a href="#contact" className="btn custom-btn custom-btn-bg custom-btn-link">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-12 col-12 d-flex align-items-center justify-content-center">
            <div className="about-image svg">
              <img
                src="/images/IMG_4874.JPEG"
                className="img-fluid mx-auto d-block"
                alt="desk setup photo"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
