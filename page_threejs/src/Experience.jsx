import { useFrame } from '@react-three/fiber';
function Experience() {
  useFrame((state, delta) => {});
  return (
    <mesh>
      <torusKnotGeometry />
      <meshNormalMaterial />
    </mesh>
  );
}
export default Experience;
