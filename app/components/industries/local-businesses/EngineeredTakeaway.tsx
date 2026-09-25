import { TransitionLink } from "@/app/components/providers/PageTransition";
import { businessCategories } from "@/app/components/work/businessCategories";

/**
 * Closing statement — "Websites For Every Business And Every Budget." Sits
 * directly above ProcessSection ("From Domain To Launch") on the
 * local-businesses page. The kinds of businesses it's built for are listed
 * down the left and right sides of the paragraphs, below the headline, on
 * wide screens (hidden on narrower ones so the copy keeps its room).
 */
const half = Math.ceil(businessCategories.length / 2);
const leftList = businessCategories.slice(0, half);
const rightList = businessCategories.slice(half);

function SideList({
  eyebrow,
  items,
  align,
}: {
  eyebrow: string;
  items: typeof businessCategories;
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

export default function EngineeredTakeaway() {
  return (
    <section className="pad-global border-b takeaway">
      <h3
        className="text-huge"
        style={{
          fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
          marginBottom: "1.5rem",
        }}
      >
        Websites For Every Business
        <br />
        And Every Budget.
      </h3>

      <div className="takeaway__body">
        <SideList eyebrow="Built for" items={leftList} align="left" />

        <div className="takeaway__center">
          <p className="text-md" style={{ maxWidth: 760 }}>
            Whether you&rsquo;re a family-run business starting small,
            growing, or ready for something fully custom, I offer flexible
            website options built around your needs, goals, and budget.
          </p>
          <p className="text-md" style={{ maxWidth: 760 }}>
            Whatever you do, I&rsquo;ll create a website that clearly explains
            your business, builds trust, and helps customers take the next
            step.
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
