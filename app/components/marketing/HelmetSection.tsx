"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HelmetScene = dynamic(() => import("./HelmetScene"), { ssr: false });

/**
 * Wrapper for the WebGL helmet scene: reserves its height up front and
 * only loads/mounts the scene (three.js, model, textures) once the section
 * is about to scroll into view.
 */
export default function HelmetSection() {
  const ref = useRef<HTMLElement>(null);
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
    <section ref={ref} className="helmet-section border-b" aria-label="3D helmet showcase">
      {near && <HelmetScene />}
    </section>
  );
}
