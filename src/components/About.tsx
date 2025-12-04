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
                With 7 years of professional experience in JavaScript, React, Node, and MongoDB, and a newfound expertise in DynamoDB, I specialize in building efficient, scalable solutions that tackle real-world problems. My career started with automating tasks that saved my team hundreds of hours, and since then, I've been combining my engineering and teaching skills at App Academy, where I developed MERN stack and data structure/algorithm curriculums. I thrive on turning complex challenges into streamlined, innovative solutions, and I'm eager to bring that same drive and expertise to a dynamic team ready to push the boundaries of technology.
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
