import * as THREE from 'three'
import { createCamera } from './components/camera'
import { createFloor } from './components/floor'
import { createWall } from './components/wall'
import { createCube } from './components/cube'
import { createLine } from './components/line.js'
import { loadChair } from './components/chair/chair'
import { loadTable } from './components/table/table'

// import { loadWindow } from './components/window/window'

import { createDirectionalLight } from './components/light/createDirectionalLight.js'
import { createScene } from './components/scene'

import { createRenderer } from './systems/renderer'
import { createControls } from './systems/controls.js'
import { Resizer } from './systems/Resizer'
import Loop from './systems/Loop'
import { createGridHelper } from './components/gridHelper'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createHemiLight } from './components/light/createHemiLight.js'
import { FreeCreateUtil } from '../../utils/freeCreate.js'

export default class World {
  private camera: THREE.PerspectiveCamera
  private scene: THREE.Scene
  private renderer: THREE.WebGLRenderer
  private loop: Loop

  pointer = new THREE.Vector2()
  raycaster = new THREE.Raycaster()
  intersect?: THREE.Intersection
  mousedownPos?: THREE.Vector3
  controls: OrbitControls
  line: THREE.Line

  constructor(container: Element) {
    this.camera = createCamera()
    this.scene = createScene()
    this.renderer = createRenderer()
    this.loop = new Loop(this.camera, this.scene, this.renderer)

    container.append(this.renderer.domElement)

    const light = createDirectionalLight()
    const hemiLight = createHemiLight()

    const gridHelper = createGridHelper()

    this.controls = createControls(this.camera, this.renderer.domElement, this)

    const floor = createFloor()
    const edges = new THREE.EdgesGeometry(floor.geometry)
    const Floorline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: '#000' }))
    Floorline.position.copy(floor.position)
    Floorline.rotation.copy(floor.rotation)
    this.scene.add(Floorline)

    const [wall1, wall2, wall3] = createWall()

    const wallArr = [wall1, wall2, wall3]

    wallArr.forEach((wall) => {
      const edges = new THREE.EdgesGeometry(wall.geometry)
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: '#000' }))
      line.position.copy(wall.position)
      line.rotation.copy(wall.rotation)
      this.scene.add(line)
    })
    const line = createLine()
    this.line = line
    console.log('line', line)

    this.loop.updatables.push(this.controls)
    this.scene.add(hemiLight, floor, wall1, wall2, wall3, this.line)

    console.log('scene', this.scene)

    const resizer = new Resizer(container, this.camera, this.renderer)
    // resize 触发后，重新渲染
    resizer.onResize = () => {
      this.render()
    }
    window.addEventListener('mousemove', (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
      this.raycaster.setFromCamera(this.pointer, this.camera)

      const intersect = this.raycaster.intersectObjects(this.scene.children)[0]
      this.intersect = intersect
      if (this.intersect && this.mousedownPos) {
        console.log('this.line', this.line)

        const points = FreeCreateUtil.generateRectFrom2Point(this.mousedownPos, this.intersect.point)
        console.log('points', points)

        // 更新attribute的值
        // positionAttribute.array[0] = this.mousedownPos.x
        // positionAttribute.array[1] = this.mousedownPos.y
        // positionAttribute.array[2] = this.mousedownPos.z
        // positionAttribute.array[3] = 100
        // positionAttribute.array[4] = 100
        // positionAttribute.array[5] = 100
        // positionAttribute.array[6] = intersect.point.x
        // positionAttribute.array[7] = intersect.point.y
        // positionAttribute.array[8] = intersect.point.z
        // positionAttribute.count = 3
        this.line.geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))

        var positionAttribute = this.line.geometry.attributes.position
        // for (let i = 0; i < points.length; i++) {
        //   positionAttribute.array[i] = points[i]
        // }
        positionAttribute.needsUpdate = true
      }
    })
    window.addEventListener('mousedown', (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
      this.raycaster.setFromCamera(this.pointer, this.camera)

      const intersect = this.raycaster.intersectObjects(this.scene.children)[0]
      this.intersect = intersect
      if (this.intersect) {
        this.mousedownPos = intersect.point
      }
    })
    window.addEventListener('mouseup', (event) => {
      this.mousedownPos = undefined
    })
  }

  async init() {
    // const chair = await loadChair()
    // const window = await loadWindow()
    // const table = await loadTable()
    // const boxHelper = new THREE.BoxHelper(window, 0xffff00)
    // console.log('boxHelper', boxHelper)
    // this.loop.updatables.push(chair);
    // this.scene.add(chair)
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
