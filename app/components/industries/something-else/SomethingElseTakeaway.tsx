import { TransitionLink } from "@/app/components/providers/PageTransition";

/**
 * Closing statement — "Websites For Whatever You're Building." Sits directly
 * above ProcessSection ("From Domain To Launch") on the Something Else page.
 */
export default function SomethingElseTakeaway() {
  return (
    <section className="pad-global border-b takeaway">
      <h3
        className="text-huge"
        style={{
          fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
          marginBottom: "1.5rem",
        }}
      >
        Websites For Whatever
        <br />
        You&rsquo;re Building.
      </h3>

      <div
        className="takeaway__body"
        style={{
          gridTemplateColumns: "minmax(0, 760px)",
          justifyContent: "center",
        }}
      >
        <div className="takeaway__center">
          <p className="text-md" style={{ maxWidth: 760 }}>
            Don&rsquo;t see your project on the list? That&rsquo;s exactly what
            this page is for. If it needs a website, I offer flexible options
            built around your idea, goals, and budget &mdash; no template
            required.
          </p>
          <p className="text-md" style={{ maxWidth: 760 }}>
            Whatever you have in mind, I&rsquo;ll create a website that explains
            it clearly, builds trust, and helps people take the next step,
            whether that&rsquo;s donating, signing up, or getting in touch.
          </p>
          <TransitionLink
            href="/work"
            className="btn-pill"
            style={{ marginTop: "2rem" }}
          >
            View All Work <span aria-hidden="true">&nbsp;&rarr;</span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
