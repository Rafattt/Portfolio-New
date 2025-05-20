import { useState, useEffect } from 'react';
import Card from '../components/Card';

function MyWork() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false); // Zmieniono na false, by zaczynać od niewidocznego stanu

  useEffect(() => {
    // Ustawiamy timer na 2 sekundy zamiast 1 sekundy
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Zmieniono na 2000ms (2 sekundy)
    
    return () => clearTimeout(timer);
  }, []);

  const handleOpenCard = (index: number) => {
    setSelectedProject(index);
  };

  const handleCloseCard = () => {
    setSelectedProject(null);
  };

  const projects = [
    {
      title: " Ciranda – Custom OroCommerce Frontend & Interactive Content Architecture",
      description: "I was the sole front-end developer on Ciranda's OroCommerce storefront, responsible for shaping the front-end architecture and implementing the full user interface across the site. This included defining rendering flows, integrating Oro's APIs, and building custom logic on top of Oro's templating system. The Resources page is a key example: articles are fetched from Oro's backend and rendered client-side with category-based filtering using JavaScript. The structure supports future expansion and dynamic behavior without full page reloads. On product detail pages, related content modules fetch and display both featured and contextual articles (e.g. Grower Stories) via API. All rendering and fallback logic is handled on the frontend, based on data set in the Oro admin. I also implemented conditional UI logic based on customer group and login status — determining whether users can place an order or only request a sample. The sourcing map combines SVG overlays and positioned clickable regions, triggering popups and in-page anchors. The alternate warehouse map uses a different data layer (static pins, no API), toggled through frontend state management. Most of the front-end interface was custom-built beyond Oro's defaults. This included replacing native layout structures, overriding Oro widgets, and implementing brand-aligned templates with full design control. The homepage features a full-screen video header integrated through a customized CMS block. All visual layers — from typography to spacing systems — were developed to reflect the client's branding, moving far beyond Oro's native UI framework.",
      technologies: [
        "OroCommerce",
        "JavaScript",
        "jQuery",
        "HTML",
        "SCSS",
        "REST API (Oro)"
      ],
      platformSpecific: [
        "Twig templating",
        "layout.yml",
        "SVG interaction",
        "Dynamic DOM rendering",
        "User group–based logic",
        "Frontend article filtering",
        "Hardcoded location map logic",
        "Custom CMS block logic",
        "Oro widget override",
        "Session-aware rendering"
      ],
      featured: true,
      imgSrc: 'src/assets/img/ciranda-logo.webp',
      classCard: 'ciranda',
      link: 'https://www.ciranda.com/',
      highlightColor: 0xff6600, // Orange for Ciranda
      desktopImage: 'src/assets/img/mockup-ciranda.webp', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Huyett – Custom OroCommerce Frontend & Searchspring Integration",
      description: "I was responsible for the front-end integration of Searchspring into Huyett’s OroCommerce-based storefront, covering product listing pages (PLP), search results (SRP), and product detail pages (PDP). Since no documentation was available, I designed the communication flow from scratch. When a user typed a query or visited a category, Searchspring returned a list of product IDs. I used those IDs to query Oro’s backend and dynamically built the product dataset using custom JavaScript logic. The rendered UI was fully customized — including dynamic fields like certificate selectors, filter toggles, and conditional UI based on product metadata. All rendering and fallback logic was handled on the frontend. This hybrid approach allowed Searchspring to provide relevance and speed, while Oro remained the authoritative source of structured product data. The implementation also included deeper customization of Oro’s UI: I modified layout structure, extended widgets, and added dynamic binding between Oro’s backend data and JS-based frontend rendering.",
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
  "Custom JS↔DB binding"
],
      imgSrc: 'src/assets/img/huyett-logo.webp',
      classCard: 'huyett',
      link: 'https://www.huyett.com/',
      highlightColor: 0x000066, // Dark blue for Huyett
      desktopImage: 'src/assets/img/mockup-huyett.webp', // Add path when ready
      mobileImage: '', // Add path when ready
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