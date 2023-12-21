import * as THREE from 'three'

type TPlane = 'X' | 'Y' | 'Z'
export class FreeCreateUtil {
  static generateRectFrom2Point(downPos: THREE.Vector3, movePos: THREE.Vector3, intersect: THREE.Intersection) {
    const normal = intersect.normal
    const deltaX = downPos.x - movePos.x
    const deltaY = downPos.y - movePos.y
    const deltaZ = downPos.z - movePos.z
    let C = downPos.clone()
    let D = movePos.clone()
    let isSamePlane = false
    let plane: TPlane | null = null
    let points: any
    if (Math.abs(deltaX) < 5) {
      C.y = movePos.y
      D.y = downPos.y
      isSamePlane = true
      plane = 'X'
      if (normal && normal.x > 0) {
        points = [downPos.x, downPos.y, downPos.z, C.x, C.y, C.z, movePos.x, movePos.y, movePos.z, D.x, D.y, D.z, downPos.x, downPos.y, downPos.z]
        points = points.map((item, index) => {
          if (index % 3 === 0) {
            return item + 1
          } else {
            return item
          }
        })
      } else {
        points = [downPos.x, downPos.y, downPos.z, C.x, C.y, C.z, movePos.x, movePos.y, movePos.z, D.x, D.y, D.z, downPos.x, downPos.y, downPos.z]
        points = points.map((item, index) => {
          if (index % 3 === 0) {
            return item - 1
          } else {
            return item
          }
        })
      }
    }
    if (Math.abs(deltaY) < 5) {
      C.z = movePos.z
      D.z = downPos.z
      isSamePlane = true
      plane = 'Y'
      if (normal && normal.y > 0) {
        points = [downPos.x, downPos.y, downPos.z, C.x, C.y, C.z, movePos.x, movePos.y, movePos.z, D.x, D.y, D.z, downPos.x, downPos.y, downPos.z]
        points = points.map((item, index) => {
          if (index % 3 === 1) {
            return item + 1
          } else {
            return item
          }
        })
      } else {
        points = [downPos.x, downPos.y, downPos.z, C.x, C.y, C.z, movePos.x, movePos.y, movePos.z, D.x, D.y, D.z, downPos.x, downPos.y, downPos.z]
        points = points.map((item, index) => {
          if (index % 3 === 1) {
            return item - 1
          } else {
            return item
          }
        })
      }
    }
    if (Math.abs(deltaZ) < 5) {
      C.x = movePos.x
      D.x = downPos.x
      isSamePlane = true
      plane = 'Z'
      if (normal && normal.z > 0) {
        points = [downPos.x, downPos.y, downPos.z, C.x, C.y, C.z, movePos.x, movePos.y, movePos.z, D.x, D.y, D.z, downPos.x, downPos.y, downPos.z]
        points = points.map((item, index) => {
          if (index % 3 === 2) {
            return item - 1
          } else {
            return item
          }
        })
      } else {
        points = [downPos.x, downPos.y, downPos.z, C.x, C.y, C.z, movePos.x, movePos.y, movePos.z, D.x, D.y, D.z, downPos.x, downPos.y, downPos.z]
        points = points.map((item, index) => {
          if (index % 3 === 2) {
            return item + 1
          } else {
            return item
          }
        })
      }
    }

    return isSamePlane
      ? {
          plane,
          points
        }
      : {
          plane: null,
          points: []
        }
  }
  static generateShape(pts: number[]) {
    console.log('pts', pts)
    return null
  }
  static p2pDistance(p1: THREE.Vector2, p2: THREE.Vector2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
  }
}
