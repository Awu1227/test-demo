import * as THREE from 'three'
import Transformer3D from '..'

export function process_ShowRotateHelp(tfs: Transformer3D) {
  let rotateArrowHelpGeo = new THREE.BufferGeometry()
  let vertices = new Array()
  switch (tfs.m_iSelected) {
    case 4: {
      vertices.push(
        0,
        -99999,
        -99999,
        0,
        -99999,
        99999,
        0,
        99999,
        -99999,

        0,
        99999,
        99999,
        0,
        -99999,
        99999,
        0,
        99999,
        -99999
      )
      break
    }
    case 5: {
      vertices.push(
        -99999,
        0,
        -99999,
        -99999,
        0,
        99999,
        99999,
        0,
        -99999,

        99999,
        0,
        99999,
        -99999,
        0,
        99999,
        99999,
        0,
        -99999
      )
      break
    }
    case 6: {
      vertices.push(
        -99999,
        -99999,
        0,
        -99999,
        99999,
        0,
        99999,
        -99999,
        0,

        99999,
        99999,
        0,
        -99999,
        99999,
        0,
        99999,
        -99999,
        0
      )
      break
    }
  }
  rotateArrowHelpGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  tfs.rotateArrowHelp = new THREE.Mesh(
    rotateArrowHelpGeo,
    new THREE.MeshBasicMaterial({
      transparent: true,
      color: 0xff0000,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  )
  ;(tfs.rotateArrowCenter as THREE.Object3D).add(tfs.rotateArrowHelp as THREE.Mesh)
}
