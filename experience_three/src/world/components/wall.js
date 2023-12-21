import * as THREE from 'three'
// import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg'
import createWallMaterial from './material/wallMaterial'

export const createWall = () => {
  const wall_geometry = new THREE.BoxGeometry(10, 280, 500)

  // csg
  // const brush_wall = new Brush(wall_geometry)
  // brush_wall.updateMatrixWorld()

  const window_geometry = new THREE.BoxGeometry(120, 110, 96)

  // const brush_window = new Brush(window_geometry)
  // brush_window.position.y = -10
  // brush_window.updateMatrixWorld()

  // const evaluator = new Evaluator()
  const wall_geometry2 = new THREE.BoxGeometry(10, 280, 490)
  const wall1 = new THREE.Mesh(wall_geometry2, createWallMaterial())

  wall1.position.set(0, 140, -250)
  wall1.rotation.set(0, Math.PI / 2, 0)

  const wall2 = new THREE.Mesh(wall_geometry, wall1.material.clone())
  wall2.position.set(250, 140, 0)

  const wall3 = new THREE.Mesh(wall_geometry, wall1.material.clone())
  wall3.position.set(-250, 140, 0)

  return [wall1, wall2, wall3]
}
