export const createTransitionController = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  duration = 1200,
  onComplete: () => void = () => {}
) => {
  let startTime: number | null = null;
  const uThresholdLocation = gl.getUniformLocation(program, 'uThreshold');
  if (!uThresholdLocation) {
    console.warn("uThreshold uniform not found.");
    return;
  }

  const startThreshold = 1.0;
  const targetThreshold = -0.2;

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;
    const currentValue =
      startThreshold + (targetThreshold - startThreshold) * Math.min(progress, 1.0);

    gl.useProgram(program);
    gl.uniform1f(uThresholdLocation, currentValue);

    if (progress < 1.0) {
      requestAnimationFrame(animate);
    } else {
      onComplete();
    }
  };

  requestAnimationFrame(animate);
};
