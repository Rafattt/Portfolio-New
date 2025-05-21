import { useEffect, useRef } from 'react';

// Global reference to track if VANTA is initialized
let vantaEffect: any = null;

// Function to update color
export function updateVantaHighlightColor(color: number) {
  if (vantaEffect && typeof vantaEffect.setOptions === 'function') {
    try {
      vantaEffect.setOptions({ highlightColor: color });
    } catch (e) {
      console.error("Error updating VANTA color:", e);
    }
  }
}

const VantaBackground = () => {
  const initialized = useRef(false);

  useEffect(() => {
    // Only initialize once
    if (initialized.current) return;
    
    const initVanta = () => {
      if (!window.VANTA || !window.VANTA.FOG) return;
      
      try {
        // Clean up any existing effect
        if (vantaEffect && typeof vantaEffect.destroy === 'function') {
          vantaEffect.destroy();
        }
        
        // Create new effect with only supported parameters
        vantaEffect = window.VANTA.FOG({
          el: "#root",
          alpha: true,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          
          // Kluczowe parametry, które na pewno działają:
          highlightColor: 0x0,        // Kolor podświetlenia
          midtoneColor: 0x0,          // Kolor tonów średnich
          lowlightColor: 0xf5f5f5,    // Kolor tonów ciemnych (biały)
          baseColor: 0x0,             // Kolor podstawowy (czarny)
          
          blurFactor: 0.4,            // Współczynnik rozmycia (0-1)
          speed: 0.6,                 // Szybkość animacji (0-3)
          
          // Dodatkowe parametry, które działają w VANTA.FOG:
          zoom: 0.8,                  // Przybliżenie (0.1-3)
          scale: 2,                   // Skala efektu
          backgroundAlpha: 0.00,
          scaleMobile: 1              // Skala na urządzeniach mobilnych
        });
        
        // Dostosowanie opacity przez manipulację CSS canvasa
        setTimeout(() => {
          const vantaCanvas = document.querySelector('.vanta-canvas');
          if (vantaCanvas) {
            (vantaCanvas as HTMLElement).style.opacity = '1'; // Regulacja przezroczystości przez CSS
          }
        }, 100);
        
        // Make the color updater available
        window.setVantaColor = updateVantaHighlightColor;
        
        initialized.current = true;
      } catch (e) {
        console.error("Error initializing VANTA:", e);
      }
    };
    
    // Try to initialize immediately
    initVanta();
    
    // Expose reinitialize function globally
    window.reinitializeVanta = () => {
      initialized.current = false;
      initVanta();
    };
    
    // This component doesn't need to cleanup on unmount
    // We want the effect to persist across the app
    return () => {};
  }, []);
  
  return null;
};

export default VantaBackground;

// Problemem było kilka nakładających się kwestii:

// 1. Zbyt skomplikowane zarządzanie cyklem życia komponentu
//    - Wiele zagnieżdżonych efektów i timerów
//    - Złożone mechanizmy inicjalizacji i przełączania
//    - Nadmiarowe śledzenie stanu poprzez wiele zmiennych

// 2. Konflikt zarządzania kontekstem WebGL
//    - VANTA tworzy własny kontekst WebGL
//    - Jednocześnie Home component tworzył drugi kontekst WebGL
//    - Przeglądarka ma ograniczoną liczbę kontekstów WebGL per strona

// 3. Próba manipulacji DOM poza kontrolą React
//    - Bezpośrednia manipulacja elementami canvas
//    - Modyfikacja stylów i klas elementów kontrolowanych przez React
//    - Próby usuwania i dodawania elementów canvas

// 4. Niepotrzebne efekty przy nawigacji
//    - Niszczenie i odtwarzanie efektu VANTA przy każdej zmianie
//    - Wielokrotne nakładanie efektów i kolorów

// Rozwiązaniem było:
// 1. Jedno globalne miejsce zarządzania efektem VANTA
// 2. Prostszy model inicjalizacji bez nadmiarowych timerów
// 3. Unikanie konfliktów WebGL context
// 4. Utrzymanie efektu między zmianami stron
