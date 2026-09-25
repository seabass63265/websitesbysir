import { TransitionLink } from "@/app/components/providers/PageTransition";
import NavMenu from "@/app/components/marketing/NavMenu";
import SectionNav from "@/app/components/industries/SectionNav";

/**
 * Industry-page header — wordmark, page breadcrumb, inline section nav,
 * and a "Menu" link. Distinct from the marketing <SiteHeader> (which
 * drives the fullscreen blob menu); this page carries its own visible
 * nav as in the design. Nav labels mirror the page's own numbered
 * sections (01–04) plus Contact. In-page anchors are smooth-scrolled by
 * the shared Lenis provider.
 */
const navLinks = [
  { label: "01 — Process", href: "#process" },
  { label: "02 — Pages", href: "#capabilities" },
  { label: "03 — Connect Your Tools", href: "#tools" },
  { label: "04 — Pricing", href: "#pricing" },
  { label: "05 — Contact", href: "#contact" },
];

const menuLinks = [
  { num: "I", label: "Process", href: "#process" },
  { num: "II", label: "Pages", href: "#capabilities" },
  { num: "III", label: "Connect Your Tools", href: "#tools" },
  { num: "IV", label: "Pricing", href: "#pricing" },
  { num: "V", label: "Contact", href: "#contact" },
];

export default function RestaurantsHeader() {
  return (
    <>
      <header className="border-b pad-global text-sm">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <TransitionLink href="/">SIR_</TransitionLink>
          <span style={{ opacity: 0.5 }}>/</span>
          <span>Restaurants &amp; Cafés</span>
        </div>
        <SectionNav links={navLinks} />
      </header>
      <NavMenu primaryLinks={menuLinks} secondaryTop={[]} secondaryBottom={[]} />
    </>
  );
}
