import React from 'react';

interface CardProps {
  title: string;
  description: string;
  technologies?: string[];
  featured?: boolean;
  imgSrc?: string;
  classCard?: string;
  onMouseEnter?: () => void;
}

export default function Card({ title, description, technologies, featured, imgSrc, classCard, onMouseEnter }: CardProps) {
  return (
    <button 
      className={`card ${classCard}`} 
      onMouseEnter={onMouseEnter}
    >
      <img src={imgSrc} aria-hidden="true"/>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        {technologies && (
          <div className="technologies">
            {technologies.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
