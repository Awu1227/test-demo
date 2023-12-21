import { BoxGeometry, Mesh, MeshStandardMaterial, MathUtils } from 'three'

export const createCube = () => {
  // 单位为米
  const geometry = new BoxGeometry(2, 2, 2)

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({ color: 'purple' })

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)
  cube.name = 'cube'
  cube.position.set(0, 8, 0)
  const radiansPerSecond = MathUtils.degToRad(30)

  // this method will be called once per frame
  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.z = radiansPerSecond * delta
    cube.rotation.x += radiansPerSecond * delta
    cube.rotation.y += radiansPerSecond * delta
  }
  // cube.matrixWorld = new Matrix4();
  // cube.matrix = new Matrix4();
  // cube.updateMatrix();
  // cube.updateMatrixWorld();

  return cube
}
