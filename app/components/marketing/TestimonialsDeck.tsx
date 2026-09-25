"use client";

import { useEffect, useRef } from "react";
import Core, { type Viewport } from "smooothy";

type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  tone: "light" | "dark";
};

// Placeholder testimonials — swap in real client quotes.
const testimonials: Testimonial[] = [
  {
    quote:
      "Sebastian rebuilt our whole ordering flow in three weeks. Online orders are up and I stopped fielding phone calls during the dinner rush.",
    name: "Marisol R.",
    detail: "Owner, El Norteño",
    tone: "dark",
  },
  {
    quote:
      "He translated the entire site into Spanish without me having to chase him for it. Our regulars finally use it.",
    name: "Danny T.",
    detail: "Barbershop, Highland Park",
    tone: "light",
  },
  {
    quote:
      "No agency runaround. I emailed one person and got answers the same day, every time.",
    name: "Priya M.",
    detail: "Founder, Loop Studio",
    tone: "dark",
  },
  {
    quote:
      "The booking system just works. We went from a shared inbox to actual appointments overnight.",
    name: "Chris A.",
    detail: "Dental practice, Culver City",
    tone: "light",
  },
  {
    quote:
      "Fast, clean, and it still feels fast a year later. The monthly plan means I never think about hosting.",
    name: "Renée O.",
    detail: "Ceramicist",
    tone: "dark",
  },
  {
    quote:
      "We launched the donation page a week before our gala and raised more online than the room did.",
    name: "Marcus D.",
    detail: "Nonprofit director",
    tone: "light",
  },
  {
    quote:
      "He showed me the site in staging every few days. There was never a moment where I didn't know what was happening.",
    name: "Aisha K.",
    detail: "Bakery owner",
    tone: "dark",
  },
  {
    quote:
      "Checkout, shipping, inventory — all handled. I just add products now.",
    name: "Tomás L.",
    detail: "Online shop",
    tone: "light",
  },
];

/**
 * Client testimonials as a draggable card deck with an overlapping-stack effect:
 * as a card scrolls past the left edge it rotates, scales down and stacks.
 * Ported from the "overlapping swiper" (smooothy virtual scroll + drag momentum).
 */
export default function TestimonialsDeck() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    if (slides.length === 0) return;

    const preventSelect = (event: Event) => event.preventDefault();
    track.addEventListener("selectstart", preventSelect);

    // Live gap between cards (set in CSS as margin-left) — keeps setOffset honest
    // across breakpoints.
    const measureGap = () =>
      slides.length > 1 && slides[0].offsetWidth > 0
        ? slides[1].offsetLeft - slides[0].offsetLeft - slides[0].offsetWidth
        : 0;

    const slider = new Core(track, {
      infinite: false,
      snap: false,
      variableWidth: true,
      lerpFactor: 0.02,
      speedDecay: 0.97,
      bounceLimit: 0,
      setOffset: ({ itemWidth, totalWidth }: Viewport) => {
        const lastSlideOffset =
          (testimonials.length - 1) * (itemWidth + measureGap());
        return totalWidth - lastSlideOffset;
      },
      onUpdate: (instance: Core) => {
        const vwOffset = window.innerWidth * 0.1;

        slides.forEach((slide, i) => {
          const slideWidth = slide.offsetWidth;
          const slideLeft = slide.offsetLeft + instance.current;
          const isLast = i === testimonials.length - 1;

          if (slideLeft < 0 && !isLast) {
            const ratio = Math.min(1, Math.abs(slideLeft) / slideWidth);
            slide.style.transformOrigin = "left 80%";
            slide.style.transform = `translateX(${
              instance.current + Math.abs(slideLeft) + ratio * vwOffset
            }px) rotate(${-15 * ratio}deg) scale(${1 - ratio * 0.4})`;
          } else {
            slide.style.transformOrigin = "";
            slide.style.transform = `translateX(${instance.current}px)`;
          }
          slide.style.zIndex = `${i + 1}`;
        });
      },
    });

    let animId = 0;
    let wasDragging = false;
    let momentum = 0;
    const MOMENTUM_MULTIPLIER = 10;
    const MOMENTUM_DECAY = 0.96;

    const animate = () => {
      slider.update();

      if (slider.isDragging) {
        wasDragging = true;
        momentum = 0;
      } else if (wasDragging) {
        momentum = slider.speed * MOMENTUM_MULTIPLIER;
        wasDragging = false;
      }

      if (Math.abs(momentum) > 0.5) {
        slider.target += momentum;
        momentum *= MOMENTUM_DECAY;
        slider.target = Math.max(slider.maxScroll, Math.min(0, slider.target));
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      track.removeEventListener("selectstart", preventSelect);
      slider.destroy();
    };
  }, []);

  return (
    <section className="deck border-b">
      <div className="deck-intro pad-global border-r">
        <div className="text-sm">04 / In Their Words</div>
        <h2 className="text-huge">
          Kind
          <br />
          Words
        </h2>
        <p className="text-md deck-intro__copy">
          A few notes from people who now run their business on a site I built.
          Drag through.
        </p>
      </div>

      <div className="deck-viewport">
        <div ref={trackRef} className="deck-track">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className={`deck-card deck-card--${item.tone}`}
            >
              <p className="deck-card__quote">&ldquo;{item.quote}&rdquo;</p>
              <p className="deck-card__cite">
                <strong>{item.name}</strong>
                <span className="deck-card__detail">{item.detail}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
