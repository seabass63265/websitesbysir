"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Portfolios & Personal Brands hero — a curved wall of looping videos that
 * leans toward the cursor, ported from the standalone `files 4` (Framecast)
 * Three.js demo. Differences from the demo: it sizes to its own section, not
 * the window; the 49 tiles share ten video elements/textures instead of
 * decoding 49 separate streams; it only renders (and plays) while on screen;
 * and everything is disposed on unmount.
 */
const VIDEOS = Array.from({ length: 10 }, (_, i) => `/portfolio-wall/v${i + 1}.mov`);

const params = {
  rows: 7,
  columns: 7,
  curvature: 5,
  spacing: 10,
  imageWidth: 7,
  imageHeight: 4.5,
  depth: 7.5,
  elevation: 0,
  lookAtRange: 20,
  verticalCurvature: 0.5,
};

type Tile = {
  mesh: THREE.Mesh;
  base: { x: number; y: number; z: number };
  baseRotation: { x: number; y: number; z: number };
  parallax: number;
  offset: { x: number; y: number; z: number };
  rotationModifier: { x: number; y: number; z: number };
  phase: number;
};

export default function VideoWallHero({ tagline }: { tagline?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const header = headerRef.current;
    if (!section || !canvas || !header) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, 1, 0.1, 1000);
    camera.position.set(0, 0, 40);

    function size() {
      const width = section!.clientWidth;
      const height = section!.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    size();

    // ---- shared videos, textures and materials ----
    let visible = true;
    const videos = VIDEOS.map((src) => {
      const video = document.createElement("video");
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.src = src;
      video.play().catch(() => {});
      return video;
    });
    const textures = videos.map((video) => {
      const texture = new THREE.VideoTexture(video);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    });
    const materials = textures.map(
      (map) => new THREE.MeshBasicMaterial({ map, side: THREE.DoubleSide })
    );
    const geometry = new THREE.PlaneGeometry(params.imageWidth, params.imageHeight);

    // ---- the wall ----
    function rotationsAt(x: number, y: number) {
      const a = 1 / (params.depth * params.curvature);
      const rotationY = Math.atan(-2 * a * x);
      const maxYDistance = (params.rows * params.spacing) / 2;
      const rotationX = (y / maxYDistance) * params.verticalCurvature;
      return { rotationX, rotationY };
    }

    const tiles: Tile[] = [];
    for (let row = 0; row < params.rows; row++) {
      for (let col = 0; col < params.columns; col++) {
        const x = (col - params.columns / 2) * params.spacing;
        let y = (row - params.rows / 2) * params.spacing;
        let z = (x * x) / (params.depth * params.curvature);
        const normalizedY = y / ((params.rows * params.spacing) / 2);
        z += Math.abs(normalizedY) * normalizedY * params.verticalCurvature * 5;
        y += params.elevation;
        const { rotationX, rotationY } = rotationsAt(x, y);

        const mesh = new THREE.Mesh(
          geometry,
          materials[Math.floor(Math.random() * materials.length)]
        );
        mesh.position.set(x, y, z);
        mesh.rotation.set(rotationX, rotationY, 0);
        scene.add(mesh);
        tiles.push({
          mesh,
          base: { x, y, z },
          baseRotation: { x: rotationX, y: rotationY, z: 0 },
          parallax: Math.random() * 0.5 + 0.5,
          offset: {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
            z: Math.random() * 2 - 1,
          },
          rotationModifier: {
            x: Math.random() * 0.15 - 0.075,
            y: Math.random() * 0.15 - 0.075,
            z: Math.random() * 0.2 - 0.1,
          },
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    // ---- pointer ----
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let headerRotationX = 0;
    let headerRotationY = 0;
    let headerTranslateZ = 0;
    const lookAt = new THREE.Vector3();

    function onPointerMove(event: PointerEvent) {
      const rect = section!.getBoundingClientRect();
      mouseX = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseY = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      headerRotationX = -mouseY * 30;
      headerRotationY = mouseX * 30;
      headerTranslateZ = Math.abs(mouseX * mouseY) * 50;
    }
    if (!reduceMotion) window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", size);

    let frameId = 0;
    function animate() {
      frameId = requestAnimationFrame(animate);
      if (!visible) return;

      header!.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${headerRotationX}deg) rotateY(${headerRotationY}deg) translateZ(${headerTranslateZ}px)`;

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      lookAt.x = targetX * params.lookAtRange;
      lookAt.y = -targetY * params.lookAtRange;
      lookAt.z = (lookAt.x * lookAt.x) / (params.depth * params.curvature);

      const time = performance.now() * 0.001;
      const mouseDistance = Math.sqrt(targetX * targetX + targetY * targetY);

      for (const tile of tiles) {
        const { mesh, base, baseRotation, parallax, offset, rotationModifier, phase } = tile;
        const parallaxX = targetX * parallax * 3 * offset.x;
        const parallaxY = targetY * parallax * 3 * offset.y;
        const oscillation = Math.sin(time + phase) * mouseDistance * 0.1;

        mesh.position.set(
          base.x + parallaxX + oscillation * offset.x,
          base.y + parallaxY + oscillation * offset.y,
          base.z + oscillation * offset.z * parallax
        );
        mesh.rotation.set(
          baseRotation.x +
            targetY * rotationModifier.x * mouseDistance +
            oscillation * rotationModifier.x * 0.2,
          baseRotation.y +
            targetX * rotationModifier.y * mouseDistance +
            oscillation * rotationModifier.y * 0.2,
          baseRotation.z +
            targetX * targetY * rotationModifier.z * 2 +
            oscillation * rotationModifier.z * 0.3
        );
      }

      camera.lookAt(lookAt);
      renderer.render(scene, camera);
    }
    frameId = requestAnimationFrame(animate);

    // Only render and decode video while the hero is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      videos.forEach((video) => {
        if (visible) video.play().catch(() => {});
        else video.pause();
      });
    });
    io.observe(section);

    return () => {
      cancelAnimationFrame(frameId);
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", size);
      geometry.dispose();
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      videos.forEach((video) => {
        video.pause();
        video.removeAttribute("src");
        video.load();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} className="video-wall border-b" aria-label="Portfolio showcase">
      <canvas ref={canvasRef} className="video-wall__canvas" />
      <div ref={headerRef} className="video-wall__header">
        <h1 className="video-wall__title">SIR_</h1>
        {tagline && <p className="video-wall__tagline">{tagline}</p>}
      </div>
    </section>
  );
}
