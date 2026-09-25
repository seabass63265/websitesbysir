import { TransitionLink } from "@/app/components/providers/PageTransition";
import NavMenu from "@/app/components/marketing/NavMenu";
import SectionNav from "@/app/components/industries/SectionNav";

/**
 * Portfolios & Personal Brands header — wordmark, page breadcrumb, inline section nav
 * (scroll-spy highlighted, see SectionNav), and the fullscreen blob menu.
 * Mirrors RestaurantsHeader's structure. Sticky via the site-wide `header`
 * rule in globals.css.
 */
const navLinks = [
  { label: "01 — Process", href: "#process" },
  { label: "02 — Capabilities", href: "#capabilities" },
  { label: "03 — Connect Your Tools", href: "#platforms" },
  { label: "04 — Pricing", href: "#pricing" },
  { label: "05 — Contact", href: "#contact" },
];

const menuLinks = [
  { num: "I", label: "Process", href: "#process" },
  { num: "II", label: "Capabilities", href: "#capabilities" },
  { num: "III", label: "Connect Your Tools", href: "#platforms" },
  { num: "IV", label: "Pricing", href: "#pricing" },
  { num: "V", label: "Contact", href: "#contact" },
];

export default function PortfolioHeader() {
  return (
    <>
      <header className="border-b pad-global text-sm">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <TransitionLink href="/">SIR_</TransitionLink>
          <span style={{ opacity: 0.5 }}>/</span>
          <span>Portfolios &amp; Personal Brands</span>
        </div>
        <SectionNav links={navLinks} />
      </header>
      <NavMenu
        primaryLinks={menuLinks}
        secondaryTop={[]}
        secondaryBottom={[]}
        compact
      />
    </>
  );
}
