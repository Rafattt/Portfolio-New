import Card from '../components/Card';

function MyWork() {
  const handleOpenCard = () => {
    
  };
  const projects = [
    {
      title: "Portfolio Website",
      description: "Modern portfolio with WebGL effects and React",
      technologies: [""],
      featured: true,
      imgSrc: 'src/assets/img/ciranda-logo.webp',
      classCard: 'ciranda',
      link: 'https://www.ciranda.com/',
      highlightColor: 0xff6600, // Orange for Ciranda
    },
    {
      title: "Huyett",
      description: "Full-featured online store with cart and checkout",
      technologies: [""],
      imgSrc: 'src/assets/img/huyett-logo.webp',
      classCard: 'huyett',
      link: 'https://www.huyett.com/',
      highlightColor: 0x000066, // Dark blue for Huyett
    },
    {
      title: "Wastebuilt/MountainTarp",
      description: "Real-time weather data visualization",
      technologies: [""],
      imgSrc: 'src/assets/img/wastebuilt-logo.webp',
      classCard: 'wastebuilt',
      link: 'https://www.wastebuilt.com/',
      highlightColor: 0x00ff00, // Bright green for Wastebuilt
    },
    {
      title: "Singer",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/singer-logo.webp',
      classCard: 'singer',
      link: 'https://www.singerequipment.com/',
      highlightColor: 0xff0000, // Red for Singer
    },
    {
      title: "Chicago Auto Show",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/chicago-logo.webp',
      classCard: 'chicago-auto',
      link: 'https://www.chicagoautoshow.com',
      highlightColor: 0x00ffff, // Cyan for Chicago Auto Show
    },
    {
      title: "Virginia Raylways",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/virginia-logo.webp',
      classCard: 'virginia',
      link: 'https://www.vre.org/',
      highlightColor: 0xff00ff, // Magenta for Virginia Railways
    },
    {
      title: "Foley Family Wines",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/foley-logo.webp',
      classCard: 'foley',
      link: 'https://www.vre.org/',
      highlightColor: 0x800080, // Purple for Foley Family Wines
    },
    {
      title: "Anderson-Negele",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/anderson-logo.webp',
      classCard: 'anderson',
      link: 'https://www.anderson-negele.com/us/',
      highlightColor: 0x39b54a, // Purple for Foley Family Wines
    },
    {
      title: "Deniimcratic",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/denimcratic-logo.webp',
      classCard: 'denimcratic',
      link: 'https://ffws.com/',
      highlightColor: 0xffff00, // Yellow for Deniimcratic
    },
    {
      title: "Blaupunkt",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/blaupunkt-logo.webp',
      classCard: 'blue',
      link: 'https://blue.bike/',
      highlightColor: 0x0000ff, // Blue for Blaupunkt
    },
    {
      title: "MetLife Stadium",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/metlife-logo.webp',
      classCard: 'metlife',
      link: 'https://www.metlifestadium.com/',
      highlightColor: 0xff1493, // Deep pink for MetLife Stadium
    },
    {
      title: "Itron",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/itron-logo.webp',
      classCard: 'itron',
      link: 'https://na.itron.com/',
      highlightColor: 0x00bfff, // Deep sky blue for Itron
    },
    {
      title: "Polacheck's Jewelers:",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'polacheck',
      link: 'https://polachecks.com/',
      highlightColor: 0xff4500, // Orange red for Polacheck's Jewelers
    },
    {
      title: "Benchmark Community Bank",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'benchmark',
      link: 'https://bcbforlife.bank/',
      highlightColor: 0x2e8b57, // Sea green for Benchmark Community Bank
    },
    {
      title: "Shoshanna",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'shoshanna',
      link: 'https://shoshanna.com/',
      highlightColor: 0x4682b4, // Steel blue for Shoshanna
    }
  ];

  return (
    <div className="background-img">
      <div className="frosted-overlay"></div>
      <div onClick={handleOpenCard} className="my-work">
        <div className="my-work-inner">
          <div className="cards-container">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                {...project} 
                onMouseEnter={() => {
                  if (window.VANTA && window.VANTA.current) {
                    window.VANTA.current.setOptions({
                      //highlightColor: project.highlightColor
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyWork;