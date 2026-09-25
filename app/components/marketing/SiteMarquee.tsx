"use client";

import { useEffect, useRef } from "react";

/**
 * Auto-scrolling marquee of website mockups (browser, phone, logo, and
 * dashboard shots). Shared between the homepage hero and the Restaurants &
 * Cafés industry-page hero. A real horizontally-scrollable strip you can
 * swipe, trackpad-scroll, or click-and-drag yourself: JS drives the
 * auto-scroll, backs off while you interact, and resumes after a few idle
 * seconds. The two identical groups let it loop seamlessly in both
 * directions. (`@keyframes rc-marquee` remains only as the no-JS fallback.)
 */
const IDLE_RESUME_MS = 3000;
const LOOP_SECONDS = 40; // one full pass of a group

function BrowserVideoShot({ src }: { src: string }) {
  return (
    <div className="rc-shot rc-shot--browser">
      <div className="rc-shot__bar">
        <span className="rc-shot__dot" />
        <span className="rc-shot__dot" />
        <span className="rc-shot__dot" />
      </div>
      <div className="rc-shot__body rc-shot__body--video">
        <video
          className="rc-shot__video"
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}

function PhoneShot({ src }: { src: string }) {
  return (
    <div className="rc-shot rc-shot--phone">
      <video
        className="rc-shot__video"
        src={src}
        aria-label="Mobile website preview"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
    </div>
  );
}

function LogoShot() {
  return (
    <div className="rc-shot rc-shot--logo">
      <video
        className="rc-shot__video"
        src="/seabassaq1.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
    </div>
  );
}

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="rc-hero__group" aria-hidden={hidden || undefined}>
      <PhoneShot src="/carlomobile.mp4" />
      <BrowserVideoShot src="/carlo2.mp4" />
      <LogoShot />
      <PhoneShot src="/seabassaq1mobile.mp4" />
      <BrowserVideoShot src="/lmuccg9.mp4" />
      <BrowserVideoShot src="/lmuccg1.mp4" />
    </div>
  );
}

export default function SiteMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function start() {
      const group = track!.firstElementChild as HTMLElement | null;
      if (!group) return () => {};

      viewport!.classList.add("is-scrollable");
      let groupWidth = group.offsetWidth;
      // Second copy is identical to the first, so start there — leaves room
      // to swipe backwards without hitting the left edge.
      viewport!.scrollLeft = groupWidth;

      let pos = viewport!.scrollLeft;
      let lastSet = pos;
      let touching = false;
      let dragStartX = 0;
      let dragStartScroll = 0;
      let lastUserAt = -Infinity;
      let last = 0;
      let frameId = 0;

      const markUser = () => {
        lastUserAt = performance.now();
      };
      const onTouchStart = () => {
        touching = true;
        markUser();
      };
      const onTouchEnd = () => {
        touching = false;
        markUser();
      };
      const onScroll = () => {
        // Scrolls we didn't cause (drag, fling momentum) count as user input.
        if (Math.abs(viewport!.scrollLeft - lastSet) > 1.5) markUser();
      };
      const onResize = () => {
        groupWidth = group.offsetWidth;
      };
      const onPointerDown = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        touching = true;
        dragStartX = event.clientX;
        dragStartScroll = viewport!.scrollLeft;
        viewport!.classList.add("is-dragging");
        viewport!.setPointerCapture(event.pointerId);
        markUser();
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!touching || event.pointerType !== "mouse") return;
        viewport!.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
        markUser();
      };
      const onPointerUp = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || !touching) return;
        touching = false;
        viewport!.classList.remove("is-dragging");
        markUser();
      };
      const onWheel = (event: WheelEvent) => {
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) markUser();
      };

      function tick(now: number) {
        const dt = last ? (now - last) / 1000 : 0;
        last = now;

        const idle = !touching && now - lastUserAt >= IDLE_RESUME_MS;
        if (idle && !reduceMotion.matches) {
          pos = viewport!.scrollLeft + (groupWidth / LOOP_SECONDS) * dt;
          viewport!.scrollLeft = pos;
          lastSet = pos;
        }

        if (!touching) {
          // Keep scrollLeft inside one group-wide window centered in the
          // scrollable range, so a ±groupWidth jump always lands on the
          // identical spot in the other copy (never past either end).
          const lo = Math.max(0, (groupWidth - viewport!.clientWidth) / 2);
          const s = viewport!.scrollLeft;
          if (s >= lo + groupWidth) {
            viewport!.scrollLeft = s - groupWidth;
            lastSet = viewport!.scrollLeft;
          } else if (s < lo) {
            viewport!.scrollLeft = s + groupWidth;
            lastSet = viewport!.scrollLeft;
          }
        }
        frameId = requestAnimationFrame(tick);
      }

      viewport!.addEventListener("touchstart", onTouchStart, { passive: true });
      viewport!.addEventListener("touchend", onTouchEnd, { passive: true });
      viewport!.addEventListener("touchcancel", onTouchEnd, { passive: true });
      viewport!.addEventListener("scroll", onScroll, { passive: true });
      viewport!.addEventListener("pointerdown", onPointerDown);
      viewport!.addEventListener("pointermove", onPointerMove);
      viewport!.addEventListener("pointerup", onPointerUp);
      viewport!.addEventListener("pointercancel", onPointerUp);
      viewport!.addEventListener("wheel", onWheel, { passive: true });
      window.addEventListener("resize", onResize);
      frameId = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(frameId);
        viewport!.removeEventListener("touchstart", onTouchStart);
        viewport!.removeEventListener("touchend", onTouchEnd);
        viewport!.removeEventListener("touchcancel", onTouchEnd);
        viewport!.removeEventListener("scroll", onScroll);
        viewport!.removeEventListener("pointerdown", onPointerDown);
        viewport!.removeEventListener("pointermove", onPointerMove);
        viewport!.removeEventListener("pointerup", onPointerUp);
        viewport!.removeEventListener("pointercancel", onPointerUp);
        viewport!.removeEventListener("wheel", onWheel);
        window.removeEventListener("resize", onResize);
        viewport!.classList.remove("is-scrollable", "is-dragging");
        viewport!.scrollLeft = 0;
      };
    }

    return start();
  }, []);

  return (
    <div className="rc-hero__marquee">
      <div className="rc-hero__viewport" ref={viewportRef}>
        <div className="rc-hero__track" ref={trackRef}>
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
      </div>
    </div>
  );
}
