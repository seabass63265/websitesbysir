"use client";

import { TransitionLink } from "@/app/components/providers/PageTransition";
import { startupTypes } from "@/app/components/industries/startups/startupTypes";
import { useT } from "@/app/components/providers/LanguageProvider";

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

export default function StartupTakeaway() {
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
        {t("Websites For Every Startup", "Sitios Web Para Todo Startup")}
        <br />
        {t("And Every Stage.", "Y Toda Etapa.")}
      </h3>

      <div className="takeaway__body">
        <SideList eyebrow={t("Built for", "Hecho para")} items={leftList} align="left" />

        <div className="takeaway__center">
          <p className="text-md" style={{ maxWidth: 760 }}>
            {t(
              "Whether you're validating an idea, launching your first product, or scaling after a round, I offer flexible website options built around your product, goals, and budget.",
              "Ya sea que estés validando una idea, lanzando tu primer producto, o escalando después de una ronda de inversión, ofrezco opciones de sitios web flexibles construidas alrededor de tu producto, metas, y presupuesto."
            )}
          </p>
          <p className="text-md" style={{ maxWidth: 760 }}>
            {t(
              "Whatever you're building, I'll create a website that explains what you do in seconds, builds credibility with users and investors, and makes it easy to join the waitlist, book a demo, or sign up.",
              "Sea lo que estés construyendo, crearé un sitio web que explique lo que haces en segundos, genere credibilidad con usuarios e inversionistas, y facilite unirse a la lista de espera, reservar una demo, o registrarse."
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
