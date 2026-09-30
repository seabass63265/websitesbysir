"use client";

import { useEffect, useRef } from "react";
import { useT } from "@/app/components/providers/LanguageProvider";

export type LightboxSlide = { name: string; img: string } | null;

const isVideoSrc = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

/**
 * "Big screen" viewer for a WorkSlider slide — clicking (not dragging) a
 * slide in the 3D slider calls back here with that slide, and this renders
 * it large over a blurred backdrop. Same dismiss conventions as the other
 * full-screen overlays on the site (LanguageToast, LaunchOfferToast): close
 * button, Escape, or clicking the backdrop; scroll locked while open.
 */
export default function MediaLightbox({
  slide,
  onClose,
}: {
  slide: LightboxSlide;
  onClose: () => void;
}) {
  const t = useT();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!slide) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => closeRef.current?.focus(), 50);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [slide, onClose]);

  return (
    <>
      <div
        className={slide ? "media-lightbox-backdrop is-open" : "media-lightbox-backdrop"}
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className={slide ? "media-lightbox is-open" : "media-lightbox"}
        role="dialog"
        aria-modal="true"
        aria-label={slide?.name}
        aria-hidden={!slide}
        onClick={onClose}
      >
        {slide && (
          <div className="media-lightbox__stage" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              ref={closeRef}
              className="media-lightbox__close"
              aria-label={t("Close", "Cerrar")}
              onClick={onClose}
            >
              ×
            </button>
            {isVideoSrc(slide.img) ? (
              <video
                key={slide.img}
                src={slide.img}
                className="media-lightbox__media"
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- arbitrary /public work-sample paths, not an optimizable next/image source set
              <img key={slide.img} src={slide.img} alt={slide.name} className="media-lightbox__media" />
            )}
            <div className="media-lightbox__caption text-xs">{slide.name}</div>
          </div>
        )}
      </div>
    </>
  );
}
