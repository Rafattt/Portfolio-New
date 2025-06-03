export const getWebGLContext = (canvas: HTMLCanvasElement) => {
  const params = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false
  };

  const possibleGl =
    canvas.getContext('webgl2', params) ||
    canvas.getContext('webgl', params) ||
    canvas.getContext('experimental-webgl', params);

  if (!possibleGl || typeof (possibleGl as WebGLRenderingContext).getExtension !== 'function') {
    throw new Error('WebGL not supported');
  }

  const gl = possibleGl as WebGLRenderingContext | WebGL2RenderingContext;

  const support_linear_float = gl.getExtension('OES_texture_half_float_linear');
  const ext = {
    textureFloat: gl.getExtension('OES_texture_float'),
    textureHalfFloat: gl.getExtension('OES_texture_half_float')
  };

  return { gl, ext, support_linear_float };
};
