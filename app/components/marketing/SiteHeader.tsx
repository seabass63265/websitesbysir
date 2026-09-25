import NavMenu from "@/app/components/marketing/NavMenu";
import { TransitionLink } from "@/app/components/providers/PageTransition";

/**
 * Sticky site header — wordmark plus the fullscreen navigation menu, which is
 * opened by the fixed blob toggle NavMenu renders.
 */
export default function SiteHeader() {
  return (
    <>
      <header className="border-b pad-global text-sm">
        <TransitionLink href="/">SIR_</TransitionLink>
        <span className="site-header__tagline">
          YOUR BUSINESS
          <br />
          BELONGS ONLINE
        </span>
      </header>
      <NavMenu />
    </>
  );
}
