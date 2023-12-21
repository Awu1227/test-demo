import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function createControls(camera, canvas, world) {
  const controls = new OrbitControls(camera, canvas)

  // damping and auto rotation require
  // the controls to be updated each frame

  // this.controls.autoRotate = true;
  controls.enableDamping = true

  controls.tick = () => {
    const intersect = world.intersect
    if (intersect) {
      controls.enableRotate = false
    } else {
      controls.enableRotate = true
    }
    controls.update()
  }

  return controls
}

export { createControls }
