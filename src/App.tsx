import React, { useState, useEffect, useRef } from 'react'; // Added React import
import './App.css';
import './styles.scss';
import { initWebGL } from './utils/WebglUtils';
// import background from './assets/img/bg.jpg'; // Ensure this is used or remove
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // Removed Link if not used
import MyWork from './pages/MyWork';
// import Header from './components/Header'; // Header is in Layout
import Layout from './components/Layout';
// import { // These seem unused in App.tsx, consider removing if not needed elsewhere
//   useTransition,
//   useSpring,
//   useChain,
//   config,
//   animated,
//   useSpringRef,
// } from '@react-spring/web';
import { getWebGLContext } from './utils/WebglContext';
import VantaBackground from './components/VantaBackground'; // Import the component

function App() {
  return (
    <Router>
      <VantaBackground /> {/* Render VantaBackground once here */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-work" element={<MyWork />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglContextRef = useRef<any>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  // const [isReturningToHome, setIsReturningToHome] = useState(false); // This state seems unused now

  useEffect(() => {
    // Reset the home content fade state when returning to the home page
    const homeContent = document.querySelector('.home-content');
    if (homeContent) {
      homeContent.classList.remove('fade');
    }
    
    // Ensure VANTA canvas is visible and properly configured
    setTimeout(() => {
      const vantaCanvases = document.querySelectorAll('.vanta-canvas');
      vantaCanvases.forEach(canvas => {
        (canvas as HTMLElement).style.display = 'block';
        (canvas as HTMLElement).style.opacity = '1';
        (canvas as HTMLElement).style.visibility = 'visible';
        (canvas as HTMLElement).style.zIndex = '0';
      });

      // Reset VANTA color
      if (typeof window.setVantaColor === 'function') {
        window.setVantaColor(0x0);  // Reset to default black color
      }
    }, 50);
    
    let isDestroyed = false;

    const initGL = () => {
      if (!canvasRef.current || isDestroyed) return;

      try {
        const canvas = canvasRef.current;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        const context = getWebGLContext(canvas);
        webglContextRef.current = context;

        if (context.gl && !isDestroyed) {
          programRef.current = initWebGL(
            canvas,
            context.gl,
            context.ext,
            context.support_linear_float
          );
        }
      } catch (error) {
        console.error('WebGL initialization failed:', error);
      }
    };

    // Initialize elements
    setTimeout(() => {
      if (!isDestroyed) {
        document.querySelector('.subtitle')?.classList.add('active');
      }
    }, 1);

    setTimeout(() => {
      if (!isDestroyed) {
        document.getElementById('open-portfolio-button')?.classList.add('active');
      }
    }, 1000);

    // Initialize WebGL for the home page canvas (if it's different from VANTA)
    initGL(); 

    const handleResize = () => {
      if (canvasRef.current && webglContextRef.current) {
        canvasRef.current.width = canvasRef.current.clientWidth;
        canvasRef.current.height = canvasRef.current.clientHeight;
        initGL();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDestroyed = true;
      if (webglContextRef.current?.gl && programRef.current) {
        const gl = webglContextRef.current.gl;
        gl.deleteProgram(programRef.current);
        const loseContext = gl.getExtension('WEBGL_lose_context');
        if (loseContext) {
          loseContext.loseContext();
        }
      }
      webglContextRef.current = null;
      programRef.current = null;
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]);

  const handleOpenPortfolio = () => {
    document.querySelector('.home-content')?.classList.add('fade');
    
    setTimeout(() => {
      navigate('/my-work');
    }, 1000);
  };

  return (
    <>   
      <div className="home-content">
        {/* This canvas is for the Home page's specific WebGL, not VANTA */}
        <canvas ref={canvasRef}></canvas> 
        <div className="home-content-inner" id="home-content-inner"> {/* Changed id to avoid conflict if #home-content is used elsewhere */}
          <h1 className="home-title"><span>RAFAL KMIECIK</span><div className="subtitle-height"><span className="subtitle">FRONTEND DEVELOPER</span></div></h1>
          <button id="open-portfolio-button" onClick={handleOpenPortfolio}>Open Portfolio</button>
        </div>
      </div>
    </>
  );
}

export default App;
