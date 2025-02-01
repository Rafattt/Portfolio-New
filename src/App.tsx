import { useState, useEffect, useRef } from 'react';
import './App.css';
import './styles.scss';
import { initWebGL } from './utils/WebglUtils';
import background from './assets/img/bg.jpg';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import MyWork from './pages/MyWork';
import Header from './components/Header';
import Layout from './components/Layout';


function Home() {
  const [count, setCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();  

  useEffect(() => {
    if (!canvasRef.current) return;

    setTimeout(() => {
      const subtitle : HTMLElement = document.querySelector('.subtitle');
      subtitle.classList.add('active');
    }, 100);
    setTimeout(() => {
      const homeButton : HTMLElement = document.getElementById('open-portfolio-button');
      homeButton.classList.add('active');
    }, 500);
      
    

    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const { gl, ext, support_linear_float } = getWebGLContext(canvas);


    initWebGL(canvas, gl, ext, support_linear_float);


    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

  function getWebGLContext(canvas: HTMLCanvasElement) {
    const params = {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false
    };
    let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext;
    if (!gl) {
      gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params) as WebGLRenderingContext;
    }
    const support_linear_float = gl.getExtension('OES_texture_half_float_linear');
    return { gl, ext: {}, support_linear_float };
  }
  
  const handleOpenPortfolio = () => {
    navigate('/my-work');
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
