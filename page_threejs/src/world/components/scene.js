import { Color, Scene } from 'three'

export const createScene = () => {
  const scene = new Scene()
  scene.background = new Color(0xbfd1e5 )

  return scene
}
