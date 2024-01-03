import * as THREE from 'three'
import { ERotateArrow, ESelectArrow, ITransformer3D, Istuff } from './type'
import { event_KeyDown, event_MouseDown, event_MouseMove, event_MouseUp } from './EventHandlers'
import { process_ShowRotateArrow, process_ShowTransformArrow } from './processArrow'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import GlobalApi from '@src/js/GlobalApi'

export default class Transformer3D implements ITransformer3D {
  /**@description 显示的旋转箭头, 默认显示3个*/
  showRotateArrow: ERotateArrow
  isShow = false
  isLock = false
  isDragging = false
  camera!: THREE.PerspectiveCamera
  raycaster = new THREE.Raycaster()

  pointer = new THREE.Vector2()
  stuff: Istuff
  controller_3d: THREE.Object3D | null = null
  /**@description 高亮的箭头 */
  highLightArrow?: any
  // 平移
  transform: THREE.Object3D | null = null
  transformArrowX: THREE.Mesh | null = null
  transformArrowXHelp: THREE.Mesh | null = null
  transformArrowY: THREE.Mesh | null = null
  transformArrowYHelp: THREE.Mesh | null = null
  transformArrowZ: THREE.Mesh | null = null
  transformArrowZHelp: THREE.Mesh | null = null

  // 旋转
  rotateArrowCenter: THREE.Object3D | null = null
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
  scene: THREE.Scene
  type: string // controller类型
  // meshBoundingBox = new THREE.Box3Helper(new THREE.Box3())
  orbCOntroller: OrbitControls
  isReleased = false; // true,已经释放 了



  /**
   * Creates an instance of Transformer3D.
   * @date 2023/9/4 - 17:12:24
   *
   * @constructor
   * @param {Istuff} stuff
   * @param {THREE.Scene} scene
   * @param {*} { m_Camera3D: camera, m_Control3D: orbController }
   * @param {string} [type='normal'] 控制器的类型
   * @param {ERotateArrow} [showRotateArrow=ERotateArrow.XYZ] 控制显示哪个旋转箭头
   */
  constructor(stuff: Istuff, scene: THREE.Scene, { m_Camera3D: camera, m_Control3D: orbController }: any, type: string = 'normal', showRotateArrow: ERotateArrow = ERotateArrow.XYZ) {
    this.type = type
    this.stuff = stuff
    this.scene = scene
    this.camera = camera
    this.orbCOntroller = orbController
    this.showRotateArrow = showRotateArrow
    console.log('创建了tfs', showRotateArrow, this);

    if (!this.stuff.isLock) {
      stuff.setHighLight(true);
      this.showController(stuff)
    }
  }

  events = {} as Record<'move' | 'destory', Function>;
  addEventlistener(eventKey: 'move' | 'destory', cb: Function) {
    this.events[eventKey] = cb;
    // this.events?.move();
  }

  /**@apiDescription 总显示*/
  showController(obj: Istuff) {
    this.controller_3d = new THREE.Object3D()
    process_ShowTransformArrow(this)
    process_ShowRotateArrow(this)
    this.showBoundingBox(obj)
    this.addArrowToArr()
    this.updateController(obj)
    this.isShow = true
    this.scene.add(this.controller_3d)
  }

