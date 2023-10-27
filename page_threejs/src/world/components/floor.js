import * as THREE from 'three'

export const createFloor = () => {
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.2, transparent: true } )

  // 单位为米
  const planeGeometry = new THREE.PlaneGeometry(500, 500)
  planeGeometry.rotateX(-Math.PI / 2)

  // create a Mesh containing the geometry and material
  const plane = new THREE.Mesh(planeGeometry, material)
  plane.receiveShadow = true
  plane.name = '平面'
  // plane.position.y = - 200;
  // plane.receiveShadow = true;

  return plane
}
