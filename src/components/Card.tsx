import React from 'react';

interface CardProps {
  title: string;
  description: string;
  technologies?: string[];
  featured?: boolean;
}

export default function Card({ title, description, technologies, featured }: CardProps) {
  return (
    <div className={`card ${featured ? 'featured' : ''}`}>
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
    </div>
  );
}
