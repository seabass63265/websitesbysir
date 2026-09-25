"use client";

import { useEffect, useRef } from "react";
import lottie, { type AnimationItem } from "lottie-web";

/**
 * Renders a Lottie JSON animation. Pass either `animationData` (an imported JSON
 * object) or `path` (a URL to a .json file).
 */
export default function LottiePlayer({
  animationData,
  path,
  loop = true,
  autoplay = true,
  className,
}: {
  animationData?: unknown;
  path?: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const anim: AnimationItem = lottie.loadAnimation({
      container,
      renderer: "svg",
      loop,
      autoplay,
      ...(animationData ? { animationData } : {}),
      ...(path ? { path } : {}),
    });

    return () => anim.destroy();
  }, [animationData, path, loop, autoplay]);

  return <div ref={containerRef} className={className} />;
}
