import { TransitionLink } from "@/app/components/providers/PageTransition";
import { nonprofitTypes } from "@/app/components/industries/nonprofits/nonprofitTypes";

/**
 * Closing statement — "Websites For Every Mission And Every Budget." Sits
 * directly above ProcessSection ("From Domain To Launch") on the nonprofits
 * page. The kinds of organizations it's built for are listed down the left and
 * right sides of the paragraphs, below the headline, on wide screens
 * (stacked below the copy on narrower ones).
 */
const half = Math.ceil(nonprofitTypes.length / 2);
const leftList = nonprofitTypes.slice(0, half);
const rightList = nonprofitTypes.slice(half);

function SideList({
  eyebrow,
  items,
  align,
}: {
  eyebrow: string;
  items: typeof nonprofitTypes;
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

export default function NonprofitTakeaway() {
  return (
    <section className="pad-global border-b takeaway">
      <h3
        className="text-huge"
        style={{
          fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
          marginBottom: "1.5rem",
        }}
      >
        Websites For Every Mission
        <br />
        And Every Budget.
      </h3>

      <div className="takeaway__body">
        <SideList eyebrow="Built for" items={leftList} align="left" />

        <div className="takeaway__center">
          <p className="text-md" style={{ maxWidth: 760 }}>
            Whether you&rsquo;re a volunteer-run group just getting started,
            a growing organization, or an established nonprofit ready for
            something fully custom, I offer flexible website options built
            around your mission, goals, and budget.
          </p>
          <p className="text-md" style={{ maxWidth: 760 }}>
            Whatever cause you serve, I&rsquo;ll create a website that
            clearly tells your story, builds trust with your community, and
            makes it easy to donate, volunteer, or get involved.
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
