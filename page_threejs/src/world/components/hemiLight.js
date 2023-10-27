import { HemisphereLight } from 'three'

export const createHemiLight = () => {
  const hemiLight = new HemisphereLight(0xddeeff, 0x0f0e0d, 4)
  return hemiLight
}
