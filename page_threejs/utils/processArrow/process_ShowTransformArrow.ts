import * as THREE from 'three'
import { ESelectArrow } from '../transformer3D/type'
import Transformer3D from '../transformer3D'

/**@apiDescription 平移箭头显示 */
export function process_ShowTransformArrow(tfs: Transformer3D) {
  let vertices = new Array()
  tfs.transform = new THREE.Object3D()

  // TODO 大小
  let arrowWidth = 50
  let arrowHeight = 150

  let arrowOpacity = 0.7

  //箭头顶端三角形的大小比例
  let arrowTriangleWidth = 1.9
  let arrowTriangleLength = 1.5

  let arrowDis = 300
  // if (arrowDis < 200) arrowDis = 200;
  let arrowDisX = arrowDis
  let arrowDisY = arrowDis
  let arrowDisZ = arrowDis
  // let arrowDisX = 500;
  // let arrowDisY = 500;
  // let arrowDisZ = 500;

  let arrowDepthWrite = false
  let arrowDepthTest = false

  // X 箭头
  let arrowXGeo = new THREE.BufferGeometry()
  vertices = new Array()
  vertices.push(
    (arrowDisX * 3) / 4,
    0,
    arrowWidth / 2,
    (arrowDisX * 3) / 4,
    0,
    -arrowWidth / 2,
    (arrowDisX * 3) / 4 + arrowHeight,
    0,
    -arrowWidth / 2,

    (arrowDisX * 3) / 4,
    0,
    arrowWidth / 2,
    (arrowDisX * 3) / 4 + arrowHeight,
    0,
    arrowWidth / 2,
    (arrowDisX * 3) / 4 + arrowHeight,
    0,
    -arrowWidth / 2,

    (arrowDisX * 3) / 4 + arrowHeight,
    0,
    (arrowWidth / 2) * arrowTriangleWidth,
    (arrowDisX * 3) / 4 + arrowHeight,
    0,
    (-arrowWidth / 2) * arrowTriangleWidth,
    (arrowDisX * 3) / 4 + arrowHeight * arrowTriangleLength,
    0,
    0
  )
  arrowXGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  tfs.transformArrowX = new THREE.Mesh(
    arrowXGeo,
    new THREE.MeshBasicMaterial({
      color: 0xf8ab04,
      transparent: true,
      opacity: arrowOpacity,
      side: THREE.DoubleSide,
      depthWrite: arrowDepthWrite,
      depthTest: arrowDepthTest
    })
  )
  tfs.transformArrowX.userData = {
    prevColor: 0xf8ab04
  }
  tfs.transformArrowX.name = ESelectArrow.ARROWX.toString()
  // X 箭头辅助平面
  let arrowXHelpGeo = new THREE.BufferGeometry()
  vertices = new Array()
  vertices.push(
    999,
    0,
    999,
    -999,
    0,
    999,
    999,
    0,
    -999,

    -999,
    0,
    -999,
    -999,
    0,
    999,
    999,
    0,
    -999
  )
  arrowXHelpGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  tfs.transformArrowXHelp = new THREE.Mesh(
    arrowXHelpGeo,
    new THREE.MeshBasicMaterial({
      color: 'red',
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  )

  // Y 箭头
  let arrowYGeo = new THREE.BufferGeometry()
  vertices = new Array()
  vertices.push(
    0,
    (arrowDisY * 3) / 4,
    arrowWidth / 2,
    0,
    (arrowDisY * 3) / 4,
    -arrowWidth / 2,
    0,
    (arrowDisY * 3) / 4 + arrowHeight,
    -arrowWidth / 2,

    0,
    (arrowDisY * 3) / 4,
    arrowWidth / 2,
    0,
    (arrowDisY * 3) / 4 + arrowHeight,
    arrowWidth / 2,
    0,
    (arrowDisY * 3) / 4 + arrowHeight,
    -arrowWidth / 2,

    0,
    (arrowDisY * 3) / 4 + arrowHeight,
    (arrowWidth / 2) * arrowTriangleWidth,
    0,
    (arrowDisY * 3) / 4 + arrowHeight,
    (-arrowWidth / 2) * arrowTriangleWidth,
    0,
    (arrowDisY * 3) / 4 + arrowHeight * arrowTriangleLength,
    0
  )
  arrowYGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  tfs.transformArrowY = new THREE.Mesh(
    arrowYGeo,
    new THREE.MeshBasicMaterial({
      color: 0x48d9a7,
      transparent: true,
      opacity: arrowOpacity,
      side: THREE.DoubleSide,
      depthWrite: arrowDepthWrite,
      depthTest: arrowDepthTest
    })
  )
  tfs.transformArrowY.userData = {
    prevColor: 0x48d9a7
  }
  tfs.transformArrowY.name = ESelectArrow.ARROWY.toString()
  // Y 箭头辅助平面
  let arrowYHelpGeo = new THREE.BufferGeometry()
  vertices = new Array()
  vertices.push(
    0,
    999999,
    999999,
    0,
    -999999,
    999999,
    0,
    999999,
    -999999,

    0,
    -999999,
    -999999,
    0,
    -999999,
    999999,
    0,
    999999,
    -999999
  )
  arrowYHelpGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  tfs.transformArrowYHelp = new THREE.Mesh(
    arrowYHelpGeo,
    new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  )

  // Z 箭头
  let arrowZGeo = new THREE.BufferGeometry()
  vertices = new Array()
  vertices.push(
    0,
    arrowWidth / 2,
    (arrowDisZ * 3) / 4,
    0,
    -arrowWidth / 2,
    (arrowDisZ * 3) / 4,
    0,
    -arrowWidth / 2,
    (arrowDisZ * 3) / 4 + arrowHeight,

    0,
    arrowWidth / 2,
    (arrowDisZ * 3) / 4,
    0,
    arrowWidth / 2,
    (arrowDisZ * 3) / 4 + arrowHeight,
    0,
    -arrowWidth / 2,
    (arrowDisZ * 3) / 4 + arrowHeight,

    0,
    (arrowWidth / 2) * arrowTriangleWidth,
    (arrowDisZ * 3) / 4 + arrowHeight,
    0,
    (-arrowWidth / 2) * arrowTriangleWidth,
    (arrowDisZ * 3) / 4 + arrowHeight,
    0,
    0,
    (arrowDisZ * 3) / 4 + arrowHeight * arrowTriangleLength
  )
  arrowZGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  tfs.transformArrowZ = new THREE.Mesh(
    arrowZGeo,
    new THREE.MeshBasicMaterial({
      color: 0x1890ff,
      transparent: true,
      opacity: arrowOpacity,
      side: THREE.DoubleSide,
      depthWrite: arrowDepthWrite,
      depthTest: arrowDepthTest
    })
  )
  tfs.transformArrowZ.userData = {
    prevColor: 0x1890ff
  }
  tfs.transformArrowZ.name = ESelectArrow.ARROWZ.toString()
  // Z 箭头辅助平面
  let arrowZHelpGeo = new THREE.BufferGeometry()
  vertices = new Array()
  vertices.push(
    0,
    999999,
    999999,
    0,
    -999999,
    999999,
    0,
    999999,
    -999999,

    0,
    -999999,
    -999999,
    0,
    -999999,
    999999,
    0,
    999999,
    -999999
  )
  arrowZHelpGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  tfs.transformArrowZHelp = new THREE.Mesh(
    arrowZHelpGeo,
    new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  )
  ;(tfs.transform as THREE.Object3D).position.y = 1.3
  ;(tfs.transform as THREE.Object3D).add(tfs.transformArrowX, tfs.transformArrowY, tfs.transformArrowZ)
  ;(tfs.transform as THREE.Object3D).add(tfs.transformArrowXHelp, tfs.transformArrowYHelp, tfs.transformArrowZHelp)
  // 添加入场景
  ;(tfs.controller_3d as THREE.Object3D).add(tfs.transform as THREE.Object3D)
}
