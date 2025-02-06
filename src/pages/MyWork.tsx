import Card from '../components/Card';

function MyWork() {
  const projects = [
    {
      title: "Portfolio Website",
      description: "Modern portfolio with WebGL effects and React",
      technologies: ["React", "TypeScript", "WebGL", "SCSS"],
      featured: true
    },
    {
      title: "E-commerce Platform",
      description: "Full-featured online store with cart and checkout",
      technologies: ["Next.js", "Node.js", "MongoDB"],
    },
    {
      title: "Weather App",
      description: "Real-time weather data visualization",
      technologies: ["React", "Weather API", "ChartJS"],
    },
    {
      title: "Task Manager",
      description: "Collaborative project management tool",
      technologies: ["Vue", "Firebase", "Tailwind"],
    }
  ];

  return (
    <div className="my-work">
      <div className="my-work-inner">
        <div className="cards-container">
          {projects.map((project, index) => (
            <Card key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyWork;