import { Color, Scene } from 'three'

export const createScene = () => {
  const scene = new Scene()
  scene.background = new Color('black')

  return scene
}
