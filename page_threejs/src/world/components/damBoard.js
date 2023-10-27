import * as THREE from 'three'

/**@description 创建挡板 */
export default function createDamBoard()  {

  const geometry = new THREE.BoxGeometry(10, 10, 10)

  // create a default (white) Basic material
  const material = new THREE.MeshStandardMaterial({ color: 'purple' })

  // create a Mesh containing the geometry and material
  const cube = new THREE.Mesh(geometry, material)
  cube.name = 'damBoard'
  cube.position.set(0, 5, 0)
  const radiansPerSecond = THREE.MathUtils.degToRad(30)

  cube.tick = (delta) => {
    cube.rotation.z += radiansPerSecond * delta
    cube.rotation.x += radiansPerSecond * delta
    cube.rotation.y += radiansPerSecond * delta
  }


  return cube
}
