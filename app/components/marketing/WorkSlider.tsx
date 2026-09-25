"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Infinite vertical image slider — ported from the standalone
 * `app/components/files/` (CodeGrid Three.js demo) into the /work page.
 *
 * Behavioral changes from the original (which was a whole standalone HTML
 * page, so it could safely own every wheel/touch/mouse event on `window`):
 *  - All input listeners are scoped to this section's own element instead
 *    of `window`, so scrolling/touching the rest of the site (header above,
 *    contact form below) still works normally — only interacting while
 *    over the slider drives it.
 *  - Sizing comes from the section's own bounding box, not the viewport.
 *  - Renderer, geometries, textures, and every listener are disposed on
 *    unmount (the original never needed to — it was the whole page).
 *  - The decorative wave-distortion effect is skipped under
 *    prefers-reduced-motion; scrolling still works either way.
 *
 * `slides` is now a prop (was a hardcoded module-level array) so the same
 * slider can be re-mounted with a different image set — see
 * `SliderContent.tsx` and `WorkShowcase.tsx`, which switch collections via
 * a filter bar and remount this component with a `key` change per
 * collection.
 */
export type Slide = { name: string; img: string };

const config = {
  minHeight: 1,
  maxHeight: 1.5,
  aspectRatio: 1.5,
  gap: 0.05,
  smoothing: 0.05,
  distortionStrength: 2.5,
  distortionSmoothing: 0.1,
  momentumFriction: 0.95,
  momentumThreshold: 0.001,
  wheelSpeed: 0.01,
  wheelMax: 150,
  dragSpeed: 0.01,
  dragMomentum: 0.01,
  touchSpeed: 0.01,
  touchMomentum: 0.1,
  glideDistance: 3.5,
};

const wrap = (value: number, range: number) => ((value % range) + range) % range;
const zeroPad = (n: number) => String(n).padStart(2, "0");
const isVideoSrc = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

