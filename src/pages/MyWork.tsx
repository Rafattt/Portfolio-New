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
      companyDesc: "Supplier of certified organic, non-GMO, and Fair Trade ingredients for food, beverage, and personal care industries.",
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
      imgSrc: 'public/img/ciranda-logo.webp',
      classCard: 'ciranda',
      link: 'https://www.ciranda.com/',
      platform: 'OroCommerce',
      highlightColor: 0xff6600, // Orange for Ciranda
      desktopImage: 'public/img/mockup-ciranda.webp', 
      mobileImage: '', 
    },
    {
      title: "Huyett – Custom OroCommerce Frontend & Searchspring Integration",
      description: "I was responsible for the front-end integration of Searchspring into Huyett's OroCommerce-based storefront, covering product listing pages (PLP), search results (SRP), and product detail pages (PDP). Since no documentation was available, I designed the communication flow from scratch. When a user typed a query or visited a category, Searchspring returned a list of product IDs. I used those IDs to query Oro's backend and dynamically built the product dataset using custom JavaScript logic. The rendered UI was fully customized — including dynamic fields like certificate selectors, filter toggles, and conditional UI based on product metadata. All rendering and fallback logic was handled on the frontend. This hybrid approach allowed Searchspring to provide relevance and speed, while Oro remained the authoritative source of structured product data. The implementation also included deeper customization of Oro's UI: I modified layout structure, extended widgets, and added dynamic binding between Oro's backend data and JS-based frontend rendering.",
      companyDesc: "Industrial distributor of fasteners, power transmission components, and custom-engineered parts for OEM and MRO applications.",
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
      imgSrc: 'public/img/huyett-logo.webp',
      classCard: 'huyett',
      link: 'https://www.huyett.com/',
      platform: 'OroCommerce',
      highlightColor: 0x000066, // Dark blue for Huyett
      desktopImage: 'public/img/mockup-huyett.webp', 
      mobileImage: '', 
    },
    {
      title: "Wastebuilt",
      description: "I led the front-end development of Wastebuilt’s OroCommerce storefront, focusing on full layout customization and deep integration with Hawksearch via Vue.js SDK. As part of a multisite setup, Wastebuilt shared a codebase with Mountain Tarp, but required distinct logic based on the active site. I implemented conditional rendering and component behavior that dynamically responded to which site the user was visiting. The Hawksearch engine served both domains, and I handled the filtering of results, the connection to Oro’s product data, and the management of Vue components based on the subsite context. Additionally, I customized Oro’s jQuery/HTML-based templates, refactored layout structure, and implemented style consistency across both brands.",
      companyDesc: "Nationwide provider of parts, service, and equipment for the waste and recycling industry.",
      technologies: [
        "OroCommerce",
        "JavaScript",
        "Vue.js (SDK)",
        "jQuery",
        "HTML",
        "SCSS",
        "Hawksearch API"
      ],
      platformSpecific: [
        "Multisite logic binding",
        "Vue SDK integration",
        "Shared search engine across domains",
        "Oro layout refactor",
        "Context-aware rendering",
        "Custom filter behavior",
        "Dynamic DOM overrides"
      ],
      imgSrc: 'public/img/wastebuilt-logo.webp',
      classCard: 'wastebuilt',
      link: 'https://www.wastebuilt.com/',
      platform: 'OroCommerce',
      highlightColor: 0x00ff00,
      desktopImage: '',
      mobileImage: '',
    },
    {
      title: "Mountain Tarp",
      description: "As part of a shared OroCommerce instance with Wastebuilt, Mountain Tarp required tailored search behavior, conditional component logic, and independent layout styles. I extended the Hawksearch integration to support domain-aware filtering using the same search engine across both brands. On the Mountain Tarp side, I handled detection of the active site, dynamic adaptation of the Vue SDK configuration, and modified DOM rendering to match branding. Though the backend was unified, I ensured the frontend maintained clear identity separation and UX consistency.",
      companyDesc: "Manufacturer of tarping systems and accessories for dump trucks, trailers, and refuse vehicles.",
      technologies: [
        "OroCommerce",
        "JavaScript",
        "Vue.js (SDK)",
        "jQuery",
        "HTML",
        "SCSS",
        "Hawksearch API"
      ],
      platformSpecific: [
        "Multisite domain detection",
        "Vue SDK site switching",
        "Unified engine logic with brand-specific rules",
        "Frontend overrides by context",
        "Dynamic component mounting"
      ],
      imgSrc: 'public/img/mountain-logo.webp',
      classCard: 'mountain',
      link: 'https://mountaintarp.com/',
      platform: 'OroCommerce',
      highlightColor: 0x00ff00,
      desktopImage: '',
      mobileImage: '',
    },
    {
      title: "Singer – Accessibility-first Development with Custom C# Widgets on Roc7",
      description: "I led the accessibility overhaul of the Singer Equipment website, built on the Roc7 platform. The entire site was audited and enhanced to meet WCAG standards — including accessible navigation, search, modal dialogs, and carousel behavior. I ensured compatibility across assistive technologies like VoiceOver, TalkBack, and NVDA, with proper ARIA attributes, focus handling, and keyboard interactions. In addition to accessibility, I developed custom content widgets using Roc7’s server-side C# architecture — including hero sliders with image/video support and modular testimonial sections. Each widget was designed to be fully accessible and reusable across pages, with a separation of markup, logic, and styling. The result is a high-performing enterprise storefront that delivers both inclusivity and brand consistency.",
      companyDesc: "One of the largest foodservice equipment and supply distributors in the U.S., serving restaurants, hotels, and institutions.",
      technologies: [
        "Roc7 (C#)",
        "JavaScript",
        "HTML",
        "SCSS/CSS",
        "ARIA / WCAG",
        "VoiceOver / TalkBack Testing"
      ],
      platformSpecific: [
        "Custom C# widget development",
        "Reusable content modules",
        "Full WCAG audit & implementation",
        "Accessible sliders & menus",
        "Screen reader compatibility",
        "Keyboard-first navigation"
      ],
      imgSrc: 'public/img/singer-logo.webp',
      classCard: 'singer',
      link: 'https://www.singerequipment.com/',
      platform: 'RocCommerce',
      highlightColor: 0xff0000,
      desktopImage: '', 
      mobileImage: '',  
    },

    {
      title: "Chicago Auto Show – Rapid Template Development on Legacy iDev Platform",
      description: "In preparation for the 2025 exhibition, I was responsible for building multiple new page templates on the legacy iDev platform, including high-visibility pages like 'First Look for Charity'. Working within a tight timeline and a legacy codebase (C#, jQuery, and classic HTML/CSS), I created and deployed multiple new sections to support event logistics, charity details, ticketing content, and sponsor promotion. All templates had to integrate seamlessly with the platform's server-side routing and CMS structure. I optimized for maintainability while adapting to the constraints of older tooling and markup conventions. Despite the time pressure, each template was QA’d and deployed in sync with marketing deadlines, ensuring smooth pre-event rollout.",
      companyDesc: "The largest auto show in North America, showcasing the latest vehicles, technologies, and automotive trends.",
      technologies: [
        "iDev Platform",
        "C#",
        "jQuery",
        "HTML",
        "CSS"
      ],
      platformSpecific: [
        "Legacy codebase adaptation",
        "Rapid multi-template delivery",
        "CMS-integrated routing structure",
        "Production under tight deadlines",
        "Server-side templating (C#)"
      ],
      imgSrc: 'public/img/chicago-logo.webp',
      classCard: 'chicago-auto',
      link: 'https://www.chicagoautoshow.com/first-look-for-charity/',
      platform: 'iDev',
      highlightColor: 0x00ffff,
      desktopImage: '', 
      mobileImage: '',  
    },
    {
      title: "Virginia Railways – Accessibility & UI Fixes in Legacy iDev Stack",
      description: "On the Virginia Railway Express site, I contributed targeted fixes within the legacy iDev platform — focusing on improving accessibility and resolving style inconsistencies. My work included adjusting visual layouts, fixing responsive breakpoints, and ensuring better keyboard and screen reader compatibility across navigation and content sections. Despite working within a complex and outdated codebase, I maintained clean separation of concerns and pushed UI consistency across templates. These adjustments contributed to a smoother user experience for all visitors, particularly those relying on assistive technologies.",
      companyDesc: "Commuter rail service connecting Northern Virginia suburbs with Washington, D.C., focused on safe and reliable transportation.",
      technologies: [
        "iDev Platform",
        "C#",
        "HTML",
        "CSS",
        "Accessibility (WCAG)",
        "jQuery"
      ],
      platformSpecific: [
        "Legacy layout fixes",
        "Accessibility corrections",
        "Cross-browser consistency",
        "Style overrides in legacy templates",
        "Assistive tech QA support"
      ],
      imgSrc: 'public/img/virginia-logo.webp',
      classCard: 'virginia',
      link: 'https://www.vre.org/',
      platform: 'iDev',
      highlightColor: 0xff00ff,
      desktopImage: '', 
      mobileImage: '',  
    },

    {
      title: "Foley Family Wines – Scalable Email Template System with Dynamic Personalization",
      description: "I developed and tested a full suite of responsive email templates for Foley Family Wines and its portfolio of brands, using Salesforce Marketing Cloud. The emails included personalized dynamic content — such as order confirmations, targeted promotions, and event announcements — tailored to each recipient via SFMC data extensions. I implemented multi-brand support, building and managing templates for over a dozen separate wineries under the Foley umbrella. Every email was rigorously tested in Litmus across all major clients and devices: iPhone, Android, Outlook, Edge, Chrome, Safari, Firefox — including both light and dark mode compatibility. Despite tight deadlines leading up to major campaigns, all templates were delivered on time and met performance and accessibility standards.",
      companyDesc: "Family-owned wine company managing a portfolio of premium wineries across the U.S. and New Zealand.",
      technologies: [
        "Salesforce Marketing Cloud",
        "HTML/CSS for Email",
        "AMPscript",
        "Litmus Testing Suite"
      ],
      platformSpecific: [
        "Dynamic content blocks (SFMC)",
        "Multi-brand templating",
        "Dark mode compatibility",
        "Responsive email layouts",
        "Cross-client QA (Outlook, iOS, Android)",
        "Litmus automated checks"
      ],
      imgSrc: 'public/img/foley-logo.webp',
      classCard: 'foley',
      link: 'https://www.foleyfoodandwinesociety.com/',
      platform: 'Salesforce',
      highlightColor: 0x800080,
      desktopImage: '', 
      mobileImage: '',  
    },

    {
      title: "Anderson-Negele – Algolia Search Integration for Multi-Index WordPress Site",
      description: "I replaced the legacy search system on the Anderson-Negele WordPress site with a modern, high-performance Algolia search experience. The core challenge was merging three distinct Algolia indices — products, downloads, and applications — into a unified search interface with sectioned autocomplete results. I implemented a custom JavaScript solution that queried multiple indices simultaneously, mapped the results into clearly separated categories, and displayed them using a tailored autocomplete UI. The project was executed under time pressure, as the client prioritized search overhaul ahead of upcoming product launches. Despite tight deadlines, the new engine was delivered and deployed on schedule, dramatically improving speed, relevance, and user experience.",
      companyDesc: "Manufacturer of hygienic instrumentation for the food, beverage, and life sciences industries, specializing in process measurement solutions.",
      technologies: [
        "WordPress",
        "Algolia Search",
        "JavaScript",
        "HTML/CSS"
      ],
      platformSpecific: [
        "Multi-index Algolia integration",
        "Autocomplete with sectioned results",
        "Custom JS search implementation",
        "WordPress override of default search",
        "Time-sensitive deployment"
      ],
      imgSrc: 'public/img/anderson-logo.webp',
      classCard: 'anderson',
      link: 'https://www.anderson-negele.com/us/',
      platform: 'Wordpress',
      highlightColor: 0x39b54a,
      desktopImage: '', 
      mobileImage: '',  
    },

    {
      title: "Deniimcratic – Custom Shopify Launch Under Media Deadline",
      description: "I co-developed the Deniimcratic website under tight deadline pressure, as the client had an upcoming national TV appearance linked to the brand's launch. Working in a two-person team, we built the entire Shopify storefront from scratch — including multiple custom sections and interactive elements — using standard Shopify stack technologies. The project involved rapidly iterating on both design and content implementation, while ensuring stability and responsiveness across all modern devices. All components were handcrafted using Liquid, JavaScript, HTML, and SCSS, with no reliance on third-party templates. The site was delivered on time and successfully launched to align with the televised premiere.",
      companyDesc: "Sustainable fashion brand specializing in custom-fit denim made from recycled materials and circular production methods",
      technologies: [
        "Shopify (Liquid)",
        "JavaScript",
        "HTML",
        "SCSS/CSS"
      ],
      platformSpecific: [
        "Custom Shopify theme",
        "Two-person rapid delivery",
        "Launch coordinated with TV media",
        "Handbuilt Liquid sections",
        "Responsive layout from scratch"
      ],
      imgSrc: 'public/img/denimcratic-logo.webp',
      classCard: 'denimcratic',
      link: 'https://denimcratic.com/',
      platform: 'Shopify',
      highlightColor: 0xffff00,
      desktopImage: '', 
      mobileImage: '',  
    },

    {
      title: "Blaupunkt – Front-End Layout Fixes for Shopify Store",
      description: "I contributed front-end layout fixes and UI adjustments for the Blaupunkt Shopify storefront. While the scope was limited, the work focused on ensuring design consistency and responsive behavior across key sections of the site. My changes helped polish the visual presentation of a well-known consumer electronics brand without disrupting the existing theme structure. Even in a smaller role, I maintained attention to detail and quality assurance, delivering updates in line with Shopify best practices.",
      companyDesc: "Producer of compact, foldable electric bikes combining German engineering with urban mobility solutions.",
      technologies: [
        "Shopify (Liquid)",
        "HTML",
        "CSS/SCSS"
      ],
      platformSpecific: [
        "Layout polish on live storefront",
        "Responsive design corrections",
        "Lightweight front-end contribution"
      ],
      imgSrc: 'public/img/blaupunkt-logo.webp',
      classCard: 'blue',
      link: 'https://blue.bike/',
      platform: 'Shopify',
      highlightColor: 0x0000ff,
      desktopImage: '', 
      mobileImage: '',  
    },

    {
      title: "MetLife Stadium – Solo Front-End Work on Legacy iDev Platform",
      description: "While working on the MetLife Stadium website, I was the sole front-end developer responsible for UI enhancements, accessibility improvements, and layout fixes. Operating within the legacy iDev platform (C#, jQuery, HTML/CSS), I implemented several custom components and resolved long-standing accessibility issues — including keyboard navigation, screen reader compatibility, and visual contrast. The work required careful updates to existing templates and widgets without breaking the broader system. Despite the short-term engagement, I delivered meaningful improvements that aligned with both branding and usability goals.",
      companyDesc: "Multi-purpose stadium in New Jersey, home to the New York Giants and Jets, hosting major sports and entertainment events",
      technologies: [
        "iDev Platform",
        "C#",
        "jQuery",
        "HTML",
        "SCSS/CSS",
        "Accessibility (WCAG)"
      ],
      platformSpecific: [
        "Solo front-end responsibility",
        "Legacy widget customization",
        "Accessibility enhancements",
        "Cross-browser layout fixes",
        "Screen reader & keyboard support"
      ],
      imgSrc: 'public/img/metlife-logo.webp',
      classCard: 'metlife',
      link: 'https://www.metlifestadium.com/',
      platform: 'iDev',
      highlightColor: 0xff1493,
      desktopImage: '', 
      mobileImage: '',  
    },

    {
      title: "Itron – Accessibility-Driven Component Development on Liferay",
      description: "As part of the front-end team for Itron's Liferay-based website, I was primarily responsible for implementing accessibility across the platform — accounting for approximately 90% of all accessibility-related improvements. My work included ensuring screen reader compatibility (VoiceOver, TalkBack), keyboard navigation, semantic structure, and compliance with WCAG standards. In addition to accessibility, I built several custom components using vanilla JavaScript and jQuery, integrating them within Liferay’s templating system (FreeMarker). All features were tested across assistive technologies and mobile devices to ensure consistent behavior and usability. The result was a fully navigable, inclusive interface built atop a complex enterprise CMS.",
      companyDesc: "Technology company providing solutions for energy and water resource management, including smart meters and grid analytics.",
      technologies: [
        "Liferay",
        "FreeMarker (FTL)",
        "JavaScript",
        "jQuery",
        "HTML",
        "SCSS/CSS",
        "Accessibility (WCAG)"
      ],
      platformSpecific: [
        "Custom component development",
        "Accessibility ownership (~90%)",
        "Screen reader QA (VoiceOver, TalkBack)",
        "Keyboard navigation & ARIA structure",
        "Enterprise CMS templating (FTL)"
      ],
      imgSrc: 'public/img/itron-logo.webp',
      classCard: 'itron',
      link: 'https://na.itron.com/',
      platform: 'Liferay',
      highlightColor: 0x00bfff,
      desktopImage: '', 
      mobileImage: '',  
    },

    {
      title: "Polacheck's Jewelers – Full Front-End Migration and Custom Logic on Shopify",
      description: "As lead (and sole) front-end developer, I led the full redesign and migration of the Polacheck’s Jewelers website to a modern Shopify theme. The challenge was to implement a fresh, updated layout while preserving all core business logic from the previous version. I customized collection (PLP) and search (SRP) pages with brand-specific product display rules, conditional layout behaviors, and fallback handling. I also implemented a site-wide cookie consent system to comply with privacy requirements. The entire storefront was adapted, tested, and deployed independently — from Liquid template architecture to custom JavaScript behavior — ensuring both visual polish and functional parity with the original version.",
      companyDesc: "High-end jewelry retailer offering designer collections and custom pieces.",
      technologies: [
        "Shopify (Liquid)",
        "JavaScript",
        "HTML",
        "SCSS/CSS",
        "Cookie Consent Systems"
      ],
      platformSpecific: [
        "Full theme migration",
        "Legacy logic preservation",
        "Conditional product rendering",
        "Custom PLP / SRP behaviors",
        "Brand-aware filtering logic",
        "Solo front-end development"
      ],
      imgSrc: 'public/img/polacheck-logo.webp',
      classCard: 'polacheck',
      link: 'https://polachecks.com/',
      platform: 'Shopify',
      highlightColor: 0xff4500,
      desktopImage: '', 
      mobileImage: '',  
    },

    {
      title: "Benchmark Community Bank – Accessible Components for Liferay Portal",
      description: "Part of the front-end team responsible for building and refining custom components in a Liferay-based banking portal. My main focus was accessibility: implementing and testing support for screen readers (VoiceOver, TalkBack), keyboard navigation, semantic structure, and responsive design. I ensured compliance with accessibility standards (WCAG) across core sections of the site. Though this project mirrored the stack used on Itron, it allowed me to deepen my experience with Liferay’s templating system and component architecture.",
      companyDesc: "Community-focused bank serving Southern Virginia and Northern North Carolina.",
      technologies: [
        "Liferay (FreeMarker)",
        "HTML",
        "CSS",
        "JavaScript",
        "jQuery"
      ],
      platformSpecific: [
        "Accessible UI components",
        "VoiceOver / TalkBack support",
        "Liferay templating",
        "Keyboard navigation compliance",
        "WCAG alignment"
      ],
      imgSrc: 'public/img/benchmark-logo.webp',
      classCard: 'benchmark',
      link: 'https://www.bcbonline.com/',
      platform: 'Liferay',
      highlightColor: 0x1c3c84,
      desktopImage: '', 
      mobileImage: '',  
    },
    {
      title: "Shoshanna – Custom Dual-Product PDP on Shopify",
      description: "Lead front-end developer for a fully custom Shopify theme tailored to a high-end fashion brand. One of the key challenges was building a product detail page featuring two separate products, each with independent variant selectors and Add to Cart buttons — linked together via Metafields. Developed dynamic logic to sync inventory, pricing, and styling across the paired items. Additional work included building custom sections, styling complex components, and ensuring the theme was maintainable and scalable.",
      companyDesc: "Fashion brand offering designer women’s clothing, swimwear, and evening wear.",
      technologies: [
        "Shopify",
        "Liquid",
        "JavaScript",
        "CSS",
        "HTML",
        "Metafields"
      ],
      platformSpecific: [
        "Custom dual-product PDP logic",
        "Independent variant selectors",
        "Linked Metafield integration",
        "Add to Cart sync",
        "Lead front-end role"
      ],
      imgSrc: 'public/img/shoshana-logo.webp',
      classCard: 'shoshanna',
      link: 'https://shoshanna.com/',
      platform: 'Shopify',
      highlightColor: 0xd3a4c2,
      desktopImage: '', 
      mobileImage: '',  
    },

    {
      title: "ArmorPoxy – Conditional Logic for B2E User Groups (BigCommerce)",
      description: "Implemented complex conditional logic within a BigCommerce storefront to support a custom B2E (Business-to-Employee) edition. Depending on the logged-in user's group, the site dynamically adjusted layout, design components, and pricing structures. This included custom styling and conditional display logic for product listings, pricing visibility, and page components. The solution improved personalization and access control across multiple user roles.",
      companyDesc: "Manufacturer of industrial-grade epoxy coatings and flooring solutions.",
      technologies: [
        "BigCommerce",
        "Stencil",
        "Handlebars",
        "JavaScript",
        "HTML",
        "CSS"
      ],
      platformSpecific: [
        "Dynamic user group rendering",
        "B2E-specific pricing logic",
        "Conditional templates",
        "Custom UI per group"
      ],
      imgSrc: 'public/img/armor-logo.webp',
      classCard: 'b2e',
      link: 'https://armorpoxy.com/',
      platform: 'BigCommerce',
      highlightColor: 0x606060,
      desktopImage: '', 
      mobileImage: '',  
    },

    {
      title: "Anchor Paper – Magento Upgrade, Performance & Accessibility",
      description: "Served as the sole front-end developer during the platform upgrade of Anchor Paper’s Magento store. Collaborated with a backend developer to audit the existing codebase, identify legacy bottlenecks, and modernize front-end performance. I implemented a wide range of accessibility fixes (WCAG compliance), optimized rendering flow, and ensured a smooth transition to the updated Magento version while maintaining design consistency and responsiveness.",
      companyDesc: "Supplier of printing papers, packaging materials, and graphic supplies.",
      technologies: [
        "Magento",
        "JavaScript",
        "HTML",
        "CSS/SCSS",
        "Lighthouse"
      ],
      platformSpecific: [
        "Full accessibility audit & fixes",
        "Magento version upgrade",
        "Front-end performance optimization",
        "Legacy code modernization"
      ],
      imgSrc: 'public/img/anchor-logo.webp',
      classCard: 'magento',
      link: 'https://www.anchorpaper.com/',
      platform: 'Magento',
      highlightColor: 0x003366,
      desktopImage: '', 
      mobileImage: '',  
    },

    {
      title: "Chicago Coffee – Custom Templates & Widgets (BigCommerce)",
      description: "Worked on the BigCommerce storefront for Chicago Coffee, creating new custom templates tailored to the brand’s evolving needs. I built reusable UI widgets for various page types (product, category, landing) to improve flexibility and performance across the site. Focused on seamless integration with BigCommerce's framework while maintaining full responsiveness and consistency with brand identity.",
      companyDesc: "Local coffee brand and roaster offering artisanal coffee products online.",
      technologies: [
        "BigCommerce",
        "JavaScript",
        "HTML",
        "CSS/SCSS",
        "Stencil"
      ],
      platformSpecific: [
        "Custom BigCommerce widgets",
        "New reusable templates",
        "Responsive layout improvements"
      ],
      imgSrc: 'public/img/coffee-logo.webp',
      classCard: 'bigcommerce',
      link: 'https://www.chicagocoffee.com/',
      platform: 'BigCommerce',
      highlightColor: 0x4b2e2b,
      desktopImage: '', 
      mobileImage: '',  
    },

    {
      title: "American Society of Anesthesiologists – Audit",
      description: "Conducted a full performance and accessibility audit of the ASA website. Delivered a detailed report with actionable improvements for load times, responsiveness, and WCAG 2.1 compliance. Focused on practical, measurable fixes to improve UX across devices, with attention to screen reader behavior and interactive elements.",
      companyDesc: "Professional association for anesthesiologists advancing research, education, and standards in anesthesiology.",
      technologies: [
        "Lighthouse",
        "Axe DevTools",
        "WCAG 2.1",
        "HTML",
        "CSS",
        "JavaScript"
      ],
      platformSpecific: [
        "Performance profiling",
        "Accessibility testing",
        "Audit documentation & handoff"
      ],
      imgSrc: 'public/img/society-logo.webp',
      classCard: 'audit',
      link: 'https://www.asahq.org/',
      platform: 'Custom CMS',
      highlightColor: 0x1f4f70,
      desktopImage: '',
      mobileImage: '',
    },

    {
      title: "Land and Coates – Interactive Parts-Picker Module on Znode",
      description: "Styled Znode storefront and built a custom parts-picker module: users click on an illustrated machine diagram, and the matching part automatically highlights and scrolls into view in the sidebar. The feature synchronises SVG hit-areas with Znode’s C# view components and keeps URL state in sync for deep-linking. I also refreshed the theme’s colours, typography, and responsive breakpoints to match brand guidelines.",
      companyDesc: "Retailer and service provider for outdoor power equipment, including lawnmowers and parts.",
      technologies: [
        "Znode",
        "C#",
        "JavaScript",
        "HTML",
        "SCSS/CSS"
      ],
      platformSpecific: [
        "SVG / image-map hit areas",
        "Sidebar auto-sync & scroll",
        "Deep-link state handling",
        "Server-side view integration",
        "Responsive theme overhaul"
      ],
      imgSrc: 'public/img/land-logo.webp',
      classCard: 'land',
      link: 'https://www.landandcoates.net/',
      platform: 'Znode',
      highlightColor: 0x4682b4, 
      desktopImage: '', 
      mobileImage: ''   
    },

    {
      title: "Procon Pump – Hawksearch React SDK Integration on Znode",
      description: "Styled Znode storefront and wired Hawksearch (React SDK) into both product-listing (PLP) and search-results (SRP) pages. Built custom React components to map Hawksearch responses to Znode’s product data, handled facet / sort state, and ensured smooth client-side pagination. Added brand-specific UI elements and refined responsive styles across the catalogue.",
      companyDesc: "Manufacturer of precision rotary vane and gear pumps for industrial applications.",
      technologies: [
        "Znode",
        "C#",
        "React",
        "JavaScript",
        "HTML",
        "SCSS/CSS",
        "Hawksearch API"
      ],
      platformSpecific: [
        "Hawksearch React SDK",
        "PLP / SRP wiring",
        "Dynamic product mapping",
        "Facet & sort state sync",
        "Custom Znode view overrides"
      ],
      imgSrc: 'public/img/procon-logo.webp',
      classCard: 'procon',
      link: 'https://www.proconpumps.com/',
      platform: 'Znode',
      highlightColor: 0x4682b4,
      desktopImage: '', 
      mobileImage: ''   
    },

    {
      title: "Darpet – Multi-Platform Evolution (WordPress ➔ Static ➔ Shopify)",
      description: "Long-term ownership of Darpet’s web presence: started with a WordPress site, transitioned to a custom static build, and ultimately migrated to a bespoke Shopify theme. Across each phase I delivered custom widgets, graphic assets, and full layout refactors while driving SEO, social-media integration, and email-marketing campaigns.",
      companyDesc: "Family-owned company based in Illinois, specializing in high-quality interior and exterior doors, moldings, and hardware for residential and commercial use.",
      technologies: [
        "Shopify (Liquid)",
        "WordPress",
        "JavaScript",
        "HTML",
        "SCSS/CSS",
        "SEO tooling",
        "Email marketing"
      ],
      platformSpecific: [
        "WordPress to static rebuild",
        "Custom Shopify theme",
        "Reusable widget library",
        "On-page & technical SEO",
        "Social feed integration",
        "Email template design"
      ],
      imgSrc: 'public/img/darpet-logo.webp',
      classCard: 'darpet',
      link: 'https://www.darpet.com/',
      platform: 'WordPress / Shopify',
      highlightColor: 0x4682b4,
      desktopImage: '', 
      mobileImage: ''   
    },

    {
      title: "PureOrder – Custom Informational Website",
      description: "Designed and developed a bespoke HTML/CSS website for PureOrder, built entirely from scratch without a CMS. Focused on lightweight performance, clean semantic markup, and modern design tailored for a niche industry. All content and structure were created in close collaboration with the client.",
      companyDesc: "Home organizing service based in Chicagoland, helping clients reclaim their space with thoughtful, declutter-focused solutions.",
      technologies: [
        "HTML",
        "CSS (SCSS)",
        "JavaScript",
        "Responsive design",
        "Accessibility basics"
      ],
      platformSpecific: [
        "Hand-coded static site",
        "No CMS – fully custom",
        "Performance-first approach",
        "Clean semantic layout",
        "Custom favicon & accessibility fixes"
      ],
      imgSrc: 'public/img/pure-logo.webp',
      classCard: 'pureorder',
      link: 'https://pureorder.org', 
      platform: 'Static (HTML/CSS/JS)',
      highlightColor: 0x22577a, 
      desktopImage: '', 
      mobileImage: ''   
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
        

        <div className={`my-work ${isVisible ? 'fade-in' : ''} ${selectedProject !== null ? 'project-open' : ''}`}>
          <div className='filters-toggle-container'>
          <div className={`filters-panel ${showFilters ? 'show' : ''}`}>
          <button className="filter-toggle" onClick={toggleFilters}>
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>

          
        </div>
        <div className="filters-content">
            <div className='filters-inner'>
            <h3>Filter Projects</h3>
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
            </div>
            

            {!selectedFilters.includes('all') && selectedFilters.length > 0 && (
              <button className="reset-filters" onClick={resetFilters}>
                Reset Filters
              </button>
            )}
          </div>
        </div>
          <div className="my-work-inner">
            <div className="cards-container">
              {filteredProjects.map((project, index) => (
                <Card
                  key={index}
                  {...project}
                  isSelected={false}
                  isHidden={showDetailView}
                  onClick={() => handleOpenCard(projects.indexOf(project))}
                  onClose={() => { }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Zmodyfikowany kontener detali */}
        {selectedProject !== null && showDetailView && (
          <div className="detail-view-container">
            <div className="detail-view" style={{ '--highlight-color': projects[selectedProject].highlightColor } as React.CSSProperties}>
              <button className="close-button" onClick={handleCloseCard}>×</button>

              <div className="detail-content">
                <img src={projects[selectedProject].imgSrc} alt={projects[selectedProject].title} className="detail-logo" />
                <h2>{projects[selectedProject].title}</h2>
                <h3 className="description">{projects[selectedProject].companyDesc}</h3>
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