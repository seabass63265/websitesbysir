import CircularGallery from "@/app/components/marketing/CircularGallery";

/**
 * Landing hero — the circular image gallery doubles as the hero visual,
 * with the headline/intro set centered in the ring instead of sitting in
 * its own section above it (see `.circular-gallery__hero-*` in globals.css
 * for the cut-down sizing that keeps it clear of the orbiting images).
 */
export default function Hero() {
  return (
    <CircularGallery hideCta>
      <h1 className="circular-gallery__hero-heading">
        Websites
        <br />
        For
        <br />
        Business
      </h1>
      <div className="circular-gallery__hero-text">
        Custom websites for businesses at every stage and budget.
        <br />
        We put your business online. 
        <br />
        Founded by <strong>S</strong>ebastian <strong>I</strong>.{" "}
        <strong>R</strong>ocha. Designed and developed by{" "}
        <strong>SIR</strong>.
      </div>
      <div className="circular-gallery__hero-location">Los Angeles, CA</div>
      <a href="#services" className="btn-pill circular-gallery__hero-cta">
        Let&apos;s Start <span aria-hidden="true">&nbsp;&rarr;</span>
      </a>
    </CircularGallery>
  );
}
