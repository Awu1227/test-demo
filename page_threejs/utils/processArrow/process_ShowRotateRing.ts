import * as THREE from 'three'
import { ESelectArrow } from '../transformer3D/type'
import Transformer3D from '../transformer3D'

export function process_ShowRotateRing(tfs: Transformer3D) {
  tfs.rotateRingCenter = new THREE.Object3D()
  // TODO 大小
  let Dis = 320
  // if (Dis < 230) Dis = 230;

  let Width = 70
  switch (tfs.m_iSelected) {
    case ESelectArrow.RINGX:
      showRotateRingX(tfs, Dis, Width)
      break
    case ESelectArrow.RINGY:
      showRotateRingY(tfs, Dis, Width)
      break
    case ESelectArrow.RINGZ:
      showRotateRingZ(tfs, Dis, Width)
      break
  }

  tfs.controller_3d!.add(tfs.rotateRingCenter!)
  /**@apiDescription 旋转圆环显示*/
  function showRotateRingX(tfs: Transformer3D, Dis: number, Width: number) {
    if (tfs.m_iSelected != 4) return
    let vertices = new Array()
    tfs.rotateRingX = new THREE.Object3D()

    let innerRadius = Dis
    let outerRadius = Dis + Width

    // 圆环
    let ringBelowGeo = new THREE.RingGeometry(innerRadius, outerRadius, 60, 8, 0, Math.PI * 2)
    tfs.rotateRingBelowX = new THREE.Mesh(
      ringBelowGeo,
      new THREE.MeshBasicMaterial({
        color: 0xfde9c6,
        // color: 0x000000,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false
      })
    )

    //白色线段
    let ringLinesGeo = new THREE.BufferGeometry()
    vertices = new Array()
    for (var i = 0; i < Math.PI * 2; i += Math.PI / 4) {
      vertices.push(innerRadius * Math.cos(i), innerRadius * Math.sin(i), 0.2, outerRadius * Math.cos(i), outerRadius * Math.sin(i), 0.2)
    }
    ringLinesGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    tfs.rotateRingLinesX = new THREE.LineSegments(
      ringLinesGeo,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1,
        depthTest: false,
        depthWrite: false
      })
    )
    ;(tfs.rotateRingLinesX as THREE.LineSegments).position.x = 0.1
    ;(tfs.rotateRingX as THREE.Object3D).add(tfs.rotateRingBelowX, tfs.rotateRingLinesX)
    ;(tfs.rotateRingX as THREE.Object3D).position.x = 1
    ;(tfs.rotateRingX as THREE.Object3D).rotation.y = -Math.PI / 2
    ;(tfs.rotateRingCenter as THREE.Object3D).add(tfs.rotateRingX as THREE.Object3D)
  }

  /**@apiDescription 旋转圆环显示*/
  function showRotateRingY(tfs: Transformer3D, Dis: number, Width: number) {
    if (tfs.m_iSelected != 5) return
    let vertices = new Array()
    tfs.rotateRingY = new THREE.Object3D()

    let innerRadius = Dis
    let outerRadius = Dis + Width

    // 圆环
    let ringBelowGeo = new THREE.RingGeometry(innerRadius, outerRadius, 60, 8, 0, Math.PI * 2)
    tfs.rotateRingBelowY = new THREE.Mesh(
      ringBelowGeo,
      new THREE.MeshBasicMaterial({
        color: 0xace6a7,
        // color: 0x000000,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false
      })
    )

    //白色线段
    let ringLinesGeo = new THREE.BufferGeometry()
    vertices = new Array()
    for (var i = 0; i < Math.PI * 2; i += Math.PI / 4) {
      vertices.push(innerRadius * Math.cos(i), innerRadius * Math.sin(i), 0.2, outerRadius * Math.cos(i), outerRadius * Math.sin(i), 0.2)
    }
    ringLinesGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    tfs.rotateRingLinesY = new THREE.LineSegments(
      ringLinesGeo,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1,
        depthTest: false,
        depthWrite: false
      })
    )
    ;(tfs.rotateRingLinesY as THREE.LineSegments).position.y = 0.1
    ;(tfs.rotateRingY as THREE.Object3D).add(tfs.rotateRingBelowY, tfs.rotateRingLinesY)
    ;(tfs.rotateRingY as THREE.Object3D).position.y = 1
    ;(tfs.rotateRingY as THREE.Object3D).rotation.x = Math.PI / 2

    // 添加入场景
    ;(tfs.rotateRingCenter as THREE.Object3D).add(tfs.rotateRingY as THREE.Object3D)
  }

  /**@apiDescription 旋转圆环显示 */
  function showRotateRingZ(tfs: Transformer3D, Dis: number, Width: number) {
    if (tfs.m_iSelected != 6) return
    let vertices = new Array()
    tfs.rotateRingZ = new THREE.Object3D()

    let innerRadius = Dis
    let outerRadius = Dis + Width

    // 圆环
    let ringBelowGeo = new THREE.RingGeometry(innerRadius, outerRadius, 60, 8, 0, Math.PI * 2)
    tfs.rotateRingBelowZ = new THREE.Mesh(
      ringBelowGeo,
      new THREE.MeshBasicMaterial({
        color: 0xc8ccff,
        // color: 0x000000,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false
      })
    )

    //白色线段
    let ringLinesGeo = new THREE.BufferGeometry()
    vertices = new Array()
    for (var i = 0; i < Math.PI * 2; i += Math.PI / 4) {
      vertices.push(innerRadius * Math.cos(i), innerRadius * Math.sin(i), 0.2, outerRadius * Math.cos(i), outerRadius * Math.sin(i), 0.2)
    }
    ringLinesGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    tfs.rotateRingLinesZ = new THREE.LineSegments(
      ringLinesGeo,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1,
        depthTest: false,
        depthWrite: false
      })
    )
    ;(tfs.rotateRingLinesZ as THREE.LineSegments).position.z = 0.1
    ;(tfs.rotateRingZ as THREE.Object3D).add(tfs.rotateRingBelowZ, tfs.rotateRingLinesZ)
    ;(tfs.rotateRingZ as THREE.Object3D).position.z = 1

    // 添加入场景
    ;(tfs.rotateRingCenter as THREE.Object3D).add(tfs.rotateRingZ as THREE.Object3D)
  }
}
