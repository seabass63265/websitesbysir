"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/app/components/providers/SmoothScrollProvider";

/**
 * Always opens the page at the top. Next keeps the old scroll position when
 * the new page's first element is already in view, and the browser restores
 * its own position on reload and back/forward — both are overridden here.
 * Lenis is reset too, so a glide still in progress on the previous page
 * can't carry over.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useSmoothScroll();

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return null;
}
