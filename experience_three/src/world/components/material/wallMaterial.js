import * as THREE from 'three'
export default function createWallMaterial() {
  const material = new THREE.MeshBasicMaterial({
    color: '#ddd',
    roughness: 1,
    metalness: 0
  })

  return material
}
