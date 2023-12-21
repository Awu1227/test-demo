import * as THREE from 'three'

export const createLine = () => {
  const lineGeometry = new THREE.BufferGeometry()
  const _points = [0, 0, 0, 10, 10, 10]
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(_points, 3))
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x000
  })
  const line = new THREE.Line(lineGeometry, lineMaterial)

  return line
}
