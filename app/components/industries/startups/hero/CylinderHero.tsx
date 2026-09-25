"use client";

import { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Texture, Program, Mesh, Geometry } from "ogl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { headerHeight, type TextPosition } from "@/app/components/industries/heroConfig";

/**
 * Startups hero, option 1 — a cylinder of images that the camera flies around
 * and into as you scroll. The hero pins under the site header for a few
 * screens of scroll, then the page carries on. Ported from the Codrops
 * "cinematic scroll animations" demo 1 (OGL + GSAP), sized to its own stage
 * instead of the window and driven by the page's native scroll.
 */
const IMAGES = Array.from({ length: 12 }, (_, i) => `/startup-hero/img/img${i + 1}.webp`);

const PERSPECTIVES: { title: string; description?: string; position: TextPosition }[] = [
  { title: "From idea to launch", description: "Where every startup begins", position: "top" },
  { title: "Built to convert", description: "Sign-ups, demos, and traction", position: "center" },
  { title: "Ready for investors", description: "A story that earns the meeting", position: "center" },
  { title: "Puts your startup online.", position: "bottom" },
];

const IMAGE = { width: 1024, height: 1024 };
const PARTICLES = { count: 12, radius: 3.3, segments: 20, angleSpan: 0.3 };

const CYLINDER_VERTEX = /* glsl */ `
  attribute vec2 uv;
  attribute vec3 position;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const CYLINDER_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform sampler2D tMap;
  uniform float uDarkness;
  varying vec2 vUv;
  void main() {
    vec4 tex = texture2D(tMap, vUv);
    tex.rgb *= (1.0 - uDarkness);
    gl_FragColor = tex;
  }
`;
const PARTICLE_VERTEX = /* glsl */ `
  attribute vec3 position;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const PARTICLE_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  uniform float uOpacity;
  void main() {
    gl_FragColor = vec4(uColor, uOpacity);
  }
`;

type Particle = Mesh & {
  userData: { baseAngle: number; angleSpan: number; baseY: number; speed: number; radius: number };
};

/** object-fit: cover, drawn (flipped for WebGL) into a region of a 2D canvas. */
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = w / h;
  let sx = 0;
  let sy = 0;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  if (imgRatio > canvasRatio) {
    sw = img.naturalHeight * canvasRatio;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / canvasRatio;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.save();
  ctx.translate(x, y + h);
  ctx.scale(1, -1);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  ctx.restore();
}

