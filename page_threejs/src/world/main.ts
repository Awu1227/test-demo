import { PerspectiveCamera, Scene, WebGLRenderer, Vector2, Raycaster } from 'three'
import { createCamera } from './components/camera'
import { createCube } from './components/cube'
import { createTorusKnot } from './components/torusKnot'
import { createLight } from './components/light'
import { createScene } from './components/scene'

import { createRenderer } from './systems/renderer'
import { createControls } from './systems/controls.js'
import { Resizer } from './systems/Resizer'
import Loop from './systems/Loop'
import { createGridHelper } from './components/gridHelper'
import Transformer3D from '../../utils/transformer3D'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class World {
  tsf?: Transformer3D
  private camera: PerspectiveCamera
  private scene: Scene
  private renderer: WebGLRenderer
  private loop: Loop

  private _meshs: THREE.Mesh[] = []

  pointer = new Vector2()
  raycaster = new Raycaster()
  controls: OrbitControls

  constructor(container: Element) {
    this.camera = createCamera()
    this.scene = createScene()
    this.renderer = createRenderer()
    this.loop = new Loop(this.camera, this.scene, this.renderer)

    container.append(this.renderer.domElement)

    document.addEventListener('pointermove', (evt) => this.onPointerMove(evt))
    document.addEventListener('pointerdown', (evt) => this.onPointerDown(evt))
    // document.addEventListener('pointerup',(evt) => this.onPointerUp(evt))

    const cube = createTorusKnot()
    this._meshs.push(cube)
    const stuff = {
      m_Object3D: cube,
      setVisible: () => {},
      destory: () => {}
    }

    // this.tsf = new Transformer3D(stuff, this.camera)
    // console.log('controller',this.tsf);
    // this.tsf.showController(stuff)

    const light = createLight()

    const gridHelper = createGridHelper()

    this.controls = createControls(this.camera, this.renderer.domElement)

    this.loop.updatables.push(this.controls)
    this.scene.add(cube, gridHelper, light)

    console.log('scene', this.scene)

    const resizer = new Resizer(container, this.camera, this.renderer)
    // resize 触发后，重新渲染
    resizer.onResize = () => {
      this.render()
    }
  }

  onPointerMove(evt: MouseEvent) {
    // this.tsf.isShow && this.tsf.OnMouseMove(evt, 1)
    if (this.tsf?.isDragging) {
      this.tsf.OnMouseMove(evt, 1)
      this.controls.enableRotate = false
    } else {
      this.controls.enableRotate = true
    }
  }

  onPointerDown(event: MouseEvent) {
    // 移动到箭头上高亮
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const intersects = this.raycaster.intersectObjects(this._meshs, false)
    if (intersects.length > 0) {
      const object = intersects[0].object
      const stuff = {
        m_Object3D: object,
        setVisible: () => {},
        destory: () => {}
      }
      if (!this.tsf) {
        this.tsf = new Transformer3D(stuff, this.camera)
        this.tsf.showController(stuff)
        this.scene.add(this.tsf.controller_3d!)
        console.log('controller', this.tsf)
      }
    } else {
      if (!this.tsf?.OnMouseDown(event)) {
        this.tsf && this.scene.remove(this.tsf.controller_3d!)
        this.tsf = undefined
      }
    }
    console.log('intersect', intersects)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  start() {
    this.loop.start()
  }

  stop() {
    this.loop.stop()
  }
}
