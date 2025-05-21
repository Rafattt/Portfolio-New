import { useEffect, useRef } from 'react';

// ──────────────────────── GLOBAL ────────────────────────
let vantaEffect: any = null;
let lastColor = 0;                  // do deboun­ce'u

export function updateVantaHighlightColor(color: number) {
  // 60 ms throttle + unikamy wywołania, gdy kolor się nie zmienił
  if (color === lastColor) return;
  lastColor = color;

  requestAnimationFrame(() => {
    vantaEffect?.setOptions?.({ highlightColor: color });
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
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),   // ① LIMIT

        highlightColor: 0x0,
        midtoneColor: 0x0,
        lowlightColor: 0xf5f5f5,
        baseColor: 0x0,

        blurFactor: 0.2,
        speed: 0.4,
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

    // ② sprzątamy przy odmontowaniu
    return () => {
      vantaEffect?.destroy?.();
      vantaEffect = null;
      initialized.current = false;
    };
  }, []);

  return null; // nie wstawiam dodatkowych divów – układ zostaje jak był
};

export default VantaBackground;
