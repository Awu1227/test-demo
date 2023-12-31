import * as THREE from 'three'
import createFloorMaterial from './material/floorMaterial'
import createWallMaterial from './material/wallMaterial'

export const createFloor = () => {
  const material = createWallMaterial()

  // 单位为米
  const planeGeometry = new THREE.BoxGeometry(500, 500, 0.1)
  planeGeometry.rotateX(-Math.PI / 2)

  // create a Mesh containing the geometry and material
  const plane = new THREE.Mesh(planeGeometry, material)
  plane.position.set(0, -1, 0)
  plane.receiveShadow = true
  plane.name = '平面'
  // plane.position.y = - 200;
  // plane.receiveShadow = true;

  return plane
}
