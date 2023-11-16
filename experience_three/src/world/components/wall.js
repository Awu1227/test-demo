import * as THREE from 'three'
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg'

export const createWall = () => {
  const wall_geometry = new THREE.BoxGeometry(10, 280, 500)

  // csg
  const brush_wall = new Brush(wall_geometry)
  brush_wall.updateMatrixWorld()

  const window_geometry = new THREE.BoxGeometry(120, 110, 96)

  const brush_window = new Brush(window_geometry)
  brush_window.position.y = -10
  brush_window.updateMatrixWorld()

  const evaluator = new Evaluator()
  const wall = evaluator.evaluate(brush_wall, brush_window, SUBTRACTION)
  wall.material = new THREE.MeshNormalMaterial()

  wall.position.set(0, 140, -250)
  wall.rotation.set(0, Math.PI / 2, 0)
  return wall
}
