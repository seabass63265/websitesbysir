"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import Lenis from "lenis";

type LenisStore = {
  subscribe: (listener: () => void) => () => void;
  get: () => Lenis | null;
};

const SmoothScrollContext = createContext<LenisStore | null>(null);

/**
 * Access the shared Lenis instance, e.g. to drive GSAP ScrollTrigger or to call
 * `lenis.scrollTo(...)`. Returns null until the provider has mounted.
 */
export function useSmoothScroll(): Lenis | null {
  const store = useContext(SmoothScrollContext);
  return useSyncExternalStore(
    store?.subscribe ?? (() => () => {}),
    () => store?.get() ?? null,
    () => null
  );
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const listenersRef = useRef(new Set<() => void>());

  const storeRef = useRef<LenisStore>({
    subscribe: (listener) => {
      listenersRef.current.add(listener);
      return () => listenersRef.current.delete(listener);
    },
    get: () => lenisRef.current,
  });

  useEffect(() => {
    const listeners = listenersRef.current;
    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: {
        duration: 2.4,
        easing: (t: number) => (1 - Math.cos(Math.PI * t)) / 2,
      },
    });
    lenisRef.current = instance;
    listeners.forEach((l) => l());

    let frame = requestAnimationFrame(function raf(time) {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenisRef.current = null;
      listeners.forEach((l) => l());
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={storeRef.current}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
