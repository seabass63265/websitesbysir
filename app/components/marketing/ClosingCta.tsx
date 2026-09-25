import { TransitionLink } from "@/app/components/providers/PageTransition";

/**
 * Closing CTA — centered oversized headline and a solid navy call-to-action
 * that opens the /intake project intake. Sits at the bottom of the homepage.
 */
export default function ClosingCta() {
  return (
    <section
      className="pad-global"
      style={{ textAlign: "center", paddingTop: "8rem", paddingBottom: "8rem" }}
    >
      <h2 className="text-huge" style={{ fontSize: "clamp(2rem, 5vw, 6rem)" }}>
        Not Sure Which
        <br />
        Level Fits?
      </h2>
      <div style={{ marginTop: "4rem" }}>
        <TransitionLink
          href="/intake"
          className="btn-pill inverted"
          style={{ fontSize: "1.5rem", padding: "1.5rem 3rem" }}
        >
          Tell Me About Your Project
        </TransitionLink>
      </div>
    </section>
  );
}
