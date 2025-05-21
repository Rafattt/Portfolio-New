import React from 'react';

interface ProjectDetailsProps {
  project: {
    title: string;
    description: string;
    technologies?: string[];
    platformSpecific?: string[];
    imgSrc: string;
    link: string;
    desktopImage?: string;
    mobileImage?: string;
  };
  onClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onClose }) => {
  return (
    <div className="project-details-container">
      <div className="project-details">
        <button 
          className="close-button"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        
        <div className="project-content">
          <div className="project-content-top">
            {project.desktopImage && (
              <div className="desktop-image">
                <img src={project.desktopImage} alt="Desktop view" />
              </div>
            )}
            <h2 className="project-title">{project.title}</h2>
          </div>
          
          <p className="project-desc">{project.description}</p>
          
          <div className="project-content-bottom">
            <div className="content-bottom-text">
              {project.mobileImage && (
                <div className="mobile-image">
                  <img src={project.mobileImage} alt="Mobile view" />
                </div>
              )}
              
              {project.technologies && project.technologies.length > 0 && (
                <>
                  <h3>Technologies used:</h3>
                  <div className="technologies">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </>
              )}
              
              {project.platformSpecific && project.platformSpecific.length > 0 && (
                <>
                  <h3>Platform specific technologies:</h3>
                  <div className="platform-specific technologies">
                    {project.platformSpecific.map((platform) => (
                      <span key={platform} className="tech-tag">{platform}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <div className="content-bottom-logo">
              <img className="project-logo" src={project.imgSrc} alt="" aria-hidden="true"/>
            </div>
          </div>
          
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
