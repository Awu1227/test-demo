import { DirectionalLight } from 'three'

export const createLight = () => {
  const light = new DirectionalLight(0xffee88, 0.2)
  light.position.set(10, 10, 10)
  return light
}
