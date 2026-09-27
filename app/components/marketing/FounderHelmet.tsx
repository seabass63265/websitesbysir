"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const FounderHelmetScene = dynamic(() => import("./FounderHelmetScene"), {
  ssr: false,
});

/**
 * Founder portrait slot: shows the flat helmet mark instantly, then swaps in
 * the live shiny 3D helmet once the box is about to scroll into view.
 */
export default function FounderHelmet() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full flex-1 min-h-0"
      role="img"
      aria-label="SIR_ helmet mark"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/helmet-mark.png"
        width={112}
        height={120}
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[70%] w-auto -translate-x-1/2 -translate-y-1/2 rotate-[18deg]"
      />
      {near && (
        <div className="absolute inset-0 bg-bg">
          <FounderHelmetScene />
        </div>
      )}
    </div>
  );
}
