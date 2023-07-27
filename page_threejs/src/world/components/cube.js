import {
  BoxBufferGeometry,
  BoxGeometry,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
} from "three";

export const createCube = () => {
  // 单位为米
  const geometry = new BoxGeometry(2, 2, 2);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({ color: "purple" });

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  cube.position.x = -0.5;
  cube.position.y = -0.1;
  cube.position.z = 1;

  cube.scale.x = 1.25;
  cube.scale.y = 0.25;
  cube.scale.z = 0.5;

  console.log(cube.matrixWorld);
  // cube.matrixWorld = new Matrix4();
  // cube.matrix = new Matrix4();
  // cube.updateMatrix();
  // cube.updateMatrixWorld();

  cube.rotation.set(-0.5, -0.1, 0.8);

  return cube;
};
