"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type PageTransitionValue = { navigate: (href: string) => void };

const PageTransitionContext = createContext<PageTransitionValue | null>(null);

export function usePageTransition(): PageTransitionValue {
  const value = useContext(PageTransitionContext);
  if (!value) {
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider"
    );
  }
  return value;
}

// Keep COVER_MS in sync with the .page-wipe transition duration in globals.css.
const COVER_MS = 340;
const HOLD_MS = 120;

type Phase = "idle" | "armed" | "covering" | "revealing";

/**
 * Click-triggered page wipe. `navigate(href)` slides a full-screen panel
 * down from above to cover the page (same panel as the intro loader), pushes
 * the route while it's hidden, then keeps sliding the panel downward to
 * reveal the new page. Mounted once in the root layout.
 */
export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [runId, setRunId] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const runningRef = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      if (runningRef.current) return;
      runningRef.current = true;

      setRunId((n) => n + 1);
      setPhase("armed");

      // Paint the armed (off-screen, above) state for one frame, then let the
      // .is-covering transition slide it down.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("covering"));
      });

      window.setTimeout(() => {
        router.push(href);
        window.setTimeout(() => {
          setPhase("revealing");
          window.setTimeout(() => {
            setPhase("idle");
            runningRef.current = false;
          }, COVER_MS);
        }, HOLD_MS);
      }, COVER_MS);
    },
    [router]
  );

  const className =
    phase === "covering"
      ? "page-wipe is-covering"
      : phase === "revealing"
        ? "page-wipe is-revealing"
        : "page-wipe";

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      {children}
      {phase !== "idle" && (
        <div key={runId} className={className} aria-hidden="true">
          <div className="loader-graphic">
            <div className="loader-circle">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" />
              </svg>
            </div>
            <div className="loader-lines">
              <div className="loader-line-h" />
              <div className="loader-line-v" />
            </div>
          </div>
          <div className="loader-text text-sm">Loading_</div>
        </div>
      )}
    </PageTransitionContext.Provider>
  );
}

/**
 * Drop-in replacement for an internal <a>/<Link> that plays the page wipe
 * before navigating. Modified clicks (new tab, etc.) fall through to the
 * browser.
 */
export function TransitionLink({
  href,
  className,
  style,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const { navigate } = usePageTransition();
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}
