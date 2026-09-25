"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import * as THREE from "three";
import { headerHeight } from "@/app/components/industries/heroConfig";
import { skyscraperScenes } from "@/app/components/industries/something-else/hero/skyscraperScenes";

/**
 * Something Else hero — a cyberpunk skyscraper the camera flies around
 * and up as you scroll, with a caption for each stop. The hero pins under the
 * site header for several screens of scroll, then the page carries on. Ported
 * from the Codrops "cinematic scroll animations" demo 2 (React Three Fiber +
 * GSAP SplitText), sized to its own stage and driven by native scroll.
 */
const MODEL_URL = "/something-else-hero/cyberpunk_skyscraper.glb";

type Vec = { x: number; y: number; z: number };

function Building() {
  const { scene } = useGLTF(MODEL_URL);
  useEffect(() => {
    scene.scale.set(3, 3, 3);
    scene.position.set(0, 0, 0);
  }, [scene]);
  return <primitive object={scene} />;
}

function AnimatedCamera({ cameraRef, targetRef }: { cameraRef: React.RefObject<Vec>; targetRef: React.RefObject<Vec> }) {
  const camera = useRef<THREE.PerspectiveCamera>(null);
  const set = useThree((state) => state.set);

  useEffect(() => {
    if (camera.current) set({ camera: camera.current });
  }, [set]);

  useFrame(() => {
    if (!camera.current) return;
    const { x, y, z } = cameraRef.current;
    camera.current.position.set(x, y, z);
    camera.current.lookAt(targetRef.current.x, targetRef.current.y, targetRef.current.z);
  });

  return <PerspectiveCamera ref={camera} makeDefault fov={45} near={1} far={1000} position={[0, 5, 10]} />;
}

function Scene({ cameraRef, targetRef }: { cameraRef: React.RefObject<Vec>; targetRef: React.RefObject<Vec> }) {
  return (
    <>
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 12, 28]} />
      <AnimatedCamera cameraRef={cameraRef} targetRef={targetRef} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} />
      <directionalLight position={[-10, 10, -10]} intensity={0.6} />
      <pointLight position={[0, 50, 20]} intensity={0.8} color="#00ffff" />
      <Building />
    </>
  );
}

export default function SkyscraperHero() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<Vec>({ x: -20, y: 0, z: 0 });
  const targetRef = useRef<Vec>({ x: 0, y: 15, z: 0 });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    let timeline: gsap.core.Timeline | null = null;
    const splits: SplitText[] = [];
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: `top top+=${headerHeight()}`,
          end: "bottom bottom",
          scrub: true,
        },
      });
      timeline = tl;

      // camera + look-at target, one segment per scene
      skyscraperScenes.forEach((scene) => {
        const start = scene.scrollProgress.start / 100;
        const length = scene.scrollProgress.end / 100 - start;
        tl.to(cameraRef.current, { ...scene.camera, duration: length, ease: "none" }, start);
        tl.to(targetRef.current, { ...scene.target, duration: length, ease: "none" }, start);
      });

      // captions: letters slide in, hold, slide out — each squeezed into its scene's span
      skyscraperScenes.forEach((scene, index) => {
        const el = textRefs.current[index];
        if (!el) return;
        if (scene.hideText) {
          gsap.set(el, { opacity: 0, pointerEvents: "none" });
          return;
        }
        const title = el.querySelector("h2");
        const subtitle = el.querySelector("p");
        if (!title || !subtitle) return;
        const titleSplit = new SplitText(title, { type: "chars" });
        const subtitleSplit = new SplitText(subtitle, { type: "chars" });
        splits.push(titleSplit, subtitleSplit);
        const chars = [subtitleSplit.chars, titleSplit.chars];

        const local = gsap.timeline();
        if (index === 0) {
          gsap.set(chars, { x: 0, opacity: 1 });
          local.to(chars, { x: 100, opacity: 0, duration: 1, stagger: -0.02, ease: "power2.in" });
        } else {
          const last = index === skyscraperScenes.length - 1;
          local
            .fromTo(
              chars,
              { x: -100, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: last ? 0.2 : 0.25,
                stagger: last ? -0.01 : -0.02,
                ease: "power2.out",
              }
            )
            .to({}, { duration: last ? 1 : 0.5 })
            .to(chars, { x: 100, opacity: 0, duration: 0.25, stagger: -0.02, ease: "power2.in" });
        }
        const span = (scene.scrollProgress.end - scene.scrollProgress.start) / 100;
        local.timeScale(local.totalDuration() / span);
        tl.add(local, scene.scrollProgress.start / 100);
      });

      if (hintRef.current) tl.to(hintRef.current, { opacity: 0, duration: 0.03 }, 0);
    });

    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(stage);

    return () => {
      cancelled = true;
      io.disconnect();
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      splits.forEach((split) => split.revert());
    };
  }, []);

  return (
    <div ref={outerRef} className="startup-hero startup-hero--skyscraper border-b">
      <div ref={stageRef} className="startup-hero__stage">
        <Canvas
          className="startup-hero__canvas"
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          style={{ background: "#0a0a0a" }}
        >
          <Scene cameraRef={cameraRef} targetRef={targetRef} />
        </Canvas>
        <div className="startup-hero__texts">
          {skyscraperScenes.map((scene, index) => (
            <div
              key={index}
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              className="startup-hero__text"
              data-position={scene.position}
            >
              <h2 className="startup-hero__title startup-hero__title--bold">{scene.title}</h2>
              <p className="startup-hero__subtitle">{scene.subtitle}</p>
            </div>
          ))}
        </div>
        <div ref={hintRef} className="startup-hero__hint" aria-hidden="true">
          <span>Scroll</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
