"use client";

/**
 * Intro loader ported from reference/ — draws a circle + crosshair lines,
 * then slides up off-screen to reveal the page.
 * Client component: purely a mount-time animation, no interactivity.
 */
export default function RestaurantsPageLoader() {
  return (
    <div className="loader-screen">
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
    </div>
  );
}
