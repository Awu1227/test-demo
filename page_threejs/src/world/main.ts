import { PerspectiveCamera, Scene, WebGLRenderer, Vector2, Raycaster, Matrix4, Vector3 } from 'three'
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

  pointer = new Vector2()
  raycaster = new Raycaster()
  controls: OrbitControls

  constructor(container: Element) {
    this.camera = createCamera()
    this.scene = createScene()
    this.renderer = createRenderer()
    this.loop = new Loop(this.camera, this.scene, this.renderer)

    container.append(this.renderer.domElement)

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
