import _ from 'lodash'
import * as THREE from 'three'

type TPlane = 'X' | 'Y' | 'Z'
export class FreeCreateUtil {
  static createdMeshes: THREE.Mesh[] = []
  static createdLines: THREE.LineSegments[] = []
  static generateRectFrom2Point(downPos: THREE.Vector3, movePos: THREE.Vector3, intersect: THREE.Intersection) {
    const normal = intersect.face?.normal
    const deltaX = downPos.x - movePos.x
    const deltaY = downPos.y - movePos.y
    const deltaZ = downPos.z - movePos.z
    let C = downPos.clone()
    let D = movePos.clone()
    let isSamePlane = false
    let plane: TPlane | null = null
    let points: number[] = []
    let attributesIndex: number[] = []
    console.log(normal, deltaX, deltaY, deltaZ)

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
        attributesIndex = [
          0,
          1,
          5, // 左侧面三角形1
          0,
          5,
          4, // 左侧面三角形2
          1,
          2,
          6, // 正面三角形1
          1,
          6,
          5, // 正面三角形2
          2,
          3,
          7, // 右侧面三角形1
          2,
          7,
          6, // 右侧面三角形2
          3,
          0,
          4, // 背面三角形1
          3,
          4,
          7, // 背面三角形2
          4,
          5,
          6, // 上面三角形1
          4,
          6,
          7, // 上面三角形2
          0,
          3,
          2, // 底面三角形1
          0,
          2,
          1 // 底面三角形2
        ]
      } else {
        points = [downPos.x, downPos.y, downPos.z, C.x, C.y, C.z, movePos.x, movePos.y, movePos.z, D.x, D.y, D.z, downPos.x, downPos.y, downPos.z]
        points = points.map((item, index) => {
          if (index % 3 === 0) {
            return item - 1
          } else {
            return item
          }
        })
        attributesIndex = [
          0,
          5,
          1, // 右侧面三角形1
          0,
          4,
          5, // 右侧面三角形2
          1,
          6,
          2, // 右侧面三角形3
          1,
          5,
          6, // 右侧面三角形4
          2,
          7,
          3, // 左侧面三角形1
          2,
          6,
          7, // 左侧面三角形2
          3,
          4,
          0, // 左侧面三角形3
          3,
          7,
          4, // 左侧面三角形4
          4,
          1,
          0, // 上面三角形1
          4,
          5,
          1, // 上面三角形2
          5,
          2,
          1, // 上面三角形3
          5,
          6,
          2, // 上面三角形4
          6,
          3,
          2, // 上面三角形5
          6,
          7,
          3, // 上面三角形6
          7,
          0,
          3, // 上面三角形7
          7,
          4,
          0, // 上面三角形8
          4,
          6,
          5, // 前面三角形1
          4,
          7,
          6, // 前面三角形2
          0,
          1,
          2, // 后面三角形1
          0,
          2,
          3 // 后面三角形2
        ]
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
        attributesIndex = [
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
        ]
      } else {
        points = [downPos.x, downPos.y, downPos.z, C.x, C.y, C.z, movePos.x, movePos.y, movePos.z, D.x, D.y, D.z, downPos.x, downPos.y, downPos.z]
        points = points.map((item, index) => {
          if (index % 3 === 1) {
            return item - 1
          } else {
            return item
          }
        })
        // :TODO
        attributesIndex = [
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
        ]
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
            return item + 1
          } else {
            return item
          }
        })
        attributesIndex = [
          0,
          1,
          5, // 左侧面三角形1
          0,
          5,
          4, // 左侧面三角形2
          1,
          2,
          6, // 正面三角形1
          1,
          6,
          5, // 正面三角形2
          2,
          3,
          7, // 右侧面三角形1
          2,
          7,
          6, // 右侧面三角形2
          3,
          0,
          4, // 背面三角形1
          3,
          4,
          7, // 背面三角形2
          4,
          5,
          6, // 上面三角形1
          4,
          6,
          7, // 上面三角形2
          0,
          3,
          2, // 底面三角形1
          0,
          2,
          1 // 底面三角形2
        ]
      } else {
        points = [downPos.x, downPos.y, downPos.z, C.x, C.y, C.z, movePos.x, movePos.y, movePos.z, D.x, D.y, D.z, downPos.x, downPos.y, downPos.z]
        points = points.map((item, index) => {
          if (index % 3 === 2) {
            return item - 1
          } else {
            return item
          }
        })

        attributesIndex = [
          0,
          1,
          5, // 左侧面三角形1
          0,
          5,
          4, // 左侧面三角形2
          1,
          2,
          6, // 正面三角形1
          1,
          6,
          5, // 正面三角形2
          2,
          3,
          7, // 右侧面三角形1
          2,
          7,
          6, // 右侧面三角形2
          3,
          0,
          4, // 背面三角形1
          3,
          4,
          7, // 背面三角形2
          4,
          5,
          6, // 上面三角形1
          4,
          6,
          7, // 上面三角形2
          0,
          3,
          2, // 底面三角形1
          0,
          2,
          1 // 底面三角形2
        ]
      }
    }

    return isSamePlane
      ? {
          plane,
          points,
          normal,
          attributesIndex
        }
      : {
          plane: null,
          points: [],
          normal,
          attributesIndex
        }
  }
  static generateShape(pts: number[]) {
    console.log('pts', pts)
    return null
  }
  static p2pDistance(p1: THREE.Vector2, p2: THREE.Vector2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
  }
  static generateMesh(expandMesh: THREE.Mesh) {
    const name = expandMesh.name
    const array = _.cloneDeep(expandMesh.geometry.attributes.position.array)
    const index = _.cloneDeep(expandMesh.geometry.index)
    const geometry = new THREE.BufferGeometry()
    // 因为在两个三角面片里，这两个顶点都需要被用到。

    // itemSize = 3 因为每个顶点都是一个三元组。
    geometry.setAttribute('position', new THREE.BufferAttribute(array, 3))
    geometry.setIndex(index)
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = name
    const edges = new THREE.EdgesGeometry(mesh.geometry)
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: '#000' }))
    line.position.copy(mesh.position)
    line.rotation.copy(mesh.rotation)
    this.createdMeshes.push(mesh)
    this.createdLines.push(line)
    return {
      mesh,
      line
    }
  }
}
