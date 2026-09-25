"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TransitionLink } from "@/app/components/providers/PageTransition";
import { GALLERY_VIDEOS as VIDEOS } from "./galleryVideos";

/**
 * Circular image gallery — ported from the standalone
 * `circular-image-gallery/` (CodeGrid) demo into a normal in-page section.
 *
 * Differences from the original: it measures its own container instead of
 * the viewport (the original ran fullscreen/fixed), and every listener is
 * cleaned up on unmount since this now lives inside a React tree instead of
 * a throwaway HTML page.
 */

const TOTAL_IMAGES = VIDEOS.length;

const config = {
  ovalWidthRatio: 0.42,
  ovalHeightRatio: 0.34,
  // On narrow screens the ring is widened further still — items are
  // allowed to spill off the edges (the field's own `overflow: hidden`
  // keeps the page itself from scrolling horizontally) so the ring reads
  // as a wraparound frame around the centered text instead of a cramped
  // oval squeezed inside the viewport.
  mobileOvalWidthRatio: 0.62,
  mobileOvalHeightRatio: 0.46,
  mobileBreakpoint: 900,
  tiltAngle: -20,
  idleRotationSpeed: 0.035,
  scrollAcceleration: 0.0055,
  maxRotationSpeed: 2.5,
  speedEasing: 0.05,
  hoverScale: 1.1,
  idleImageZoom: 1.1,
  dimmedBrightness: 0.35,
  hoverDuration: 1,
  hoverEase: "expo.out",
};

type GalleryItem = {
  wrapper: HTMLDivElement;
  frame: HTMLDivElement;
  image: HTMLVideoElement;
  ringAngle: number;
};

