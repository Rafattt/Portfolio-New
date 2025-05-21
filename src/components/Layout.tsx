import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import Header from './Header';
import { updateVantaHighlightColor } from './VantaBackground';
import gsap from 'gsap';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const observerRef = useRef<MutationObserver | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const currentColorRef = useRef(0x0);
  const currentTweenRef = useRef<gsap.core.Tween | null>(null);
  const lastTargetColorRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);

  const animationRef = useRef<number>();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  

  const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
  };

  const interpolateRGB = (startColor: number, endColor: number, t: number) => {
    // Extract RGB components correctly
    const startR = (startColor >> 16) & 0xFF;
    const startG = (startColor >> 8) & 0xFF;
    const startB = startColor & 0xFF;
    
    const endR = (endColor >> 16) & 0xFF;
    const endG = (endColor >> 8) & 0xFF;
    const endB = endColor & 0xFF;
    
    // Interpolate each component
    const r = Math.round(startR + (endR - startR) * t);
    const g = Math.round(startG + (endG - startG) * t);
    const b = Math.round(startB + (endB - startB) * t);
    
    // Combine back to hex
    return (r << 16) | (g << 8) | b;
  };

  let lastUpdateTime = 0;
const throttleInterval = 66; // ms ~15fps

const throttledVantaUpdate = (color: number) => {
  const now = performance.now();
  if (now - lastUpdateTime >= throttleInterval) {
    updateVantaHighlightColor(color);
    lastUpdateTime = now;
  }
};

