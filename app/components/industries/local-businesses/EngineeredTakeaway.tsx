"use client";

import { TransitionLink } from "@/app/components/providers/PageTransition";
import { businessCategories } from "@/app/components/work/businessCategories";
import { useT } from "@/app/components/providers/LanguageProvider";

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

export default function EngineeredTakeaway() {
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
        {t("Websites For Every Business", "Sitios Web Para Todo Negocio")}
        <br />
        {t("And Every Budget.", "Y Todo Presupuesto.")}
      </h3>

      <div className="takeaway__body">
        <SideList eyebrow={t("Built for", "Hecho para")} items={leftList} align="left" />

        <div className="takeaway__center">
          <p className="text-md" style={{ maxWidth: 760 }}>
            {t(
              "Whether you're a family-run business starting small, growing, or ready for something fully custom, I offer flexible website options built around your needs, goals, and budget.",
              "Ya sea que seas un negocio familiar que empieza pequeño, está creciendo, o está listo para algo totalmente personalizado, ofrezco opciones de sitios web flexibles construidas alrededor de tus necesidades, metas, y presupuesto."
            )}
          </p>
          <p className="text-md" style={{ maxWidth: 760 }}>
            {t(
              "Whatever you do, I'll create a website that clearly explains your business, builds trust, and helps customers take the next step.",
              "Sea lo que hagas, crearé un sitio web que explique claramente tu negocio, genere confianza, y ayude a los clientes a dar el siguiente paso."
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
