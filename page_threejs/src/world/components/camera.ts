import { PerspectiveCamera } from "three";

export const createCamera = () => {
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect radio (dummy value)
    0.1, // near clipping plane
    100 // far clipping plane
  ) as any;
  camera.position.set(0, 0, 10);
  return camera as PerspectiveCamera;
};
