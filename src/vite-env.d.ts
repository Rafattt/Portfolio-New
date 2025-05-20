/// <reference types="vite/client" />

interface Window {
  VANTA?: any;
  setVantaColor?: (color: number) => void;
  reinitializeVanta?: () => void;
}
