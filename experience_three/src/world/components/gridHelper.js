import * as THREE from 'three'

export const createGridHelper = () => {
  // 单位为米
  const helper = new THREE.GridHelper(5000, 200, 'grey','grey')
  // helper.position.y = - 199;
  // helper.material.opacity = 0.25
  helper.material.transparent = true

  return helper
}
