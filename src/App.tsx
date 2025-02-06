import { useState, useEffect, useRef } from 'react';
import './App.css';
import './styles.scss';
import { initWebGL } from './utils/WebglUtils';
import background from './assets/img/bg.jpg';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import MyWork from './pages/MyWork';
import Header from './components/Header';
import Layout from './components/Layout';
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web';
import { getWebGLContext } from './utils/WebglContext';

function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglContextRef = useRef<any>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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

    // Initialize WebGL
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
    };
  }, []);

  const handleOpenPortfolio = () => {
    document.querySelector('.home-content')?.classList.add('fade');
    setTimeout(() => {
      navigate('/my-work');
    }, 1);
  };

  return (
    <>   
      <div className="home-content">
      <canvas ref={canvasRef}></canvas>
        <div className="home-content-inner" id="home-content">
          <h1  className="home-title"><span>RAFAL KMIECIK</span><div className="subtitle-height"><span className="subtitle">FRONTEND DEVELOPER</span></div></h1>
          <button id="open-portfolio-button" onClick={handleOpenPortfolio}>Open Portfolio</button>
          
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
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

export default App;
