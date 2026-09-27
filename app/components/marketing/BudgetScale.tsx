"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Budget scale on /why-sir: a marker slides from "Simple & focused" to
 * "Fully custom builds" as the box scrolls through the viewport, lighting up
 * each tier and its price. Ranges span the industry pages (Portfolios starts
 * lowest, Startups tops out highest), so keep them in sync with those
 * PricingSection files.
 */
const tiers = [
  {
    level: "Tier 1",
    name: "Essential",
    price: "$750 – $1,500",
    unit: "one-time build",
    monthly: "$80 – $140",
    monthlyUnit: "per month for hosting & maintenance",
  },
  {
    level: "Tier 2",
    name: "Growth",
    price: "$1,250 – $2,500",
    unit: "one-time build",
    monthly: "$120 – $220",
    monthlyUnit: "per month for hosting & maintenance",
  },
  {
    level: "Tier 3",
    name: "Tailored",
    price: "Custom Pricing",
    unit: "built around your goals, needs, and budget",
    monthly: null,
    monthlyUnit: null,
  },
];

const stops = [0, 0.5, 1];

function nearestStop(p: number) {
  let best = 0;
  for (let i = 1; i < stops.length; i++) {
    if (Math.abs(stops[i] - p) < Math.abs(stops[best] - p)) best = i;
  }
  return best;
}

export default function BudgetScale() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const start = vh * 0.85;
      const end = vh * 0.3;
      const p = Math.min(1, Math.max(0, (start - center) / (start - end)));
      box.style.setProperty("--p", p.toFixed(3));
      setActive(nearestStop(p));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className="border border-brand p-6 md:p-8 flex flex-col gap-8"
      style={{ "--p": 0 } as React.CSSProperties}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="border border-brand/30 px-4 py-2 text-[0.75rem] uppercase tracking-widest shrink-0 whitespace-nowrap">
          Simple &amp; focused
        </div>

        <div
          className="w-full md:flex-1 h-[1px] bg-brand/30 relative min-w-[50px] mx-4"
          aria-hidden="true"
        >
          <div className="absolute left-0 top-0 h-full bg-brand w-[calc(var(--p)*100%)]" />
          {stops.map((s) => (
            <div
              key={s}
              className="absolute top-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-brand/40"
              style={{ left: `${s * 100}%` }}
            />
          ))}
          <div className="absolute top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-brand left-[calc(var(--p)*100%)]" />
        </div>

        <div className="border border-brand/30 px-4 py-2 text-[0.75rem] uppercase tracking-widest shrink-0 whitespace-nowrap">
          Fully custom builds
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier, i) => {
          const on = i === active;
          return (
            <div
              key={tier.name}
              aria-current={on ? "true" : undefined}
              className={`border p-5 flex flex-col gap-2 transition-all duration-300 ${
                on
                  ? "border-brand opacity-100"
                  : "border-brand/30 opacity-40"
              }`}
            >
              <div className="text-[0.75rem] uppercase tracking-widest text-brand/50">
                {tier.level} &middot; {tier.name}
              </div>
              <div className="text-[1.5rem] md:text-[1.75rem] font-bold leading-tight">
                {tier.price}
              </div>
              <div className="text-[0.8125rem] text-brand/70">{tier.unit}</div>
              {tier.monthly && (
                <div className="text-[0.8125rem] text-brand/70 mt-2 pt-3 border-t-[1px] border-brand/20">
                  <span className="font-bold text-brand">
                    + {tier.monthly}
                  </span>{" "}
                  {tier.monthlyUnit}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-brand/50 text-[0.75rem]">
        Starting prices vary by industry. Each industry page lists its exact
        pricing.
      </p>

      <a href="#services" className="btn-pill self-start">
        Select Service Area <span aria-hidden="true">&nbsp;&darr;</span>
      </a>
    </div>
  );
}
