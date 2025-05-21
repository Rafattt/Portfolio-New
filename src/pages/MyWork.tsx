import { useState, useEffect, useMemo } from 'react';
import Card from '../components/Card';
import '../styles/MyWork.css';

function MyWork() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']); // Default to 'all'
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showDetailView) {
        handleCloseCard();
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (showDetailView) {
        const detailView = document.querySelector('.detail-view');
        if (detailView && !detailView.contains(e.target as Node)) {
          handleCloseCard();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showDetailView]);

  const handleOpenCard = (index: number) => {
    setSelectedProject(index);
    
    if (window.setActiveCardColor) {
      window.setActiveCardColor(projects[index].classCard);
    }
    
    setTimeout(() => {
      setShowDetailView(true);
    }, 50);
  };

  const handleCloseCard = () => {
    setShowDetailView(false);
    
    setTimeout(() => {
      setSelectedProject(null);
      
      const hoveredCard = document.querySelector('.card:hover');
      
      if (!hoveredCard && window.setActiveCardColor) {
        window.setActiveCardColor(null);
      }
    }, 300);
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
      platform: 'OroCommerce',
      highlightColor: 0xff6600, // Orange for Ciranda
      desktopImage: 'src/assets/img/mockup-ciranda.webp', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Huyett – Custom OroCommerce Frontend & Searchspring Integration",
      description: "I was responsible for the front-end integration of Searchspring into Huyett's OroCommerce-based storefront, covering product listing pages (PLP), search results (SRP), and product detail pages (PDP). Since no documentation was available, I designed the communication flow from scratch. When a user typed a query or visited a category, Searchspring returned a list of product IDs. I used those IDs to query Oro's backend and dynamically built the product dataset using custom JavaScript logic. The rendered UI was fully customized — including dynamic fields like certificate selectors, filter toggles, and conditional UI based on product metadata. All rendering and fallback logic was handled on the frontend. This hybrid approach allowed Searchspring to provide relevance and speed, while Oro remained the authoritative source of structured product data. The implementation also included deeper customization of Oro's UI: I modified layout structure, extended widgets, and added dynamic binding between Oro's backend data and JS-based frontend rendering.",
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
      platform: 'OroCommerce',
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
      platform: 'OroCommerce',
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
      platform: 'OroCommerce',
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
      platform: 'RocCommerce',
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
      platform: 'iDev',
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
      platform: 'iDev',
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
      platform: 'Salesforce',
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
      platform: 'Wordpress',
      highlightColor: 0x39b54a, // Green for Anderson-Negele
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
      platform: 'Shopify',
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
      platform: 'Shopify',
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
      platform: 'iDev',
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
      platform: 'Liferay',
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
      platform: 'Shopify',
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
      platform: 'Liferay',
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
      platform: 'Shopify',
      highlightColor: 0x4682b4, // Steel blue for Shoshanna
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "ArmorPoxy",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/armor-logo.webp',
      classCard: 'armor',
      link: 'https://armorpoxy.com/',
      platform: 'BigCommerce',
      highlightColor: 0x4682b4, // Steel blue for ArmorPoxy
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Anchor-Paper",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/anchor-logo.webp',
      classCard: 'anchor',
      link: 'https://www.anchorpaper.com/',
      platform: 'Magento',
      highlightColor: 0x4682b4, // Steel blue for Anchor-Paper
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    },
    {
      title: "Chicago Coffee",
      description: "Collaborative project management tool",
      technologies: [""],
      imgSrc: 'src/assets/img/chicago-logo.webp',
      classCard: 'chicago-coffee',
      link: 'https://www.coffeemasters.com/',
      platform: 'BigCommerce',
      highlightColor: 0x4682b4, // Steel blue for Chicago Coffee
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
      platform: 'Magento',
      highlightColor: 0x4682b4, // Steel blue for American Society of Anesthesiologists
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
      platform: 'Znode',
      highlightColor: 0x4682b4, // Steel blue for Land and Coates
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
      platform: 'Znode',
      highlightColor: 0x4682b4, // Steel blue for Procon Pump
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
      platform: 'Wordpress',
      highlightColor: 0x4682b4, // Steel blue for Darpet
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
      platform: 'HTML',
      highlightColor: 0x4682b4, // Steel blue for PureOrder
      desktopImage: '', // Add path when ready
      mobileImage: '', // Add path when ready
    }
  ];

  // Get unique platforms from projects (excluding empty ones)
  const availablePlatforms = useMemo(() => {
    const platforms = projects
      .map(project => project.platform)
      .filter(platform => platform && platform.trim() !== '');
    
    // Get unique values
    return [...new Set(platforms)].sort();
  }, [projects]);

  // Filter projects based on selected platforms
  const filteredProjects = useMemo(() => {
    if (selectedFilters.includes('all')) {
      return projects; // Show all projects when 'all' is selected
    }
    
    return projects.filter(project => 
      selectedFilters.includes(project.platform)
    );
  }, [projects, selectedFilters]);

  // Handle filter selection
  const handleFilterChange = (platform: string) => {
    setSelectedFilters(prev => {
      // If selecting 'all', clear other filters
      if (platform === 'all') {
        return ['all'];
      }
      
      // If selecting a specific platform, remove 'all' from selection
      let newFilters = prev.filter(p => p !== 'all');
      
      if (prev.includes(platform)) {
        // Remove filter if already selected
        newFilters = newFilters.filter(p => p !== platform);
      } else {
        // Add filter
        newFilters = [...newFilters, platform];
      }
      
      // If no filters left, select 'all' again
      if (newFilters.length === 0) {
        return ['all'];
      }
      
      return newFilters;
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedFilters(['all']);
  };

  // Toggle filter visibility (for mobile)
  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  return (
    <>  
    <div id="background-image"></div>
    <div className="background-img">
      <div className="frosted-overlay"></div>
      
      {/* Filters Panel */}
      <div className={`filters-panel ${showFilters ? 'show' : ''}`}>
        <button className="filter-toggle" onClick={toggleFilters}>
          {showFilters ? 'Hide Filters' : 'Show Filters'} 
          <span className="filter-icon">🔍</span>
        </button>
        
        <div className="filters-content">
          <h3>Filter by Platform</h3>
          <div className="filter-options">
            {/* All Platforms option */}
            <label className="filter-option">
              <input
                type="checkbox"
                checked={selectedFilters.includes('all')}
                onChange={() => handleFilterChange('all')}
              />
              <span className="filter-name">All Platforms</span>
              <span className="filter-count">
                ({projects.length})
              </span>
            </label>
            
            {/* Individual platform options */}
            {availablePlatforms.map(platform => (
              <label key={platform} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(platform)}
                  onChange={() => handleFilterChange(platform)}
                />
                <span className="filter-name">{platform}</span>
                <span className="filter-count">
                  ({projects.filter(p => p.platform === platform).length})
                </span>
              </label>
            ))}
          </div>
          
          {!selectedFilters.includes('all') && selectedFilters.length > 0 && (
            <button className="reset-filters" onClick={resetFilters}>
              Reset Filters
            </button>
          )}
        </div>
      </div>
      
      <div className={`my-work ${isVisible ? 'fade-in' : ''} ${selectedProject !== null ? 'project-open' : ''}`}>
        <div className="my-work-inner">
          <div className="cards-container">
            {filteredProjects.map((project, index) => (
              <Card 
                key={index} 
                {...project}
                isSelected={false} 
                isHidden={showDetailView} 
                onClick={() => handleOpenCard(projects.indexOf(project))}
                onClose={() => {}} 
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Zmodyfikowany kontener detali */}
      {selectedProject !== null && showDetailView && (
        <div className="detail-view-container">
          <div className="detail-view" style={{'--highlight-color': projects[selectedProject].highlightColor} as React.CSSProperties}>
            <button className="close-button" onClick={handleCloseCard}>×</button>
            
            <div className="detail-content">
              <img src={projects[selectedProject].imgSrc} alt={projects[selectedProject].title} className="detail-logo" />
              <h2>{projects[selectedProject].title}</h2>
              <p className="description">{projects[selectedProject].description}</p>
              
              {projects[selectedProject].technologies && projects[selectedProject].technologies.length > 0 && (
                <>
                  <h3>Technologies</h3>
                  <ul className="technologies">
                    {projects[selectedProject].technologies.map((tech, i) => (
                      <li key={i} className="tech-tag">{tech}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {/* Platform Specific Features (if available) */}
              {projects[selectedProject].platformSpecific && projects[selectedProject].platformSpecific.length > 0 && (
                <>
                  <h3>Platform Specific Features</h3>
                  <ul className="technologies">
                    {projects[selectedProject].platformSpecific.map((feature, i) => (
                      <li key={i} className="tech-tag">{feature}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {/* Screenshots */}
              <div className="project-screenshots">
                {projects[selectedProject].desktopImage && (
                  <img 
                    src={projects[selectedProject].desktopImage} 
                    alt="Desktop view" 
                    className="desktop-screenshot" 
                  />
                )}
                {projects[selectedProject].mobileImage && (
                  <img 
                    src={projects[selectedProject].mobileImage} 
                    alt="Mobile view" 
                    className="mobile-screenshot" 
                  />
                )}
              </div>
              
              {/* Visit site link */}
              {projects[selectedProject].link && (
                <a 
                  href={projects[selectedProject].link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="visit-site-button"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default MyWork;