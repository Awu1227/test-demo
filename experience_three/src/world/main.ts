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
  mouseupPos?: THREE.Vector2
  controls: OrbitControls
  line: THREE.Line
  extrudeShape?: THREE.Shape
  expandMesh: THREE.Mesh

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
    this.expandMesh = createCube()
    this.line = line
    console.log('line', line)

    this.loop.updatables.push(this.controls)
    this.scene.add(hemiLight, floor, wall1, wall2, wall3, this.line, this.expandMesh)

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
        const cal = FreeCreateUtil.generateRectFrom2Point(this.mousedownPos, this.intersect.point, this.intersect)

        if (cal.plane) {
          this.line.userData = {
            plane: cal.plane
          }
          this.line.geometry.setAttribute('position', new THREE.Float32BufferAttribute(cal.points, 3))
        }

        var positionAttribute = this.line.geometry.attributes.position

        positionAttribute.needsUpdate = true
      }
      if (this.mouseupPos) {
        const mousePos = new THREE.Vector2(event.x, event.y)
        const length = FreeCreateUtil.p2pDistance(this.mouseupPos, mousePos)
        const points = Array.from(this.line.geometry.attributes.position.array).toSpliced(-3)
        const plane = this.line.userData.plane

        console.log('该拉伸了', length, points, plane)

        let expandPoints: number[] = []
        switch (plane) {
          case 'X':
            break
          case 'Y':
            expandPoints = points.map((pt, index) => {
              if (index % 3 === 1) {
                return pt + length / 4
              } else {
                return pt
              }
            })
            break
          case 'Z':
            break

          default:
            break
        }
        const newPoints = points.concat(expandPoints)
        console.log('newPoints', newPoints)
        this.expandMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(newPoints), 3))
        this.expandMesh.geometry.setIndex([
          0,
          1,
          2, // 底面三角形1
          0,
          2,
          3, // 底面三角形2
          4,
          5,
          6, // 顶面三角形1
          4,
          6,
          7, // 顶面三角形2
          0,
          1,
          5, // 侧面1三角形1
          0,
          5,
          4, // 侧面1三角形2
          1,
          2,
          6, // 侧面2三角形1
          1,
          6,
          5, // 侧面2三角形2
          2,
          3,
          7, // 侧面3三角形1
          2,
          7,
          6, // 侧面3三角形2
          3,
          0,
          4, // 侧面4三角形1
          3,
          4,
          7 // 侧面4三角形2
        ])
        var positionAttribute = this.expandMesh.geometry.attributes.position

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
      this.mouseupPos = undefined
    })
    window.addEventListener('mouseup', (event) => {
      this.mousedownPos = undefined
      if (this.line.geometry.attributes.position.array.length) {
        this.mouseupPos = new THREE.Vector2(event.x, event.y)
        const pts = Array.from(this.line.geometry.attributes.position.array)
      } else {
        this.mouseupPos = undefined
      }
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
