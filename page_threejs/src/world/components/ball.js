import * as THREE from 'three'

/**@description 创建球体 */
export default function createBall()  {

  const geometry = new THREE.SphereGeometry( 10, 32, 32 );

  // create a default (white) Basic material
  const material =  new THREE.MeshStandardMaterial( {
    color: 0xffffff,
    roughness: 0.5,
    metalness: 1.0
  } );
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load( '../textures/planets/earth_atmos_2048.jpg', function ( map ) {

    map.anisotropy = 4;
    map.encoding = THREE.sRGBEncoding;
    material.map = map;
    material.needsUpdate = true;

  } );
  textureLoader.load( '../textures/planets/earth_specular_2048.jpg', function ( map ) {
    map.anisotropy = 4;
    map.encoding = THREE.sRGBEncoding;
    material.metalnessMap = map;
    material.needsUpdate = true;

  } );


  const ball = new THREE.Mesh(geometry, material)
  ball.rotation.y = Math.PI;
  ball.castShadow = true;
  ball.name = 'damBoard'
  ball.position.set(0, 10, 0)

  const mirrBall = new THREE.Mesh(geometry, material)
  mirrBall.rotation.y = Math.PI;
  mirrBall.castShadow = true;
  mirrBall.name = 'damBoard'
  mirrBall.position.set(0, -10, 0)


  const radiansPerSecond = THREE.MathUtils.degToRad(30)

  // this method will be called once per frame
  ball.tick = (delta) => {
    // increase the ball's rotation each frame
    ball.rotation.z += radiansPerSecond * delta
    ball.rotation.x += radiansPerSecond * delta
    ball.rotation.y += radiansPerSecond * delta
  }
  mirrBall.tick = (delta) => {
    // increase the mirrBall's rotation each frame
    mirrBall.rotation.z += radiansPerSecond * delta
    mirrBall.rotation.x += radiansPerSecond * delta
    mirrBall.rotation.y += radiansPerSecond * delta
  }

  
  return [ball,mirrBall]
}
