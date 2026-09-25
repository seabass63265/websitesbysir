"use client";

/**
 * Embedded 3D helmet scene — a glass helmet inside a rotating tube of
 * image tiles over a warped grid. Ported from the standalone
 * `helmet-main` project into a normal in-page section: sized to its
 * container instead of the viewport, hover slows the spin, wheel/drag
 * over it spins the tube. Client-only (WebGL) — mount through
 * HelmetSection, which lazy-loads this file.
 */

import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useMemo, useRef } from "react";
import { GALLERY_VIDEOS } from "./galleryVideos";
import {
  DoubleSide,
  Mesh,
  MeshPhysicalMaterial,
  Object3D,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  VideoTexture,
} from "three";

function GridPlane({
  targetCenterUv,
}: {
  targetCenterUv: React.MutableRefObject<Vector2>;
}) {
  const meshRef = useRef<Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uGridScale: { value: 28.0 },
      uLineWidth: { value: 0.5 },
      uEdgeWidth: { value: 0.14 },
      uEdgeAmp: { value: 1.35 },
      uCenterRadius: { value: 0.22 },
      uCenterAmp: { value: 0.9 },
      uCenter: { value: new Vector2(0.5, 0.5) },
      uTime: { value: 0.0 },
      uScrollSpeed: { value: 0.01 },
      uResolution: { value: new Vector2(1, 1) },
    }),
    [],
  );

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const material = mesh.material as ShaderMaterial;

    material.uniforms.uTime.value = state.clock.getElapsedTime();
    (material.uniforms.uCenter.value as Vector2).lerp(targetCenterUv.current, 0.08);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5.2]}>
      <planeGeometry args={[18, 18, 512, 512]} />
      <shaderMaterial
        attach="material"
        args={[
          {
            uniforms,
            vertexShader: `
                varying vec2 vUv;
                
                uniform float uEdgeWidth;
                uniform float uEdgeAmp;
                uniform float uCenterRadius;
                uniform float uCenterAmp;
                uniform vec2 uCenter;

                void main() {
                  vUv = uv;

                  vec3 p = position;

                  float dEdge = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
                  float edgeMask = 1.0 - smoothstep(0.0, uEdgeWidth, dEdge);

                  float dCenter = distance(vUv, uCenter);
                  float centerMask = 1.0 - smoothstep(0.0, uCenterRadius, dCenter);

                  float zOffset = edgeMask * uEdgeAmp + centerMask * uCenterAmp;
                  p.z += zOffset;

                  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
                }
              `,
            fragmentShader: `
                varying vec2 vUv;
                
                uniform float uGridScale;
                uniform float uLineWidth;
                uniform float uTime;
                uniform float uScrollSpeed;
                uniform vec2 uResolution;

                float gridLine(float coord, float width) {
                  float fw = fwidth(coord);
                  float p = abs(fract(coord - 0.5) - 0.5);
                  return 1.0 - smoothstep(width * fw, (width + 1.0) * fw, p);
                }

                void main() {
                  vec2 uv = (vUv + vec2(uTime * uScrollSpeed, 0.0)) * uGridScale;
                  float gx = gridLine(uv.x, uLineWidth);
                  float gy = gridLine(uv.y, uLineWidth);
                  float g = max(gx, gy);

                  vec3 base = vec3(0.);
                  vec3 line = vec3(0.1);
                  vec3 col = mix(base, line, g);
                  gl_FragColor = vec4(col, 1.);
                }
              `,
            side: DoubleSide,
          },
        ]}
      />
    </mesh>
  );
}

function HelmetModel({ tubeAngleRef }: { tubeAngleRef: React.MutableRefObject<number> }) {
  const helmet = useGLTF("/models/helmet.glb");

  const scene = useMemo(() => helmet.scene.clone(true), [helmet.scene]);
  const modelRef = useRef<Object3D>(null);
  const baseRotation = useMemo(() => ({ x: Math.PI / 8, y: Math.PI / 2 }), []);
  const glassMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        transmission: 1,
        thickness: 10,
        roughness: 0,
        metalness: 0.1,
        ior: 1.9,
        dispersion: 1,
        clearcoat: 0.1,
        clearcoatRoughness: 1.1,
        iridescenceThicknessRange: [100, 400],
        transparent: true,
        depthWrite: true,
      }),
    [],
  );

  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.scale.set(0.7, 0.7, 0.7);
        object.material = glassMaterial;
        object.material.needsUpdate = true;
      }
    });

    return () => {
      glassMaterial.dispose();
    };
  }, [scene, glassMaterial]);

  useFrame(() => {
    const obj = modelRef.current;
    if (!obj) return;
    obj.rotation.x = baseRotation.x;
    obj.rotation.y = baseRotation.y - tubeAngleRef.current;
  });

  return (
    <primitive ref={modelRef} object={scene} rotation={[baseRotation.x, baseRotation.y, 0]} />
  );
}

const TILE_W = 1.4;
const TILE_H = 0.875;

/**
 * One looping, muted VideoTexture per clip, cover-cropped to the tile's
 * aspect ratio once the clip's real dimensions are known. Textures are
 * shared by every tile that shows the same clip.
 */
function useVideoTextures(urls: string[], tileAspect: number) {
  const items = useMemo(
    () =>
      urls.map((url) => {
        const video = document.createElement("video");
        video.src = url;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        const texture = new VideoTexture(video);
        texture.colorSpace = SRGBColorSpace;
        video.addEventListener("loadedmetadata", () => {
          const videoAspect = video.videoWidth / video.videoHeight;
          if (!videoAspect) return;
          if (videoAspect > tileAspect) {
            texture.repeat.set(tileAspect / videoAspect, 1);
            texture.offset.set((1 - tileAspect / videoAspect) / 2, 0);
          } else {
            texture.repeat.set(1, videoAspect / tileAspect);
            texture.offset.set(0, (1 - videoAspect / tileAspect) / 2);
          }
        });
        return { video, texture };
      }),
    [urls, tileAspect],
  );

  useEffect(() => {
    items.forEach(({ video }) => {
      video.play().catch(() => {});
    });
    return () => {
      items.forEach(({ video, texture }) => {
        video.pause();
        texture.dispose();
      });
    };
  }, [items]);

  return items.map((item) => item.texture);
}

function ImageTube({
    scrollTargetRef,
    spinVelocityRef,
    naturalDirRef,
    tubeAngleRef,
    rotationSpeedScaleTargetRef,
    rotationSpeedScaleLerpRef,
    baseSpeedRef,
    rows,
    cols,
    onHoverStart,
    onHoverMove,
    onHoverEnd,
  }: {
    scrollTargetRef: React.MutableRefObject<number>;
    spinVelocityRef: React.MutableRefObject<number>;
    naturalDirRef: React.MutableRefObject<number>;
    tubeAngleRef: React.MutableRefObject<number>;
    rotationSpeedScaleTargetRef: React.MutableRefObject<number>;
    rotationSpeedScaleLerpRef: React.MutableRefObject<number>;
    baseSpeedRef: React.MutableRefObject<number>;
    rows: number;
    cols: number;
    onHoverStart: (projectName: string, event: ThreeEvent<PointerEvent>) => void;
    onHoverMove: (event: ThreeEvent<PointerEvent>) => void;
    onHoverEnd: () => void;
  }) {
    const groupRef = useRef<Object3D>(null);
    const rowGroupRefs = useRef<Array<Object3D | null>>([]);
    const scrollCurrent = useRef(0);
    const angle = useRef(0);
    const rotationSpeedScale = useRef(1);

    const textures = useVideoTextures(GALLERY_VIDEOS, TILE_W / TILE_H);

    const radius = 4;
    const tileW = TILE_W;
    const tileH = TILE_H;
    const ySpacing = 2.7;
    const loopHeight = rows * ySpacing;
    const repeatCount = 3;
    const totalRows = rows * repeatCount;

    const rowSpeed = useMemo(() => {
      const speeds: number[] = [];
      for (let r = 0; r < rows; r++) {
        const t = rows <= 1 ? 0 : r / (rows - 1);
        speeds.push(0.65 + t * 0.9);
      }
      return speeds;
    }, [rows]);

    const rowPositions = useMemo(() => {
      const out: Array<{ rowIndex: number; y: number; baseRow: number; rowOffset: number }> = [];
      for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
        const y = (rowIndex - (totalRows - 1) / 2) * ySpacing;
        const baseRow = rowIndex % rows;
        const rowOffset = baseRow % 2 === 0 ? 0 : 0.5;
        out.push({ rowIndex, y, baseRow, rowOffset });
      }
      return out;
    }, [rows, totalRows, ySpacing]);

    useFrame((_state, dt) => {
      scrollCurrent.current += (scrollTargetRef.current - scrollCurrent.current) * 0.12;

      if (scrollCurrent.current > loopHeight / 2) {
        scrollCurrent.current -= loopHeight;
        scrollTargetRef.current -= loopHeight;
      } else if (scrollCurrent.current < -loopHeight / 2) {
        scrollCurrent.current += loopHeight;
        scrollTargetRef.current += loopHeight;
      }

      const damping = 0.92;
      spinVelocityRef.current *= Math.pow(damping, dt * 60);
      spinVelocityRef.current = Math.max(-2.0, Math.min(2.0, spinVelocityRef.current));

      rotationSpeedScale.current +=
        (rotationSpeedScaleTargetRef.current - rotationSpeedScale.current) *
        rotationSpeedScaleLerpRef.current;

      const scaledDt = dt * rotationSpeedScale.current;

      const baseSpeed = naturalDirRef.current * baseSpeedRef.current;
      angle.current += (baseSpeed + spinVelocityRef.current) * scaledDt;

      tubeAngleRef.current = angle.current;

      const group = groupRef.current;
      if (!group) return;
      group.position.y = -scrollCurrent.current;

      for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
        const rowObj = rowGroupRefs.current[rowIndex];
        if (!rowObj) continue;
        const baseRow = rowIndex % rows;
        rowObj.rotation.y = angle.current * rowSpeed[baseRow];
      }
    });

    return (
      <group ref={groupRef}>
        {rowPositions.map(({ rowIndex, y, baseRow, rowOffset }) => (
          <group
            key={rowIndex}
            position={[0, y, 0]}
            ref={(obj) => {
              rowGroupRefs.current[rowIndex] = obj;
            }}
          >
            {Array.from({ length: cols }).map((_, col) => {
              const theta = ((col + rowOffset) / cols) * Math.PI * 2;
              const x = Math.cos(theta) * radius;
              const z = Math.sin(theta) * radius;
              const ry = -(theta + Math.PI / 2);
              const texIndex = (baseRow * cols + col) % textures.length;

              return (
                <mesh
                  key={col}
                  position={[x, 0, z]}
                  rotation={[0, ry, 0]}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    onHoverStart("", e);
                  }}
                  onPointerMove={(e) => {
                    e.stopPropagation();
                    onHoverMove(e);
                  }}
                  onPointerOut={(e) => {
                    e.stopPropagation();
                    onHoverEnd();
                  }}
                >
                  <planeGeometry args={[tileW, tileH]} />
                  <meshBasicMaterial map={textures[texIndex]} toneMapped={false} side={DoubleSide} />
                </mesh>
              );
            })}
          </group>
        ))}
      </group>
    );
  }

