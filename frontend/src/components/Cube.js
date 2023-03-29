import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Cube() {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01; // Rotate the cube every frame
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default Cube;
