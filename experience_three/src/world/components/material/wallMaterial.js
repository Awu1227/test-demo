import * as THREE from 'three'
export default function createWallMaterial() {
  const material = new THREE.MeshPhysicalMaterial({
    color: '#c3cec7',
    roughness: 1,
    metalness: 0
  })

  return material
}
