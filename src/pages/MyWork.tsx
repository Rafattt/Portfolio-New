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
    },
    {
      title: "Huyett",
      description: "Full-featured online store with cart and checkout",
      technologies: [""],
      imgSrc: 'src/assets/img/huyett-logo.webp',
      classCard: 'huyett',
      link: 'https://www.huyett.com/',
    },
    {
      title: "Wastebuilt/MountainTarp",
      description: "Real-time weather data visualization",
      technologies: [""],
      imgSrc: '',
      classCard: 'wastebuilt',
      link: 'https://www.wastebuilt.com/',
    },
    {
      title: "Singer",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'singer',
      link: 'https://www.singerequipment.com/',
    },
    {
      title: "Chicago Auto Show",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'chicago-auto',
      link: 'https://www.chicagoautoshow.com',
    },
    {
      title: "Virginia Raylways",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'virginia',
      link: 'https://www.vre.org/',
    },
    {
      title: "Foley Family Wines",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'virginia',
      link: 'https://www.vre.org/',
    },
    {
      title: "Deniimcratic",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'foley',
      link: 'https://ffws.com/',
    },
    {
      title: "Blaupunkt",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'blue',
      link: 'https://blue.bike/',
    },
    {
      title: "MetLife Stadium",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'metlife',
      link: 'https://www.metlifestadium.com/',
    },
    {
      title: "Itron",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'itron',
      link: 'https://na.itron.com/',
    },
    {
      title: "Polacheck's Jewelers:",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'polacheck',
      link: 'https://polachecks.com/',
    },
    {
      title: "Benchmark Community Bank",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'benchmark',
      link: 'https://bcbforlife.bank/',
    },
    {
      title: "Shoshanna",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: '',
      classCard: 'shoshanna',
      link: 'https://shoshanna.com/',
    }
  ];

  return (
    <div className="background-img">
      <div className="frosted-overlay"></div>
      <div onClick={handleOpenCard} className="my-work">
        <div className="my-work-inner">
          <div className="cards-container">
            {projects.map((project, index) => (
              <Card key={index} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default MyWork;