export default function CircularGallery({
  tagline,
  children,
  ctaHref = "/work",
  ctaLabel = "View All Work",
  hideCta = false,
  hideOnMobile = false,
  ovalWidthRatio = config.ovalWidthRatio,
  ovalHeightRatio = config.ovalHeightRatio,
  fieldHeight,
}: {
  /** Optional line under the "SIR_" wordmark — e.g. the Local Businesses
   * hero's "Puts your business online." Omitted elsewhere (homepage). */
  tagline?: string;
  /** Replaces the default "SIR_" wordmark/tagline with arbitrary content
   * (e.g. the homepage's full headline) centered in the ring instead. */
  children?: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  /** Drops the bottom-right corner button entirely. */
  hideCta?: boolean;
  /** The ring's oval math doesn't hold up on narrow/short mobile viewports
   * (frames overlap into a striped mess) — drop the whole section there. */
  hideOnMobile?: boolean;
  /** Overrides the ring's default oval radius ratios (fraction of the
   * field's width/height) for this instance only. */
  ovalWidthRatio?: number;
  ovalHeightRatio?: number;
  /** Shortens the whole hero (a CSS height, e.g. "82vh") for this instance
   * only; the default is a full viewport. Scale `ovalHeightRatio` up with it
   * so the ring keeps its pixel height. */
  fieldHeight?: string;
}) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items: GalleryItem[] = [];
    for (let index = 0; index < TOTAL_IMAGES; index++) {
      const wrapper = wrapperRefs.current[index];
      const frame = frameRefs.current[index];
      const image = imageRefs.current[index];
      if (!wrapper || !frame || !image) continue;

      gsap.set(frame, { scale: 1 });
      gsap.set(image, { scale: config.idleImageZoom });
      gsap.set(wrapper, { filter: "saturate(1) brightness(1)" });

      items.push({
        wrapper,
        frame,
        image,
        ringAngle: (index / TOTAL_IMAGES) * Math.PI * 2,
      });
    }

    let ovalRadiusX = 0;
    let ovalRadiusY = 0;
    let tiltCos = 0;
    let tiltSin = 0;

    let ringRotation = 0;
    let rotationDirection = 1;
    let rotationSpeed = config.idleRotationSpeed;

    let pointerX = -1;
    let pointerY = -1;
    let hoveredItem: GalleryItem | null = null;
    let frameId = 0;

    function measure() {
      if (!gallery) return;
      const isMobile = window.innerWidth <= config.mobileBreakpoint;
      const widthRatio = isMobile
        ? config.mobileOvalWidthRatio
        : ovalWidthRatio;
      const heightRatio = isMobile
        ? config.mobileOvalHeightRatio
        : ovalHeightRatio;
      ovalRadiusX = gallery.clientWidth * widthRatio;
      ovalRadiusY = gallery.clientHeight * heightRatio;
      const tiltRadians = (config.tiltAngle * Math.PI) / 180;
      tiltCos = Math.cos(tiltRadians);
      tiltSin = Math.sin(tiltRadians);
    }

    function positionItem(item: GalleryItem, rotationRadians: number) {
      const angle = item.ringAngle + rotationRadians;
      const ovalX = Math.cos(angle) * ovalRadiusX;
      const ovalY = Math.sin(angle) * ovalRadiusY;
      const tiltedX = ovalX * tiltCos - ovalY * tiltSin;
      const tiltedY = ovalX * tiltSin + ovalY * tiltCos;
      item.wrapper.style.transform = `translate(${tiltedX}px, ${tiltedY}px)`;
    }

    function getHoveredItem(): GalleryItem | null {
      if (pointerX < 0) return null;
      const target = document.elementFromPoint(pointerX, pointerY);
      const el = target ? target.closest(".circular-gallery__item") : null;
      if (!el) return null;
      return items.find((item) => item.wrapper === el) ?? null;
    }

    function applyHoverState(activeItem: GalleryItem | null) {
      items.forEach((item) => {
        const isActive = item === activeItem;
        const isDimmed = Boolean(activeItem) && !isActive;

        gsap.to(item.frame, {
          scale: isActive ? config.hoverScale : 1,
          duration: config.hoverDuration,
          ease: config.hoverEase,
          overwrite: true,
        });
        gsap.to(item.image, {
          scale: isActive ? 1 : config.idleImageZoom,
          duration: config.hoverDuration,
          ease: config.hoverEase,
          overwrite: true,
        });
        gsap.to(item.wrapper, {
          filter: `saturate(${isDimmed ? 0 : 1}) brightness(${
            isDimmed ? config.dimmedBrightness : 1
          })`,
          duration: config.hoverDuration,
          ease: config.hoverEase,
          overwrite: true,
        });
      });
    }

    function tick() {
      rotationSpeed +=
        (config.idleRotationSpeed - rotationSpeed) * config.speedEasing;
      ringRotation += rotationSpeed * rotationDirection;
      const rotationRadians = (ringRotation * Math.PI) / 180;

      const current = getHoveredItem();
      if (current !== hoveredItem) {
        applyHoverState(current);
        hoveredItem = current;
      }

      items.forEach((item) => positionItem(item, rotationRadians));
      frameId = requestAnimationFrame(tick);
    }

    function onWheel(event: WheelEvent) {
      rotationDirection = event.deltaY > 0 ? 1 : -1;
      rotationSpeed += Math.abs(event.deltaY) * config.scrollAcceleration;
      rotationSpeed = Math.min(rotationSpeed, config.maxRotationSpeed);
    }

    function onMouseMove(event: MouseEvent) {
      pointerX = event.clientX;
      pointerY = event.clientY;
    }

    function onMouseLeave() {
      pointerX = -1;
      pointerY = -1;
    }

    measure();
    items.forEach((item) => positionItem(item, 0));

    // Reduced motion: lay the ring out once, statically, and stop there —
    // no rotation, no scroll-driven spin, no hover animation.
    if (reduceMotion) {
      const onResize = () => {
        measure();
        items.forEach((item) => positionItem(item, 0));
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    frameId = requestAnimationFrame(tick);

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      className={`circular-gallery border-b${
        hideOnMobile ? " circular-gallery--hide-mobile" : ""
      }`}
    >
      <div
        className="circular-gallery__field"
        ref={galleryRef}
        style={fieldHeight ? { height: fieldHeight, minHeight: "600px" } : undefined}
      >
        <div
          className="circular-gallery__logo"
          aria-hidden={children ? undefined : true}
        >
          {children ?? (
            <>
              <span className="circular-gallery__wordmark">SIR_</span>
              {tagline && (
                <span className="circular-gallery__tagline">{tagline}</span>
              )}
            </>
          )}
        </div>
        {hideCta ? null : ctaHref.startsWith("#") ? (
          <a href={ctaHref} className="btn-pill circular-gallery__cta">
            {ctaLabel} <span aria-hidden="true">&nbsp;&rarr;</span>
          </a>
        ) : (
          <TransitionLink href={ctaHref} className="btn-pill circular-gallery__cta">
            {ctaLabel} <span aria-hidden="true">&nbsp;&rarr;</span>
          </TransitionLink>
        )}
        {Array.from({ length: TOTAL_IMAGES }, (_, index) => (
          <div
            key={index}
            className="circular-gallery__item"
            ref={(el) => {
              wrapperRefs.current[index] = el;
            }}
          >
            <div
              className="circular-gallery__frame"
              ref={(el) => {
                frameRefs.current[index] = el;
              }}
            >
              <video
                src={VIDEOS[index % VIDEOS.length]}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
