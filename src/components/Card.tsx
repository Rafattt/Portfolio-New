import React from 'react';

interface CardProps {
  title: string;
  description: string;
  technologies?: string[];
  platformSpecific?: string[];
  featured?: boolean;
  imgSrc?: string;
  link?: string;
  classCard?: string;
  onMouseEnter?: () => void;
  isSelected: boolean;
  isHidden: boolean;
  onClick: () => void;
  onClose: () => void;
  desktopImage?: string;
  mobileImage?: string;
}

export default function Card({ 
  title, 
  description, 
  technologies, 
  platformSpecific,
  imgSrc, 
  link,
  classCard,
  onMouseEnter,
  isSelected,
  isHidden,
  onClick,
  onClose,
  desktopImage,
  mobileImage,
  ...props 
}: CardProps) {
  return (
    <div 
      className={`card ${classCard} ${isSelected ? 'selected' : ''} ${isHidden ? 'hidden' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      role="button"
      tabIndex={0}
      {...props}
    >
      <img className="card-logo" src={imgSrc} alt="" aria-hidden="true"/>
      <div className="card-content">
        {desktopImage && (
          <div className="desktop-image">
            <img src={desktopImage} alt="Desktop view" />
          </div>
        )}
        <h3>{title}</h3>
        <p>{description}</p>
        {mobileImage && (
          <div className="mobile-image">
            <img src={mobileImage} alt="Mobile view" />
          </div>
        )}
        <h2>Technologies used:</h2>
        {technologies && (
          <div className="technologies">
            {technologies.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        )}
        <h2>Platform specific technologies</h2>
        {platformSpecific && (
          <div className="platform-specific technologies">
            {platformSpecific.map((platform) => (
              <span key={platform} className="tech-tag">{platform}</span>
            ))}
          </div>
        )}
        <a target="_blank" className="project-link" href={link}>Visit Website</a>
      </div>
      {isSelected && (
        <button 
          className="close-button"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          aria-label="Close"
        >
          ✕
        </button>
      )}
    </div>
  );
}
