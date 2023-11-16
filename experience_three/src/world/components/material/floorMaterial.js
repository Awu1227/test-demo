import * as THREE from 'three'
export default function createFloorMaterial() {
  const textureLoader = new THREE.TextureLoader()
  const mapTexture = textureLoader.load('/test-demo/textures/floor/floor_diff.jpg')
  mapTexture.wrapS = THREE.RepeatWrapping
  mapTexture.wrapT = THREE.RepeatWrapping
  mapTexture.repeat = new THREE.Vector2(4, 4)
  const material = new THREE.MeshBasicMaterial({
    map: mapTexture
  })

  return material
}
