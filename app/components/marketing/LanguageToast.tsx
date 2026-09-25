"use client";

import { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/app/components/providers/SmoothScrollProvider";

const STORAGE_KEY = "sir_lang";
type Lang = "en" | "es";

type ChipMessage = "saved" | "arrived";

const CHIP_TEXT: Record<Lang, Record<ChipMessage, string>> = {
  en: {
    saved: "Language saved: English",
    arrived: "You’ve arrived. Let’s bring your vision online.",
  },
  es: {
    saved: "Idioma guardado: Español",
    arrived: "Has llegado. Hagamos realidad tu visión en línea.",
  },
};

const SAVED_MS = 2000;
const ARRIVED_MS = 3800;

function readStored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function store(value: string) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage blocked (private mode etc.) — the prompt just shows again next visit.
  }
}

/**
 * First-visit language prompt: the page behind is blurred and locked while
 * a toast slides up from the bottom, until the visitor picks English or
 * Español. The choice is saved to localStorage so it never reappears, and
 * a small confirmation chip follows. The choice is only stored for now —
 * nothing on the site switches language from it yet.
 */
export default function LanguageToast() {
  const [open, setOpen] = useState(false);
  const [chipLang, setChipLang] = useState<Lang>("en");
  const [chipMessage, setChipMessage] = useState<ChipMessage>("saved");
  const [chipVisible, setChipVisible] = useState(false);
  const englishRef = useRef<HTMLButtonElement>(null);
  const spanishRef = useRef<HTMLButtonElement>(null);
  const chipInnerRef = useRef<HTMLDivElement>(null);
  const savedRowRef = useRef<HTMLDivElement>(null);
  const arrivedRowRef = useRef<HTMLDivElement>(null);
  const lenis = useSmoothScroll();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  useEffect(() => {
    const pending = timers.current;
    // Only on a first visit: once a language is chosen it's saved and the
    // prompt never comes back (clear the `sir_lang` localStorage key to test it).
    if (!readStored()) {
      later(() => {
        setOpen(true);
        later(() => englishRef.current?.focus(), 700);
      }, 700);
    }
    return () => pending.forEach(clearTimeout);
  }, []);

  // Size the chip to the active message. Only the "saved" -> "arrived" swap
  // animates the width; every other measurement (first appearance, font
  // load, language change) snaps so the chip never shows half-sized/clipped.
  useEffect(() => {
    const inner = chipInnerRef.current;
    const row =
      chipMessage === "saved" ? savedRowRef.current : arrivedRowRef.current;
    if (!inner || !row) return;
    const animate = chipMessage === "arrived";

    const fit = (withTransition: boolean) => {
      const style = getComputedStyle(inner);
      const padding =
        parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      if (!withTransition) inner.style.transition = "none";
      inner.style.width = `${row.offsetWidth + padding}px`;
      if (!withTransition) {
        void inner.offsetWidth; // flush so the snap isn't animated
        inner.style.transition = "";
      }
    };

    fit(animate);
    let cancelled = false;
    if (!animate) {
      document.fonts?.ready.then(() => {
        if (!cancelled) fit(false);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [chipMessage, chipLang, chipVisible]);

  // Blocking prompt: freeze page scroll while it's up (same approach as
  // WorkShowcase), and keep Tab inside the two language buttons.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const first = englishRef.current;
      const last = spanishRef.current;
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (
        document.activeElement !== first &&
        document.activeElement !== last
      ) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
  }, [open, lenis]);

  function choose(lang: Lang) {
    store(lang);
    setOpen(false);
    later(() => {
      setChipLang(lang);
      setChipMessage("saved");
      setChipVisible(true);
      later(() => setChipMessage("arrived"), SAVED_MS);
      later(() => setChipVisible(false), SAVED_MS + ARRIVED_MS);
    }, 600);
  }

  return (
    <>
      <div
        className={open ? "lang-backdrop is-open" : "lang-backdrop"}
        aria-hidden="true"
      />
      <div
        className={open ? "lang-toast is-open" : "lang-toast"}
        role="dialog"
        aria-modal="true"
        aria-label="Language selection"
        aria-hidden={!open}
      >
        <div className="lang-toast__panel">
          <div className="lang-toast__top">
            <span className="lang-toast__eyebrow">Hola · Hello</span>
          </div>

          <div>
            <h2 className="lang-toast__title">Choose your language.</h2>
            <p className="lang-toast__sub">Elige tu idioma.</p>
          </div>

          <div className="lang-toast__actions">
            <button
              type="button"
              ref={englishRef}
              className="lang-toast__btn lang-toast__btn--solid"
              onClick={() => choose("en")}
            >
              English
            </button>
            <button
              type="button"
              ref={spanishRef}
              className="lang-toast__btn"
              onClick={() => choose("es")}
            >
              Español
            </button>
          </div>
        </div>
      </div>

      <div
        className={chipVisible ? "lang-chip is-visible" : "lang-chip"}
        aria-live="polite"
        aria-hidden={!chipVisible}
      >
        <div className="lang-chip__inner" ref={chipInnerRef}>
          <div
            ref={savedRowRef}
            className={
              chipMessage === "saved"
                ? "lang-chip__row is-active"
                : "lang-chip__row"
            }
            aria-hidden={chipMessage !== "saved"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>{CHIP_TEXT[chipLang].saved}</span>
          </div>
          <div
            ref={arrivedRowRef}
            className={
              chipMessage === "arrived"
                ? "lang-chip__row is-active"
                : "lang-chip__row"
            }
            aria-hidden={chipMessage !== "arrived"}
          >
            <span>{CHIP_TEXT[chipLang].arrived}</span>
          </div>
        </div>
      </div>
    </>
  );
}
