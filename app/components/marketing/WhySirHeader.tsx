import { TransitionLink } from "@/app/components/providers/PageTransition";
import NavMenu from "@/app/components/marketing/NavMenu";

/**
 * /why-sir header — wordmark plus a "/ Why SIR_" page breadcrumb, matching
 * the industry pages' headers, with the standard fullscreen blob menu.
 */
export default function WhySirHeader() {
  return (
    <>
      <header className="border-b pad-global text-sm">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <TransitionLink href="/">SIR_</TransitionLink>
          <span style={{ opacity: 0.5 }}>/</span>
          <span>Why SIR_</span>
        </div>
      </header>
      <NavMenu />
    </>
  );
}
