import * as THREE from 'three'
import { createCamera } from './components/camera'
import { createFloor } from './components/floor'
import { createWall } from './components/wall'
import { createCube } from './components/cube'
import { createLine } from './components/line.js'
import { loadChair } from './components/chair/chair'
import { loadTable } from './components/table/table'
import * as _ from 'lodash'

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
import { createBufferMesh } from './components/bufferMesh.js'
import { Threshold } from 'konva/lib/filters/Threshold.js'

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
  expandMeshline?: THREE.LineSegments
  pointerMesh = createBufferMesh()
  pointerMesh2 = createBufferMesh()

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
    this.scene.add(this.pointerMesh, this.pointerMesh2, hemiLight, floor, wall1, wall2, wall3, this.line, this.expandMesh)

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

      if (this.intersect) {
        if (intersect.object.name === 'expandMesh') {
          var object = this.intersect.object as THREE.Mesh
          const faces = _.chain(Array.from(object.geometry.index!.array)).chunk(3).value() // 所有的面
          const face = this.intersect.face!
          const faceIndex = this.intersect.faceIndex || 0
          const siblingIndex = faceIndex % 2 === 1 ? faceIndex - 1 : faceIndex + 1
          console.log('faces', faces, face, faces[siblingIndex])
          const poistionArr = _.chain(Array.from(object.geometry.attributes.position.array)).chunk(3).value()
          const trianglePts = poistionArr[face.a].concat(poistionArr[face.b], poistionArr[face.c])
          const siblingPts = poistionArr[faces[siblingIndex][0]].concat(poistionArr[faces[siblingIndex][1]], poistionArr[faces[siblingIndex][2]])
          this.pointerMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(trianglePts, 3))
          this.pointerMesh.geometry.setIndex([0, 1, 2])
          // console.log('siblingPts', faceIndex, face, siblingPts, this.intersect)

          this.pointerMesh2.geometry.setAttribute('position', new THREE.Float32BufferAttribute(siblingPts, 3))
          this.pointerMesh2.geometry.setIndex([0, 1, 2])

          this.pointerMesh.rotation.copy(object.rotation)
          this.pointerMesh.position.y = this.intersect!.face!.normal!.y > 0 ? object.position.y + 0.1 : object.position.y + -0.1
          this.pointerMesh.position.z = this.intersect!.face!.normal!.z > 0 ? object.position.z + 0.1 : object.position.z - 0.1
          this.pointerMesh.position.x = this.intersect!.face!.normal!.x > 0 ? object.position.x + 0.1 : object.position.x - 0.1
          const positionAttribute = this.pointerMesh.geometry.attributes.position
          positionAttribute.needsUpdate = true
          this.pointerMesh2.rotation.copy(object.rotation)
          this.pointerMesh2.position.y = this.intersect!.face!.normal!.y > 0 ? object.position.y + 0.1 : object.position.y + -0.1
          this.pointerMesh2.position.z = this.intersect!.face!.normal!.z > 0 ? object.position.z + 0.1 : object.position.z - 0.1
          this.pointerMesh2.position.x = this.intersect!.face!.normal!.x > 0 ? object.position.x + 0.1 : object.position.x - 0.1
          const positionAttribute2 = this.pointerMesh2.geometry.attributes.position
          positionAttribute2.needsUpdate = true

          console.log('点击到的index', faceIndex)
        } else {
          this.pointerMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
          this.pointerMesh2.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
        }
      }

      if (this.intersect && this.mousedownPos) {
        const cal = FreeCreateUtil.generateRectFrom2Point(this.mousedownPos, this.intersect.point, this.intersect)

        if (cal.plane) {
          this.line.userData = {
            plane: cal.plane,
            normal: cal.normal,
            attributesIndex: cal.attributesIndex
          }
          this.line.geometry.setAttribute('position', new THREE.Float32BufferAttribute(cal.points, 3))
        }

        var positionAttribute = this.line.geometry.attributes.position

        positionAttribute.needsUpdate = true
      }
      if (this.mouseupPos) {
        const mousePos = new THREE.Vector2(event.x, event.y)
        const length = FreeCreateUtil.p2pDistance(this.mouseupPos, mousePos)
        const points = (Array.from(this.line.geometry.attributes.position.array) as any).toSpliced(-3)
        const plane = this.line.userData.plane
        const normal = this.line.userData.normal
        const attributesIndex = this.line.userData.attributesIndex

        let expandPoints: number[] = []

        switch (plane) {
          case 'X':
            if (normal.x > 0) {
              expandPoints = points.map((pt, index) => {
                if (index % 3 === 0) {
                  return pt + 1 + length / 4
                } else {
                  return pt
                }
              })
            } else {
              expandPoints = points.map((item, index) => {
                if (index % 3 === 0) {
                  return item - 1 - length / 4
                } else {
                  return item
                }
              })
            }
            break
          case 'Y':
            expandPoints = points.map((pt, index) => {
              if (index % 3 === 1) {
                return pt + 1 + length / 4
              } else {
                return pt
              }
            })
            break
          case 'Z':
            if (normal.z < 0) {
              expandPoints = points.map((pt, index) => {
                if (index % 3 === 2) {
                  return pt + 1 + length / 4
                } else {
                  return pt
                }
              })
            } else {
              expandPoints = points.map((pt, index) => {
                if (index % 3 === 2) {
                  return pt + 1 + length / 4
                } else {
                  return pt
                }
              })
            }

            break

          default:
            break
        }
        const expandGeoIndex = attributesIndex
        const faces = _.chain(Array.from(expandGeoIndex)).chunk(3).value()

        const newPoints = points.concat(expandPoints)
        this.expandMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(newPoints), 3))
        this.expandMesh.geometry.setIndex(expandGeoIndex)

        this.expandMesh.userData.faces = faces
        var positionAttribute = this.expandMesh.geometry.attributes.position

        positionAttribute.needsUpdate = true
        const edges = new THREE.EdgesGeometry(this.expandMesh.geometry)
        if (this.expandMeshline) {
          this.scene.remove(this.expandMeshline)
          this.expandMeshline.geometry.dispose()
          ;(<THREE.Material>this.expandMeshline.material).dispose()
        }
        this.expandMeshline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: '#000' }))
        line.position.copy(this.expandMesh.position)
        line.rotation.copy(this.expandMesh.rotation)
        this.scene.add(this.expandMeshline)
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
      if (this.mouseupPos) {
        this.mouseupPos = undefined
        // 添加拉伸mesh
        const { mesh, line } = FreeCreateUtil.generateMesh(this.expandMesh)
        this.scene.add(mesh, line)

        this.line.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
        let positionAttribute = this.line.geometry.attributes.position

        positionAttribute.needsUpdate = true

        console.log('结束拉伸了', this.scene.children)
      }
    })
    window.addEventListener('mouseup', (event) => {
      this.mousedownPos = undefined
      if (this.line.geometry.attributes.position.array.length) {
        this.mouseupPos = new THREE.Vector2(event.x, event.y)
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
