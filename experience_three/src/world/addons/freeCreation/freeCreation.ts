import _ from 'lodash'
import * as THREE from 'three'
import { createBufferMesh } from './components/bufferMesh'
import { FreeCreateUtil } from './utils/freeCreate'
import { createLine } from './components/line'
import { createExpandMesh } from './components/expandMesh'
import { createCylinder } from './components/cylinder'
import { createBoxHelper } from './helper/boxHelper'
import { EDirection, createCone } from './components/cone'
import { gsap } from 'gsap'
import Transformer3D from '../../utils/transformer3D'
import { ERotateArrow } from '../../utils/transformer3D/type'

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
  myCone = createCone()
  /**@description 是否在绘制 */
  isDrawing = false
  tsf?: Transformer3D
  needExpand = false
  constructor(world: any) {
    this.world = world
    this.camera = world.camera
    this.scene = world.scene

    this.init()
    console.log('Transformer3D', Transformer3D)
  }
  init() {
    this.scene.add(this.pointerMesh, this.pointerMesh2, this.line, this.expandMesh, this.cylinder, this.boxHelepr, this.myCone.cone)
    const scene_container = this.world.renderer.domElement.parentElement
    scene_container.style.position = 'relative'
    console.log('container', scene_container)

    const panel = document.createElement('div')
    panel.classList.add('panel')
    gsap.to(panel, { duration: 1, top: 300, ease: 'bounce.out' })
    const rectBtn = document.createElement('button')
    rectBtn.classList.add('btn')
    rectBtn.innerText = '矩形'
    rectBtn.onclick = () => {
      this.mode = 'rect'
    }

    const circleBtn = document.createElement('button')
    circleBtn.classList.add('btn')
    circleBtn.innerText = '圆形'
    circleBtn.onclick = () => {
      this.mode = 'circle'
    }

    const triBtn = document.createElement('button')
    triBtn.classList.add('btn')
    triBtn.innerText = '三角形'
    panel.append(rectBtn, circleBtn, triBtn)
    scene_container.appendChild(panel)
  }
  mousemove(event: MouseEvent) {
    this.tsf?.mousemove(event)
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)

    const intersect = this.raycaster.intersectObjects(this.scene.children.filter((item) => item.type !== 'LineSegments'))[0]
    this.intersect = intersect

    this.world.intersect = intersect
    if (this.intersect) {
      const normal = intersect.face?.normal
      if (this.intersect.object.name === 'helper') {
        this.myCone.setHighLight(true)
      } else {
        this.myCone.setHighLight(false)
      }
      if (intersect.object.name === 'expandMesh') {
        var object = this.intersect.object as THREE.Mesh
        const faces = _.chain(Array.from(object.geometry.index!.array)).chunk(3).value() // 所有的面
        ;(<any>object.geometry).faces = faces
        const face = this.intersect.face!
        const faceIndex = this.intersect.faceIndex || 0
        const siblingIndex = faceIndex % 2 === 1 ? faceIndex - 1 : faceIndex + 1
        console.log('faces', faces, face, faces[siblingIndex])
        const poistionArr = _.chain(Array.from(object.geometry.attributes.position.array)).chunk(3).value()
        const trianglePts = poistionArr[face.a].concat(poistionArr[face.b], poistionArr[face.c])
        const siblingPts = poistionArr[faces[siblingIndex][0]].concat(poistionArr[faces[siblingIndex][1]], poistionArr[faces[siblingIndex][2]])
        this.pointerMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(trianglePts, 3))
        this.pointerMesh.geometry.setIndex([0, 1, 2])

        this.myCone.setPosAndRot(trianglePts, normal!, this.intersect.point)

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
        this.pointerMesh.userData.faceIndex = faceIndex
        this.pointerMesh.userData.fatherMesh = object
        this.pointerMesh2.userData.fatherMesh = object
        this.pointerMesh2.userData.faceIndex = siblingIndex
        // console.log('点击到的index', faceIndex, this.pointerMesh)
        // this.pointerMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
        // this.pointerMesh2.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
      } else {
        // if (!this.myCone.isHighLight) {
        this.pointerMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
        this.pointerMesh2.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
        // this.myCone.cone.position.set(-99999, -99999, -99999)
        // }
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
      if (this.mode === 'rect') {
        const points = (Array.from(this.line.geometry.attributes.position.array) as any).toSpliced(-3)
        const plane = this.line.userData.plane
        if (!plane) return
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
        if (!mousedownPos) return
        console.log('drawing cylinder')

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
    if (this.tsf?.mousedown(event)) {
      return
    }
    this.mousedownPos = undefined
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)

    const intersect = this.raycaster.intersectObjects(this.scene.children)[0]
    this.intersect = intersect
    this.world.intersect = intersect
    if (this.intersect) {
      if (this.intersect.object.name !== 'helper') {
        this.mousedownPos = intersect.point
      } else {
        console.log('点击了helper，我需要二次拉伸', this.myCone.direction)
        const fatherMesh = this.pointerMesh.userData.fatherMesh as THREE.Mesh
        if (fatherMesh) {
          const fatherArr = _.chain(Array.from(fatherMesh.geometry.attributes.position.array)).chunk(3).value()
          const face1Pts = (<any>fatherMesh.geometry).faces[this.pointerMesh.userData.faceIndex]
          const face2Pts = (<any>fatherMesh.geometry).faces[this.pointerMesh2.userData.faceIndex]
          console.log(this.pointerMesh, this.pointerMesh2, fatherArr)
          const pointsIndexes = [...new Set(face1Pts.concat(face2Pts))] as number[] // 该面所有的点
          pointsIndexes.forEach((item: number) => {
            switch (this.myCone.direction) {
              case EDirection.z_front:
                fatherArr[item][2] += 10
                break
              case EDirection.z_back:
                fatherArr[item][2] -= 10
                break
              case EDirection.x_front:
                fatherArr[item][0] += 10
                break
              case EDirection.x_back:
                fatherArr[item][0] -= 10
                break
              case EDirection.y_front:
                fatherArr[item][1] += 10
                break
              case EDirection.y_back:
                fatherArr[item][1] -= 10
                break

              default:
                break
            }
          })
          const calPoints = _.chain(fatherArr).flatten().value()

          fatherMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(calPoints, 3))
          this.scene.remove(fatherMesh.userData.line)
          const edges = new THREE.EdgesGeometry(fatherMesh.geometry)
          const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 'grey' }))
          line.position.copy(this.expandMesh.position)
          line.rotation.copy(this.expandMesh.rotation)
          this.scene.add(line)
          fatherMesh.userData.line = line
          console.log(face1Pts, face2Pts, pointsIndexes, fatherMesh)
        }
      }

      if (this.intersect.object.name === 'expandMesh' || this.intersect.object.name === 'cylinder') {
        this.needExpand = true
        console.log('点击的mesh', this.intersect.object)
        let that = this
        const stuff = {
          m_Object3D: this.intersect.object,
          isLock: false,
          setLock: () => {},
          setHighLight: () => {},
          setVisible: () => {},
          destroy: () => {},
          move: function (vec3: THREE.Vector3) {
            this.m_Object3D.position.add(vec3)

            const line = this.m_Object3D.userData.line
            console.log('line', line)
            line && line.position.add(vec3)
            if (that.boxHelepr) {
              that.scene.remove(that.boxHelepr)
            }
          }
        }
        this.tsf?.release()
        this.tsf = new Transformer3D(stuff, this.scene, { m_Camera3D: this.camera, m_Control3D: this.world.controls }, 'normal', ERotateArrow.NONE)
        // helper更新
        this.scene.remove(this.boxHelepr)
        this.boxHelepr = new THREE.BoxHelper(this.intersect.object, '#add8e6')
        this.scene.add(this.boxHelepr)
      } else {
        this.tsf?.release()
        this.tsf = undefined
      }
    }
    if (this.mouseupPos || this.intersect.object.name === 'expandMesh') {
      this.isDrawing = false

      this.mouseupPos = undefined
      // 添加拉伸mesh
      const { mesh, line } = FreeCreateUtil.generateMesh(this.expandMesh)
      mesh.userData.line = line
      this.scene.add(mesh, line)

      const { mesh: cylindermesh, line: cylinderLine } = FreeCreateUtil.generatecylinderMesh(this.cylinder)
      this.scene.remove(this.cylinder, this.cylinderLine)
      cylindermesh.userData.line = cylinderLine
      this.scene.add(cylindermesh, cylinderLine)
      const cylinder = createCylinder()
      this.cylinder = cylinder.cylinder
      this.cylinderLine = cylinder.line
      this.line.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
      let positionAttribute = this.line.geometry.attributes.position

      positionAttribute.needsUpdate = true

      // console.log('结束拉伸了', this.scene.children)
    }
  }
  mouseup(event: MouseEvent) {
    this.tsf?.mouseup(event, () => {})
    this.mousedownPos = undefined

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
        this.tsf?.release()
        this.tsf = undefined

        this.myCone.cone.position.set(-99999, -99999, -99999)
        this.pointerMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
        this.pointerMesh2.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
        break

      default:
        break
    }
  }
  destroy() {
    const panel = document.getElementsByClassName('panel')[0]
    console.log('des', panel)
    gsap.to(panel, { duration: 1, top: -100, ease: 'back.out' }).then(() => {
      panel.remove()
    })
  }
}
