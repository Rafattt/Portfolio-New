import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const vantaEffect = useRef<any>(null);

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
        blurFactor: 0.27,
        speed: 0.30
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [location.pathname]); // Re-run effect when pathname changes

  return (
    <>
      {!isHome && <Header />}
      {children}
    </>
  );
};

export default Layout;
