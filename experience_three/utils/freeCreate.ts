export class FreeCreateUtil {
  static generateRectFrom2Point(downPos: THREE.Vector3, movePos: THREE.Vector3) {
    console.log('downPos', downPos)
    console.log('movePos', movePos)
    const deltaX = downPos.x - movePos.x
    const deltaY = downPos.y - movePos.y
    const deltaZ = downPos.z - movePos.z
    let C = downPos.clone()
    let D = movePos.clone()
    let isSamePlane = false
    if (Math.abs(deltaX) < 5) {
      C.y = movePos.y
      D.y = downPos.y
      isSamePlane = true
    }
    if (Math.abs(deltaY) < 5) {
      C.z = movePos.z
      D.z = downPos.z
      isSamePlane = true
    }
    if (Math.abs(deltaZ) < 5) {
      C.x = movePos.x
      D.x = downPos.x
      isSamePlane = true
    }

    return isSamePlane ? [downPos.x, downPos.y, downPos.z, C.x, C.y, C.z, movePos.x, movePos.y, movePos.z, D.x, D.y, D.z, downPos.x, downPos.y, downPos.z] : []
  }
}