const transitionColor = (targetColor: number) => {
  // 🔒 Jeśli kolor docelowy się nie zmienia — nie rób nic
  if (targetColor === lastTargetColorRef.current) return;
  lastTargetColorRef.current = targetColor;
console.log('fff')
  // 🎯 Kolor startowy
  const startColor = currentColorRef.current;
  const startR = (startColor >> 16) & 0xff;
  const startG = (startColor >> 8) & 0xff;
  const startB = startColor & 0xff;

  const endR = (targetColor >> 16) & 0xff;
  const endG = (targetColor >> 8) & 0xff;
  const endB = targetColor & 0xff;

  const obj = { r: startR, g: startG, b: startB };

  // zatrzymaj poprzednią animację jeśli jeszcze trwa
  currentTweenRef.current?.kill();

  //  Nowa animacja
  currentTweenRef.current = gsap.to(obj, {
    r: endR,
    g: endG,
    b: endB,
    duration: 1.8,
    ease: 'power2.out',
    onUpdate: () => {
      const r = Math.round(obj.r);
      const g = Math.round(obj.g);
      const b = Math.round(obj.b);
      const hex = (r << 16) | (g << 8) | b;
      currentColorRef.current = hex;
      throttledVantaUpdate(hex);
    }
  });
};


  // Use memo or stable refs for event handlers to avoid recreation on rerenders
  const setupCardListeners = useCallback(() => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const existingHandlers = card.getAttribute('data-has-listeners') === 'true';
      if (existingHandlers) {
        return; // Skip if already has listeners
      }
      
      const handleColorChange = () => {
        // Dodaj klasę 'active-color' do karty
        if (resetTimeoutRef.current) {
          clearTimeout(resetTimeoutRef.current);
          resetTimeoutRef.current = null;
        }
        cards.forEach(c => c.classList.remove('active-color'));
        card.classList.add('active-color');
        
        const cardClass = Array.from(card.classList)
          .find(className => className !== 'card' && className !== 'selected' && className !== 'hidden' && className !== 'active-color');
        
        if (cardClass) {
          setHoveredCard(cardClass);
          let targetColor = 0x0;
          
          switch(cardClass) {
            case 'ciranda': targetColor = 0xdc431c; break;
            case 'huyett': targetColor = 0x17305a; break;
            case 'wastebuilt': targetColor = 0x097a40; break;
            case 'singer': targetColor = 0x4091C9; break;
            case 'chicago-auto': targetColor = 0x009edd; break;
            case 'virginia': targetColor = 0xee3e42; break;
            case 'foley': targetColor = 0xad9863; break;
            case 'denimcratic': targetColor = 0x31589f; break; 
            case 'blue': targetColor = 0x009ee0; break;
            case 'metlife': targetColor = 0x103669; break;
            case 'itron': targetColor = 0xd22930; break;
            case 'anderson': targetColor = 0x39b54a; break;
            case 'polacheck': targetColor = 0xFFD700; break;
            case 'benchmark': targetColor = 0x551226; break;
            case 'shoshanna': targetColor = 0xF88379; break;
            case 'mountain': targetColor = 0x0c4e83; break;
            case 'society': targetColor = 0x8a84d6; break;
            case 'land': targetColor = 0x115A31; break;
            case 'procon': targetColor = 0xd12428; break;
            case 'darpet': targetColor = 0x831e0a; break;
            case 'pure': targetColor = 0xf8f7f4; break;
            case 'armor': targetColor = 0x015cff; break;
            case 'chicago-coffee': targetColor = 0x65497c; break;
            case 'anchor': targetColor = 0x2e7ebf; break;
          }
          const isSelected = card.classList.contains('selected');
          transitionColor(targetColor);
        }
      };

      const resetColor = () => {
  if (resetTimeoutRef.current) {
    clearTimeout(resetTimeoutRef.current);
  }

  resetTimeoutRef.current = window.setTimeout(() => {
    const detailsOpen = document.querySelector('.detail-view-container');

    const { x, y } = mousePosRef.current;
    const el = document.elementFromPoint(x, y);

    const isOnCard = el?.closest('.card');
    const isOnDetails = el?.closest('.detail-view-container');

    if (!isOnCard && !isOnDetails && !detailsOpen) {
      setHoveredCard(null);
      transitionColor(0x0);
    }

    resetTimeoutRef.current = null;
  }, 1000);
};


      // First remove any existing listeners to prevent duplicates
      card.removeEventListener('mouseenter', handleColorChange);
      card.removeEventListener('mouseleave', resetColor);
      card.removeEventListener('focusin', handleColorChange);
      card.removeEventListener('focusout', resetColor);
      
      // Then add the listeners
      card.addEventListener('mouseenter', handleColorChange);
      card.addEventListener('mouseleave', resetColor);
      card.addEventListener('focusin', handleColorChange);
      card.addEventListener('focusout', resetColor);

      // Mark as having listeners
      card.setAttribute('data-has-listeners', 'true');
    });

    // Obserwuj zmiany klasy 'active-color' na kartach
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const target = mutation.target as HTMLElement;
        if (target.classList.contains('card')) {
          // Jeśli karta straciła klasę 'active-color' i nie ma żadnej innej karty z tą klasą
          if (!target.classList.contains('active-color') && !document.querySelector('.card.active-color')) {
            // Sprawdź, czy detale są otwarte
            const detailsOpen = document.querySelector('.detail-view-container');
            
            // Zresetuj kolor tylko jeśli nie ma otwartych detali
            if (!detailsOpen) {
              transitionColor(0x0);
            }
          }
        }
      });
    });

    cards.forEach(card => {
      observer.observe(card, {
        attributes: true,
        attributeFilter: ['class']
      });
    });

    // Dodaj globalną funkcję do ręcznego ustawiania aktywnego koloru
    window.setActiveCardColor = (cardClass: string | null) => {
      if (cardClass) {
        // Znajdź kartę z pasującą klasą
        const card = Array.from(cards).find(c => 
          Array.from(c.classList).some(cls => cls === cardClass)
        );
        
        if (card) {
          // Dodaj klasę active-color do tej karty
          cards.forEach(c => c.classList.remove('active-color'));
          card.classList.add('active-color');
          
          // Wywołaj symulację handleColorChange
          let targetColor = 0x0;
          
          switch(cardClass) {
            case 'ciranda': targetColor = 0xdc431c; break;
            case 'huyett': targetColor = 0x17305a; break;
            case 'wastebuilt': targetColor = 0x097a40; break;
            case 'singer': targetColor = 0x4091C9; break;
            case 'chicago-auto': targetColor = 0x009edd; break;
            case 'virginia': targetColor = 0xee3e42; break;
            case 'foley': targetColor = 0xad9863; break;
            case 'denimcratic': targetColor = 0x31589f; break; 
            case 'blue': targetColor = 0x009ee0; break;
            case 'metlife': targetColor = 0x103669; break;
            case 'itron': targetColor = 0xd22930; break;
            case 'anderson': targetColor = 0x39b54a; break;
            case 'polacheck': targetColor = 0xFFD700; break;
            case 'benchmark': targetColor = 0x551226; break;
            case 'shoshanna': targetColor = 0xF88379; break;
            case 'mountain': targetColor = 0x0c4e83; break;
            case 'society': targetColor = 0x8a84d6; break;
            case 'land': targetColor = 0x115A31; break;
            case 'procon': targetColor = 0xd12428; break;
            case 'darpet': targetColor = 0x831e0a; break;
            case 'pure': targetColor = 0xf8f7f4; break;
            case 'armor': targetColor = 0x015cff; break;
            case 'chicago-coffee': targetColor = 0x65497c; break;
            case 'anchor': targetColor = 0x2e7ebf; break;
          }
          
          transitionColor(targetColor, true);
        }
      } else {
        // Usuń klasę active-color ze wszystkich kart
        cards.forEach(c => c.classList.remove('active-color'));
        
        // Resetuj kolor
        transitionColor(0x0, false);
      }
    };

    return observer;
  }, [hoveredCard]); // Only depend on state that affects the handlers

  useEffect(() => {
    
    setTimeout(() => {
      document.querySelector('.my-work')?.classList.add('fade-in');
    }, 300);

    // Use a small delay to make sure DOM is ready
    const setupTimeout = setTimeout(setupCardListeners, 500);
    
    return () => {
      clearTimeout(setupTimeout);
    };
  }, [location.pathname, setupCardListeners]);

  useEffect(() => {
  const updateMousePos = (e: MouseEvent) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
  };
  window.addEventListener('mousemove', updateMousePos);
  return () => window.removeEventListener('mousemove', updateMousePos);
}, []);

  return (
    <>
      {!isHome && <Header />}
      {children}
    </>
  );
};

export default Layout;
