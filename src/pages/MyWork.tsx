import { useState, useEffect } from 'react';
import Card from '../components/Card';

function MyWork() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const header = document.querySelector('.main-header');
    if (selectedProject !== null) {
      header?.classList.add('header-hidden');
    } else {
      header?.classList.remove('header-hidden');
    }
  }, [selectedProject]);

  const handleOpenCard = (index: number) => {
    setSelectedProject(index);
  };

  const handleCloseCard = () => {
    setSelectedProject(null);
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 50);
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
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Huyett – Custom OroCommerce Frontend & Searchspring Integration",
      description: "I led the front-end integration of Searchspring into Huyett’s OroCommerce-based storefront, covering PLP (product listing), SRP (search results), and PDP (product detail pages).Since no documentation was provided, I designed the architecture from scratch: when users typed a query or entered a category, Searchspring returned a set of product IDs. I used those IDs to query Oro’s backend and dynamically assembled a product dataset via custom JavaScript logic.The rendered UI was fully customized — including additional dynamic elements like certificate selectors, filter controls, and conditional UI based on product metadata. This hybrid architecture allowed Searchspring to handle relevance and speed, while Oro remained the source of truth for structured product data.",
      examples: ['https://www.huyett.com/product/search?search=bolts', 'https://www.huyett.com/product/search?search=bolts'],
      technologies: [
        "OroCommerce",
        "JavaScript",
        "Vue.js (SDK)",
        "HTML",
        "SCSS/CSS",
        "Searchspring API"
      ],
      platformSpecific: [
        "Twig templating",
        "Oro layout.yml",
        "Oro UI customization",
        "Dynamic DOM rendering",
        "Custom JS-DB binding"
      ],
      imgSrc: 'src/assets/img/huyett-logo.webp',
      classCard: 'huyett',
      link: 'https://www.huyett.com/',
      highlightColor: 0x000066, // Dark blue for Huyett
      desktopImage: 'src/assets/img/huyet-desktop.jpg', // Add path when ready
      mobileImage: 'src/assets/img/huyet-mobile.jpg', // Add path when ready
    },
    {
      title: "Wastebuilt",
      description: "Real-time weather data visualization",
      technologies: [""],
      imgSrc: 'src/assets/img/wastebuilt-logo.webp',
      classCard: 'wastebuilt',
      link: 'https://www.wastebuilt.com/',
      highlightColor: 0x00ff00, // Bright green for Wastebuilt
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Mountain Tarp",
      description: "Real-time weather data visualization",
      technologies: [""],
      imgSrc: 'src/assets/img/mountain-logo.webp',
      classCard: 'mountain',
      link: 'https://mountaintarp.com/',
      highlightColor: 0x00ff00, // Bright green for Wastebuilt
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Singer",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/singer-logo.webp',
      classCard: 'singer',
      link: 'https://www.singerequipment.com/',
      highlightColor: 0xff0000, // Red for Singer
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Chicago Auto Show",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/chicago-logo.webp',
      classCard: 'chicago-auto',
      link: 'https://www.chicagoautoshow.com',
      highlightColor: 0x00ffff, // Cyan for Chicago Auto Show
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Virginia Raylways",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/virginia-logo.webp',
      classCard: 'virginia',
      link: 'https://www.vre.org/',
      highlightColor: 0xff00ff, // Magenta for Virginia Railways
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Foley Family Wines",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/foley-logo.webp',
      classCard: 'foley',
      link: 'https://www.vre.org/',
      highlightColor: 0x800080, // Purple for Foley Family Wines
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Anderson-Negele",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/anderson-logo.webp',
      classCard: 'anderson',
      link: 'https://www.anderson-negele.com/us/',
      highlightColor: 0x39b54a, // Purple for Foley Family Wines
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Deniimcratic",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/denimcratic-logo.webp',
      classCard: 'denimcratic',
      link: 'https://denimcratic.com/',
      highlightColor: 0xffff00, // Yellow for Deniimcratic
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Blaupunkt",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/blaupunkt-logo.webp',
      classCard: 'blue',
      link: 'https://blue.bike/',
      highlightColor: 0x0000ff, // Blue for Blaupunkt
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "MetLife Stadium",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/metlife-logo.webp',
      classCard: 'metlife',
      link: 'https://www.metlifestadium.com/',
      highlightColor: 0xff1493, // Deep pink for MetLife Stadium
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Itron",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/itron-logo.webp',
      classCard: 'itron',
      link: 'https://na.itron.com/',
      highlightColor: 0x00bfff, // Deep sky blue for Itron
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Polacheck's Jewelers:",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/polacheck-logo.webp',
      classCard: 'polacheck',
      link: 'https://polachecks.com/',
      highlightColor: 0xff4500, // Orange red for Polacheck's Jewelers
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Benchmark Community Bank",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/benchmark-logo.webp',
      classCard: 'benchmark',
      link: 'https://bcbforlife.bank/',
      highlightColor: 0x2e8b57, // Sea green for Benchmark Community Bank
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Shoshanna",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/shoshana-logo.webp',
      classCard: 'shoshanna',
      link: 'https://shoshanna.com/',
      highlightColor: 0x4682b4, // Steel blue for Shoshanna
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "American Society of Anesthesiologists",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/society-logo.webp',
      classCard: 'society',
      link: 'https://www.asahq.org/',
      highlightColor: 0x4682b4, // Steel blue for Shoshanna
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Land and Coates",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/land-logo.webp',
      classCard: 'land',
      link: 'https://www.landandcoates.net/',
      highlightColor: 0x4682b4, // Steel blue for Shoshanna
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Procon Pump",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/procon-logo.webp',
      classCard: 'procon',
      link: 'https://www.proconpumps.com/',
      highlightColor: 0x4682b4, // Steel blue for Shoshanna
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Darpet",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/darpet-logo.webp',
      classCard: 'darpet',
      link: 'https://www.darpet.com/',
      highlightColor: 0x4682b4, // Steel blue for Shoshanna
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "PureOrder",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/pure-logo.webp',
      classCard: 'pure',
      link: 'https://pureorder.org',
      highlightColor: 0x4682b4, // Steel blue for Shoshanna
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    }
  ];

  return (
    <div className="background-img">
      <div className="frosted-overlay"></div>
      <div className={`my-work ${isVisible ? 'fade-in' : ''} ${selectedProject !== null ? 'project-open' : ''}`}>
        <div className="my-work-inner">
          <div className="cards-container">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                {...project}
                isSelected={selectedProject === index}
                isHidden={selectedProject !== null && selectedProject !== index}
                onClick={() => handleOpenCard(index)}
                onClose={handleCloseCard}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyWork;