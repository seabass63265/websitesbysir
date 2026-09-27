"use client";

/**
 * Small live 3D helmet for the founder portrait box on /why-sir — the same
 * model as the hero scene, but in polished navy chrome (glass would vanish
 * on the white box) with a slow sway so the reflections travel across it.
 * Mount through FounderHelmet, which lazy-loads this file.
 */

import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { Box3, Mesh, MeshPhysicalMaterial, Object3D, Vector3 } from "three";

const BASE_X = Math.PI / 8;
const BASE_Y = Math.PI / 2;

function Helmet() {
  const gltf = useGLTF("/models/helmet.glb");
  const groupRef = useRef<Object3D>(null);

  const { scene, scale, offset } = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    const material = new MeshPhysicalMaterial({
      color: "#0a4a80",
      metalness: 1,
      roughness: 0.06,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      envMapIntensity: 1.6,
    });
    cloned.traverse((object) => {
      if (object instanceof Mesh) object.material = material;
    });
    const box = new Box3().setFromObject(cloned);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    return {
      scene: cloned,
      scale: 4.4 / Math.max(size.x, size.y, size.z),
      offset: center.multiplyScalar(-1),
    };
  }, [gltf.scene]);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.x = BASE_X;
    group.rotation.y = BASE_Y + Math.sin(clock.getElapsedTime() * 0.7) * 0.55;
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={scene} position={offset} />
    </group>
  );
}

export default function FounderHelmetScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      gl={{ alpha: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Environment preset="studio" />
        <Helmet />
      </Suspense>
    </Canvas>
  );
}
