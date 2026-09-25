import { useLayoutEffect, useRef } from "react";

/**
 * Keeps an element at least as tall as the tallest step it has shown, so
 * moving between steps never shifts the layout around it: a shorter step
 * keeps its empty space, and a taller one simply grows the element (and
 * the ratchet with it).
 */
export default function useStableHeight<T extends HTMLElement>(
  step: number,
  record = true
) {
  const ref = useRef<T>(null);
  const seen = useRef(new Map<number, number>());

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = (reset = false) => {
      if (!el.isConnected) return;
      if (reset) seen.current.clear();
      el.style.minHeight = "0px";
      // `record: false` = a step that is allowed to be far taller than the
      // rest without stretching them once you go back.
      if (record) seen.current.set(step, el.offsetHeight);
      el.style.minHeight = `${Math.max(0, ...seen.current.values())}px`;
    };

    measure();
    // Only a width change reflows text (and so invalidates the remembered
    // heights); height-only resizes and scrollbar toggles shouldn't reset it.
    let lastWidth = window.innerWidth;
    const onResize = () => {
      const widthChanged = window.innerWidth !== lastWidth;
      lastWidth = window.innerWidth;
      measure(widthChanged);
    };
    window.addEventListener("resize", onResize);
    // Not a reset: fonts.ready resolves right after every step change and
    // would wipe the taller step's height.
    document.fonts?.ready.then(() => measure());
    return () => window.removeEventListener("resize", onResize);
  }, [step, record]);

  return ref;
}
