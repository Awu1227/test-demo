import * as THREE from 'three'

export const createCube = (pts) => {
  // this method will be called once per frame

  const geometry = new THREE.BufferGeometry()
  // 因为在两个三角面片里，这两个顶点都需要被用到。
  let vertices
  if (pts) {
    vertices = new Float32Array(pts)
  } else {
    vertices = new Float32Array([
      -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

      1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0
    ])
  }

  // itemSize = 3 因为每个顶点都是一个三元组。
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  const cube = new THREE.Mesh(geometry, material)
  cube.name = 'expandMesh'
  return cube
}
