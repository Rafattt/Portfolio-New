export const getWebGLContext = (canvas: HTMLCanvasElement) => {
  const params = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false //performance testing, true may be needed
  };

  // Try WebGL2 first
  let gl = canvas.getContext('webgl2', params);
  if (!gl) {
    // Fallback to WebGL1
    gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
  }

  if (!gl) {
    throw new Error('WebGL not supported');
  }

  // Initialize extensions
  const support_linear_float = gl.getExtension('OES_texture_half_float_linear');
  const ext = {
    textureFloat: gl.getExtension('OES_texture_float'),
    textureHalfFloat: gl.getExtension('OES_texture_half_float')
  };

  return { gl, ext, support_linear_float };
};
