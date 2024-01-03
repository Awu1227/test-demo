import * as THREE from 'three'
import { FreeCreateUtil } from '../utils/freeCreate'
import _ from 'lodash'

export enum EDirection {
  x_front,
  x_back,
  y_front,
  y_back,
  z_front,
  z_back
}

export const createCone = (params = [10, 20, 20, 40], normal = new THREE.Vector3(0, 1, 0)) => {
  class MyCone {
    cone: THREE.Group
    hightLightColor = new THREE.MeshBasicMaterial({ color: 'lightBlue', depthTest: false })
    unHightLightColor = new THREE.MeshBasicMaterial({ color: 'grey' })
    isHighLight = false
    direction: EDirection = EDirection.z_front
    constructor(cone: THREE.Group) {
      this.cone = cone
      this.cone.position.set(-99999, -99999, -99999)
    }
    setHighLight(isHighLight) {
      this.isHighLight = isHighLight
      if (isHighLight) {
        ;(<any>this.cone.children[0]).material = this.hightLightColor
        ;(<any>this.cone.children[1]).material = this.hightLightColor
        this.cone.children[0].renderOrder = 99
        this.cone.children[1].renderOrder = 99
      } else {
        ;(<any>this.cone.children[0]).material = this.unHightLightColor
        ;(<any>this.cone.children[1]).material = this.unHightLightColor
      }
    }
    setPosAndRot(trianglePts, normal: THREE.Vector3, point: THREE.Vector3) {
      const pts = _.chain(trianglePts).chunk(3).value()
      console.log('pts', pts)
      let selfRect: any
      let center: any
      if (parseInt(pts[0][0]) === parseInt(pts[1][0]) && parseInt(pts[0][0]) === parseInt(pts[2][0])) {
        selfRect = FreeCreateUtil.findCircleCenter(new THREE.Vector2(pts[0][1], pts[0][2]), new THREE.Vector2(pts[1][1], pts[1][2]), new THREE.Vector2(pts[2][1], pts[2][2]))
        center = {
          x: selfRect.x + selfRect.width / 2,
          y: selfRect.y + selfRect.height / 2
        }
        this.cone.position.copy(new THREE.Vector3(pts[0][0], center.x, center.y))
      } else if (parseInt(pts[0][1]) === parseInt(pts[1][1]) && parseInt(pts[0][1]) === parseInt(pts[2][1])) {
        selfRect = FreeCreateUtil.findCircleCenter(new THREE.Vector2(pts[0][0], pts[0][3]), new THREE.Vector2(pts[1][0], pts[1][3]), new THREE.Vector2(pts[2][0], pts[2][3]))
        center = {
          x: selfRect.x + selfRect.width / 2,
          y: selfRect.y + selfRect.height / 2
        }
        this.cone.position.copy(new THREE.Vector3(center.x, pts[0][1], center.y))
      } else {
        selfRect = FreeCreateUtil.findCircleCenter(new THREE.Vector2(pts[0][0], pts[0][1]), new THREE.Vector2(pts[1][0], pts[1][1]), new THREE.Vector2(pts[2][0], pts[2][1]))
        center = {
          x: selfRect.x + selfRect.width / 2,
          y: selfRect.y + selfRect.height / 2
        }

        this.cone.position.copy(new THREE.Vector3(center.x, center.y, pts[0][2]))
      }

      // 前后面
      switch (Math.abs(normal.z - 1) < 0.5 ? 1 : Math.abs(normal.z + 1) < 0.5 ? -1 : 0) {
        case 1:
          this.cone.position.z = point.z + 50
          cone.rotation.set(Math.PI / 2, 0, 0)
          this.direction = EDirection.z_front
          break
        case -1:
          this.cone.position.z = point.z - 50
          cone.rotation.set(-Math.PI / 2, 0, 0)
          this.direction = EDirection.z_back
          break
        default:
          break
      }

      // 左右面
      switch (Math.abs(normal.x - 1) < 0.5 ? 1 : Math.abs(normal.x + 1) < 0.5 ? -1 : 0) {
        case 1:
          this.cone.position.x = point.x + 50
          cone.rotation.set(0, 0, -Math.PI / 2)
          this.direction = EDirection.x_front
          break
        case -1:
          this.cone.position.x = point.x - 50
          cone.rotation.set(0, 0, Math.PI / 2)
          this.direction = EDirection.x_back
          break
        default:
          break
      }

      // 上下面
      switch (Math.abs(normal.y - 1) < 0.5 ? 1 : Math.abs(normal.y + 1) < 0.5 ? -1 : 0) {
        case 1:
          this.cone.position.y = point.y + 50
          cone.rotation.set(0, -Math.PI / 2, 0)
          this.direction = EDirection.y_front
          break
        case -1:
          this.cone.position.y = point.y - 50
          cone.rotation.set(0, Math.PI / 2, 0)
          this.direction = EDirection.y_back
          break
        default:
          break
      }
    }
  }

  const cone = new THREE.Group()
  const geometry = new THREE.ConeGeometry(...params)
  const material = new THREE.MeshNormalMaterial({ flatShading: true })
  const cone_top = new THREE.Mesh(geometry, material)
  cone_top.name = 'helper'
  cone.add(cone_top)

  const bottom_geometry = new THREE.CylinderGeometry(2.4, 2.4, 30, 32)
  const bottom_material = new THREE.MeshNormalMaterial({ flatShading: true })
  const cone_bottom = new THREE.Mesh(bottom_geometry, bottom_material)
  cone_bottom.name = 'helper'
  cone_bottom.position.y = -20
  cone.add(cone_bottom)

  cone.name = 'helper'
  return new MyCone(cone)
}
