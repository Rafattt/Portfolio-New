import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './styles.scss';
import { initWebGL } from './utils/WebglUtils';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MyWork from './pages/MyWork';
import Layout from './components/Layout';
import { getWebGLContext } from './utils/WebglContext';
import VantaBackground from './components/VantaBackground';

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
  const animationInitializedRef = useRef(false);

  useEffect(() => {
    // Reset the home content fade state when returning
    const homeContent = document.querySelector('.home-content');
    if (homeContent) {
      homeContent.classList.remove('fade');
    }
    
    let isDestroyed = false;

    // Initialize WebGL for smoke animation
    const initGL = () => {
      if (!canvasRef.current || isDestroyed || animationInitializedRef.current) return;

      try {
        console.log('Initializing smoke animation...');
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
          animationInitializedRef.current = true;
          console.log('Smoke animation initialized successfully');
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
    
    // Initialize WebGL with small delay to ensure canvas is ready
    setTimeout(() => {
      if (!isDestroyed) {
        initGL();
      }
    }, 100);
    
    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current && webglContextRef.current) {
        canvasRef.current.width = canvasRef.current.clientWidth;
        canvasRef.current.height = canvasRef.current.clientHeight;
        // Reset and re-initialize
        animationInitializedRef.current = false;
        initGL();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDestroyed = true;
      if (webglContextRef.current?.gl && programRef.current) {
        try {
          const gl = webglContextRef.current.gl;
          gl.deleteProgram(programRef.current);
          const loseContext = gl.getExtension('WEBGL_lose_context');
          if (loseContext) {
            loseContext.loseContext();
          }
        } catch (e) {
          console.error("Error cleaning up WebGL:", e);
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
    <div id="background-image"></div>
      <div className="home-content">
        <canvas ref={canvasRef}></canvas> 
        <div className="home-content-inner" id="home-content">
          <h1 className="home-title"><span>RAFAL KMIECIK</span><div className="subtitle-height"><span className="subtitle">FRONTEND DEVELOPER</span></div></h1>
          <button id="open-portfolio-button" onClick={handleOpenPortfolio}>Open Portfolio</button>
        </div>
      </div>
    </>
  );
}

export default App;
