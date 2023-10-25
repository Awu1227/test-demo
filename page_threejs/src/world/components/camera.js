import { PerspectiveCamera } from 'three'

export const createCamera = () => {
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect radio (dummy value)
    0.1, // near clipping plane
    1000 // far clipping plane
  )
  camera.position.set(0, 50, 300)
  return camera
}
