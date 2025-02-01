import { useState, useEffect, useRef } from 'react';
import './App.css';
import './styles.scss';
import { initWebGL } from './utils/webglUtils';
import background from './assets/img/bg.jpg';


function App() {
  const [count, setCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    VANTA.FOG({
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
    })

 
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

    // Initialize your WebGL or rendering code here
    initWebGL(canvas, gl, ext, support_linear_float);

    // Set up any event listeners if necessary
    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      // Resize related WebGL calls
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
  


  return (
    <>
      {/* <div className="bg-img">
        <img src={background} />
      </div> */}
      {/* <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div> */}
      <div className="home-content">
      <canvas ref={canvasRef}></canvas>
        <div className="home-content-inner" id="home-content">
          <h1  className="home-title"><span>RAFAL KMIECIK</span><div className="subtitle-height"><span className="subtitle">FRONTEND DEVELOPER</span></div></h1>
          <button id="open-portfolio-button">Open Portfolio</button>
        </div>
      </div>
    </>
  );
}

export default App;