export default function HelmetScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetCenterUv = useRef(new Vector2(0.5, 0.5));
  const tubeScrollTarget = useRef(0);
  const tubeSpinVelocity = useRef(0);
  const tubeNaturalDir = useRef(1);
  const tubeAngle = useRef(0);

  const baseSpeedRef = useRef(0.25);
  const rotationSpeedScaleTargetRef = useRef(1);
  const rotationSpeedScaleLerpRef = useRef(0.12);

  const cursorElRef = useRef<HTMLDivElement | null>(null);
  const cursorTarget = useRef({ x: 0, y: 0 });
  const cursorCurrent = useRef({ x: 0, y: 0 });
  const cursorActive = useRef(false);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = cursorElRef.current;
      if (el) {
        cursorCurrent.current.x += (cursorTarget.current.x - cursorCurrent.current.x) * 0.14;
        cursorCurrent.current.y += (cursorTarget.current.y - cursorCurrent.current.y) * 0.14;
        el.style.transform = `translate3d(${cursorCurrent.current.x.toFixed(2)}px, ${cursorCurrent.current.y.toFixed(2)}px, 0) translate(-50%, -50%)`;
        el.style.opacity = cursorActive.current ? "1" : "0";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onImageHoverStart = useCallback(() => {
    rotationSpeedScaleTargetRef.current = 0.35;
  }, []);
  const onImageHoverMove = useCallback(() => {}, []);
  const onImageHoverEnd = useCallback(() => {
    rotationSpeedScaleTargetRef.current = 1;
  }, []);

  const onPointerEnter = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    cursorTarget.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    cursorCurrent.current = { ...cursorTarget.current };
    cursorActive.current = true;
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    cursorTarget.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };

    const uvX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const uvY = 1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    const strength = 0.4;
    targetCenterUv.current.set(
      Math.min(1, Math.max(0, 0.5 + (uvX - 0.5) * strength)),
      Math.min(1, Math.max(0, 0.5 + (uvY - 0.5) * strength)),
    );
  }, []);

  const onPointerLeave = useCallback(() => {
    targetCenterUv.current.set(0.5, 0.5);
    onImageHoverEnd();
    cursorActive.current = false;
  }, [onImageHoverEnd]);

  const onWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    tubeScrollTarget.current += event.deltaY * 0.002;
    tubeSpinVelocity.current += event.deltaY * 0.004;

    if (event.deltaY < 0) tubeNaturalDir.current = -1;
    else if (event.deltaY > 0) tubeNaturalDir.current = 1;
  }, []);

  return (
    <div
      className="helmet-scene"
      ref={containerRef}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onWheel={onWheel}
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, 0);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <Environment preset="studio" blur={10.5} />

          <GridPlane targetCenterUv={targetCenterUv} />

          <ImageTube
            scrollTargetRef={tubeScrollTarget}
            spinVelocityRef={tubeSpinVelocity}
            naturalDirRef={tubeNaturalDir}
            tubeAngleRef={tubeAngle}
            rotationSpeedScaleTargetRef={rotationSpeedScaleTargetRef}
            rotationSpeedScaleLerpRef={rotationSpeedScaleLerpRef}
            baseSpeedRef={baseSpeedRef}
            rows={5}
            cols={12}
            onHoverStart={onImageHoverStart}
            onHoverMove={onImageHoverMove}
            onHoverEnd={onImageHoverEnd}
          />

          <HelmetModel tubeAngleRef={tubeAngle} />
        </Suspense>
      </Canvas>

      <div className="helmet-scene__cursor" ref={cursorElRef} aria-hidden="true" />
    </div>
  );
}

useGLTF.preload("/models/helmet.glb");
