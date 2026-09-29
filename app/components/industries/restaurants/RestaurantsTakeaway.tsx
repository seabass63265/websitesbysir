"use client";

import { TransitionLink } from "@/app/components/providers/PageTransition";
import { restaurantTypes } from "@/app/components/industries/restaurants/restaurantTypes";
import { useT } from "@/app/components/providers/LanguageProvider";

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
  const t = useT();
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
              {item.number} &mdash; {t(item.label, item.labelEs)}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default function RestaurantsTakeaway() {
  const t = useT();
  return (
    <section className="pad-global border-b takeaway">
      <h3
        className="text-huge"
        style={{
          fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
          marginBottom: "1.5rem",
        }}
      >
        {t("Websites For Every Restaurant", "Sitios Web Para Todo Restaurante")}
        <br />
        {t("And Every Concept.", "Y Todo Concepto.")}
      </h3>

      <div className="takeaway__body">
        <SideList eyebrow={t("Built for", "Hecho para")} items={leftList} align="left" />

        <div className="takeaway__center">
          <p className="text-md" style={{ maxWidth: 760 }}>
            {t(
              "Whether you're a neighborhood café, a family-run restaurant, or a multi-location brand, I offer flexible website options built around your menu, your guests, and your budget.",
              "Ya sea que seas un café de barrio, un restaurante familiar, o una marca con varias ubicaciones, ofrezco opciones de sitios web flexibles construidas alrededor de tu menú, tus clientes, y tu presupuesto."
            )}
          </p>
          <p className="text-md" style={{ maxWidth: 760 }}>
            {t(
              "Whatever you serve, I'll create a website that makes your food look as good as it tastes, and makes it easy for guests to see the menu, order online, or reserve a table.",
              "Sea lo que sirvas, crearé un sitio web que haga que tu comida se vea tan bien como sabe, y que facilite a tus clientes ver el menú, ordenar en línea, o reservar una mesa."
            )}
          </p>
          <TransitionLink
            href="/work"
            className="btn-pill"
            style={{ marginTop: "2rem" }}
          >
            {t("View All Work", "Ver Todo el Trabajo")} <span aria-hidden="true">&nbsp;&rarr;</span>
          </TransitionLink>
        </div>

        <SideList eyebrow={t("…and more", "…y más")} items={rightList} align="right" />
      </div>
    </section>
  );
}