  /**@description 显示包围盒 */
  showBoundingBox(obj: any) {
    // TODO: AABB式处理包围盒，性能开销小，但是包围盒不精确
    // const box = new THREE.Box3().setFromObject(obj.m_Object3D)
    // this.meshBoundingBox = new THREE.Box3Helper(box, new THREE.Color(0xffad28))
    // // 将Box3Helper添加到场景中
    // this.scene.add(this.meshBoundingBox)
  }
  /**@description 将所有的箭头添加到数组中，用于光线碰撞检测 */
  addArrowToArr() {
    switch (this.showRotateArrow) {
      case ERotateArrow.NONE:
        this.arrowArray.push(this.transformArrowX, this.transformArrowY, this.transformArrowZ)
        break;
      case ERotateArrow.X:
        this.arrowArray.push(this.transformArrowX, this.transformArrowY, this.transformArrowZ, ...this.rotateArrowX?.children!)
        break;
      case ERotateArrow.Y:
        this.arrowArray.push(this.transformArrowX, this.transformArrowY, this.transformArrowZ, ...this.rotateArrowY?.children!)
        break;
      case ERotateArrow.Z:
        this.arrowArray.push(this.transformArrowX, this.transformArrowY, this.transformArrowZ, ...this.rotateArrowZ?.children!)
        break;
      case ERotateArrow.XY:
        this.arrowArray.push(this.transformArrowX, this.transformArrowY, this.transformArrowZ, ...this.rotateArrowX?.children!, ...this.rotateArrowY?.children!)
        break;
      case ERotateArrow.XZ:
        this.arrowArray.push(this.transformArrowX, this.transformArrowY, this.transformArrowZ, ...this.rotateArrowX?.children!, ...this.rotateArrowZ?.children!)
        break;
      case ERotateArrow.YZ:
        this.arrowArray.push(this.transformArrowX, this.transformArrowY, this.transformArrowZ, ...this.rotateArrowY?.children!, ...this.rotateArrowZ?.children!)
        break;
      case ERotateArrow.XYZ:
        this.arrowArray.push(this.transformArrowX, this.transformArrowY, this.transformArrowZ, ...this.rotateArrowX?.children!, ...this.rotateArrowY?.children!, ...this.rotateArrowZ?.children!)
        break;

      default:
        break;
    }

  }
  /**@apiDescription 总更新 */
  updateController(obj: any) {
    if (this.controller_3d == null || obj == null) return
    if (obj.linePosition) {
      ; (this.controller_3d as THREE.Object3D).position.x = obj.linePosition.x
        ; (this.controller_3d as THREE.Object3D).position.y = obj.linePosition.y
        ; (this.controller_3d as THREE.Object3D).position.z = obj.linePosition.z
    } else {

      ; (this.controller_3d as THREE.Object3D).position.x = obj.m_Object3D.position.x
        ; (this.controller_3d as THREE.Object3D).position.y = obj.m_Object3D.position.y
        ; (this.controller_3d as THREE.Object3D).position.z = obj.m_Object3D.position.z
    }
    // 根据摄像机坐标调整操作箭头大小
    this.controller_3d.scale.x = 0.5
    this.controller_3d.scale.y = 0.5
    this.controller_3d.scale.z = 0.5
    // 根据摄像机与物体坐标原点距离改变大小
    let proportion = this.camera.position.distanceTo(obj.m_Object3D.position) / 1000
    this.controller_3d.scale.x *= proportion
    this.controller_3d.scale.y *= proportion
    this.controller_3d.scale.z *= proportion
    this.updateTransformArrow(obj)
    this.updateRotateArrow()
  }
  /**@apiDescription 平移箭头更新 */
  updateTransformArrow(obj: any) {
    // 根据摄像机与模型角度修改箭头方向
    ; (this.transformArrowX as THREE.Mesh).rotation.x =
      -Math.atan2(this.camera.position.y - (this.controller_3d as THREE.Object3D).position.y, this.camera.position.z - (this.controller_3d as THREE.Object3D).position.z) + Math.PI / 2
      ; (this.transformArrowY as THREE.Mesh).rotation.y =
        Math.atan2(this.camera.position.x - (this.controller_3d as THREE.Object3D).position.x, this.camera.position.z - (this.controller_3d as THREE.Object3D).position.z) + Math.PI / 2
      ; (this.transformArrowZ as THREE.Mesh).rotation.z = Math.atan2(
        this.camera.position.y - (this.controller_3d as THREE.Object3D).position.y,
        this.camera.position.x - (this.controller_3d as THREE.Object3D).position.x
      )

    // x箭头反向
    if (this.camera.position.x < obj.m_Object3D.position.x) {
      ; (this.transformArrowX as THREE.Mesh).rotation.z = Math.PI
    } else {
      ; (this.transformArrowX as THREE.Mesh).rotation.z = 0
    }

    // y箭头反向
    if (this.camera.position.y < obj.m_Object3D.position.y) {
      ; (this.transformArrowY as THREE.Mesh).rotation.x = Math.PI
        ; (this.transformArrowY as THREE.Mesh).rotation.y = Math.PI - (this.transformArrowY as THREE.Mesh).rotation.y
        ; (this.rotateArrowCenter as THREE.Object3D).position.y = -1
    } else {
      ; (this.transformArrowY as THREE.Mesh).rotation.x = 0
        ; (this.rotateArrowCenter as THREE.Object3D).position.y = 1
    }

    // z箭头反向
    if (this.camera.position.z < obj.m_Object3D.position.z) {
      ; (this.transformArrowZ as THREE.Mesh).rotation.x = Math.PI
        ; (this.transformArrowZ as THREE.Mesh).rotation.z = Math.PI - (this.transformArrowZ as THREE.Mesh).rotation.z
    } else {
      ; (this.transformArrowZ as THREE.Mesh).rotation.x = 0
    }

    ; (this.transformArrowXHelp as THREE.Mesh).rotation.x = (this.transformArrowX as THREE.Mesh).rotation.x
      ; (this.transformArrowXHelp as THREE.Mesh).rotation.y = (this.transformArrowX as THREE.Mesh).rotation.y
      ; (this.transformArrowXHelp as THREE.Mesh).rotation.z = (this.transformArrowX as THREE.Mesh).rotation.z
      ; (this.transformArrowYHelp as THREE.Mesh).rotation.x = (this.transformArrowY as THREE.Mesh).rotation.x
      ; (this.transformArrowYHelp as THREE.Mesh).rotation.y = (this.transformArrowY as THREE.Mesh).rotation.y
      ; (this.transformArrowYHelp as THREE.Mesh).rotation.z = (this.transformArrowY as THREE.Mesh).rotation.z
      ; (this.transformArrowZHelp as THREE.Mesh).rotation.x = (this.transformArrowZ as THREE.Mesh).rotation.x
      ; (this.transformArrowZHelp as THREE.Mesh).rotation.y = (this.transformArrowZ as THREE.Mesh).rotation.y
      ; (this.transformArrowZHelp as THREE.Mesh).rotation.z = (this.transformArrowZ as THREE.Mesh).rotation.z
  }
  /**@apiDescription 旋转箭头显示 */
  updateRotateArrow() {
    let cameraRadianX = Math.atan2(this.camera.position.z - (this.controller_3d as THREE.Object3D).position.z, this.camera.position.y - (this.controller_3d as THREE.Object3D).position.y)
    if (this.rotateArrowX) {
      ; (this.rotateArrowX as THREE.Object3D).rotation.x = Math.floor(cameraRadianX / (Math.PI / 2)) * (Math.PI / 2)
    }

    let cameraRadianY = Math.atan2(this.camera.position.x - (this.controller_3d as THREE.Object3D).position.x, this.camera.position.z - (this.controller_3d as THREE.Object3D).position.z)
    if (this.rotateArrowY) {
      ; (this.rotateArrowY as THREE.Object3D).rotation.y = Math.floor(cameraRadianY / (Math.PI / 2)) * (Math.PI / 2)
    }

    let cameraRadianZ = Math.atan2(this.camera.position.y - (this.controller_3d as THREE.Object3D).position.y, this.camera.position.x - (this.controller_3d as THREE.Object3D).position.x)
    if (this.rotateArrowZ) {
      ; (this.rotateArrowZ as THREE.Object3D).rotation.z = Math.floor(cameraRadianZ / (Math.PI / 2)) * (Math.PI / 2)
    }

    if (this.m_iSelected == ESelectArrow.RINGX) {
      ; (this.rotateArrowX as THREE.Object3D).rotation.x = this.lastRadian + (Math.PI * 1) / 4
    }
    if (this.m_iSelected == ESelectArrow.RINGY) {
      ; (this.rotateArrowY as THREE.Object3D).rotation.y = this.lastRadian + (Math.PI * 1) / 4
    }
    if (this.m_iSelected == ESelectArrow.RINGZ) {
      ; (this.rotateArrowZ as THREE.Object3D).rotation.z = this.lastRadian + (Math.PI * 1) / 4
    }
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
        ; (this.transform as THREE.Object3D).visible = false
        if (this.rotateArrowY) {
          this.rotateArrowY!.visible = false
        }
        if (this.rotateArrowZ) {
          this.rotateArrowZ!.visible = false
        }
        break
      case ESelectArrow.RINGY:
        ; (this.transform as THREE.Object3D).visible = false
        if (this.rotateArrowX) {
          this.rotateArrowX!.visible = false
        }
        if (this.rotateArrowZ) {
          this.rotateArrowZ!.visible = false
        }
        break
      case ESelectArrow.RINGZ:
        ; (this.transform as THREE.Object3D).visible = false
        if (this.rotateArrowX) {
          this.rotateArrowX!.visible = false
        }
        if (this.rotateArrowY) {
          this.rotateArrowY!.visible = false
        }
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
      if (this.transformArrowX) {
        this.transformArrowX!.visible = true
      }
      if (this.transformArrowY) {
        this.transformArrowY!.visible = true
      }
      if (this.transformArrowZ) {
        this.transformArrowZ!.visible = true
      }
    } else {
      this.release()
    }
  }
  /**@apiDescription 鼠标按下事件 */
  mousedown(event: MouseEvent) {
    return event_MouseDown(event, this) // 如果return false，意味着没有点击到
  }
  /**@apiDescription 鼠标移动事件 */
  mousemove(event: MouseEvent) {
    return event_MouseMove(event, this)
  }
  /**@description 鼠标抬起事件 */
  mouseup(event: MouseEvent, dragEnd: () => void) {
    event_MouseUp(event, this, dragEnd)
  }
  /**@description 键盘按下事件 */
  keydown(event: KeyboardEvent, config: { height: number } = { height: 20 }) {
    event_KeyDown(event, this, config)
  }
  /** */
  move(vect3: THREE.Vector3) {
    if (this.stuff.move) {
      this.stuff.move(vect3)
    } else {
      console.warn('stuff没有实现move方法')
      this.stuff.m_Object3D.position.x += vect3.x
      this.stuff.m_Object3D.position.y += vect3.y
      this.stuff.m_Object3D.position.z += vect3.z
    }
  }
  /**@description 旋转 */
  rotate(vect3: THREE.Vector3) {
    if (this.stuff.rotate) {
      this.stuff.rotate(vect3)
    } else {
      console.warn('stuff没有实现rotate方法')
      if (vect3.x) {
        let position = new THREE.Vector3(this.stuff.m_Object3D.position.x, this.stuff.m_Object3D.position.y, this.stuff.m_Object3D.position.z)
        this.stuff.m_Object3D.position.set(0, 0, 0)
        this.stuff.m_Object3D.applyMatrix4(new THREE.Matrix4().makeRotationX(vect3.x))
        this.stuff.m_Object3D.position.set(position.x, position.y, position.z)
      }
      if (vect3.y) {
        let position = new THREE.Vector3(this.stuff.m_Object3D.position.x, this.stuff.m_Object3D.position.y, this.stuff.m_Object3D.position.z)
        this.stuff.m_Object3D.position.set(0, 0, 0)
        this.stuff.m_Object3D.applyMatrix4(new THREE.Matrix4().makeRotationY(vect3.y))
        this.stuff.m_Object3D.position.set(position.x, position.y, position.z)
      }
      if (vect3.z) {
        let position = new THREE.Vector3(this.stuff.m_Object3D.position.x, this.stuff.m_Object3D.position.y, this.stuff.m_Object3D.position.z)
        this.stuff.m_Object3D.position.set(0, 0, 0)
        this.stuff.m_Object3D.applyMatrix4(new THREE.Matrix4().makeRotationZ(vect3.z))
        this.stuff.m_Object3D.position.set(position.x, position.y, position.z)
      }
    }
  }
  /**@description 绕X轴翻转 */
  mirrorX() {
    this.rotate(new THREE.Vector3(Math.PI, 0, 0))
  }
  /**@description 绕Y轴翻转 */
  mirrorY() {
    this.rotate(new THREE.Vector3(0, Math.PI, 0))
  }
  /**@description 绕Z轴翻转 */
  mirrorZ() {
    this.rotate(new THREE.Vector3(0, 0, Math.PI))
  }
  /**@description 复制方法 */
  copy() {
    if (this.stuff.copy) {
      this.stuff.copy()
    }
  }
  /**@description 锁定方法 */
  setlock(isLock: boolean) {
    this.stuff.setLock(isLock)
    this.isLock = isLock
    if (this.isLock) {
      this.release()
    }
  }
  /**@description 显示与隐藏方法 */
  setVisible(isV: boolean) {
    if (this.stuff.setVisible) {
      this.stuff.setVisible(isV)
    } else {
      this.stuff.m_Object3D.visible = isV
      if (!isV) {
        this.release()
      }
    }
  }
  /**@description 销毁控制器方法 */
  release() {
    if (this.isReleased) return;

    this.isReleased = true;
    this.stuff.setHighLight(false);
    this.scene.remove(this.controller_3d!)
    // this.scene.remove(this.meshBoundingBox)
    this.controller_3d = null
  }

  /**@description stuff 向天花方向找最近物体的点 */
  goCeiling() {
    // 向天花吊顶打射线
    try {
      // let meshs = GlobalApi.mHouseClass.mLouCengArray.map((lc: any) => lc.mDiaoDingManager.DiaodingClass.bucket.allDiaodings.map((it: any) => it.diaoDingMeshGroup))
      // meshs = meshs.flat();

      // const raycaster = new THREE.Raycaster(this.stuff.m_Object3D.position, new THREE.Vector3(0, 1, 0));
      // const [intersect] = raycaster.intersectObjects(meshs);
      // this.stuff.goCeiling!(intersect.point.y);
    } catch (e) {
      console.warn('goCeiling:', e)
    }
  }

  /**@description stuff 向地板方向找最近物体的点 */
  dropDown() {
    try {
      const raycaster = new THREE.Raycaster(this.stuff.m_Object3D.position, new THREE.Vector3(0, -1, 0))
      const [intersect] = raycaster.intersectObjects(this.scene.children);
      this.stuff.dropDown!(intersect.point.y);
    } catch (e) {
      console.warn('dropDown:', e)
    }
  }

  /**@description 总销毁方法 */
  destory() {
    this.release()
    this.stuff.destroy()
  }
}
