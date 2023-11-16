import { DirectionalLight } from 'three'

export const createDirectionalLight = () => {
  const light = new DirectionalLight(0xffee88, 5)
  light.position.set(10, 10, 10)
  return light
}
