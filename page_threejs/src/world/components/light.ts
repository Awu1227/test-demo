import { DirectionalLight } from 'three';

export const createLight = () => { 
  const light = new DirectionalLight('white', 8) as any;
  light.position.set(10, 10, 10);
  return light as DirectionalLight;
}