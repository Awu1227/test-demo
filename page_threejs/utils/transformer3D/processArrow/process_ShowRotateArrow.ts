import * as THREE from 'three'
import { ESelectArrow } from '../type'
import Transformer3D from '..'

/**@apiDescription 旋转箭头显示 */
export function process_ShowRotateArrow(tfs: Transformer3D) {
  if (tfs.rotateArrowCenter) tfs.rotateArrowCenter.remove(tfs.rotateArrowX as THREE.Object3D, tfs.rotateArrowY as THREE.Object3D, tfs.rotateArrowZ as THREE.Object3D)
  if (tfs.rotateArrowX) tfs.rotateArrowX.remove(tfs.rotateArrowRingX as THREE.Mesh, tfs.rotateArrowLeftX as THREE.Mesh, tfs.rotateArrowRightX as THREE.Mesh)
  if (tfs.rotateArrowY) tfs.rotateArrowY.remove(tfs.rotateArrowRingY as THREE.Mesh, tfs.rotateArrowLeftY as THREE.Mesh, tfs.rotateArrowRightY as THREE.Mesh)
  if (tfs.rotateArrowZ) tfs.rotateArrowZ.remove(tfs.rotateArrowRingZ as THREE.Mesh, tfs.rotateArrowLeftZ as THREE.Mesh, tfs.rotateArrowRightZ as THREE.Mesh)
  tfs.rotateArrowCenter = new THREE.Object3D()

  let arrowDis = 320

  let rotateDis = arrowDis
  let rotateWidth = 60

  let RidianLeft = (25 * Math.PI) / 180
  let RidianRight = Math.PI / 2 - RidianLeft
  let RidianWidth = RidianRight - RidianLeft // 箭头中段弧形弧度
  let arrowWidth = (12.5 * Math.PI) / 180 // 箭头两侧三角弧度

  showRotateX(arrowDis, rotateDis, rotateWidth, RidianLeft, RidianRight, RidianWidth, arrowWidth)
  showRotateY(arrowDis, rotateDis, rotateWidth, RidianLeft, RidianRight, RidianWidth, arrowWidth)
  showRotateZ(arrowDis, rotateDis, rotateWidth, RidianLeft, RidianRight, RidianWidth, arrowWidth)
  ;(tfs.controller_3d as THREE.Object3D).add(tfs.rotateArrowCenter as THREE.Object3D)

  function showRotateX(arrowDis: number, rotateDis: number, rotateWidth: number, RidianLeft: number, RidianRight: number, RidianWidth: number, arrowWidth: number) {
    tfs.rotateArrowX = new THREE.Object3D()
    let vertices = new Array()
    tfs.rotateArrowX.name = ESelectArrow.RINGX.toString()
    tfs.rotateArrowX.userData = {
      prevColor: 0xffad28
    }
    if (tfs.m_iSelected != 4) {
      //未选中时
      //箭头中段
      let arrowRotateLineGeo = new THREE.RingGeometry(rotateDis, rotateDis + rotateWidth, 8, 1, RidianLeft, RidianWidth)
      ;(tfs.rotateArrowRingX as THREE.Mesh) = new THREE.Mesh(
        arrowRotateLineGeo,
        new THREE.MeshBasicMaterial({
          color: 0xffad28,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false
        })
      )
      ;(tfs.rotateArrowRingX as THREE.Mesh).name = ESelectArrow.RINGX.toString()
      ;(tfs.rotateArrowX as THREE.Object3D).add(tfs.rotateArrowRingX as THREE.Mesh)

      //左箭头
      vertices = new Array()
      let arrowRotateLeftGeo = new THREE.BufferGeometry()
      vertices.push(
        (rotateDis - rotateWidth * 0.3) * Math.cos(RidianLeft),
        (rotateDis - rotateWidth * 0.3) * Math.sin(RidianLeft),
        0,
        (rotateDis + rotateWidth * 1.3) * Math.cos(RidianLeft),
        (rotateDis + rotateWidth * 1.3) * Math.sin(RidianLeft),
        0,
        (rotateDis + rotateWidth / 2.5) * Math.cos(RidianLeft - arrowWidth),
        (rotateDis + rotateWidth / 2.5) * Math.sin(RidianLeft - arrowWidth),
        0
      )
      arrowRotateLeftGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
      ;(tfs.rotateArrowLeftX as THREE.Mesh) = new THREE.Mesh(
        arrowRotateLeftGeo,
        new THREE.MeshBasicMaterial({
          color: 0xffad28,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false
        })
      )
      ;(tfs.rotateArrowLeftX as THREE.Mesh).name = ESelectArrow.RINGX.toString()
      ;(tfs.rotateArrowX as THREE.Object3D).add(tfs.rotateArrowLeftX as THREE.Mesh)

      //右箭头
      vertices = new Array()
      let arrowRotateRightGeo = new THREE.BufferGeometry()
      vertices.push(
        (rotateDis - rotateWidth * 0.3) * Math.cos(RidianRight),
        (rotateDis - rotateWidth * 0.3) * Math.sin(RidianRight),
        0,
        (rotateDis + rotateWidth * 1.3) * Math.cos(RidianRight),
        (rotateDis + rotateWidth * 1.3) * Math.sin(RidianRight),
        0,
        (rotateDis + rotateWidth / 2.5) * Math.cos(RidianRight + arrowWidth),
        (rotateDis + rotateWidth / 2.5) * Math.sin(RidianRight + arrowWidth),
        0
      )
      arrowRotateRightGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
      ;(tfs.rotateArrowRightX as THREE.Mesh) = new THREE.Mesh(
        arrowRotateRightGeo,
        new THREE.MeshBasicMaterial({
          color: 0xffad28,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false
        })
      )
      ;(tfs.rotateArrowRightX as THREE.Mesh).name = '4'
      ;(tfs.rotateArrowX as THREE.Object3D).add(tfs.rotateArrowRightX as THREE.Mesh)
      ;(tfs.rotateArrowX as THREE.Object3D).position.x = 2
      ;(tfs.rotateArrowX as THREE.Object3D).rotation.y = -Math.PI / 2
    } else {
      //选中时

      //旋转箭头圆环
      let arrowRotateLineGeo = new THREE.RingGeometry(rotateDis, rotateDis + rotateWidth, 8, 1, RidianLeft, RidianWidth)
      ;(tfs.rotateArrowRingX as THREE.Mesh) = new THREE.Mesh(
        arrowRotateLineGeo,
        new THREE.MeshBasicMaterial({
          color: 0xffad28,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false
        })
      )
      ;(tfs.rotateArrowRingX as THREE.Mesh).position.x = 1
      ;(tfs.rotateArrowRingX as THREE.Mesh).rotation.y = -Math.PI / 2
      ;(tfs.rotateArrowX as THREE.Object3D).add(tfs.rotateArrowRingX as THREE.Mesh)
    }
    tfs.rotateArrowCenter!.add(tfs.rotateArrowX as THREE.Object3D)
  }

  function showRotateY(arrowDis: number, rotateDis: number, rotateWidth: number, RidianLeft: number, RidianRight: number, RidianWidth: number, arrowWidth: number) {
    tfs.rotateArrowY = new THREE.Object3D()
    tfs.rotateArrowY.name = ESelectArrow.RINGY.toString()
    tfs.rotateArrowY.userData = {
      prevColor: 0x48d9a7
    }
    let vertices = new Array()

    if (tfs.m_iSelected != 5) {
      //未选中时
      //箭头中段
      let arrowRotateLineGeo = new THREE.RingGeometry(rotateDis, rotateDis + rotateWidth, 8, 1, RidianLeft, RidianWidth)
      ;(tfs.rotateArrowRingY as THREE.Mesh) = new THREE.Mesh(
        arrowRotateLineGeo,
        new THREE.MeshBasicMaterial({
          color: 0x48d9a7,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false
        })
      )
      ;(tfs.rotateArrowRingY as THREE.Mesh).rotation.x = Math.PI / 2
      ;(tfs.rotateArrowRingY as THREE.Mesh).name = ESelectArrow.RINGY.toString()
      ;(tfs.rotateArrowY as THREE.Object3D).add(tfs.rotateArrowRingY as THREE.Mesh)

      //左箭头
      vertices = new Array()
      let arrowRotateLeftGeo = new THREE.BufferGeometry()
      vertices.push(
        (rotateDis - rotateWidth * 0.3) * Math.cos(RidianLeft),
        0,
        (rotateDis - rotateWidth * 0.3) * Math.sin(RidianLeft),
        (rotateDis + rotateWidth * 1.3) * Math.cos(RidianLeft),
        0,
        (rotateDis + rotateWidth * 1.3) * Math.sin(RidianLeft),
        (rotateDis + rotateWidth / 2.5) * Math.cos(RidianLeft - arrowWidth),
        0,
        (rotateDis + rotateWidth / 2.5) * Math.sin(RidianLeft - arrowWidth)
      )
      arrowRotateLeftGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
      ;(tfs.rotateArrowLeftY as THREE.Mesh) = new THREE.Mesh(
        arrowRotateLeftGeo,
        new THREE.MeshBasicMaterial({
          color: 0x48d9a7,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false
        })
      )
      ;(tfs.rotateArrowLeftY as THREE.Mesh).name = ESelectArrow.RINGY.toString()
      ;(tfs.rotateArrowY as THREE.Object3D).add(tfs.rotateArrowLeftY as THREE.Mesh)

      //右箭头
      vertices = new Array()
      let arrowRotateRightGeo = new THREE.BufferGeometry()
      vertices.push(
        (rotateDis - rotateWidth * 0.3) * Math.cos(RidianRight),
        0,
        (rotateDis - rotateWidth * 0.3) * Math.sin(RidianRight),
        (rotateDis + rotateWidth * 1.3) * Math.cos(RidianRight),
        0,
        (rotateDis + rotateWidth * 1.3) * Math.sin(RidianRight),
        (rotateDis + rotateWidth / 2.5) * Math.cos(RidianRight + arrowWidth),
        0,
        (rotateDis + rotateWidth / 2.5) * Math.sin(RidianRight + arrowWidth)
      )
      arrowRotateRightGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
      ;(tfs.rotateArrowRightY as THREE.Mesh) = new THREE.Mesh(
        arrowRotateRightGeo,
        new THREE.MeshBasicMaterial({
          color: 0x48d9a7,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false
        })
      )
      ;(tfs.rotateArrowRightY as THREE.Mesh).name = ESelectArrow.RINGY.toString()
      ;(tfs.rotateArrowY as THREE.Object3D).add(tfs.rotateArrowRightY as THREE.Mesh)
      ;(tfs.rotateArrowY as THREE.Object3D).position.y = 2
    } else {
      //选中时

      //旋转箭头圆环
      let arrowRotateLineGeo = new THREE.RingGeometry(rotateDis, rotateDis + rotateWidth, 8, 1, RidianLeft, RidianWidth)
      ;(tfs.rotateArrowRingY as THREE.Mesh) = new THREE.Mesh(
        arrowRotateLineGeo,
        new THREE.MeshBasicMaterial({
          color: 0x48d9a7,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false
        })
      )
      ;(tfs.rotateArrowRingY as THREE.Mesh).rotation.x = Math.PI / 2
      ;(tfs.rotateArrowRingY as THREE.Mesh).position.y = 1
      ;(tfs.rotateArrowY as THREE.Object3D).add(tfs.rotateArrowRingY as THREE.Mesh)
    }
    tfs.rotateArrowCenter!.add(tfs.rotateArrowY as THREE.Object3D)
  }

  function showRotateZ(arrowDis: number, rotateDis: number, rotateWidth: number, RidianLeft: number, RidianRight: number, RidianWidth: number, arrowWidth: number) {
    tfs.rotateArrowZ = new THREE.Object3D()
    tfs.rotateArrowZ.name = ESelectArrow.RINGZ.toString()
    tfs.rotateArrowZ.userData = {
      prevColor: 0x1890ff
    }
    let vertices = new Array()

    if (tfs.m_iSelected != 6) {
      //未选中时
      //箭头中段
      let arrowRotateLineGeo = new THREE.RingGeometry(rotateDis, rotateDis + rotateWidth, 8, 1, RidianLeft, RidianWidth)
      ;(tfs.rotateArrowRingZ as THREE.Mesh) = new THREE.Mesh(
        arrowRotateLineGeo,
        new THREE.MeshBasicMaterial({
          color: 0x1890ff,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false
        })
      )
      ;(tfs.rotateArrowRingZ as THREE.Mesh).name = ESelectArrow.RINGZ.toString()
      ;(tfs.rotateArrowZ as THREE.Object3D).add(tfs.rotateArrowRingZ as THREE.Mesh)

      //左箭头
      vertices = new Array()
      let arrowRotateLeftGeo = new THREE.BufferGeometry()
      vertices.push(
        (rotateDis - rotateWidth * 0.3) * Math.cos(RidianLeft),
        (rotateDis - rotateWidth * 0.3) * Math.sin(RidianLeft),
        0,
        (rotateDis + rotateWidth * 1.3) * Math.cos(RidianLeft),
        (rotateDis + rotateWidth * 1.3) * Math.sin(RidianLeft),
        0,
        (rotateDis + rotateWidth / 2.5) * Math.cos(RidianLeft - arrowWidth),
        (rotateDis + rotateWidth / 2.5) * Math.sin(RidianLeft - arrowWidth),
        0
      )
      arrowRotateLeftGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
      ;(tfs.rotateArrowLeftZ as THREE.Mesh) = new THREE.Mesh(
        arrowRotateLeftGeo,
        new THREE.MeshBasicMaterial({
          color: 0x1890ff,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false
        })
      )
      ;(tfs.rotateArrowLeftZ as THREE.Mesh).name = ESelectArrow.RINGZ.toString()
      ;(tfs.rotateArrowZ as THREE.Object3D).add(tfs.rotateArrowLeftZ as THREE.Mesh)

      //右箭头
      vertices = new Array()
      let arrowRotateRightGeo = new THREE.BufferGeometry()
      vertices.push(
        (rotateDis - rotateWidth * 0.3) * Math.cos(RidianRight),
        (rotateDis - rotateWidth * 0.3) * Math.sin(RidianRight),
        0,
        (rotateDis + rotateWidth * 1.3) * Math.cos(RidianRight),
        (rotateDis + rotateWidth * 1.3) * Math.sin(RidianRight),
        0,
        (rotateDis + rotateWidth / 2.5) * Math.cos(RidianRight + arrowWidth),
        (rotateDis + rotateWidth / 2.5) * Math.sin(RidianRight + arrowWidth),
        0
      )
      arrowRotateRightGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
      ;(tfs.rotateArrowRightZ as THREE.Mesh) = new THREE.Mesh(
        arrowRotateRightGeo,
        new THREE.MeshBasicMaterial({
          color: 0x1890ff,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false
        })
      )
      ;(tfs.rotateArrowRightZ as THREE.Mesh).name = ESelectArrow.RINGZ.toString()
      ;(tfs.rotateArrowZ as THREE.Object3D).add(tfs.rotateArrowRightZ as THREE.Mesh)
      ;(tfs.rotateArrowZ as THREE.Object3D).position.z = 2
    } else {
      //选中时

      //旋转箭头圆环
      let arrowRotateLineGeo = new THREE.RingGeometry(rotateDis, rotateDis + rotateWidth, 8, 1, RidianLeft, RidianWidth)
      ;(tfs.rotateArrowRingZ as THREE.Mesh) = new THREE.Mesh(
        arrowRotateLineGeo,
        new THREE.MeshBasicMaterial({
          color: 0x1890ff,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false
        })
      )
      ;(tfs.rotateArrowRingZ as THREE.Mesh).position.z = 1
      ;(tfs.rotateArrowZ as THREE.Object3D).add(tfs.rotateArrowRingZ as THREE.Mesh)
    }
    tfs.rotateArrowCenter!.add(tfs.rotateArrowZ as THREE.Object3D)
  }
}
