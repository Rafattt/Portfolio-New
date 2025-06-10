import { useState, useEffect } from 'react';

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Placeholder data for skills
  const frontendSkills = [
    'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 
    'SCSS/Sass', 'jQuery', 'Responsive Design', 'Animation (GSAP, Framer)'
  ];

  const backendSkills = [
    'Node.js', 'RESTful APIs', 'GraphQL', 'Express'
  ];

  const ecommerceSkills = [
    'OroCommerce', 'Shopify (Liquid)', 'BigCommerce', 'Znode',
    'Magento', 'Liferay', 'Roc7', 'iDev Platform'
  ];

  const otherSkills = [
    'Accessibility (WCAG)', 'Git/GitHub', 'Performance Optimization',
    'SEO Best Practices', 'Cross-browser Testing', 'Agile Methodology'
  ];

  // Placeholder work experience
  const experiences = [
    {
      period: '2022 - Present',
      title: 'Senior Frontend Developer',
      company: 'Digital Agency XYZ',
      description: 'Lead development on eCommerce platforms like OroCommerce and Shopify. Specialized in accessibility and complex UI implementations.'
    },
    {
      period: '2019 - 2022',
      title: 'Frontend Developer',
      company: 'Tech Solutions Inc.',
      description: 'Developed responsive web applications using React and Vue.js. Implemented complex UIs for enterprise clients with focus on performance.'
    },
    {
      period: '2017 - 2019',
      title: 'Web Developer',
      company: 'Creative Studio ABC',
      description: 'Created custom websites for clients across various industries. Specialized in eCommerce solutions and interactive experiences.'
    },
    {
      period: '2015 - 2017',
      title: 'Junior Developer',
      company: 'Web Solutions LLC',
      description: 'Built websites using HTML, CSS, and JavaScript. Collaborated with designers to implement pixel-perfect interfaces.'
    }
  ];

  return (
    <div className="about-container">
      <section className="about-section">
        <h1 className="about-header">About Me</h1>
        
        <div className="profile-section">
          <img 
            src="/public/img/placeholder-profile.jpg" 
            alt="Profile photo" 
            className="profile-image"
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="profile-text">
            <h2 className="about-subheader">Frontend Developer Specializing in eCommerce and Accessibility</h2>
            <p className="about-text">
              I’m a front-end developer with a strong focus on interface architecture,
               system integration, and experience design. Over the years, I’ve worked 
               across multiple eCommerce platforms — including OroCommerce, Znode,
                BigCommerce, Magento, Shopify, and Salesforce Marketing Cloud — delivering
                 both technical precision and design consistency in complex environments.
            </p>
            <p className="about-text">
              At Americaneagle.com, I’ve built and customized multi-layered storefronts,
               often replacing native layouts with entirely new UI systems tailored to client
                needs. My role extends far beyond standard component styling: I frequently
                 override platform defaults, implement dynamic rendering based on business
                  logic (e.g. customer groups, login states, multisite domains), and create
                   fully interactive elements using JavaScript, Vue.js (SDK), and jQuery.
                    I’ve also led accessibility 
              audits, performance optimization, and responsive architecture work.
            </p>
            <p className="about-text">
              Previously, I developed a custom logistics system in
               React and PHP, managed multiple rebuilds for a manufacturing firm,
                and transitioned a full business website from WordPress to a static
                 build to Shopify — owning the full front-end stack at each stage.

                My focus is always on creating systems that not only work — but scale, adapt, and feel
                right to the user.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-header">Skills & Expertise</h2>
        
        <h3 className="about-subheader">Frontend Development</h3>
        <div className="skills-container">
          {frontendSkills.map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>

        <h3 className="about-subheader">Backend Knowledge</h3>
        <div className="skills-container">
          {backendSkills.map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>

        <h3 className="about-subheader">eCommerce Platforms</h3>
        <div className="skills-container">
          {ecommerceSkills.map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>

        <h3 className="about-subheader">Other Skills</h3>
        <div className="skills-container">
          {otherSkills.map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-header">Work Experience</h2>
        <p className="about-text">
          Throughout my career, I've worked with a diverse range of clients and technologies,
          focusing on creating impactful digital solutions. Here's a brief overview of my professional journey:
        </p>
        
        <div className="experience-grid">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card">
              <div className="experience-period">{exp.period}</div>
              <h3 className="experience-title">{exp.title}</h3>
              <div className="experience-company">{exp.company}</div>
              <p className="experience-description">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-header">Education</h2>
        <h3 className="about-subheader">Bachelor of Science in Computer Science</h3>
        <p className="about-text">University of Technology, Graduated 2015</p>
        
        <h3 className="about-subheader">Certifications</h3>
        <div className="skills-container">
          <span className="skill-tag">Web Accessibility Specialist (WAS)</span>
          <span className="skill-tag">Frontend Performance Optimization</span>
          <span className="skill-tag">Advanced JavaScript Development</span>
          <span className="skill-tag">UX/UI Design Fundamentals</span>
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-header">Contact Me</h2>
        <p className="about-text">
          Interested in working together? Feel free to reach out through any of the following channels:
        </p>
        
        <div className="contact-grid">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <a href="mailto:your.email@example.com" className="contact-link">your.email@example.com</a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🔗</span>
            <a href="https://linkedin.com/in/yourprofile" className="contact-link">LinkedIn</a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">💻</span>
            <a href="https://github.com/yourusername" className="contact-link">GitHub</a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🐦</span>
            <a href="https://twitter.com/yourusername" className="contact-link">Twitter</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;