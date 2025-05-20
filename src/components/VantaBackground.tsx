import { useEffect, useRef } from 'react';

// Global variable for VANTA effect
let vantaInstance: any = null;

// Function to update VANTA color
export function updateVantaHighlightColor(color: number) {
  if (vantaInstance && typeof vantaInstance.setOptions === 'function') {
    vantaInstance.setOptions({ highlightColor: color });
  }
}

const VantaBackground = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !window.VANTA) return;
    
    const rootElement = document.getElementById('root');
    if (!rootElement) return;
    
    try {
      vantaInstance = window.VANTA.FOG({
        el: rootElement,
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
      initialized.current = true;
      
      // Make function available globally
      window.setVantaColor = updateVantaHighlightColor;
    } catch (error) {
      console.error('VANTA initialization failed:', error);
    }
    
    // No cleanup - we want VANTA to persist
    return () => {};
  }, []);

  return null;
};

export default VantaBackground;
