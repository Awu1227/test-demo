import * as THREE from 'three'
export default function createWallMaterial() {
  const material = new THREE.MeshPhysicalMaterial({
    color: '#a8dcbd',
    roughness: 1,
    metalness: 0
  })

  return material
}
