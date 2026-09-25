import { TransitionLink } from "@/app/components/providers/PageTransition";
import { restaurantTypes } from "@/app/components/industries/restaurants/restaurantTypes";

/**
 * Closing statement — "Websites For Every Restaurant And Every Concept."
 * Sits directly under the hero and marquee on the Restaurants & Cafés page.
 * The kinds of food and drink businesses it's built for are listed down the
 * left and right sides of the paragraphs, below the headline, on wide
 * screens (stacked below the copy on narrower ones). Same layout and
 * `.takeaway*` CSS as the Local Businesses and Nonprofits pages.
 */
const half = Math.ceil(restaurantTypes.length / 2);
const leftList = restaurantTypes.slice(0, half);
const rightList = restaurantTypes.slice(half);

function SideList({
  eyebrow,
  items,
  align,
}: {
  eyebrow: string;
  items: typeof restaurantTypes;
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

export default function RestaurantsTakeaway() {
  return (
    <section className="pad-global border-b takeaway">
      <h3
        className="text-huge"
        style={{
          fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
          marginBottom: "1.5rem",
        }}
      >
        Websites For Every Restaurant
        <br />
        And Every Concept.
      </h3>

      <div className="takeaway__body">
        <SideList eyebrow="Built for" items={leftList} align="left" />

        <div className="takeaway__center">
          <p className="text-md" style={{ maxWidth: 760 }}>
            Whether you&rsquo;re a neighborhood café, a family-run
            restaurant, or a multi-location brand, I offer flexible website
            options built around your menu, your guests, and your budget.
          </p>
          <p className="text-md" style={{ maxWidth: 760 }}>
            Whatever you serve, I&rsquo;ll create a website that makes your
            food look as good as it tastes, and makes it easy for guests to
            see the menu, order online, or reserve a table.
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
