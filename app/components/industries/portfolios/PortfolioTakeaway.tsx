"use client";

import { TransitionLink } from "@/app/components/providers/PageTransition";
import { personalBrandTypes } from "@/app/components/industries/portfolios/personalBrandTypes";
import { useT } from "@/app/components/providers/LanguageProvider";

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

export default function PortfolioTakeaway() {
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
        {t("Portfolios For Every Talent", "Portafolios Para Todo Talento")}
        <br />
        {t("And Every Budget.", "Y Todo Presupuesto.")}
      </h3>

      <div className="takeaway__body">
        <SideList eyebrow={t("Built for", "Hecho para")} items={leftList} align="left" />

        <div className="takeaway__center">
          <p className="text-md" style={{ maxWidth: 760 }}>
            {t(
              "Whether you're just starting out, building your name, or ready for a fully custom personal brand, I offer flexible website options built around your work, goals, and budget.",
              "Ya sea que estés empezando, construyendo tu nombre, o listo para una marca personal totalmente personalizada, ofrezco opciones de sitios web flexibles construidas alrededor de tu trabajo, metas, y presupuesto."
            )}
          </p>
          <p className="text-md" style={{ maxWidth: 760 }}>
            {t(
              "Whatever you create, I'll build a website that shows off your work, tells your story, builds trust, and makes it easy for people to book you, hire you, or follow along.",
              "Sea lo que crees, construiré un sitio web que muestre tu trabajo, cuente tu historia, genere confianza, y facilite que la gente te reserve, te contrate, o te siga."
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
