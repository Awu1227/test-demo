/**@description 选择的箭头 */
export enum ESelectArrow {
  NONE = 0,
  ARROWX,
  ARROWY,
  ARROWZ,
  RINGX,
  RINGY,
  RINGZ
}

/**@description 传入的stuff */
export interface Istuff {
  m_Object3D: THREE.Object3D
  destory()
  setVisible()
  move?: (vect3: THREE.Vector3) => any
  rotate?: (vect3: THREE.Vector3) => any
}
