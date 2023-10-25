import * as THREE from 'three'

export const createFloor = () => {
  const floorMat = new THREE.MeshStandardMaterial({
    roughness: 0.8,
    color: 0xffffff,
    metalness: 0.2,
    bumpScale: 0.0005
  })
  const textureLoader = new THREE.TextureLoader()
  textureLoader.load('../textures/hardwood2_diffuse.jpg', function (map) {
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    map.anisotropy = 4
    map.repeat.set(10, 24)
    map.encoding = THREE.sRGBEncoding
    floorMat.map = map
    floorMat.needsUpdate = true
  })
  textureLoader.load('../textures/hardwood2_bump.jpg', function (map) {
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    map.anisotropy = 4
    map.repeat.set(10, 24)
    floorMat.bumpMap = map
    floorMat.needsUpdate = true
  })
  textureLoader.load('../textures/hardwood2_roughness.jpg', function (map) {
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    map.anisotropy = 4
    map.repeat.set(10, 24)
    floorMat.roughnessMap = map
    floorMat.needsUpdate = true
  })

  // 单位为米
  const planeGeometry = new THREE.PlaneGeometry(500, 500)
  planeGeometry.rotateX(-Math.PI / 2)

  // create a Mesh containing the geometry and material
  const plane = new THREE.Mesh(planeGeometry, floorMat)
  plane.receiveShadow = true
  plane.name = '平面'
  // plane.position.y = - 200;
  // plane.receiveShadow = true;

  return plane
}
