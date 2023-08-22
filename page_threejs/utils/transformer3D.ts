import * as THREE from 'three'

/**@description 传入的Staff */
interface IStaff {
  m_Object3D: THREE.Object3D
  setVisible()
  destory()
}

/**@description 选择的箭头 */
enum ESelectArrow {
  NONE = 0,
  ARROWX,
  ARROWY,
  ARROWZ,
  RINGX,
  RINGY,
  RINGZ
}

export default class Transformer3D {
  isShow = false
  isDragging = false
  camera!: THREE.PerspectiveCamera
  raycaster = new THREE.Raycaster()

  pointer = new THREE.Vector2()
  staff: IStaff
  // 空父对象
  controller_3d: THREE.Object3D | null = null

  /**@description 高亮的箭头 */
  highLightArrow?: any
  // 平移
  transform: THREE.Object3D | null = null
  // 平移箭头
  transformArrowX: THREE.Mesh | null = null
  transformArrowXHelp: THREE.Mesh | null = null
  transformArrowY: THREE.Mesh | null = null
  transformArrowYHelp: THREE.Mesh | null = null
  transformArrowZ: THREE.Mesh | null = null
  transformArrowZHelp: THREE.Mesh | null = null

  // 旋转
  rotateArrowCenter: THREE.Object3D | null = null
  // 辅助平面
  rotateArrowHelp: THREE.Mesh | null = null
  // 旋转箭头X
  rotateArrowX: THREE.Object3D | null = null
  rotateArrowRingX: THREE.Mesh | null = null
  rotateArrowLeftX: THREE.Mesh | null = null
  rotateArrowRightX: THREE.Mesh | null = null
  // 旋转箭头Y
  rotateArrowY: THREE.Object3D | null = null
  rotateArrowRingY: THREE.Mesh | null = null
  rotateArrowLeftY: THREE.Mesh | null = null
  rotateArrowRightY: THREE.Mesh | null = null
  // 旋转箭头Z
  rotateArrowZ: THREE.Object3D | null = null
  rotateArrowRingZ: THREE.Mesh | null = null
  rotateArrowLeftZ: THREE.Mesh | null = null
  rotateArrowRightZ: THREE.Mesh | null = null

  // 旋转圆环
  rotateRingCenter: THREE.Object3D | null = null
  // YZ平面
  rotateRingX: THREE.Object3D | null = null
  rotateRingBelowX: THREE.Mesh | null = null
  rotateRingLinesX: THREE.LineSegments | null = null
  // XZ平面
  rotateRingY: THREE.Object3D | null = null
  rotateRingBelowY: THREE.Mesh | null = null
  rotateRingLinesY: THREE.LineSegments | null = null
  // XY平面
  rotateRingZ: THREE.Object3D | null = null
  rotateRingBelowZ: THREE.Mesh | null = null
  rotateRingLinesZ: THREE.LineSegments | null = null

  // 存放所有的箭头
  arrowArray: any[] = []
  // 当前选择对象
  m_iSelected: number = -1 // 1:X 2:Y 3:Z  4:X 5:Y 6:Z
  selectArrow = ESelectArrow.NONE
  // 上一事件状态
  lastMouseX: number = -999999
  lastMouseY: number = -999999
  lastMouseZ: number = -999999
  lastRadian: number = 0

  radiusX = 0
  radiusY = 0
  radiusZ = 0

  constructor(staff: IStaff, camera: THREE.PerspectiveCamera) {
    this.staff = staff
    this.camera = camera
  }

  /**
   * @apiDescription 总显示
   */
  showController(obj: any) {
    if (obj == null) return
    if (obj.m_Locking == true) return
    this.controller_3d = new THREE.Object3D()
    this.showTransformArrow(obj)
    this.showRotateArrow(obj)

    this.addArrowToArr()

    // this.showRotateRing(obj);

    this.updateController(obj)
    this.isShow = true
  }
  addArrowToArr() {
    this.arrowArray.push(this.transformArrowX, this.transformArrowY, this.transformArrowZ, ...this.rotateArrowX?.children!, ...this.rotateArrowY?.children!, ...this.rotateArrowZ?.children!)
  }

