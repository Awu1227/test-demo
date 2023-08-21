import {
  BoxBufferGeometry,
  BoxGeometry,
  TorusKnotGeometry,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MathUtils,
  MeshNormalMaterial
} from "three";

export const createTorusKnot = () => {
  // 单位为米
  const geometry = new TorusKnotGeometry(2, 0.8, 100, 8);

  // create a default (white) Basic material
  const material = new MeshNormalMaterial({ color: "purple" });

  // create a Mesh containing the geometry and material
  const torusKnot = new Mesh(geometry, material);

  const radiansPerSecond = MathUtils.degToRad(30);

  // this method will be called once per frame
  torusKnot.tick = (delta) => {
    // increase the torusKnot's rotation each frame
    torusKnot.rotation.z += radiansPerSecond * delta;
    torusKnot.rotation.x += radiansPerSecond * delta;
    torusKnot.rotation.y += radiansPerSecond * delta;
  };

  console.log(torusKnot.matrixWorld);
  // torusKnot.matrixWorld = new Matrix4();
  // torusKnot.matrix = new Matrix4();
  // torusKnot.updateMatrix();
  // torusKnot.updateMatrixWorld();

  torusKnot.rotation.set(-0.5, -0.1, 0.8);

  return torusKnot;
};
