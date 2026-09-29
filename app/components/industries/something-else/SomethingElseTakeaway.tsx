"use client";

import { TransitionLink } from "@/app/components/providers/PageTransition";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Closing statement — "Websites For Whatever You're Building." Sits directly
 * above ProcessSection ("From Domain To Launch") on the Something Else page.
 */
export default function SomethingElseTakeaway() {
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
        {t("Websites For Whatever", "Sitios Web Para Lo Que Sea")}
        <br />
        {t("You're Building.", "Que Estés Construyendo.")}
      </h3>

      <div
        className="takeaway__body"
        style={{
          gridTemplateColumns: "minmax(0, 760px)",
          justifyContent: "center",
        }}
      >
        <div className="takeaway__center">
          <p className="text-md" style={{ maxWidth: 760 }}>
            {t(
              "Don't see your project on the list? That's exactly what this page is for. If it needs a website, I offer flexible options built around your idea, goals, and budget — no template required.",
              "¿No ves tu proyecto en la lista? Para eso es exactamente esta página. Si necesita un sitio web, ofrezco opciones flexibles construidas alrededor de tu idea, metas, y presupuesto — sin necesidad de plantilla."
            )}
          </p>
          <p className="text-md" style={{ maxWidth: 760 }}>
            {t(
              "Whatever you have in mind, I'll create a website that explains it clearly, builds trust, and helps people take the next step, whether that's donating, signing up, or getting in touch.",
              "Sea lo que tengas en mente, crearé un sitio web que lo explique claramente, genere confianza, y ayude a la gente a dar el siguiente paso, ya sea donar, registrarse, o contactarte."
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
      </div>
    </section>
  );
}
