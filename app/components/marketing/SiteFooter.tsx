import { TransitionLink } from "@/app/components/providers/PageTransition";

/**
 * Homepage footer — nav links, wordmark, and contact links under a dotted
 * fade-in band. Ported from the standalone footer mockup, re-themed to the
 * site's white ground / navy ink. Homepage only. Server component.
 *
 * This project's global `.text-sm/.text-xs/.border-t` classes shadow
 * Tailwind's same-named utilities, so those sizes are arbitrary values here.
 */
const navLinks = [
  { label: "About", href: "/why-sir" },
  { label: "Contact", href: "/contact" },
];

const contactLinks = [
  { label: "Works", href: "/work", internal: true },
  { label: "Email", href: "mailto:hello@sirwebsites.com" },
];

const linkClass =
  "group flex items-center text-brand/60 hover:text-brand transition-colors duration-300 p-1 -m-1 uppercase";

export default function SiteFooter() {
  return (
    <footer className="w-full">
      <div className="max-w-6xl mx-auto px-8 w-full">
        {/* Dotted fade-in band */}
        <div
          className="w-full h-12"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0, 49, 83, 0.3) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
            backgroundPosition: "bottom center",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
            maskImage: "linear-gradient(to bottom, transparent, black)",
          }}
        />
        <div className="w-full h-px bg-brand/20" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-16 pb-16 items-start">
          <nav
            className="flex flex-col gap-5 items-start text-[0.875rem]"
            aria-label="Footer navigation"
          >
            {navLinks.map((link) => (
              <TransitionLink
                key={link.label}
                href={link.href}
                className={linkClass}
              >
                <span>{link.label}</span>
                <span
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out ml-2"
                  aria-hidden="true"
                >
                  →
                </span>
              </TransitionLink>
            ))}
          </nav>

          <div className="flex flex-col items-center text-center px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/helmet-mark.png"
              width={45}
              height={48}
              alt=""
              aria-hidden="true"
              className="mb-5 h-12 w-auto rotate-[18deg]"
            />
            <TransitionLink href="/" className="inline-block p-1 -m-1 mb-2">
              <span className="text-xl font-bold tracking-tight">SIR_</span>
            </TransitionLink>
            <p className="text-[clamp(0.65rem,3vw,1rem)] whitespace-nowrap text-brand/60 mt-1">
              A Web Studio for Businesses at Every Stage
            </p>
            <p className="text-base text-brand/60 mt-1">Los Angeles, CA</p>
          </div>

          <nav
            className="flex flex-col gap-5 items-end text-[0.875rem]"
            aria-label="Contact links"
          >
            {contactLinks.map((link) => {
              const content = (
                <>
                  <span
                    className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out mr-2"
                    aria-hidden="true"
                  >
                    ←
                  </span>
                  <span>{link.label}</span>
                </>
              );
              return "internal" in link && link.internal ? (
                <TransitionLink
                  key={link.label}
                  href={link.href}
                  className={`${linkClass} justify-end`}
                >
                  {content}
                </TransitionLink>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`${linkClass} justify-end`}
                >
                  {content}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
}
