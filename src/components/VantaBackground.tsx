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
        
        // Create new effect
        vantaEffect = window.VANTA.FOG({
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
