import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const vantaEffect = useRef<any>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const currentColorRef = useRef(0x0);
  const animationRef = useRef<number>();

  const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
  };

  const interpolateRGB = (startColor: number, endColor: number, t: number) => {
    // Extract RGB components
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

  const transitionColor = (targetColor: number) => {
    const startColor = currentColorRef.current;
    let startTime: number | null = null;
    const duration = 2200; // 0.2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentColor = interpolateRGB(startColor, targetColor, progress);
      currentColorRef.current = currentColor;

      if (vantaEffect.current) {
        vantaEffect.current.setOptions({
          highlightColor: currentColor
        });
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    requestAnimationFrame(animate);
  };

  const setupCardListeners = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const handleColorChange = () => {
        if (vantaEffect.current) {
          const cardClass = Array.from(card.classList)
            .find(className => className !== 'card');
          
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
          }
          transitionColor(targetColor);
        }
      };

      const resetColor = () => {
        if (vantaEffect.current) {
          transitionColor(0x0);
        }
      };

      card.addEventListener('mouseenter', handleColorChange);
      card.addEventListener('mouseleave', resetColor);
      card.addEventListener('focusin', handleColorChange);
      card.addEventListener('focusout', resetColor);
    });
  };

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = VANTA.FOG({
        el: "#root",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: 0x0,
        midtoneColor: 0x0,
        lowlightColor: 0xf5f5f5,
        baseColor: 0x0,
        blurFactor: 0.4,
        speed: 1.0
      });
    }

    setTimeout(() => {
      document.querySelector('.my-work')?.classList.add('fade-in');
    }, 1000);

    setupCardListeners();

    observerRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          setupCardListeners();
        }
      });
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observerRef.current?.disconnect();
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [location.pathname]);

  return (
    <>
      {!isHome && <Header />}
      {children}
    </>
  );
};

export default Layout;
