import * as THREE from "three";

export const createPlane = () => {
  // 单位为米
	const planeGeometry = new THREE.BoxGeometry( 2000, 2000 ,10,10);
  planeGeometry.rotateX( - Math.PI / 2 );

  // create a default (white) Basic material
  const planeMaterial = new THREE.MeshNormalMaterial( { color: 'red', opacity: 1 } );

  // create a Mesh containing the geometry and material
  const plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.name = '平面'
  // plane.position.y = - 200;
  // plane.receiveShadow = true;


  return plane;
};
