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
  m_Object3D: THREE.Object3D; // 3d实体，如果实例的名称不一样，要实现一个get方法！！！
  isLock: boolean
  setLock: (isLock: boolean) => void
  destroy: () => void
  setHighLight: (val: boolean) => void;
  setVisible: (isV: boolean) => void
  linePosition?: THREE.Vector3
  move?: (vect3: THREE.Vector3) => void
  rotate?: (vect3: THREE.Vector3) => void

  goCeiling?: (y: number) => void; // 到天花上
  dropDown?: (y: number) => void; // 落下

  mirrorX?: () => void
  mirrorY?: () => void
  mirrorZ?: () => void
  copy?: () => void
}

export interface ITransformer3D {
  mousedown: (event: MouseEvent) => boolean
  mousemove: (event: MouseEvent) => boolean
  mouseup: (event: MouseEvent, dragEnd: () => void) => void
}

export enum ERotateArrow {
  NONE = 'none',
  X = 'x',
  Y = 'y',
  Z = 'z',
  XY = 'xy',
  XZ = 'xz',
  YZ = 'yz',
  XYZ = 'xyz'
}