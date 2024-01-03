import * as THREE from 'three'
import Transformer3D from '..'
import { ESelectArrow } from '../type'
import { process_ShowRotateArrow, process_ShowRotateHelp, process_ShowRotateRing } from '../processArrow'

/**@description 鼠标移动事件 */
export function event_MouseMove(event: MouseEvent, tfs: Transformer3D) {

  if (tfs.arrowArray.length) {
    // 移动到箭头上高亮
    tfs.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    tfs.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    tfs.raycaster.setFromCamera(tfs.pointer, tfs.camera)

    const intersects = tfs.raycaster.intersectObjects(tfs.arrowArray, false)
    if (intersects.length > 0) {
      const object = intersects[0].object as any
      if (Number(object.name) > 3) {
        const arrowParent = object.parent
        tfs.highLightArrow = arrowParent
        // 将箭头高亮
        if (tfs.highLightArrow) {
          const prevColor = new THREE.Color(tfs.highLightArrow.userData.prevColor)
          prevColor.multiply(prevColor)
          arrowParent.children.forEach((item: any) => {
            item.material.color.set(prevColor)
          })
        }
      } else {
        tfs.highLightArrow = object
        // 将箭头高亮
        if (tfs.highLightArrow) {
          const prevColor = new THREE.Color(tfs.highLightArrow.userData.prevColor)
          prevColor.multiply(prevColor)
          object.material.color.set(prevColor)
        }
      }
    } else {
      // 恢复箭头之前的颜色
      if (tfs.highLightArrow) {
        if (tfs.highLightArrow.children.length) {
          tfs.highLightArrow.children.forEach((item: any) => {
            item.material.color.set(tfs.highLightArrow.userData.prevColor)
          })
        } else {
          tfs.highLightArrow.material.color.set(tfs.highLightArrow.userData.prevColor)
        }
      }
    }
  }

  if (tfs.m_iSelected < 0 || tfs.controller_3d == null || !tfs.isDragging) return false
  switch (tfs.m_iSelected) {
    case ESelectArrow.ARROWX: {
      let Intersection = tfs.raycaster.intersectObject(tfs.transformArrowXHelp as THREE.Mesh)
      if (Intersection.length > 0) {
        tfs.move(new THREE.Vector3(Intersection[0].point.x - tfs.lastMouseX, 0, 0))
        tfs.lastMouseX = Intersection[0].point.x
      }
      break
    }
    case ESelectArrow.ARROWY: {
      let Intersection = tfs.raycaster.intersectObject(tfs.transformArrowYHelp as THREE.Mesh)
      if (Intersection.length > 0) {
        tfs.move(new THREE.Vector3(0, Intersection[0].point.y - tfs.lastMouseY, 0))
        tfs.lastMouseY = Intersection[0].point.y

        // 限制y轴坐标
        if (tfs.stuff.m_Object3D.position.y < 0) {
          tfs.stuff.m_Object3D.position.y = 0
        }
      }
      break
    }
    case ESelectArrow.ARROWZ: {
      let Intersection = tfs.raycaster.intersectObject(tfs.transformArrowZHelp as THREE.Mesh)
      if (Intersection.length > 0) {
        tfs.move(new THREE.Vector3(0, 0, Intersection[0].point.z - tfs.lastMouseZ))
        tfs.lastMouseZ = Intersection[0].point.z
      }
      break
    }
    case ESelectArrow.RINGX: {
      // console.log('ringx')
      let Intersection = tfs.raycaster.intersectObject(tfs.rotateArrowHelp as THREE.Mesh)

      if (Intersection.length > 0) {
        let mouseRadian = -Math.atan2(Intersection[0].point.y - tfs.stuff.m_Object3D.position.y, Intersection[0].point.z - tfs.stuff.m_Object3D.position.z)

        // 角度限制为正数
        mouseRadian = (mouseRadian + Math.PI * 2) % (Math.PI * 2)

        // 限制 5 度为最小旋转值,可修改
        let minRadian = (5 * Math.PI) / 180
        if ((mouseRadian - minRadian * Math.floor(mouseRadian / minRadian)) % minRadian < minRadian / 2) {
          mouseRadian -= mouseRadian - minRadian * Math.floor(mouseRadian / minRadian)
        } else if ((minRadian - (mouseRadian - minRadian * Math.floor(mouseRadian / minRadian))) % minRadian < minRadian / 2) {
          mouseRadian += minRadian - (mouseRadian - minRadian * Math.floor(mouseRadian / minRadian))
        }

        if ((tfs.lastRadian - minRadian * Math.floor(tfs.lastRadian / minRadian)) % minRadian < minRadian / 2) {
          tfs.lastRadian -= tfs.lastRadian - minRadian * Math.floor(tfs.lastRadian / minRadian)
        } else if ((minRadian - (tfs.lastRadian - minRadian * Math.floor(tfs.lastRadian / minRadian))) % minRadian < minRadian / 2) {
          tfs.lastRadian += minRadian - (tfs.lastRadian - minRadian * Math.floor(tfs.lastRadian / minRadian))
        }

        let diffRadian = mouseRadian - tfs.lastRadian

        tfs.lastRadian = mouseRadian
        tfs.rotate(new THREE.Vector3(diffRadian, 0, 0))
      }
      break
    }
    case ESelectArrow.RINGY: {
      // console.log('ringy')

      let Intersection = tfs.raycaster.intersectObject(tfs.rotateArrowHelp as THREE.Mesh)

      if (Intersection.length > 0) {
        let mouseRadian = -Math.atan2(Intersection[0].point.z - tfs.stuff.m_Object3D.position.z, Intersection[0].point.x - tfs.stuff.m_Object3D.position.x)

        // 角度限制为正数
        mouseRadian = (mouseRadian + Math.PI * 2) % (Math.PI * 2)

        // 限制 5 度为最小旋转值,可修改
        let minRadian = (5 * Math.PI) / 180
        if ((mouseRadian - minRadian * Math.floor(mouseRadian / minRadian)) % minRadian < minRadian / 2) {
          mouseRadian -= mouseRadian - minRadian * Math.floor(mouseRadian / minRadian)
        } else if ((minRadian - (mouseRadian - minRadian * Math.floor(mouseRadian / minRadian))) % minRadian < minRadian / 2) {
          mouseRadian += minRadian - (mouseRadian - minRadian * Math.floor(mouseRadian / minRadian))
        }

        if ((tfs.lastRadian - minRadian * Math.floor(tfs.lastRadian / minRadian)) % minRadian < minRadian / 2) {
          tfs.lastRadian -= tfs.lastRadian - minRadian * Math.floor(tfs.lastRadian / minRadian)
        } else if ((minRadian - (tfs.lastRadian - minRadian * Math.floor(tfs.lastRadian / minRadian))) % minRadian < minRadian / 2) {
          tfs.lastRadian += minRadian - (tfs.lastRadian - minRadian * Math.floor(tfs.lastRadian / minRadian))
        }

        let diffRadian = mouseRadian - tfs.lastRadian

        tfs.lastRadian = mouseRadian
        tfs.rotate(new THREE.Vector3(0, diffRadian, 0))
      }
      break
    }
    case ESelectArrow.RINGZ: {
      // console.log('ringz')
      let Intersection = tfs.raycaster.intersectObject(tfs.rotateArrowHelp as THREE.Mesh)

      if (Intersection.length > 0) {
        let mouseRadian = -Math.atan2(Intersection[0].point.x - tfs.stuff.m_Object3D.position.x, Intersection[0].point.y - tfs.stuff.m_Object3D.position.y)

        // 角度限制为正数
        mouseRadian = (mouseRadian + Math.PI * 2) % (Math.PI * 2)

        // 限制 5 度为最小旋转值,可修改
        let minRadian = (5 * Math.PI) / 180
        if ((mouseRadian - minRadian * Math.floor(mouseRadian / minRadian)) % minRadian < minRadian / 2) {
          mouseRadian -= mouseRadian - minRadian * Math.floor(mouseRadian / minRadian)
        } else if ((minRadian - (mouseRadian - minRadian * Math.floor(mouseRadian / minRadian))) % minRadian < minRadian / 2) {
          mouseRadian += minRadian - (mouseRadian - minRadian * Math.floor(mouseRadian / minRadian))
        }

        if ((tfs.lastRadian - minRadian * Math.floor(tfs.lastRadian / minRadian)) % minRadian < minRadian / 2) {
          tfs.lastRadian -= tfs.lastRadian - minRadian * Math.floor(tfs.lastRadian / minRadian)
        } else if ((minRadian - (tfs.lastRadian - minRadian * Math.floor(tfs.lastRadian / minRadian))) % minRadian < minRadian / 2) {
          tfs.lastRadian += minRadian - (tfs.lastRadian - minRadian * Math.floor(tfs.lastRadian / minRadian))
        }

        let diffRadian = mouseRadian - tfs.lastRadian

        tfs.lastRadian = mouseRadian
        tfs.rotate(new THREE.Vector3(0, 0, diffRadian))
      }
      break
    }
  }
  
  tfs.updateController(tfs.stuff)
  return true
}
/**@description 鼠标点击事件 */
export function event_MouseDown(event: MouseEvent, tfs: Transformer3D) {
  // console.log('downevt', event)
  tfs.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  tfs.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  tfs.raycaster.setFromCamera(tfs.pointer, tfs.camera)
  const intersects = tfs.raycaster.intersectObjects(tfs.arrowArray, false)
  if (intersects.length > 0) {
    tfs.isDragging = true
    const object = intersects[0].object
    // console.log('箭头mesh', object.name)
    tfs.m_iSelected = Number(object.name)
    // console.log('选择的箭头', tfs.selectArrow)
    // tfs.scene.remove(tfs.meshBoundingBox)
    switch (Number(object.name)) {
      case ESelectArrow.ARROWX:
        tfs.lastMouseX = intersects[0].point.x
        tfs.updateController(tfs.stuff)
        tfs.showArrowOnMove(Number(object.name))
        return true
      case ESelectArrow.ARROWY:
        tfs.lastMouseY = intersects[0].point.y
        tfs.updateController(tfs.stuff)
        tfs.showArrowOnMove(Number(object.name))
        return true
      case ESelectArrow.ARROWZ:
        tfs.lastMouseZ = intersects[0].point.z
        tfs.updateController(tfs.stuff)
        tfs.showArrowOnMove(Number(object.name))
        return true
      case ESelectArrow.RINGX:
        tfs.lastRadian = -Math.atan2(intersects[0].point.y - tfs.stuff.m_Object3D.position.y, intersects[0].point.z - tfs.stuff.m_Object3D.position.z)
        process_ShowRotateArrow(tfs)
        process_ShowRotateRing(tfs)
        process_ShowRotateHelp(tfs)
        tfs.updateController(tfs.stuff)
        tfs.showArrowOnMove(Number(object.name))
        return true
      case ESelectArrow.RINGY:
        tfs.lastRadian = -Math.atan2(intersects[0].point.z - tfs.stuff.m_Object3D.position.z, intersects[0].point.x - tfs.stuff.m_Object3D.position.x)
        process_ShowRotateArrow(tfs)
        process_ShowRotateRing(tfs)
        process_ShowRotateHelp(tfs)
        tfs.updateController(tfs.stuff)
        tfs.showArrowOnMove(Number(object.name))
        return true
      case ESelectArrow.RINGZ:
        tfs.lastRadian = -Math.atan2(intersects[0].point.x - tfs.stuff.m_Object3D.position.x, intersects[0].point.y - tfs.stuff.m_Object3D.position.y)
        process_ShowRotateArrow(tfs)
        process_ShowRotateRing(tfs)
        process_ShowRotateHelp(tfs)
        tfs.updateController(tfs.stuff)
        tfs.showArrowOnMove(Number(object.name))
        return true
      default:
        return true
        break
    }
  } else {
    // 未点击到
    tfs.m_iSelected = -1
    tfs.updateController(tfs.stuff)
    return false
  }
  if (tfs.controller_3d == null) return false
}

/**@description 鼠标抬起事件 */
export function event_MouseUp(event: MouseEvent, tfs: Transformer3D, dragEnd: () => void) {
  // console.log('tsf mouse up')
  if (tfs.isDragging === true) {
    tfs.isDragging = false
    tfs.showBoundingBox(tfs.stuff)
    // tfs.orbCOntroller.enableRotate = false
    // console.log('拖动结束')
    dragEnd();
  }
  // 
  tfs.showArrowOnUp()
}
/**@description 键盘按下事件 */
export function event_KeyDown(event: KeyboardEvent, tfs: Transformer3D, config: { height: number }) {
  // console.log(event)

  switch (event.code) {
    case 'KeyD':
      tfs.dropDown();
      tfs.release()
      break;
    case 'KeyU':
      tfs.goCeiling();
      tfs.release()
      break
    case 'Space':
      // console.log('space');

      tfs.rotate(new THREE.Vector3(0, Math.PI / 2, 0))

      break

    default:
      break;
  }
}
