import { useEffect, useRef } from 'react';

// ──────────────────────── GLOBAL ────────────────────────
let vantaEffect: any = null;
let lastColor = 0;                  // do deboun­ce'u
let lastUpdateTime = 0;
const THROTTLE_MS = 1000 / 25;

export function updateVantaHighlightColor(color: number) {
  const now = performance.now();
  

  // Unikamy zbędnych aktualizacji
  if (color === lastColor) return;

  // THROTTLING
  if (now - lastUpdateTime < THROTTLE_MS) return;

  lastUpdateTime = now;
  lastColor = color;

  requestAnimationFrame(() => {
    try {
      vantaEffect?.setOptions?.({ highlightColor: color });
    } catch (e) {
      console.error("Vanta setOptions error:", e);
    }
  });
}

// ──────────────────────── REACT ────────────────────────
const VantaBackground = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;          // tylko raz

    const initVanta = () => {
      if (!window.VANTA?.FOG) return;

      // wyczyść starą instancję
      vantaEffect?.destroy?.();

      vantaEffect = window.VANTA.FOG({
        el: '#root',
        alpha: false,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        pixelRatio: window.innerWidth < 1024 ? 1 : Math.min(window.devicePixelRatio, 1.5),


        highlightColor: 0x0,
        midtoneColor: 0x0,
        lowlightColor: 0xf5f5f5,
        baseColor: 0x0,

        blurFactor: 0.3,
        speed: 0.1,
        zoom: 0.8,
        scale: 1,
        backgroundAlpha: 0.0,
        scaleMobile: 1,
      });

      window.setVantaColor = updateVantaHighlightColor;
      initialized.current = true;
    };

    initVanta();

    // umożliwiam ręczne przeładowanie
    window.reinitializeVanta = () => {
      initialized.current = false;
      initVanta();
    };

    let resizeTimeout: number | null = null;

  const handleResize = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      window.reinitializeVanta?.();
    }, 300); // debounce time
  };

  window.addEventListener("resize", handleResize);

    // ② sprzątamy przy odmontowaniu
    return () => {
      vantaEffect?.destroy?.();
      vantaEffect = null;
      initialized.current = false;
       window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null; // nie wstawiam dodatkowych divów – układ zostaje jak był
};

export default VantaBackground;
