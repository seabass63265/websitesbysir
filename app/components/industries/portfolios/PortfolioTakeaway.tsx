import { TransitionLink } from "@/app/components/providers/PageTransition";
import { personalBrandTypes } from "@/app/components/industries/portfolios/personalBrandTypes";

/**
 * Closing statement — "Portfolios For Every Talent And Every Budget." Sits
 * directly above ProcessSection ("From Domain To Launch") on the
 * portfolios page. The kinds of people it's built for are listed down the
 * left and right sides of the paragraphs, below the headline, on wide
 * screens (stacked below the copy on narrower ones).
 */
const half = Math.ceil(personalBrandTypes.length / 2);
const leftList = personalBrandTypes.slice(0, half);
const rightList = personalBrandTypes.slice(half);

function SideList({
  eyebrow,
  items,
  align,
}: {
  eyebrow: string;
  items: typeof personalBrandTypes;
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

export default function PortfolioTakeaway() {
  return (
    <section className="pad-global border-b takeaway">
      <h3
        className="text-huge"
        style={{
          fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
          marginBottom: "1.5rem",
        }}
      >
        Portfolios For Every Talent
        <br />
        And Every Budget.
      </h3>

      <div className="takeaway__body">
        <SideList eyebrow="Built for" items={leftList} align="left" />

        <div className="takeaway__center">
          <p className="text-md" style={{ maxWidth: 760 }}>
            Whether you&rsquo;re just starting out, building your name, or
            ready for a fully custom personal brand, I offer flexible website
            options built around your work, goals, and budget.
          </p>
          <p className="text-md" style={{ maxWidth: 760 }}>
            Whatever you create, I&rsquo;ll build a website that shows off
            your work, tells your story, builds trust, and makes it easy for
            people to book you, hire you, or follow along.
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
