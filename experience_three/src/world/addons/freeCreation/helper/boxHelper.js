import * as THREE from 'three'
import { createBufferMesh } from '../components/bufferMesh'
export const createBoxHelper = (object = createBufferMesh()) => {
  const box = new THREE.BoxHelper(object, 'lightblue')
  return box
}
