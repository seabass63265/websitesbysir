"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * "The Difference" — drag-to-compare of an off-the-shelf template vs. a build
 * made only for you. Pointer-driven divider (click or drag anywhere), with
 * keyboard support on the handle. Ported from the before/after split reference
 * and restyled to the SIR_ system: navy on white, square edges, 1px rules.
 */
export default function BeforeAfterSplit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [pos, setPos] = useState(55); // % of the "before" side revealed
  const [innerW, setInnerW] = useState(0); // container width, kept on the clipped panel

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => setInnerW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const onMove = (e: PointerEvent) => {
      if (draggingRef.current) setFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [setFromClientX]);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    setFromClientX(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <section id="difference" className="pad-global border-b">
      <div className="info-block" style={{ paddingBottom: "2rem" }}>
        <div className="text-sm">03 / The Difference</div>
        <div className="text-md">
          Most businesses launch on the same handful of templates. Drag the
          handle to see what a site built only for you looks like next to one
          that wasn&rsquo;t.
        </div>
      </div>

      <div
        ref={containerRef}
        className="compare"
        onPointerDown={onPointerDown}
        style={{ touchAction: "none" }}
      >
        {/* AFTER — base layer, always full width */}
        <div className="compare__panel">
          <MockAfter />
          <div className="pill-tag compare__tag compare__tag--after">
            After / Custom Build
          </div>
        </div>

        {/* BEFORE — clipped overlay */}
        <div className="compare__overlay" style={{ width: `${pos}%` }}>
          <div
            className="compare__panel"
            style={{ width: innerW || "100%" }}
          >
            <MockBefore />
            <div className="pill-tag compare__tag compare__tag--before">
              Before / Template
            </div>
          </div>
        </div>

        {/* Divider + handle */}
        <div className="compare__divider" style={{ left: `${pos}%` }}>
          <button
            type="button"
            className="compare__handle"
            aria-label="Drag to compare template versus custom build"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={onKeyDown}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/** After / Custom Build — a real capture of a build made only for you. */
function MockAfter() {
  return (
    <div className="mock mock--media" aria-hidden="true">
      <div className="mock__bar">
        <span className="mock__dot" />
        <span className="mock__dot" />
        <span className="mock__dot" />
        <span className="mock__url" />
      </div>
      <div className="mock__media">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src="/shpelmu.mp4"
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

/** Before / Template — a real screenshot of the off-the-shelf starting point. */
function MockBefore() {
  return (
    <div className="mock mock--media" aria-hidden="true">
      <div className="mock__bar">
        <span className="mock__dot" />
        <span className="mock__dot" />
        <span className="mock__dot" />
        <span className="mock__url" />
      </div>
      <div className="mock__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/shpeuci.png" alt="" />
      </div>
    </div>
  );
}
