import _ from 'lodash'
import * as THREE from 'three'
import { createBufferMesh } from './components/bufferMesh'
import { FreeCreateUtil } from './utils/freeCreate'
import { createLine } from './components/line'
import { createExpandMesh } from './components/expandMesh'
import { createCylinder } from './components/cylinder'
import { createBoxHelper } from './helper/boxHelper'
import {gsap} from 'gsap';

export default class freeCreation {
  mode = 'rect'

  world: any
  pointer = new THREE.Vector2()
  raycaster = new THREE.Raycaster()
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  intersect: THREE.Intersection
  pointerMesh = createBufferMesh()
  pointerMesh2 = createBufferMesh()
  mousedownPos?: THREE.Vector3
  mouseupPos?: THREE.Vector2

  line = createLine()
  expandMesh = createExpandMesh()
  expandMeshline?: THREE.LineSegments
  cylinder = createCylinder().cylinder
  cylinderLine = createCylinder().line
  boxHelepr = createBoxHelper()
  /**@description 是否在绘制 */
  isDrawing = false
  constructor(world: any) {
    this.world = world
    this.camera = world.camera
    this.scene = world.scene

    this.init()
  }
  init() {
    this.scene.add(this.pointerMesh, this.pointerMesh2, this.line, this.expandMesh, this.cylinder, this.boxHelepr)
    const scene_container =  this.world.renderer.domElement.parentElement
    scene_container.style.position = 'relative'
    console.log('container',scene_container);

    const panel = document.createElement('div')
    panel.classList.add('panel')
    gsap.to(panel, {duration: 1, top: 300, ease: "bounce.out"})
    const rectBtn = document.createElement('button')
    rectBtn.classList.add('btn')
    rectBtn.innerText='矩形'

    const circleBtn = document.createElement('button')
    circleBtn.classList.add('btn')
    circleBtn.innerText='圆形'

    const triBtn = document.createElement('button')
    triBtn.classList.add('btn')
    triBtn.innerText='三角形'
    panel.append (rectBtn,circleBtn,triBtn)
    scene_container.appendChild(panel)
  }
  mousemove(event: MouseEvent) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)

    const intersect = this.raycaster.intersectObjects(this.scene.children.filter((item) => item.type !== 'LineSegments'))[0]
    this.intersect = intersect
    this.world.intersect = intersect
    if (this.intersect) {
      if (intersect.object.name === 'expandMesh') {
        // var object = this.intersect.object as THREE.Mesh
        // const faces = _.chain(Array.from(object.geometry.index!.array)).chunk(3).value() // 所有的面
        // const face = this.intersect.face!
        // const faceIndex = this.intersect.faceIndex || 0
        // const siblingIndex = faceIndex % 2 === 1 ? faceIndex - 1 : faceIndex + 1
        // console.log('faces', faces, face, faces[siblingIndex])
        // const poistionArr = _.chain(Array.from(object.geometry.attributes.position.array)).chunk(3).value()
        // const trianglePts = poistionArr[face.a].concat(poistionArr[face.b], poistionArr[face.c])
        // const siblingPts = poistionArr[faces[siblingIndex][0]].concat(poistionArr[faces[siblingIndex][1]], poistionArr[faces[siblingIndex][2]])
        // this.pointerMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(trianglePts, 3))
        // this.pointerMesh.geometry.setIndex([0, 1, 2])

        // this.pointerMesh2.geometry.setAttribute('position', new THREE.Float32BufferAttribute(siblingPts, 3))
        // this.pointerMesh2.geometry.setIndex([0, 1, 2])

        // this.pointerMesh.rotation.copy(object.rotation)
        // this.pointerMesh.position.y = this.intersect!.face!.normal!.y > 0 ? object.position.y + 0.1 : object.position.y + -0.1
        // this.pointerMesh.position.z = this.intersect!.face!.normal!.z > 0 ? object.position.z + 0.1 : object.position.z - 0.1
        // this.pointerMesh.position.x = this.intersect!.face!.normal!.x > 0 ? object.position.x + 0.1 : object.position.x - 0.1
        // const positionAttribute = this.pointerMesh.geometry.attributes.position
        // positionAttribute.needsUpdate = true
        // this.pointerMesh2.rotation.copy(object.rotation)
        // this.pointerMesh2.position.y = this.intersect!.face!.normal!.y > 0 ? object.position.y + 0.1 : object.position.y + -0.1
        // this.pointerMesh2.position.z = this.intersect!.face!.normal!.z > 0 ? object.position.z + 0.1 : object.position.z - 0.1
        // this.pointerMesh2.position.x = this.intersect!.face!.normal!.x > 0 ? object.position.x + 0.1 : object.position.x - 0.1
        // const positionAttribute2 = this.pointerMesh2.geometry.attributes.position
        // positionAttribute2.needsUpdate = true

        // console.log('点击到的index', faceIndex, this.pointerMesh)
        this.pointerMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
        this.pointerMesh2.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
      } else {
        this.pointerMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
        this.pointerMesh2.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
      }
    }

    if (this.intersect && this.mousedownPos) {
      const cal = FreeCreateUtil.generateRectFrom2Point(this.mousedownPos, this.intersect.point, this.intersect, this.mode)

      if (cal.plane) {
        this.line.userData = {
          plane: cal.plane,
          normal: cal.normal,
          attributesIndex: cal.attributesIndex
        }
      }
      console.log('cal', cal)

      if (this.mode === 'rect') {
        this.line.geometry.setAttribute('position', new THREE.Float32BufferAttribute(cal.points, 3))

        var positionAttribute = this.line.geometry.attributes.position

        positionAttribute.needsUpdate = true
      } else {
        this.scene.remove(this.cylinder, this.cylinderLine)
        this.cylinder.geometry.dispose()
        ;(<THREE.Material>this.cylinder.material).dispose()
        const { cylinder, line } = createCylinder(cal.cylinderParams, cal.normal)
        this.cylinder = cylinder
        this.cylinderLine = line
        this.cylinder.position.set(this.mousedownPos.x, this.mousedownPos.y + 1, this.mousedownPos.z)

        this.cylinder.userData.mousedownPos = this.mousedownPos
        this.cylinder.userData.normal = cal.normal
        this.cylinderLine.position.copy(this.cylinder.position)
        this.cylinderLine.rotation.copy(this.cylinder.rotation)
        this.scene.add(this.cylinder, this.cylinderLine)
      }
    }

    if (this.isDrawing) {
      const mousePos = new THREE.Vector2(event.x, event.y)
      const length = FreeCreateUtil.p2pDistance(this.mouseupPos!, mousePos)
      console.log('this.isDrawing', this.isDrawing)
      if (this.mode === 'rect') {
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
        this.expandMeshline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 'grey' }))
        this.line.position.copy(this.expandMesh.position)
        this.line.rotation.copy(this.expandMesh.rotation)
        this.scene.add(this.expandMeshline)
      } else {
        const params = this.cylinder.geometry.parameters
        const position = this.cylinder.position
        const mousedownPos = this.cylinder.userData.mousedownPos
        const normal = this.cylinder.userData.normal
        // const changePosition = FreeCreateUtil.changeMeshPosition(position, normal, mousedownPos)
        if (normal) {
          switch (Math.abs(normal.y - 1) < 0.5 ? 1 : Math.abs(normal.y + 1) < 0.5 ? -1 : 0) {
            case 1:
              position.y = mousedownPos.y + length / 2 + 1
              break
            case -1:
              position.y = mousedownPos.y - length / 2 - 1
              break
            default:
              break
          }
          switch (Math.abs(normal.x - 1) < 0.5 ? 1 : Math.abs(normal.x + 1) < 0.5 ? -1 : 0) {
            case 1:
              position.x = mousedownPos.x + length / 2 + 1
              break
            case -1:
              position.x = mousedownPos.x - length / 2 - 1
              break
            default:
              break
          }
          switch (Math.abs(normal.z - 1) < 0.5 ? 1 : Math.abs(normal.z + 1) < 0.5 ? -1 : 0) {
            case 1:
              position.z = mousedownPos.z + length / 2 + 1
              break
            case -1:
              position.z = mousedownPos.z - length / 2 - 1
              break
            default:
              break
          }
        }

        const expandParams = Object.assign(params, { height: length }) as any
        console.log('expandParams', expandParams)

        this.scene.remove(this.cylinder, this.cylinderLine)
        this.cylinder.geometry.dispose()
        ;(<THREE.Material>this.cylinder.material).dispose()
        const { cylinder, line } = createCylinder(expandParams, normal)
        this.cylinder = cylinder
        this.cylinderLine = line
        this.cylinder.position.copy(position)
        this.cylinder.userData.mousedownPos = mousedownPos
        this.cylinder.userData.normal = normal
        this.cylinderLine.position.copy(this.cylinder.position)
        this.cylinderLine.rotation.copy(this.cylinder.rotation)
        this.scene.add(this.cylinder, this.cylinderLine)
      }
    }
  }

  mousedown(event: MouseEvent) {
    console.log('mode', this.mode)

    this.mousedownPos = undefined
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)

    const intersect = this.raycaster.intersectObjects(this.scene.children)[0]
    this.intersect = intersect
    this.world.intersect = intersect
    if (this.intersect) {
      this.mousedownPos = intersect.point

      if (this.intersect.object.name  === 'expandMesh') {

        // helper更新
        this.scene.remove(this.boxHelepr)
        this.boxHelepr = new THREE.BoxHelper(this.intersect.object, '#add8e6')
        console.log('this.boxHelepr', this.boxHelepr)
        this.scene.add(this.boxHelepr)
      }
    }
    if (this.mouseupPos) {
      this.isDrawing = false

      this.mouseupPos = undefined
      // 添加拉伸mesh
      const { mesh, line } = FreeCreateUtil.generateMesh(this.expandMesh)
      mesh.userData.line = line
      this.scene.add(mesh, line)

      const { mesh: cylindermesh, line: cylinderLine } = FreeCreateUtil.generatecylinderMesh(this.cylinder)
      cylindermesh.userData.line = cylinderLine
      this.scene.add(cylindermesh, cylinderLine)
      this.cylinder = createCylinder().cylinder

      this.line.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
      let positionAttribute = this.line.geometry.attributes.position

      positionAttribute.needsUpdate = true

      // console.log('结束拉伸了', this.scene.children)
    }
  }
  mouseup(event: MouseEvent) {
    this.mousedownPos = undefined
    console.log(' this.cylinder.geometry.parameters.height', this.cylinder.geometry.parameters.height)

    if (this.line.geometry.attributes.position.array.length || this.cylinder.geometry.parameters.height < 1) {
      this.mouseupPos = new THREE.Vector2(event.x, event.y)
      this.isDrawing = true
      console.log('正在拉伸', this.line.geometry.attributes.position.array.length, this.cylinder.geometry.parameters.height)
    } else {
      this.mouseupPos = undefined
      this.isDrawing = false
      console.log('结束拉伸')
    }
  }
  keydown({ keyCode }: KeyboardEvent) {
    switch (keyCode) {
      case 16:
        this.mode = this.mode === 'rect' ? 'circle' : 'rect'
        const msg = this.mode === 'rect' ? '当前画长方体' : '当前是画圆柱体'
        console.log('keydown', this.mode)
        this.world.message(msg)
        break
      case 46:
        this.boxHelepr
        console.log('delete', this.boxHelepr, (<any>this.boxHelepr).object, this.expandMeshline)
        this.scene.remove(this.boxHelepr, (<any>this.boxHelepr).object, (<any>this.boxHelepr).object.userData.line)
        break

      default:
        break
    }
  }
  destroy() {
    
    const panel = document.getElementsByClassName('panel')[0]
    console.log('des',panel);
    gsap.to(panel, {duration: 1, top: -100, ease:'back.out'}).then(() => {
    panel.remove()

    })
  }
}
