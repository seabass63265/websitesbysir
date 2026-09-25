"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Homepage closing block — a compact blueprint-style card: a short pitch and
 * signature on the left, an animated line drawing of a website (desktop +
 * phone + "approved" stamp) on the right, drawn in as it scrolls into view.
 * Ported from the standalone "Website Blueprint" mockup, re-themed to the
 * site's white ground / navy ink. The animation classes are `bp-*` in
 * globals.css; `prefers-reduced-motion` shows everything drawn straight away.
 */
export default function BlueprintCta() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bp-wrap pad-global">
      <div
        ref={ref}
        className={`bp blueprint-grid${visible ? " bp-visible" : ""}`}
      >
        <div className="bp__content">
          <h2 className="bp-anim-content bp-c1">
            Your business deserves a website built around it.
          </h2>
          <p className="bp-anim-content bp-c2">
            Every business starts somewhere. Whether you are opening your first
            location, growing a family-owned business, or building something
            entirely new, SIR_ can create a website around your goals, needs,
            and budget.
          </p>
          <p className="bp-anim-content bp-c2">
            You do not need to understand technology or arrive with everything
            figured out. Tell us about your business, and we will help you
            plan, design, build, and launch the right website.
          </p>
        </div>

        <div className="bp__art" aria-hidden="true">
          <svg viewBox="0 0 700 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker
                id="bp-arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--brand)" />
              </marker>
            </defs>

            <g className="bp-anim-fade bp-d1">
              <line x1="0" y1="550" x2="700" y2="550" className="bp-line-faint" />
              <line x1="100" y1="0" x2="100" y2="600" className="bp-line-faint" />
              <line x1="580" y1="0" x2="580" y2="600" className="bp-line-faint" />
            </g>

            <g transform="translate(100, 80)">
              <rect x="0" y="0" width="480" height="360" className="bp-line bp-fill bp-anim-draw" />
              <line x1="0" y1="30" x2="480" y2="30" className="bp-line bp-anim-draw bp-draw2" />
              <circle cx="15" cy="15" r="4" className="bp-line bp-anim-fade bp-d2" />
              <circle cx="30" cy="15" r="4" className="bp-line bp-anim-fade bp-d2" />
              <circle cx="45" cy="15" r="4" className="bp-line bp-anim-fade bp-d2" />
              <rect x="70" y="8" width="300" height="14" className="bp-line-thin bp-anim-draw bp-draw2" />
              <text x="75" y="18" className="bp-text-faint bp-anim-fade bp-d3">
                https://your-business.com
              </text>
              <rect x="40" y="60" width="400" height="140" className="bp-line bp-anim-draw bp-draw2" />
              <line x1="40" y1="60" x2="440" y2="200" className="bp-line-thin bp-anim-draw bp-draw2" />
              <line x1="440" y1="60" x2="40" y2="200" className="bp-line-thin bp-anim-draw bp-draw2" />
              <rect x="40" y="220" width="250" height="20" className="bp-line bp-anim-draw bp-draw2" />
              <rect x="40" y="250" width="350" height="10" className="bp-line bp-anim-draw bp-draw2" />
              <rect x="40" y="270" width="300" height="10" className="bp-line bp-anim-draw bp-draw2" />
              <rect x="40" y="300" width="100" height="30" className="bp-line bp-anim-draw bp-draw2" />
              <g className="bp-anim-fade bp-d3">
                <line x1="40" y1="40" x2="440" y2="40" className="bp-line-thin" markerStart="url(#bp-arrow)" markerEnd="url(#bp-arrow)" />
                <text x="240" y="35" textAnchor="middle" className="bp-text">MAX-WIDTH: 1200PX</text>
                <line x1="20" y1="60" x2="20" y2="200" className="bp-line-thin" markerStart="url(#bp-arrow)" markerEnd="url(#bp-arrow)" />
                <text x="15" y="130" textAnchor="end" className="bp-text" transform="rotate(-90 15,130)">HERO SEC</text>
              </g>
            </g>

            <g transform="translate(35, 180)">
              <rect x="0" y="0" width="140" height="280" fill="var(--bg)" className="bp-anim-fade bp-d2" />
              <rect x="0" y="0" width="140" height="280" rx="12" className="bp-line bp-anim-draw bp-draw2" />
              <line x1="50" y1="10" x2="90" y2="10" className="bp-line-thin bp-anim-draw bp-draw2" />
              <rect x="15" y="30" width="110" height="80" className="bp-line bp-anim-draw bp-draw2" />
              <line x1="15" y1="30" x2="125" y2="110" className="bp-line-faint bp-anim-draw bp-draw2" />
              <line x1="125" y1="30" x2="15" y2="110" className="bp-line-faint bp-anim-draw bp-draw2" />
              <rect x="15" y="125" width="90" height="12" className="bp-line bp-anim-draw bp-draw2" />
              <rect x="15" y="145" width="110" height="6" className="bp-line bp-anim-draw bp-draw2" />
              <rect x="15" y="157" width="100" height="6" className="bp-line bp-anim-draw bp-draw2" />
              <rect x="15" y="175" width="110" height="40" className="bp-line bp-anim-draw bp-draw2" />
              <text x="70" y="295" textAnchor="middle" className="bp-text bp-anim-fade bp-d3">RESPONSIVE</text>
              <line x1="70" y1="282" x2="70" y2="288" className="bp-line-thin bp-anim-fade bp-d3" />
            </g>

            <g className="bp-anim-fade bp-d3">
              <path d="M 520 40 L 580 40 L 600 60" fill="none" stroke="var(--bp-ink-light)" strokeWidth="0.75" />
              <text x="605" y="62" className="bp-text">CONCEPT TO LAUNCH</text>
              <circle cx="580" cy="400" r="3" fill="var(--brand)" />
              <line x1="580" y1="400" x2="620" y2="400" className="bp-line-thin" />
              <text x="625" y="403" className="bp-text">CUSTOM BUILD</text>
              <text x="100" y="520" className="bp-text">DESIGNED FOR YOUR BUSINESS</text>
              <line x1="100" y1="525" x2="280" y2="525" className="bp-line-thin" />
            </g>

            <g transform="translate(520, 460)">
            <g className="bp-stamp bp-anim-stamp bp-d4">
              <circle cx="0" cy="0" r="45" fill="var(--bg)" opacity="0.9" />
              <circle cx="0" cy="0" r="40" className="bp-stamp-circle" />
              <circle cx="0" cy="0" r="36" fill="none" stroke="var(--brand)" strokeWidth="1" />
              <text x="0" y="5" textAnchor="middle" fontWeight="700" fontSize="22" fill="var(--brand)">SIR_</text>
              <path id="bp-stamp-top" d="M -25,0 A 25,25 0 0,1 25,0" fill="none" />
              <text fontSize="7" fill="var(--brand)" letterSpacing="1.5">
                <textPath href="#bp-stamp-top" startOffset="50%" textAnchor="middle">APPROVED</textPath>
              </text>
              <path id="bp-stamp-bot" d="M 25,0 A 25,25 0 0,1 -25,0" fill="none" />
              <text fontSize="7" fill="var(--brand)" letterSpacing="1">
                <textPath href="#bp-stamp-bot" startOffset="50%" textAnchor="middle">BY FOUNDER</textPath>
              </text>
            </g>
            </g>
          </svg>
        </div>

        <div className="bp__signature bp-anim-content bp-c3">
          <span className="bp__sig-name">Sebastian I. Rocha</span>
          <span className="bp__sig-line">Founder &amp; Developer, SIR_</span>
          <span className="bp__sig-line">Los Angeles, California</span>
        </div>
      </div>
    </section>
  );
}