  /**
   * @apiDescription 平移箭头显示
   */
  showTransformArrow(obj: any) {
    let vertices = new Array()
    this.transform = new THREE.Object3D()

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
    this.transformArrowX = new THREE.Mesh(
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
    this.transformArrowX.userData = {
      prevColor: 0xf8ab04
    }
    this.transformArrowX.name = ESelectArrow.ARROWX.toString()
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
    this.transformArrowXHelp = new THREE.Mesh(
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
    this.transformArrowY = new THREE.Mesh(
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
    this.transformArrowY.userData = {
      prevColor: 0x48d9a7
    }
    this.transformArrowY.name = ESelectArrow.ARROWY.toString()
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
    this.transformArrowYHelp = new THREE.Mesh(
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
    this.transformArrowZ = new THREE.Mesh(
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
    this.transformArrowZ.userData = {
      prevColor: 0x1890ff
    }
    this.transformArrowZ.name = ESelectArrow.ARROWZ.toString()
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
    this.transformArrowZHelp = new THREE.Mesh(
      arrowZHelpGeo,
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide
      })
    )
    ;(this.transform as THREE.Object3D).position.y = 1.3
    ;(this.transform as THREE.Object3D).add(this.transformArrowX, this.transformArrowY, this.transformArrowZ)
    ;(this.transform as THREE.Object3D).add(this.transformArrowXHelp, this.transformArrowYHelp, this.transformArrowZHelp)
    // 添加入场景
    ;(this.controller_3d as THREE.Object3D).add(this.transform as THREE.Object3D)
  }

  /**
   * @apiDescription 旋转箭头显示
   */
  showRotateArrow(obj: any) {
    if (this.rotateArrowCenter) this.rotateArrowCenter.remove(this.rotateArrowX as THREE.Object3D, this.rotateArrowY as THREE.Object3D, this.rotateArrowZ as THREE.Object3D)
    if (this.rotateArrowX) this.rotateArrowX.remove(this.rotateArrowRingX as THREE.Mesh, this.rotateArrowLeftX as THREE.Mesh, this.rotateArrowRightX as THREE.Mesh)
    if (this.rotateArrowY) this.rotateArrowY.remove(this.rotateArrowRingY as THREE.Mesh, this.rotateArrowLeftY as THREE.Mesh, this.rotateArrowRightY as THREE.Mesh)
    if (this.rotateArrowZ) this.rotateArrowZ.remove(this.rotateArrowRingZ as THREE.Mesh, this.rotateArrowLeftZ as THREE.Mesh, this.rotateArrowRightZ as THREE.Mesh)

    this.rotateArrowCenter = new THREE.Object3D()

    // let arrowDis = 500;
    // let arrowDis = Math.max(obj.m_fWidth, obj.m_fHeight, obj.m_fLength) * 0.13;
    // TODO 修改大小
    let arrowDis = 320
    // if (arrowDis < 230) arrowDis = 230;

    let rotateDis = arrowDis
    let rotateWidth = 60

    let RidianLeft = (25 * Math.PI) / 180
    let RidianRight = Math.PI / 2 - RidianLeft
    let RidianWidth = RidianRight - RidianLeft // 箭头中段弧形弧度
    let arrowWidth = (12.5 * Math.PI) / 180 // 箭头两侧三角弧度

    this.showRotateX(obj, arrowDis, rotateDis, rotateWidth, RidianLeft, RidianRight, RidianWidth, arrowWidth)
    this.showRotateY(obj, arrowDis, rotateDis, rotateWidth, RidianLeft, RidianRight, RidianWidth, arrowWidth)
    this.showRotateZ(obj, arrowDis, rotateDis, rotateWidth, RidianLeft, RidianRight, RidianWidth, arrowWidth)
    ;(this.controller_3d as THREE.Object3D).add(this.rotateArrowCenter as THREE.Object3D)
  }

  showRotateX(obj: any, arrowDis: number, rotateDis: number, rotateWidth: number, RidianLeft: number, RidianRight: number, RidianWidth: number, arrowWidth: number) {
    this.rotateArrowX = new THREE.Object3D()
    let vertices = new Array()
    this.rotateArrowX.name = ESelectArrow.RINGX.toString()
    this.rotateArrowX.userData = {
      prevColor: 0xffad28
    }
    if (this.m_iSelected != 4) {
      //未选中时
      //箭头中段
      let arrowRotateLineGeo = new THREE.RingGeometry(rotateDis, rotateDis + rotateWidth, 8, 1, RidianLeft, RidianWidth)
      ;(this.rotateArrowRingX as THREE.Mesh) = new THREE.Mesh(
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
      ;(this.rotateArrowRingX as THREE.Mesh).name = ESelectArrow.RINGX.toString()
      ;(this.rotateArrowX as THREE.Object3D).add(this.rotateArrowRingX as THREE.Mesh)

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
      ;(this.rotateArrowLeftX as THREE.Mesh) = new THREE.Mesh(
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
      ;(this.rotateArrowLeftX as THREE.Mesh).name = ESelectArrow.RINGX.toString()
      ;(this.rotateArrowX as THREE.Object3D).add(this.rotateArrowLeftX as THREE.Mesh)

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
      ;(this.rotateArrowRightX as THREE.Mesh) = new THREE.Mesh(
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
      ;(this.rotateArrowRightX as THREE.Mesh).name = 'x右箭头'
      ;(this.rotateArrowX as THREE.Object3D).add(this.rotateArrowRightX as THREE.Mesh)
      ;(this.rotateArrowX as THREE.Object3D).position.x = 2
      ;(this.rotateArrowX as THREE.Object3D).rotation.y = -Math.PI / 2
    } else {
      //选中时

      //旋转箭头圆环
      let arrowRotateLineGeo = new THREE.RingGeometry(rotateDis, rotateDis + rotateWidth, 8, 1, RidianLeft, RidianWidth)
      ;(this.rotateArrowRingX as THREE.Mesh) = new THREE.Mesh(
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
      ;(this.rotateArrowRingX as THREE.Mesh).position.x = 1
      ;(this.rotateArrowRingX as THREE.Mesh).rotation.y = -Math.PI / 2
      ;(this.rotateArrowX as THREE.Object3D).add(this.rotateArrowRingX as THREE.Mesh)
    }
    this.rotateArrowCenter!.add(this.rotateArrowX as THREE.Object3D)
  }

  showRotateY(obj: any, arrowDis: number, rotateDis: number, rotateWidth: number, RidianLeft: number, RidianRight: number, RidianWidth: number, arrowWidth: number) {
    this.rotateArrowY = new THREE.Object3D()
    this.rotateArrowY.name = ESelectArrow.RINGY.toString()
    this.rotateArrowY.userData = {
      prevColor: 0x48d9a7
    }
    let vertices = new Array()

    if (this.m_iSelected != 5) {
      //未选中时
      //箭头中段
      let arrowRotateLineGeo = new THREE.RingGeometry(rotateDis, rotateDis + rotateWidth, 8, 1, RidianLeft, RidianWidth)
      ;(this.rotateArrowRingY as THREE.Mesh) = new THREE.Mesh(
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
      ;(this.rotateArrowRingY as THREE.Mesh).rotation.x = Math.PI / 2
      ;(this.rotateArrowRingY as THREE.Mesh).name = ESelectArrow.RINGY.toString()
      ;(this.rotateArrowY as THREE.Object3D).add(this.rotateArrowRingY as THREE.Mesh)

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
      ;(this.rotateArrowLeftY as THREE.Mesh) = new THREE.Mesh(
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
      ;(this.rotateArrowLeftY as THREE.Mesh).name = ESelectArrow.RINGY.toString()
      ;(this.rotateArrowY as THREE.Object3D).add(this.rotateArrowLeftY as THREE.Mesh)

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
      ;(this.rotateArrowRightY as THREE.Mesh) = new THREE.Mesh(
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
      ;(this.rotateArrowRightY as THREE.Mesh).name = ESelectArrow.RINGY.toString()
      ;(this.rotateArrowY as THREE.Object3D).add(this.rotateArrowRightY as THREE.Mesh)
      ;(this.rotateArrowY as THREE.Object3D).position.y = 2
    } else {
      //选中时

      //旋转箭头圆环
      let arrowRotateLineGeo = new THREE.RingGeometry(rotateDis, rotateDis + rotateWidth, 8, 1, RidianLeft, RidianWidth)
      ;(this.rotateArrowRingY as THREE.Mesh) = new THREE.Mesh(
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
      ;(this.rotateArrowRingY as THREE.Mesh).rotation.x = Math.PI / 2
      ;(this.rotateArrowRingY as THREE.Mesh).position.y = 1
      ;(this.rotateArrowY as THREE.Object3D).add(this.rotateArrowRingY as THREE.Mesh)
    }
    this.rotateArrowCenter!.add(this.rotateArrowY as THREE.Object3D)
  }

  showRotateZ(obj: any, arrowDis: number, rotateDis: number, rotateWidth: number, RidianLeft: number, RidianRight: number, RidianWidth: number, arrowWidth: number) {
    this.rotateArrowZ = new THREE.Object3D()
    this.rotateArrowZ.name = ESelectArrow.RINGZ.toString()
    this.rotateArrowZ.userData = {
      prevColor: 0x1890ff
    }
    let vertices = new Array()

    if (this.m_iSelected != 6) {
      //未选中时
      //箭头中段
      let arrowRotateLineGeo = new THREE.RingGeometry(rotateDis, rotateDis + rotateWidth, 8, 1, RidianLeft, RidianWidth)
      ;(this.rotateArrowRingZ as THREE.Mesh) = new THREE.Mesh(
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
      ;(this.rotateArrowRingZ as THREE.Mesh).name = ESelectArrow.RINGZ.toString()
      ;(this.rotateArrowZ as THREE.Object3D).add(this.rotateArrowRingZ as THREE.Mesh)

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
      ;(this.rotateArrowLeftZ as THREE.Mesh) = new THREE.Mesh(
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
      ;(this.rotateArrowLeftZ as THREE.Mesh).name = ESelectArrow.RINGZ.toString()
      ;(this.rotateArrowZ as THREE.Object3D).add(this.rotateArrowLeftZ as THREE.Mesh)

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
      ;(this.rotateArrowRightZ as THREE.Mesh) = new THREE.Mesh(
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
      ;(this.rotateArrowRightZ as THREE.Mesh).name = ESelectArrow.RINGZ.toString()
      ;(this.rotateArrowZ as THREE.Object3D).add(this.rotateArrowRightZ as THREE.Mesh)
      ;(this.rotateArrowZ as THREE.Object3D).position.z = 2
    } else {
      //选中时

      //旋转箭头圆环
      let arrowRotateLineGeo = new THREE.RingGeometry(rotateDis, rotateDis + rotateWidth, 8, 1, RidianLeft, RidianWidth)
      ;(this.rotateArrowRingZ as THREE.Mesh) = new THREE.Mesh(
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
      ;(this.rotateArrowRingZ as THREE.Mesh).position.z = 1
      ;(this.rotateArrowZ as THREE.Object3D).add(this.rotateArrowRingZ as THREE.Mesh)
    }
    this.rotateArrowCenter!.add(this.rotateArrowZ as THREE.Object3D)
  }

  showRotateRing(obj: any) {
    this.rotateRingCenter = new THREE.Object3D()
    // TODO 大小
    let Dis = 320
    // if (Dis < 230) Dis = 230;

    let Width = 70
    switch (this.m_iSelected) {
      case 4:
        this.showRotateRingX(obj, Dis, Width)
        break
      case 5:
        this.showRotateRingY(obj, Dis, Width)
        break
      case 6:
        this.showRotateRingZ(obj, Dis, Width)
        break
    }

    this.controller_3d!.add(this.rotateRingCenter!)
  }
  /**
   * @apiDescription 旋转圆环显示
   */
  showRotateRingX(obj: any, Dis: number, Width: number) {
    if (this.m_iSelected != 4) return
    let vertices = new Array()
    this.rotateRingX = new THREE.Object3D()

    let innerRadius = Dis
    let outerRadius = Dis + Width

    // 圆环
    let ringBelowGeo = new THREE.RingGeometry(innerRadius, outerRadius, 60, 8, 0, Math.PI * 2)
    this.rotateRingBelowX = new THREE.Mesh(
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
    this.rotateRingLinesX = new THREE.LineSegments(
      ringLinesGeo,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1,
        depthTest: false,
        depthWrite: false
      })
    )
    ;(this.rotateRingLinesX as THREE.LineSegments).position.x = 0.1
    ;(this.rotateRingX as THREE.Object3D).add(this.rotateRingBelowX, this.rotateRingLinesX)
    ;(this.rotateRingX as THREE.Object3D).position.x = 1
    ;(this.rotateRingX as THREE.Object3D).rotation.y = -Math.PI / 2
    ;(this.rotateRingCenter as THREE.Object3D).add(this.rotateRingX as THREE.Object3D)
  }

  /**
   * @apiDescription 旋转圆环显示
   */
  showRotateRingY(obj: any, Dis: number, Width: number) {
    if (this.m_iSelected != 5) return
    let vertices = new Array()
    this.rotateRingY = new THREE.Object3D()

    let innerRadius = Dis
    let outerRadius = Dis + Width

    // 圆环
    let ringBelowGeo = new THREE.RingGeometry(innerRadius, outerRadius, 60, 8, 0, Math.PI * 2)
    this.rotateRingBelowY = new THREE.Mesh(
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
    this.rotateRingLinesY = new THREE.LineSegments(
      ringLinesGeo,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1,
        depthTest: false,
        depthWrite: false
      })
    )
    ;(this.rotateRingLinesY as THREE.LineSegments).position.y = 0.1
    ;(this.rotateRingY as THREE.Object3D).add(this.rotateRingBelowY, this.rotateRingLinesY)
    ;(this.rotateRingY as THREE.Object3D).position.y = 1
    ;(this.rotateRingY as THREE.Object3D).rotation.x = Math.PI / 2

    // 添加入场景
    ;(this.rotateRingCenter as THREE.Object3D).add(this.rotateRingY as THREE.Object3D)
  }

  /**
   * @apiDescription 旋转圆环显示
   */
  showRotateRingZ(obj: any, Dis: number, Width: number) {
    if (this.m_iSelected != 6) return
    let vertices = new Array()
    this.rotateRingZ = new THREE.Object3D()

    let innerRadius = Dis
    let outerRadius = Dis + Width

    // 圆环
    let ringBelowGeo = new THREE.RingGeometry(innerRadius, outerRadius, 60, 8, 0, Math.PI * 2)
    this.rotateRingBelowZ = new THREE.Mesh(
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
    this.rotateRingLinesZ = new THREE.LineSegments(
      ringLinesGeo,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1,
        depthTest: false,
        depthWrite: false
      })
    )
    ;(this.rotateRingLinesZ as THREE.LineSegments).position.z = 0.1
    ;(this.rotateRingZ as THREE.Object3D).add(this.rotateRingBelowZ, this.rotateRingLinesZ)
    ;(this.rotateRingZ as THREE.Object3D).position.z = 1

    // 添加入场景
    ;(this.rotateRingCenter as THREE.Object3D).add(this.rotateRingZ as THREE.Object3D)
  }

  showRotateHelp(obj: any) {
    // 旋转辅助平面
    // TODO
    let rotateArrowHelpGeo = new THREE.BufferGeometry()
    let vertices = new Array()
    switch (this.m_iSelected) {
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
    this.rotateArrowHelp = new THREE.Mesh(
      rotateArrowHelpGeo,
      new THREE.MeshBasicMaterial({
        transparent: true,
        color: 0xff0000,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide
      })
    )
    ;(this.rotateArrowCenter as THREE.Object3D).add(this.rotateArrowHelp as THREE.Mesh)
  }

  /**
   * @api updateController
   * @apiGroup TransformController3D
   * @apiDescription 总更新
   */
  updateController(obj: any) {
    if (this.controller_3d == null || obj == null) return
    ;(this.controller_3d as THREE.Object3D).position.x = obj.m_Object3D.position.x
    ;(this.controller_3d as THREE.Object3D).position.y = obj.m_Object3D.position.y
    ;(this.controller_3d as THREE.Object3D).position.z = obj.m_Object3D.position.z

    // obj.OnUpdate3D();

    // 根据摄像机坐标调整操作箭头大小
    this.controller_3d.scale.x = 0.5
    this.controller_3d.scale.y = 0.5
    this.controller_3d.scale.z = 0.5

    // 根据摄像机与世界坐标原点距离改变大小
    // let proportion =
    //     this.camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) / 1000;

    // 根据摄像机与物体坐标原点距离改变大小
    let proportion = this.camera.position.distanceTo(obj.m_Object3D.position) / 1000
    this.controller_3d.scale.x *= proportion
    this.controller_3d.scale.y *= proportion
    this.controller_3d.scale.z *= proportion
    this.updateTransformArrow(obj)
    this.updateRotateArrow(obj)
    this.updateRotateRing(obj)
  }

  /**
   * @apiDescription 平移箭头更新
   */
  updateTransformArrow(obj: any) {
    // 根据摄像机与模型角度修改箭头方向
    ;(this.transformArrowX as THREE.Mesh).rotation.x =
      -Math.atan2(this.camera.position.y - (this.controller_3d as THREE.Object3D).position.y, this.camera.position.z - (this.controller_3d as THREE.Object3D).position.z) + Math.PI / 2
    ;(this.transformArrowY as THREE.Mesh).rotation.y =
      Math.atan2(this.camera.position.x - (this.controller_3d as THREE.Object3D).position.x, this.camera.position.z - (this.controller_3d as THREE.Object3D).position.z) + Math.PI / 2
    ;(this.transformArrowZ as THREE.Mesh).rotation.z = Math.atan2(
      this.camera.position.y - (this.controller_3d as THREE.Object3D).position.y,
      this.camera.position.x - (this.controller_3d as THREE.Object3D).position.x
    )

    // x箭头反向
    if (this.camera.position.x < obj.m_Object3D.position.x) {
      ;(this.transformArrowX as THREE.Mesh).rotation.z = Math.PI
    } else {
      ;(this.transformArrowX as THREE.Mesh).rotation.z = 0
    }

    // y箭头反向
    if (this.camera.position.y < obj.m_Object3D.position.y) {
      ;(this.transformArrowY as THREE.Mesh).rotation.x = Math.PI
      ;(this.transformArrowY as THREE.Mesh).rotation.y = Math.PI - (this.transformArrowY as THREE.Mesh).rotation.y
      ;(this.rotateArrowCenter as THREE.Object3D).position.y = -1
    } else {
      ;(this.transformArrowY as THREE.Mesh).rotation.x = 0
      ;(this.rotateArrowCenter as THREE.Object3D).position.y = 1
    }

    // z箭头反向
    if (this.camera.position.z < obj.m_Object3D.position.z) {
      ;(this.transformArrowZ as THREE.Mesh).rotation.x = Math.PI
      ;(this.transformArrowZ as THREE.Mesh).rotation.z = Math.PI - (this.transformArrowZ as THREE.Mesh).rotation.z
    } else {
      ;(this.transformArrowZ as THREE.Mesh).rotation.x = 0
    }

    ;(this.transformArrowXHelp as THREE.Mesh).rotation.x = (this.transformArrowX as THREE.Mesh).rotation.x
    ;(this.transformArrowXHelp as THREE.Mesh).rotation.y = (this.transformArrowX as THREE.Mesh).rotation.y
    ;(this.transformArrowXHelp as THREE.Mesh).rotation.z = (this.transformArrowX as THREE.Mesh).rotation.z
    ;(this.transformArrowYHelp as THREE.Mesh).rotation.x = (this.transformArrowY as THREE.Mesh).rotation.x
    ;(this.transformArrowYHelp as THREE.Mesh).rotation.y = (this.transformArrowY as THREE.Mesh).rotation.y
    ;(this.transformArrowYHelp as THREE.Mesh).rotation.z = (this.transformArrowY as THREE.Mesh).rotation.z
    ;(this.transformArrowZHelp as THREE.Mesh).rotation.x = (this.transformArrowZ as THREE.Mesh).rotation.x
    ;(this.transformArrowZHelp as THREE.Mesh).rotation.y = (this.transformArrowZ as THREE.Mesh).rotation.y
    ;(this.transformArrowZHelp as THREE.Mesh).rotation.z = (this.transformArrowZ as THREE.Mesh).rotation.z
  }

  /**
   * @apiDescription 旋转箭头显示
   */
  updateRotateArrow(obj: any) {
    let cameraRadianX = Math.atan2(this.camera.position.z - (this.controller_3d as THREE.Object3D).position.z, this.camera.position.y - (this.controller_3d as THREE.Object3D).position.y)
    ;(this.rotateArrowX as THREE.Object3D).rotation.x = Math.floor(cameraRadianX / (Math.PI / 2)) * (Math.PI / 2)

    let cameraRadianY = Math.atan2(this.camera.position.x - (this.controller_3d as THREE.Object3D).position.x, this.camera.position.z - (this.controller_3d as THREE.Object3D).position.z)
    ;(this.rotateArrowY as THREE.Object3D).rotation.y = Math.floor(cameraRadianY / (Math.PI / 2)) * (Math.PI / 2)

    let cameraRadianZ = Math.atan2(this.camera.position.y - (this.controller_3d as THREE.Object3D).position.y, this.camera.position.x - (this.controller_3d as THREE.Object3D).position.x)
    ;(this.rotateArrowZ as THREE.Object3D).rotation.z = Math.floor(cameraRadianZ / (Math.PI / 2)) * (Math.PI / 2)

    if (this.m_iSelected == 4) {
      ;(this.rotateArrowX as THREE.Object3D).rotation.x = this.lastRadian + (Math.PI * 1) / 4
    }
    if (this.m_iSelected == 5) {
      ;(this.rotateArrowY as THREE.Object3D).rotation.y = this.lastRadian + (Math.PI * 1) / 4
    }
    if (this.m_iSelected == 6) {
      ;(this.rotateArrowZ as THREE.Object3D).rotation.z = this.lastRadian + (Math.PI * 1) / 4
    }
  }

  /**
   * @apiDescription 旋转圆环更新
   */
  updateRotateRing(obj: any) {
    if (this.m_iSelected != 4) return
  }

  /**
   * @apiDescription 鼠标按下时进行判断
   */
  // 在对obj进行mousedown判定时先判定Controller,返回为true即为选中
  OnMouseDown(event: MouseEvent) {
    console.log('downevt', event)
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const intersects = this.raycaster.intersectObjects(this.arrowArray, false)
    if (intersects.length > 0) {
      this.isDragging = true
      const object = intersects[0].object
      console.log('箭头mesh', object.name)
      this.selectArrow = ESelectArrow[object.name]
      this.m_iSelected = Number(object.name)
      console.log('选择的箭头', this.selectArrow)

      switch (Number(object.name)) {
        case ESelectArrow.ARROWX:
          this.lastMouseX = intersects[0].point.x
          this.updateController(this.staff)
          this.showArrowOnMove(Number(object.name))
          return true
        case ESelectArrow.ARROWY:
          this.lastMouseY = intersects[0].point.y
          this.updateController(this.staff)
          this.showArrowOnMove(Number(object.name))
          return true
        case ESelectArrow.ARROWZ:
          this.lastMouseZ = intersects[0].point.z
          this.updateController(this.staff)
          this.showArrowOnMove(Number(object.name))
          return true
        case ESelectArrow.RINGX:
          this.lastRadian = -Math.atan2(intersects[0].point.y - this.staff.m_Object3D.position.y, intersects[0].point.z - this.staff.m_Object3D.position.z)
          this.showRotateArrow(this.staff)
          this.showRotateRing(this.staff)
          this.showRotateHelp(this.staff)
          this.updateController(this.staff)
          this.showArrowOnMove(Number(object.name))
          return true
        case ESelectArrow.RINGY:
          this.lastRadian = -Math.atan2(intersects[0].point.z - this.staff.m_Object3D.position.z, intersects[0].point.x - this.staff.m_Object3D.position.x)
          this.showRotateArrow(this.staff)
          this.showRotateRing(this.staff)
          this.showRotateHelp(this.staff)
          this.updateController(this.staff)
          this.showArrowOnMove(Number(object.name))
          return true
        case ESelectArrow.RINGZ:
          this.lastRadian = -Math.atan2(intersects[0].point.x - this.staff.m_Object3D.position.x, intersects[0].point.y - this.staff.m_Object3D.position.y)
          this.showRotateArrow(this.staff)
          this.showRotateRing(this.staff)
          this.showRotateHelp(this.staff)
          this.updateController(this.staff)
          this.showArrowOnMove(Number(object.name))
          return true
        default:
          break
      }
    } else {
      // 未点击到
      this.m_iSelected = -1
      this.updateController(this.staff)
      return false
    }
    if (this.controller_3d == null) return false
  }

  /**@description 移动时显示箭头 */
  showArrowOnMove(type: ESelectArrow) {
    switch (type) {
      case ESelectArrow.ARROWX:
        this.rotateArrowCenter!.visible = false
        this.transformArrowY!.visible = false
        this.transformArrowZ!.visible = false
        break
      case ESelectArrow.ARROWY:
        this.rotateArrowCenter!.visible = false
        this.transformArrowX!.visible = false
        this.transformArrowZ!.visible = false
        break
      case ESelectArrow.ARROWZ:
        this.rotateArrowCenter!.visible = false
        this.transformArrowX!.visible = false
        this.transformArrowY!.visible = false
        break
      case ESelectArrow.RINGX:
        ;(this.transform as THREE.Object3D).visible = false
        this.rotateArrowY!.visible = false
        this.rotateArrowZ!.visible = false
        break
      case ESelectArrow.RINGY:
        ;(this.transform as THREE.Object3D).visible = false
        this.rotateArrowX!.visible = false
        this.rotateArrowZ!.visible = false
        break
      case ESelectArrow.RINGZ:
        ;(this.transform as THREE.Object3D).visible = false
        this.rotateArrowX!.visible = false
        this.rotateArrowY!.visible = false
        break

      default:
        break
    }
  }
  /**@description 鼠标抬起时显示箭头 */
  showArrowOnUp() {
    if (!this.rotateRingCenter) {
      this.transform!.visible = true
      this.rotateArrowCenter!.visible = true
      this.transformArrowX!.visible = true
      this.transformArrowY!.visible = true
      this.transformArrowZ!.visible = true
    }
  }
  /**
   * @apiDescription 鼠标移动时进行判断
   */
  // 在对obj进行移动判定时先判定Controller,返回为true即为选中
  OnMouseMove(event: MouseEvent, obj: any) {
    if (this.arrowArray.length) {
      // 移动到箭头上高亮
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

      this.raycaster.setFromCamera(this.pointer, this.camera)

      const intersects = this.raycaster.intersectObjects(this.arrowArray, false)
      if (intersects.length > 0) {
        const object = intersects[0].object as any
        if (Number(object.name) > 3) {
          const arrowParent = object.parent
          this.highLightArrow = arrowParent
          // 将箭头高亮
          const prevColor = new THREE.Color(this.highLightArrow.userData.prevColor)
          prevColor.multiply(prevColor)
          arrowParent.children.forEach((item: any) => {
            item.material.color.set(prevColor)
          })
        } else {
          this.highLightArrow = object
          // 将箭头高亮
          const prevColor = new THREE.Color(this.highLightArrow.userData.prevColor)
          prevColor.multiply(prevColor)
          object.material.color.set(prevColor)
        }
      } else {
        // 恢复箭头之前的颜色
        if (this.highLightArrow) {
          if (this.highLightArrow.children.length) {
            this.highLightArrow.children.forEach((item: any) => {
              item.material.color.set(this.highLightArrow.userData.prevColor)
            })
          } else {
            this.highLightArrow.material.color.set(this.highLightArrow.userData.prevColor)
          }
        }
      }
    }

    if (this.m_iSelected < 0 || this.controller_3d == null || obj.m_Locking == true || !this.isDragging) return false

    switch (this.m_iSelected) {
      case ESelectArrow.ARROWX: {
        let Intersection = this.raycaster.intersectObject(this.transformArrowXHelp as THREE.Mesh)
        if (Intersection.length > 0) {
          obj.m_Object3D.position.x += Intersection[0].point.x - this.lastMouseX
          this.lastMouseX = Intersection[0].point.x
        }
        break
      }
      case ESelectArrow.ARROWY: {
        let Intersection = this.raycaster.intersectObject(this.transformArrowYHelp as THREE.Mesh)
        if (Intersection.length > 0) {
          obj.m_Object3D.position.y += Intersection[0].point.y - this.lastMouseY
          // if (obj.mJsonParam.m_fHight >= 0) obj.mJsonParam.m_fHight += (Intersection[0].point.y - this.lastMouseY) * 10
          this.lastMouseY = Intersection[0].point.y

          // 限制y轴坐标
          if (obj.m_Object3D.position.y < 0) {
            obj.m_Object3D.position.y = 0
          }
        }
        break
      }
      case ESelectArrow.ARROWZ: {
        let Intersection = this.raycaster.intersectObject(this.transformArrowZHelp as THREE.Mesh)
        if (Intersection.length > 0) {
          obj.m_Object3D.position.z += Intersection[0].point.z - this.lastMouseZ
          this.lastMouseZ = Intersection[0].point.z
        }
        break
      }
      case ESelectArrow.RINGX: {
        let Intersection = this.raycaster.intersectObject(this.rotateArrowHelp as THREE.Mesh)

        if (Intersection.length > 0) {
          let mouseRadian = -Math.atan2(Intersection[0].point.y - obj.m_Object3D.position.y, Intersection[0].point.z - obj.m_Object3D.position.z)

          // 角度限制为正数
          mouseRadian = (mouseRadian + Math.PI * 2) % (Math.PI * 2)

          // 限制 5 度为最小旋转值,可修改
          let minRadian = (5 * Math.PI) / 180
          if ((mouseRadian - minRadian * Math.floor(mouseRadian / minRadian)) % minRadian < minRadian / 2) {
            mouseRadian -= mouseRadian - minRadian * Math.floor(mouseRadian / minRadian)
          } else if ((minRadian - (mouseRadian - minRadian * Math.floor(mouseRadian / minRadian))) % minRadian < minRadian / 2) {
            mouseRadian += minRadian - (mouseRadian - minRadian * Math.floor(mouseRadian / minRadian))
          }

          if ((this.lastRadian - minRadian * Math.floor(this.lastRadian / minRadian)) % minRadian < minRadian / 2) {
            this.lastRadian -= this.lastRadian - minRadian * Math.floor(this.lastRadian / minRadian)
          } else if ((minRadian - (this.lastRadian - minRadian * Math.floor(this.lastRadian / minRadian))) % minRadian < minRadian / 2) {
            this.lastRadian += minRadian - (this.lastRadian - minRadian * Math.floor(this.lastRadian / minRadian))
          }

          let diffRadian = mouseRadian - this.lastRadian

          this.lastRadian = mouseRadian

          this.radiusX = (this.radiusX * Math.PI) / 180

          this.radiusX += diffRadian

          //将结果限制在0-2PI
          this.radiusX = (this.radiusX + Math.PI * 2) % (Math.PI * 2)

          this.radiusX = (this.radiusX * 180) / Math.PI
          console.log('x-radiusX', this.radiusX)

          obj.m_Object3D.rotation.x = THREE.MathUtils.degToRad(this.radiusX)
        }
        break
      }
      case ESelectArrow.RINGY: {
        let Intersection = this.raycaster.intersectObject(this.rotateArrowHelp as THREE.Mesh)

        if (Intersection.length > 0) {
          let mouseRadian = -Math.atan2(Intersection[0].point.z - obj.m_Object3D.position.z, Intersection[0].point.x - obj.m_Object3D.position.x)

          // 角度限制为正数
          mouseRadian = (mouseRadian + Math.PI * 2) % (Math.PI * 2)

          // 限制 5 度为最小旋转值,可修改
          let minRadian = (5 * Math.PI) / 180
          if ((mouseRadian - minRadian * Math.floor(mouseRadian / minRadian)) % minRadian < minRadian / 2) {
            mouseRadian -= mouseRadian - minRadian * Math.floor(mouseRadian / minRadian)
          } else if ((minRadian - (mouseRadian - minRadian * Math.floor(mouseRadian / minRadian))) % minRadian < minRadian / 2) {
            mouseRadian += minRadian - (mouseRadian - minRadian * Math.floor(mouseRadian / minRadian))
          }

          if ((this.lastRadian - minRadian * Math.floor(this.lastRadian / minRadian)) % minRadian < minRadian / 2) {
            this.lastRadian -= this.lastRadian - minRadian * Math.floor(this.lastRadian / minRadian)
          } else if ((minRadian - (this.lastRadian - minRadian * Math.floor(this.lastRadian / minRadian))) % minRadian < minRadian / 2) {
            this.lastRadian += minRadian - (this.lastRadian - minRadian * Math.floor(this.lastRadian / minRadian))
          }

          let diffRadian = mouseRadian - this.lastRadian

          this.lastRadian = mouseRadian

          this.radiusY = (this.radiusY * Math.PI) / 180

          this.radiusY += diffRadian

          //将结果限制在0-2PI
          this.radiusY = (this.radiusY + Math.PI * 2) % (Math.PI * 2)

          this.radiusY = (this.radiusY * 180) / Math.PI
          console.log('x-radiusY', this.radiusY)

          obj.m_Object3D.rotation.y = THREE.MathUtils.degToRad(this.radiusY)
        }
        break
      }
      case ESelectArrow.RINGZ: {
        let Intersection = this.raycaster.intersectObject(this.rotateArrowHelp as THREE.Mesh)

        if (Intersection.length > 0) {
          let mouseRadian = -Math.atan2(Intersection[0].point.x - obj.m_Object3D.position.x, Intersection[0].point.y - obj.m_Object3D.position.y)

          // 角度限制为正数
          mouseRadian = (mouseRadian + Math.PI * 2) % (Math.PI * 2)

          // 限制 5 度为最小旋转值,可修改
          let minRadian = (5 * Math.PI) / 180
          if ((mouseRadian - minRadian * Math.floor(mouseRadian / minRadian)) % minRadian < minRadian / 2) {
            mouseRadian -= mouseRadian - minRadian * Math.floor(mouseRadian / minRadian)
          } else if ((minRadian - (mouseRadian - minRadian * Math.floor(mouseRadian / minRadian))) % minRadian < minRadian / 2) {
            mouseRadian += minRadian - (mouseRadian - minRadian * Math.floor(mouseRadian / minRadian))
          }

          if ((this.lastRadian - minRadian * Math.floor(this.lastRadian / minRadian)) % minRadian < minRadian / 2) {
            this.lastRadian -= this.lastRadian - minRadian * Math.floor(this.lastRadian / minRadian)
          } else if ((minRadian - (this.lastRadian - minRadian * Math.floor(this.lastRadian / minRadian))) % minRadian < minRadian / 2) {
            this.lastRadian += minRadian - (this.lastRadian - minRadian * Math.floor(this.lastRadian / minRadian))
          }

          let diffRadian = mouseRadian - this.lastRadian

          this.lastRadian = mouseRadian

          this.radiusZ = (this.radiusZ * Math.PI) / 180

          this.radiusZ += diffRadian

          //将结果限制在0-2PI
          this.radiusZ = (this.radiusZ + Math.PI * 2) % (Math.PI * 2)

          this.radiusZ = (this.radiusZ * 180) / Math.PI
          console.log('x-radiusZ', this.radiusZ)

          obj.m_Object3D.rotation.z = THREE.MathUtils.degToRad(this.radiusZ)
        }
        break
      }
    }

    this.updateController(obj)
    return true
  }

  /**
   * @apiDescription 鼠标抬起时进行判断
   */
  OnMouseUp(event: MouseEvent) {
    console.log('mouseup', this)

    if (this.isDragging === true) {
      this.isDragging = false
    }
    this.showArrowOnUp()
  }
}
