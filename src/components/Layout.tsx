import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import Header from './Header';
import { updateVantaHighlightColor } from './VantaBackground';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const observerRef = useRef<MutationObserver | null>(null);
  const currentColorRef = useRef(0x0);
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

  const transitionColor = (targetColor: number, isCardSelected: boolean = false) => {
    const startColor = currentColorRef.current;
    let startTime: number | null = null;
    const duration = 2200; // 0.2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentColorVal = interpolateRGB(startColor, targetColor, progress);
      currentColorRef.current = currentColorVal;

      // Try using the imported function directly, which should also update window.setVantaColor
      updateVantaHighlightColor(currentColorVal);

      // Continue animation if not complete and card is open
      const selectedCard = document.querySelector('.card.selected');
      if (progress < 1 || (isCardSelected && selectedCard)) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationRef.current && !isCardSelected) {
      cancelAnimationFrame(animationRef.current);
    }

    requestAnimationFrame(animate);
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
        const cardClass = Array.from(card.classList)
          .find(className => className !== 'card' && className !== 'selected' && className !== 'hidden');
        
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
          transitionColor(targetColor, isSelected);
        }
      };

      const resetColor = () => {
        setHoveredCard(null);
        if (!card.classList.contains('selected')) {
          transitionColor(0x0, false);
        }
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

    // Obserwuj zmiany klasy 'selected' na kartach
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const target = mutation.target as HTMLElement;
        if (target.classList.contains('card')) {
          if (!target.classList.contains('selected') && !hoveredCard) {
            transitionColor(0x0);
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

    return observer;
  }, [hoveredCard]); // Only depend on state that affects the handlers

  useEffect(() => {
    
    setTimeout(() => {
      document.querySelector('.my-work')?.classList.add('fade-in');
    }, 1000);

    // Use a small delay to make sure DOM is ready
    const setupTimeout = setTimeout(setupCardListeners, 500);
    
    return () => {
      clearTimeout(setupTimeout);
    };
  }, [location.pathname, setupCardListeners]);

  return (
    <>
      {!isHome && <Header />}
      {children}
    </>
  );
};

export default Layout;
