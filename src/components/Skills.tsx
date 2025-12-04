import React from 'react';
import { skills } from '../data/portfolio';

export const Skills: React.FC = () => {
  return (
    <section className="skills py-5" id="skills">
      <div className="container" id="skills-container">
        <div className="row">
          <div className="col-lg-11 text-center mx-auto col-12">
            <div className="col-lg-8 mx-auto">
              <h2>Skills</h2>
            </div>
          </div>
        </div>
        <div className="row" id="skills-row">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-6 wow fadeInLeft"
              style={{
                animationDuration: '0.5s',
                animationDelay: '0.1s',
              }}
            >
              <div className="services-item">
                <div className="card">
                  <h4>{skill.name}</h4>
                  {skill.icon.includes('fa') ? (
                    <i className={skill.icon}></i>
                  ) : (
                    <i style={{ fontSize: '2rem' }}>{skill.icon}</i>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
