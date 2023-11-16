import { PerspectiveCamera, Scene, WebGLRenderer, Vector2, Raycaster, Matrix4, Vector3, Object3D } from 'three'
import { createCamera } from './components/camera'
import { createFloor } from './components/floor'
import { loadChair } from './components/chair/chair.js';
import { createDirectionalLight } from './components/light/createDirectionalLight.js'
import { createScene } from './components/scene'

import { createRenderer } from './systems/renderer'
import { createControls } from './systems/controls.js'
import { Resizer } from './systems/Resizer'
import Loop from './systems/Loop'
import { createGridHelper } from './components/gridHelper'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createHemiLight } from './components/light/createHemiLight.js'

export default class World {
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

    const light = createDirectionalLight()
    const hemiLight = createHemiLight()

    const gridHelper = createGridHelper()

    this.controls = createControls(this.camera, this.renderer.domElement)

    const floor = createFloor()

    this.loop.updatables.push(this.controls)
    this.scene.add(gridHelper,hemiLight,floor)

    console.log('scene', this.scene)

    const resizer = new Resizer(container, this.camera, this.renderer)
    // resize 触发后，重新渲染
    resizer.onResize = () => {
      this.render()
    }
  }

  async init() {
    const chair = await loadChair()
    // this.loop.updatables.push(chair);
    this.scene.add(chair);
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
