import { TransitionLink } from "@/app/components/providers/PageTransition";
import { startupTypes } from "@/app/components/industries/startups/startupTypes";

/**
 * Closing statement — "Websites For Every Startup And Every Stage." Sits
 * directly above ProcessSection ("From Domain To Launch") on the startups
 * page. The kinds of companies it's built for are listed down the left and
 * right sides of the paragraphs, below the headline, on wide screens
 * (stacked below the copy on narrower ones).
 */
const half = Math.ceil(startupTypes.length / 2);
const leftList = startupTypes.slice(0, half);
const rightList = startupTypes.slice(half);

function SideList({
  eyebrow,
  items,
  align,
}: {
  eyebrow: string;
  items: typeof startupTypes;
  align: "left" | "right";
}) {
  return (
    <aside
      className={`takeaway__side takeaway__side--${align}`}
      aria-label={eyebrow}
    >
      <div className="text-xs takeaway__eyebrow">{eyebrow}</div>
      <ul className="takeaway__list">
        {items.map((item) => (
          <li key={item.slug}>
            <span className="pill-tag">
              {item.number} &mdash; {item.label}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default function StartupTakeaway() {
  return (
    <section className="pad-global border-b takeaway">
      <h3
        className="text-huge"
        style={{
          fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
          marginBottom: "1.5rem",
        }}
      >
        Websites For Every Startup
        <br />
        And Every Stage.
      </h3>

      <div className="takeaway__body">
        <SideList eyebrow="Built for" items={leftList} align="left" />

        <div className="takeaway__center">
          <p className="text-md" style={{ maxWidth: 760 }}>
            Whether you&rsquo;re validating an idea, launching your first
            product, or scaling after a round, I offer flexible website
            options built around your product, goals, and budget.
          </p>
          <p className="text-md" style={{ maxWidth: 760 }}>
            Whatever you&rsquo;re building, I&rsquo;ll create a website that
            explains what you do in seconds, builds credibility with users
            and investors, and makes it easy to join the waitlist, book a
            demo, or sign up.
          </p>
          <TransitionLink
            href="/work"
            className="btn-pill"
            style={{ marginTop: "2rem" }}
          >
            View All Work <span aria-hidden="true">&nbsp;&rarr;</span>
          </TransitionLink>
        </div>

        <SideList eyebrow="…and more" items={rightList} align="right" />
      </div>
    </section>
  );
}
