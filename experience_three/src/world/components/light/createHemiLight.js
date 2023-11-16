import { HemisphereLight } from 'three'

export const createHemiLight = () => {
  const hemiLight = new HemisphereLight(0xffffff, 0x0f0e0d, 10)
  return hemiLight
}