export default function CylinderHero() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!outer || !stage || !canvas) return;

    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create("cinematicSilk", "0.45, 0.05, 0.55, 0.95");
    CustomEase.create("cinematicSmooth", "0.25, 0.1, 0.25, 1");
    CustomEase.create("cinematicFlow", "0.33, 0, 0.2, 1");
    CustomEase.create("cinematicLinear", "0.4, 0, 0.6, 1");

    let disposed = false;
    let frameId = 0;
    let visible = true;
    let timeline: gsap.core.Timeline | null = null;

    const renderer = new Renderer({
      canvas,
      width: stage.clientWidth,
      height: stage.clientHeight,
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 1);
    gl.disable(gl.CULL_FACE);

    const dims = () => {
      const width = stage.clientWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const radius = width > 768 ? 2.5 : 2.2;
      const height = width > 768 ? 2 : 1.2;
      const maxRadius = isMobile ? 1.8 : isTablet ? 2.2 : 2.5;
      return {
        radius,
        height,
        scale: maxRadius / radius,
        cameraZ: isMobile ? 6 : isTablet ? 7 : 8,
        fov: isMobile ? 50 : 45,
        isMobile,
      };
    };
    const initial = dims();

    const camera = new Camera(gl, { fov: initial.fov, aspect: stage.clientWidth / stage.clientHeight });
    const cameraAnim = { x: 0, y: 0, z: initial.cameraZ };
    camera.position.set(cameraAnim.x, cameraAnim.y, cameraAnim.z);
    const scene = new Transform();

    // ---- cylinder geometry ----
    const radialSegments = 64;
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    for (let y = 0; y <= 1; y++) {
      const yPos = (y - 0.5) * initial.height;
      for (let x = 0; x <= radialSegments; x++) {
        const u = x / radialSegments;
        const theta = u * Math.PI * 2;
        positions.push(Math.cos(theta) * initial.radius, yPos, Math.sin(theta) * initial.radius);
        uvs.push(u, 1 - y);
      }
    }
    for (let x = 0; x < radialSegments; x++) {
      const a = x;
      const b = a + radialSegments + 1;
      const c = a + 1;
      const d = b + 1;
      indices.push(a, b, c, b, d, c);
    }
    const geometry = new Geometry(gl, {
      position: { size: 3, data: new Float32Array(positions) },
      uv: { size: 2, data: new Float32Array(uvs) },
      index: { data: new Uint16Array(indices) },
    });

    // ---- one texture from all the images ----
    const hardwareLimit = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
    const safeLimit = initial.isMobile ? 2048 : Math.min(hardwareLimit, 8192);
    const totalWidth = IMAGE.width * IMAGES.length;
    const texScale = Math.min(1, safeLimit / totalWidth);
    const atlas = document.createElement("canvas");
    atlas.width = Math.floor(totalWidth * texScale);
    atlas.height = Math.floor(IMAGE.height * texScale);
    const ctx = atlas.getContext("2d", { alpha: false })!;

    const heightCorrection =
      (2 * Math.PI * initial.radius * (IMAGE.height / totalWidth)) / initial.height;

    let cylinder: Mesh | null = null;
    const particles: Particle[] = [];
    let lastRotation = 0;
    let velocity = 0;

    const applySize = () => {
      const d = dims();
      renderer.setSize(stage.clientWidth, stage.clientHeight);
      camera.perspective({ fov: d.fov, aspect: stage.clientWidth / stage.clientHeight });
      if (cylinder) {
        cylinder.scale.set(d.scale, d.isMobile ? d.scale * heightCorrection : d.scale, d.scale);
      }
    };
    let lastWidth = stage.clientWidth;
    const onResize = () => {
      // Mobile address bars change the height only; skip those to avoid a zoom jump.
      const width = stage.clientWidth;
      if (dims().isMobile && width === lastWidth) return;
      lastWidth = width;
      applySize();
    };
    window.addEventListener("resize", onResize);

    const loaded: HTMLImageElement[] = [];
    let count = 0;
    const build = () => {
      loaded.forEach((img, i) => {
        const x0 = Math.floor((i / IMAGES.length) * atlas.width);
        const x1 = Math.floor(((i + 1) / IMAGES.length) * atlas.width);
        drawImageCover(ctx, img, x0, 0, x1 - x0, atlas.height);
      });
      const texture = new Texture(gl, {
        wrapS: gl.CLAMP_TO_EDGE,
        wrapT: gl.CLAMP_TO_EDGE,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        generateMipmaps: false,
      });
      texture.image = atlas;
      texture.needsUpdate = true;

      const program = new Program(gl, {
        vertex: CYLINDER_VERTEX,
        fragment: CYLINDER_FRAGMENT,
        uniforms: { tMap: { value: texture }, uDarkness: { value: 0.3 } },
        cullFace: null,
      });
      cylinder = new Mesh(gl, { geometry, program });
      cylinder.setParent(scene);
      cylinder.rotation.y = 0.5;
      applySize();

      // camera flight + cylinder spin, scrubbed by the pinned scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: `top top+=${headerHeight()}`,
          end: "bottom bottom",
          scrub: 1,
        },
      });
      timeline = tl;
      const d = dims();
      tl.to(cameraAnim, { x: 0, y: 0, z: d.cameraZ, duration: 1, ease: "cinematicSilk" })
        .to(cameraAnim, { x: 0, y: 5, z: 5, duration: 1, ease: "cinematicFlow" })
        .to(cameraAnim, { x: 1.5, y: 2, z: 2, duration: 2, ease: "cinematicLinear" })
        .to(cameraAnim, { x: 0.5, y: 0, z: 0.8, duration: 3.5, ease: "power1.inOut" })
        .to(cameraAnim, { x: -6, y: -1, z: d.cameraZ, duration: 1, ease: "cinematicSmooth" });
      tl.to(cylinder.rotation, { y: "+=28.27", duration: 8.5, ease: "none" }, 0);

      // text fades, spread evenly over the same timeline
      const total = 8.5;
      const section = total / PERSPECTIVES.length;
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = i * section;
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: section * 0.2, ease: "cinematicSmooth" }, start)
          .to(el, { opacity: 1, duration: section * 0.6, ease: "none" }, start + section * 0.2)
          .to(el, { opacity: 0, duration: section * 0.2, ease: "cinematicSmooth" }, start + section * 0.8);
      });
      if (hintRef.current) tl.to(hintRef.current, { opacity: 0, duration: 0.4 }, 0);

      // speed streaks
      for (let i = 0; i < PARTICLES.count; i++) {
        const startAngle = (i / PARTICLES.count) * Math.PI * 2;
        const top = i < PARTICLES.count / 2;
        const baseY = top
          ? initial.height * 0.7 + Math.random() * initial.height * 0.3
          : -initial.height + Math.random() * initial.height * 0.3;
        const line: number[] = [];
        for (let j = 0; j <= PARTICLES.segments; j++) {
          const angle = startAngle + PARTICLES.angleSpan * (j / PARTICLES.segments);
          line.push(Math.cos(angle) * PARTICLES.radius, baseY, Math.sin(angle) * PARTICLES.radius);
        }
        const particle = new Mesh(gl, {
          geometry: new Geometry(gl, { position: { size: 3, data: new Float32Array(line) } }),
          program: new Program(gl, {
            vertex: PARTICLE_VERTEX,
            fragment: PARTICLE_FRAGMENT,
            uniforms: { uColor: { value: [1, 1, 1] }, uOpacity: { value: 0 } },
            transparent: true,
            depthTest: true,
          }),
          mode: gl.LINE_STRIP,
        }) as Particle;
        particle.userData = {
          baseAngle: startAngle,
          angleSpan: PARTICLES.angleSpan,
          baseY,
          speed: 0.5 + Math.random(),
          radius: PARTICLES.radius,
        };
        particle.setParent(scene);
        particles.push(particle);
      }

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (!visible) return;
        camera.position.set(cameraAnim.x, cameraAnim.y, cameraAnim.z);
        camera.lookAt([0, 0, 0]);

        const rotation = cylinder!.rotation.y;
        velocity = rotation - lastRotation;
        lastRotation = rotation;
        const speed = Math.abs(velocity) * 100;
        const rotating = Math.abs(velocity) > 0.0001;

        for (const particle of particles) {
          const u = particle.userData;
          const target = rotating ? Math.min(speed * 3, 0.95) : 0;
          const current = particle.program.uniforms.uOpacity.value as number;
          particle.program.uniforms.uOpacity.value = current + (target - current) * 0.15;
          if (rotating) {
            u.baseAngle += velocity * u.speed * 1.5;
            const data = particle.geometry.attributes.position.data as Float32Array;
            for (let j = 0; j <= PARTICLES.segments; j++) {
              const angle = u.baseAngle + u.angleSpan * (j / PARTICLES.segments);
              data[j * 3] = Math.cos(angle) * u.radius;
              data[j * 3 + 1] = u.baseY;
              data[j * 3 + 2] = Math.sin(angle) * u.radius;
            }
            particle.geometry.attributes.position.needsUpdate = true;
          }
        }
        renderer.render({ scene, camera });
      };
      animate();
    };

    IMAGES.forEach((src, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (disposed) return;
        loaded[i] = img;
        count++;
        if (count === IMAGES.length) build();
      };
      img.src = src;
    });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(stage);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      // (The GL context isn't force-lost here: React's dev double-mount and Fast
      // Refresh reuse this same canvas, and a lost context would break the rerun.)
    };
  }, []);

  return (
    <div ref={outerRef} className="startup-hero startup-hero--cylinder border-b">
      <div ref={stageRef} className="startup-hero__stage">
        <canvas ref={canvasRef} className="startup-hero__canvas" />
        <div className="startup-hero__texts">
          {PERSPECTIVES.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className="startup-hero__text startup-hero__text--light"
              data-position={p.position}
            >
              <h2 className="startup-hero__title">{p.title}</h2>
              {p.description && <p className="startup-hero__subtitle">{p.description}</p>}
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