export default function WorkSlider({
  slides,
  glideIn = false,
}: {
  slides: Slide[];
  /** Start scrolled off and glide the slides into place (used when the
   * visitor switches category, so the new set eases in instead of cutting). */
  glideIn?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const titleEl = titleRef.current;
    const counterEl = counterRef.current;
    const markerEl = markerRef.current;
    const infoEl = infoRef.current;
    if (!section || !canvas || !titleEl || !counterEl || !markerEl || !infoEl) return;
    const markerPosition = new THREE.Vector3();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5;

    function sizeToSection() {
      const width = section!.clientWidth;
      const height = section!.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    sizeToSection();

    const totalSlides = slides.length;
    const slideHeights = Array.from(
      { length: totalSlides },
      () => config.minHeight + Math.random() * (config.maxHeight - config.minHeight)
    );

    const slideOffsets: number[] = [];
    let stackPosition = 0;
    for (let i = 0; i < totalSlides; i++) {
      if (i === 0) {
        slideOffsets.push(0);
        stackPosition = slideHeights[0] / 2;
      } else {
        stackPosition += config.gap + slideHeights[i] / 2;
        slideOffsets.push(stackPosition);
        stackPosition += slideHeights[i] / 2;
      }
    }
    const loopLength = stackPosition + config.gap + slideHeights[0] / 2;
    const halfLoop = loopLength / 2;

    const meshes: THREE.Mesh[] = [];
    const textures: THREE.Texture[] = [];
    const videos: HTMLVideoElement[] = [];
    const textureLoader = new THREE.TextureLoader();

    function fitMeshToMedia(mesh: THREE.Mesh, width: number, height: number, mediaWidth: number, mediaHeight: number) {
      const mediaAspect = mediaWidth / mediaHeight;
      const planeAspect = width / height;
      const ratio = mediaAspect / planeAspect;

      if (ratio > 1) mesh.scale.y = 1 / ratio;
      else mesh.scale.x = ratio;
    }

    for (let i = 0; i < totalSlides; i++) {
      const height = slideHeights[i];
      const width = height * config.aspectRatio;

      const geometry = new THREE.PlaneGeometry(width, height, 32, 16);
      const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0x999999,
      });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.userData = {
        originalVertices: [...geometry.attributes.position.array],
        offset: slideOffsets[i],
        name: slides[i].name,
        index: i,
      };

      const src = slides[i].img;

      if (isVideoSrc(src)) {
        const video = document.createElement("video");
        video.src = src;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;
        video.addEventListener("loadedmetadata", () => {
          const texture = new THREE.VideoTexture(video);
          texture.colorSpace = THREE.SRGBColorSpace;
          material.map = texture;
          material.color.set(0xffffff);
          material.needsUpdate = true;
          textures.push(texture);
          fitMeshToMedia(mesh, width, height, video.videoWidth, video.videoHeight);
        });
        video.play().catch(() => {});
        videos.push(video);
      } else {
        textureLoader.load(src, (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          material.map = texture;
          material.color.set(0xffffff);
          material.needsUpdate = true;
          textures.push(texture);
          fitMeshToMedia(mesh, width, height, texture.image.width, texture.image.height);
        });
      }

      scene.add(mesh);
      meshes.push(mesh);
    }

    function applyDistortion(mesh: THREE.Mesh, positionY: number, strength: number) {
      const positions = mesh.geometry.attributes.position;
      const original = mesh.userData.originalVertices as number[];

      for (let i = 0; i < positions.count; i++) {
        const x = original[i * 3];
        const y = original[i * 3 + 1];
        const distance = Math.sqrt(x * x + (positionY + y) ** 2);
        const falloff = Math.max(0, 1 - distance / 2);
        const bend = Math.pow(Math.sin((falloff * Math.PI) / 2), 1.5);
        positions.setZ(i, bend * strength);
      }

      positions.needsUpdate = true;
      mesh.geometry.computeVertexNormals();
    }

    let scrollPosition = glideIn && !reduceMotion ? -config.glideDistance : 0;
    let scrollTarget = 0;
    let scrollMomentum = 0;
    let isScrolling = false;
    let lastFrameTime = 0;

    let distortionAmount = 0;
    let distortionTarget = 0;
    let velocityPeak = 0;
    let scrollDirection = 0;
    let directionTarget = 0;
    const velocityHistory = [0, 0, 0, 0, 0];

    let isDragging = false;
    let dragStartY = 0;
    let dragDelta = 0;
    let touchStartY = 0;
    let touchLastY = 0;
    let activeSlideIndex = -1;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const addDistortionBurst = (amount: number) => {
      if (reduceMotion) return;
      distortionTarget = Math.min(1, distortionTarget + amount);
    };

    function onWheel(event: WheelEvent) {
      event.preventDefault();
      const clampedDelta =
        Math.sign(event.deltaY) * Math.min(Math.abs(event.deltaY), config.wheelMax);
      addDistortionBurst(Math.abs(clampedDelta) * 0.001);
      scrollTarget += clampedDelta * config.wheelSpeed;
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => (isScrolling = false), 150);
    }

    function onTouchStart(event: TouchEvent) {
      touchStartY = touchLastY = event.touches[0].clientY;
      isScrolling = false;
      scrollMomentum = 0;
    }

    function onTouchMove(event: TouchEvent) {
      event.preventDefault();
      const deltaY = event.touches[0].clientY - touchLastY;
      touchLastY = event.touches[0].clientY;
      addDistortionBurst(Math.abs(deltaY) * 0.02);
      scrollTarget -= deltaY * config.touchSpeed;
      isScrolling = true;
    }

    function onTouchEnd() {
      const swipeVelocity = (touchLastY - touchStartY) * 0.005;
      if (Math.abs(swipeVelocity) > 0.5) {
        scrollMomentum = -swipeVelocity * config.touchMomentum;
        addDistortionBurst(Math.abs(swipeVelocity) * 0.45);
        isScrolling = true;
        setTimeout(() => (isScrolling = false), 800);
      }
    }

    function onMouseDown(event: MouseEvent) {
      isDragging = true;
      dragStartY = event.clientY;
      dragDelta = 0;
      scrollMomentum = 0;
      canvas!.style.cursor = "grabbing";
    }

    function onMouseMove(event: MouseEvent) {
      if (!isDragging) return;
      const deltaY = event.clientY - dragStartY;
      dragStartY = event.clientY;
      dragDelta = deltaY;
      addDistortionBurst(Math.abs(deltaY) * 0.02);
      scrollTarget -= deltaY * config.dragSpeed;
      isScrolling = true;
    }

    function onMouseUp() {
      if (!isDragging) return;
      isDragging = false;
      canvas!.style.cursor = "grab";
      if (Math.abs(dragDelta) > 2) {
        scrollMomentum = -dragDelta * config.dragMomentum;
        addDistortionBurst(Math.abs(dragDelta) * 0.005);
        isScrolling = true;
        setTimeout(() => (isScrolling = false), 800);
      }
    }

    canvas.style.cursor = "grab";
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("mousedown", onMouseDown);
    // Drag can continue past the canvas edge, so track move/up on window —
    // but the drag only ever *starts* from a mousedown on the canvas.
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", sizeToSection);

    let frameId = 0;
    function animate(time: number) {
      frameId = requestAnimationFrame(animate);

      const deltaTime = lastFrameTime ? (time - lastFrameTime) / 1000 : 0.016;
      lastFrameTime = time;

      const previousScroll = scrollPosition;

      if (isScrolling) {
        scrollTarget += scrollMomentum;
        scrollMomentum *= config.momentumFriction;
        if (Math.abs(scrollMomentum) < config.momentumThreshold) scrollMomentum = 0;
      }

      scrollPosition += (scrollTarget - scrollPosition) * config.smoothing;
      const frameDelta = scrollPosition - previousScroll;

      if (Math.abs(frameDelta) > 0.00001) {
        directionTarget = frameDelta > 0 ? 1 : -1;
      }
      scrollDirection += (directionTarget - scrollDirection) * 0.08;

      const velocity = Math.abs(frameDelta) / deltaTime;
      velocityHistory.push(velocity);
      velocityHistory.shift();
      const averageVelocity =
        velocityHistory.reduce((a, b) => a + b) / velocityHistory.length;

      if (averageVelocity > velocityPeak) velocityPeak = averageVelocity;
      const isDecelerating =
        averageVelocity / (velocityPeak + 0.001) < 0.7 && velocityPeak > 0.5;
      velocityPeak *= 0.99;

      if (!reduceMotion) {
        if (velocity > 0.05) {
          distortionTarget = Math.max(distortionTarget, Math.min(1, velocity * 0.1));
        }
        if (isDecelerating || averageVelocity < 0.2) {
          distortionTarget *= isDecelerating ? 0.95 : 0.855;
        }
        distortionAmount +=
          (distortionTarget - distortionAmount) * config.distortionSmoothing;
      }

      const signedDistortion = distortionAmount * scrollDirection;

      let closestDistance = Infinity;
      let closestIndex = 0;
      const selectionY = infoEl!.offsetTop;
      const selectionWorldY = (1 - 2 * selectionY / section!.clientHeight)
        * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));

      meshes.forEach((mesh) => {
        const { offset } = mesh.userData;
        let y = -(offset - wrap(scrollPosition, loopLength));
        y = wrap(y + halfLoop, loopLength) - halfLoop;
        mesh.position.y = y;

        if (Math.abs(y - selectionWorldY) < closestDistance) {
          closestDistance = Math.abs(y - selectionWorldY);
          closestIndex = mesh.userData.index;
        }

        if (!reduceMotion && Math.abs(y) < halfLoop + config.maxHeight) {
          applyDistortion(mesh, y, config.distortionStrength * signedDistortion);
        }
      });

      if (closestIndex !== activeSlideIndex) {
        activeSlideIndex = closestIndex;
        titleEl!.textContent = slides[activeSlideIndex].name;
        counterEl!.textContent = `${zeroPad(activeSlideIndex + 1)} / ${zeroPad(totalSlides)}`;
        markerEl!.textContent = `Selected ${zeroPad(activeSlideIndex + 1)}`;
      }

      renderer.render(scene, camera);
      // Keep the marker beside the preview and aligned with its title/counter.
      const selectedMesh = meshes[closestIndex];
      if (selectedMesh) {
        const geometry = selectedMesh.geometry as THREE.PlaneGeometry;
        markerPosition.set(geometry.parameters.width / 2, 0, 0);
        selectedMesh.localToWorld(markerPosition);
        markerPosition.project(camera);
        markerEl!.style.left = `${(markerPosition.x + 1) * section!.clientWidth / 2}px`;
        markerEl!.style.top = `${selectionY}px`;
      }
    }
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(scrollTimeout);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", sizeToSection);

      meshes.forEach((mesh) => mesh.geometry.dispose());
      textures.forEach((texture) => texture.dispose());
      videos.forEach((video) => {
        video.pause();
        video.removeAttribute("src");
        video.load();
      });
      renderer.dispose();
    };
    // `slides` is expected to stay referentially stable for this component's
    // whole mounted lifetime — the parent remounts via `key` to switch sets.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="work-slider border-b">
      <div ref={infoRef} className="work-slider__info">
        <p ref={titleRef} className="work-slider__title" />
        <p ref={counterRef} className="work-slider__count" />
      </div>
      <canvas ref={canvasRef} className="work-slider__canvas" />
      <div ref={markerRef} className="work-slider__selection" aria-hidden="true" />
    </section>
  );
}
