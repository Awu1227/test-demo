import { WebGLRenderer } from "three";

export const createRenderer = () => {
  const renderer = new WebGLRenderer({ antialias: true });

  // 打开物理上正确的照明
  renderer.physicallyCorrectLights = true;

  return renderer;
};
