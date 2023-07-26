import { BoxBufferGeometry, BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";

export const createCube = () => {
  // 单位为米
  const geometry = new BoxGeometry(2, 2, 2);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({color: 'purple'});

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  cube.rotation.set(-0.5, -0.1, 0.8)

  return cube;
};
