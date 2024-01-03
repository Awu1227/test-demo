import * as THREE from 'three'

export const createCylinder = (params = [0.01, 0.01, 0.1, 64], normal = new THREE.Vector3(0, 1, 0)) => {
  let config = Array.isArray(params) ? params : [params.radiusTop, params.radiusBottom, params.height, params.radialSegments]
  const geometry = new THREE.CylinderGeometry(...config)
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const cylinder = new THREE.Mesh(geometry, material)
  switch (normal.x) {
    case 1:
      cylinder.rotation.z = Math.PI / 2
      break
    case -1:
      cylinder.rotation.z = -Math.PI / 2
      break
  }
  switch (Math.abs(normal.z - 1) < 0.5 ? 1 : Math.abs(normal.z + 1 < 0.5) ? -1 : 0) {
    case 1:
      cylinder.rotation.x = Math.PI / 2
      break
    case -1:
      cylinder.rotation.x = -Math.PI / 2
      break
    default:
      break
  }

  cylinder.name = 'cylinder'
  const edges = new THREE.EdgesGeometry(geometry, 20)
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 'grey' }))
  cylinder.userData.line = line
  return { cylinder, line }
}
