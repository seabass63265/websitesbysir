"use client";

import { TransitionLink } from "@/app/components/providers/PageTransition";
import { nonprofitTypes } from "@/app/components/industries/nonprofits/nonprofitTypes";
import { useT } from "@/app/components/providers/LanguageProvider";

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

export default function NonprofitTakeaway() {
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
        {t("Websites For Every Mission", "Sitios Web Para Toda Misión")}
        <br />
        {t("And Every Budget.", "Y Todo Presupuesto.")}
      </h3>

      <div className="takeaway__body">
        <SideList eyebrow={t("Built for", "Hecho para")} items={leftList} align="left" />

        <div className="takeaway__center">
          <p className="text-md" style={{ maxWidth: 760 }}>
            {t(
              "Whether you're a volunteer-run group just getting started, a growing organization, or an established nonprofit ready for something fully custom, I offer flexible website options built around your mission, goals, and budget.",
              "Ya sea que seas un grupo dirigido por voluntarios que apenas empieza, una organización en crecimiento, o una organización sin fines de lucro establecida lista para algo totalmente personalizado, ofrezco opciones de sitios web flexibles construidas alrededor de tu misión, metas, y presupuesto."
            )}
          </p>
          <p className="text-md" style={{ maxWidth: 760 }}>
            {t(
              "Whatever cause you serve, I'll create a website that clearly tells your story, builds trust with your community, and makes it easy to donate, volunteer, or get involved.",
              "Sea cual sea la causa que sirvas, crearé un sitio web que cuente claramente tu historia, genere confianza con tu comunidad, y facilite donar, ser voluntario, o involucrarse."
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
