import { DirectionalLight } from 'three'

export const createDirectionalLight = () => {
  const light = new DirectionalLight(0xffee88, 50)
  light.position.set(200, 200, 200)
  return light
}
