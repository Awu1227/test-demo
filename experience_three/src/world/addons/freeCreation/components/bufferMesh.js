import * as THREE from 'three'
import pitting from '/pitting.svg'

export const createBufferMesh = (pts) => {
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
  console.log('pitting', pitting)
  // itemSize = 3 因为每个顶点都是一个三元组。
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  const mat = new THREE.MeshBasicMaterial({
    color: 0x000,
    depthTest: false,
    transparent: true,
    opacity: 0.3
  })

  const mesh = new THREE.Mesh(geometry, mat)
  mesh.renderOrder = 40
  mesh.name = 'bufferMesh'
  return mesh
}
