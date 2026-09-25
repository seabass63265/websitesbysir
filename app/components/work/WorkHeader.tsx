import { TransitionLink } from "@/app/components/providers/PageTransition";
import NavMenu from "@/app/components/marketing/NavMenu";

/**
 * /work header — wordmark plus a "/ Works" page breadcrumb, matching the
 * industry pages' headers, with the standard fullscreen blob menu.
 */
export default function WorkHeader() {
  return (
    <>
      <header className="border-b pad-global text-sm">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <TransitionLink href="/">SIR_</TransitionLink>
          <span style={{ opacity: 0.5 }}>/</span>
          <span>Works</span>
        </div>
      </header>
      <NavMenu />
    </>
  );
}
