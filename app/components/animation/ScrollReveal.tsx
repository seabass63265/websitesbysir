"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/app/components/providers/SmoothScrollProvider";

gsap.registerPlugin(ScrollTrigger);

/**
 * One-off scroll-triggered reveal. GSAP + ScrollTrigger are imported directly
 * here rather than through a global animation layer.
 */
export default function ScrollReveal({
  children,
  y = 40,
}: {
  children: React.ReactNode;
  y?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useSmoothScroll();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Keep ScrollTrigger in step with Lenis' virtual scroll position.
    const onScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onScroll);

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    }, el);

    return () => {
      lenis?.off("scroll", onScroll);
      ctx.revert();
    };
  }, [lenis, y]);

  return <div ref={containerRef}>{children}</div>;
}
