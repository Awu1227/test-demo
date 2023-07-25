import { BoxBufferGeometry, BoxGeometry, Mesh, MeshBasicMaterial } from "three";

export const createCube = () => {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2);

  // create a default (white) Basic material
  const material = new MeshBasicMaterial();

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  return cube;
};
