import { TransitionLink } from "@/app/components/providers/PageTransition";
import { somethingElseTypes } from "@/app/components/industries/something-else/somethingElseTypes";

/**
 * Closing statement — "Websites For Whatever You're Building." Sits directly
 * above ProcessSection ("From Domain To Launch") on the Something Else page.
 * The kinds of projects it's built for are listed down the left and right
 * sides of the paragraphs, below the headline, on wide screens (stacked below
 * the copy on narrower ones).
 */
const half = Math.ceil(somethingElseTypes.length / 2);
const leftList = somethingElseTypes.slice(0, half);
const rightList = somethingElseTypes.slice(half);

function SideList({
  eyebrow,
  items,
  align,
}: {
  eyebrow: string;
  items: typeof somethingElseTypes;
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

      <div className="takeaway__body">
        <SideList eyebrow="Built for" items={leftList} align="left" />

        <div className="takeaway__center">
          <p className="text-md" style={{ maxWidth: 760 }}>
            Don&rsquo;t see your project on the list? That&rsquo;s exactly
            what this page is for. If it needs a website, I offer flexible
            options built around your idea, goals, and budget &mdash; no
            template required.
          </p>
          <p className="text-md" style={{ maxWidth: 760 }}>
            Whatever you have in mind, I&rsquo;ll create a website that
            explains it clearly, builds trust, and helps people take the next
            step, whether that&rsquo;s donating, signing up, or getting in
            touch.
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
