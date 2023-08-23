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
    document.addEventListener('pointerup', (evt) => this.onPointerUp(evt))
    document.addEventListener('keydown', (evt) => this.onKeyDown(evt))

    for (let i = 0; i < 50; i++) {
      const cube = createCube()
      const ispostive1 = Math.random() > 0.5 ? 1 : -1
      const ispostive2 = Math.random() > 0.5 ? 1 : -1
      cube.position.set(ispostive1 * Math.random() * 50, Math.random() * 50, ispostive2 * Math.random() * 50)

      this._meshs.push(cube)
      this.scene.add(cube)
    }

    const light = createLight()

    const gridHelper = createGridHelper()

    this.controls = createControls(this.camera, this.renderer.domElement)

    this.loop.updatables.push(this.controls)
    this.scene.add(gridHelper, light)

    console.log('scene', this.scene)

    const resizer = new Resizer(container, this.camera, this.renderer)
    // resize 触发后，重新渲染
    resizer.onResize = () => {
      this.render()
    }
  }

  onPointerMove(evt: MouseEvent) {
    // this.tsf.isShow && this.tsf.OnMouseMove(evt, 1)
    if (this.tsf?.isShow) {
      this.tsf.mousemove(evt)
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
      console.log(intersects[0])
      const object = intersects[0].object
      const stuff = {
        m_Object3D: object,
        setVisible: () => {},
        destory: () => {}
      }
      if (!this.tsf?.controller_3d) {
        console.log('create')
        this.tsf = new Transformer3D(stuff, this.scene, this.camera, 'pipe')
        this.scene.add(this.tsf.controller_3d!)
      } else {
        if (object !== this.tsf.staff.m_Object3D && !this.tsf?.mousedown(event)) {
          console.log('create')
          this.tsf.destory()
          this.tsf = new Transformer3D(stuff, this.scene, this.camera, 'pipe')
          this.scene.add(this.tsf.controller_3d!)
        }
        this.tsf?.mousedown(event)
      }
    } else {
      if (!this.tsf?.mousedown(event)) {
        this.tsf && this.tsf.destory()
        this.tsf = undefined
      }
    }
    console.log('intersect', intersects)
  }
  onPointerUp(event: MouseEvent) {
    this.tsf && this.tsf.mouseup(event)
  }
  onKeyDown(event: KeyboardEvent) {
    this.tsf && this.tsf.keydown(event)
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
