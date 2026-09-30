"use client";

import { TransitionLink } from "@/app/components/providers/PageTransition";
import FounderHelmet from "@/app/components/marketing/FounderHelmet";
import { useLanguage, useT } from "@/app/components/providers/LanguageProvider";

/**
 * "About the studio" block on /why-sir, directly under the budget statement
 * (ported from the standalone About mockup, re-themed to the site's white
 * ground / navy ink).
 *
 * Note: this project's global `.text-lg/.text-sm/.text-xs/.border-t/.border-b`
 * classes shadow Tailwind's same-named utilities (see WhyWorkWithMe), so those
 * sizes/borders are written as arbitrary values here.
 */
const buttonBase =
  "group inline-flex items-center justify-center gap-3 border border-brand px-8 py-4 font-bold uppercase tracking-wider text-[0.875rem] transition-colors";

/** Inline industry name styled as a small button that links to its page. */
function IndustryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <TransitionLink
      href={href}
      className="border border-brand px-[0.5em] py-[0.1em] font-bold text-brand! [box-decoration-break:clone] [-webkit-box-decoration-break:clone] transition-colors hover:bg-brand hover:text-bg!"
    >
      {children}
    </TransitionLink>
  );
}

export default function AboutStudio() {
  const t = useT();
  const { lang } = useLanguage();

  const principles = [
    {
      title: t("Strategic Direction", "Dirección Estratégica"),
      body: t(
        "Building a clear roadmap for your digital presence before design even begins, ensuring your website aligns perfectly with your business goals.",
        "Construyendo una hoja de ruta clara para tu presencia digital antes de que empiece el diseño, asegurando que tu sitio web se alinee perfectamente con las metas de tu negocio."
      ),
      icon: (
        <>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </>
      ),
    },
    {
      title: t("Custom Design", "Diseño Personalizado"),
      body: t(
        "Crafting tailored visual identities and interfaces that communicate your business's true value, without relying on generic templates.",
        "Creando identidades visuales e interfaces a la medida que comunican el verdadero valor de tu negocio, sin depender de plantillas genéricas."
      ),
      icon: (
        <>
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ),
    },
    {
      title: t("Reliable Delivery", "Entrega Confiable"),
      body: t(
        "Providing transparent timelines and consistent updates so you never have to wonder when your project will be ready for launch.",
        "Ofreciendo plazos transparentes y actualizaciones constantes para que nunca te preguntes cuándo estará listo tu proyecto para lanzarse."
      ),
      icon: (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </>
      ),
    },
  ];

  const stats = [
    { title: t("100% Custom", "100% Personalizado"), label: t("Designed around your business", "Diseñado alrededor de tu negocio") },
    { title: t("2–3 Business Days", "2–3 Días Hábiles"), label: t("Typical response time", "Tiempo de respuesta típico") },
    { title: t("Built to Stand Out", "Hecho para Destacar"), label: t("Professional, clean, and distinct", "Profesional, limpio, y distintivo") },
  ];

  return (
    <section className="border-b-[1px]">
      <div className="max-w-[1152px] mx-auto px-6 py-20 md:py-24 flex flex-col gap-24 md:gap-32">
        {/* Intro + founder, side by side on wide screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          <div className="flex flex-col items-start w-full">
            <span className="text-brand/50 text-[0.75rem] md:text-[0.875rem] uppercase tracking-widest mb-6">
              {t("The studio behind the work.", "El estudio detrás del trabajo.")}
            </span>
            <h2 className="text-5xl md:text-7xl font-bold uppercase leading-[1.1] mb-8">
              {t("Websites for", "Sitios web para")}
              <br />
              <span className="italic">{t("businesses.", "negocios.")}</span>
            </h2>
            <p className="text-brand/70 text-[1.125rem] md:text-[1.25rem] leading-relaxed max-w-3xl">
              {t(
                "SIR_ is a Los Angeles-based web design and engineering studio. We manage the entire website process—from structure to design, development, launch, and ongoing support—giving every project a clear and dependable path from idea to online.",
                "SIR_ es un estudio de diseño e ingeniería web con sede en Los Ángeles. Manejamos todo el proceso del sitio web—desde la estructura hasta el diseño, desarrollo, lanzamiento, y soporte continuo—dándole a cada proyecto un camino claro y confiable desde la idea hasta estar en línea."
              )}
            </p>

            {/* Stats band. The Spanish titles ("PERSONALIZADO", "HÁBILES") run
                longer than their English counterparts, so this box gets a
                touch more room — wider on lg screens, more padding in each
                cell — only when lang is "es". */}
            <div
              className={
                lang === "es"
                  ? "w-full lg:w-[calc(100%+2rem)] lg:-mr-8 mt-12 border border-brand"
                  : "w-full mt-12 border border-brand"
              }
            >
              <div className="bg-brand text-bg py-4 px-4 text-center font-bold uppercase text-[0.8125rem] md:text-[0.875rem] tracking-widest w-full">
                {t("Built for businesses at every stage", "Hecho para negocios en cada etapa")}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`${lang === "es" ? "p-6 md:p-7" : "p-6"} flex flex-col items-center justify-center text-center${
                      index < stats.length - 1
                        ? " border-b md:border-b-0 md:border-r border-brand"
                        : ""
                    }`}
                  >
                    <div className="text-[1.25rem] md:text-[1.5rem] font-bold uppercase leading-[1.15] mb-3 break-words">
                      {stat.title}
                    </div>
                    <div className="text-[10px] md:text-[0.75rem] text-brand/50 uppercase tracking-widest max-w-[170px]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How we work */}
            <div className="w-full mt-12">
              <div className="text-[0.75rem] text-brand/50 uppercase tracking-widest mb-8">
                {t("How we work", "Cómo trabajamos")}
              </div>
              <div className="flex flex-col border-t-[1px]">
                {principles.map((item) => (
                  <div
                    key={item.title}
                    className="py-8 border-b-[1px] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8"
                  >
                    <div className="w-14 h-14 border border-brand/30 flex items-center justify-center shrink-0 text-brand/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="font-bold text-[1.125rem]">
                        {item.title}
                      </div>
                      <div className="text-brand/50 text-[0.875rem]">
                        {item.body}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Founder */}
          <div className="border border-brand p-8 md:p-12 flex flex-col items-center text-center w-full">
            <div className="w-72 h-72 md:w-96 md:h-96 border border-brand/30 flex flex-col items-center justify-center p-4 mb-10">
              <FounderHelmet />
            </div>

            <div className="text-[0.75rem] text-brand/50 uppercase tracking-widest mb-3">
              {t("Founder", "Fundador")}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Sebastian I. Rocha
            </h3>
            <div className="flex flex-col gap-5 max-w-2xl mb-10 text-brand/70 leading-relaxed text-[0.875rem] md:text-base">
              <p>
                {t(
                  "Sebastian founded SIR_ to close the gap between inexpensive template websites and high-priced agency work.",
                  "Sebastian fundó SIR_ para cerrar la brecha entre los sitios web económicos de plantilla y el trabajo costoso de agencias."
                )}
              </p>
              <p>
                {t(
                  "With a background in computer science, product development, and entrepreneurship, he leads SIR_ with an engineering and design approach focused on creating websites that look professional, communicate clearly, and help every client stand apart from competitors.",
                  "Con experiencia en ciencias de la computación, desarrollo de productos, y emprendimiento, dirige SIR_ con un enfoque de ingeniería y diseño centrado en crear sitios web que se vean profesionales, comuniquen con claridad, y ayuden a cada cliente a destacar frente a la competencia."
                )}
              </p>
              <p className="leading-[2.3]">
                {t("Together, the SIR_ team brings technical expertise, strategy, and creativity to", "Juntos, el equipo de SIR_ aporta experiencia técnica, estrategia, y creatividad a")}{" "}
                <IndustryLink href="/industries/restaurants-and-cafes">
                  {t("restaurants and cafés", "restaurantes y cafés")}
                </IndustryLink>
                ,{" "}
                <IndustryLink href="/industries/local-businesses">
                  {t("local businesses", "negocios locales")}
                </IndustryLink>
                ,{" "}
                <IndustryLink href="/industries/portfolios-and-personal-brands">
                  {t("creators and personal brands", "creadores y marcas personales")}
                </IndustryLink>
                ,{" "}
                <IndustryLink href="/industries/startups">
                  {t("startups", "startups")}
                </IndustryLink>
                ,{" "}
                <IndustryLink href="/industries/nonprofits">
                  {t("nonprofits", "organizaciones sin fines de lucro")}
                </IndustryLink>
                ,{" "}
                <IndustryLink href="/industries/nonprofits">
                  {t("organizations", "organizaciones")}
                </IndustryLink>
                , {t("and", "y")}{" "}
                <IndustryLink href="/industries/something-else">
                  {t("custom projects", "proyectos personalizados")}
                </IndustryLink>
                —{t("all at a more accessible starting point.", "todo desde un punto de partida más accesible.")}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="border border-brand/30 px-4 py-2 text-[0.75rem] text-brand/70 uppercase tracking-wider">
                {t("Est. Los Angeles, CA", "Fundado en Los Ángeles, CA")}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full max-w-[880px] mx-auto flex flex-col items-start gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl md:text-4xl font-bold">
              {t("Ready to put your business online?", "¿Listo para poner tu negocio en línea?")}
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <TransitionLink
              href="/#services"
              className={`${buttonBase} bg-brand text-bg! hover:bg-transparent hover:text-brand!`}
            >
              {t("Select a service", "Selecciona un servicio")}
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </TransitionLink>
            <TransitionLink
              href="/work"
              className={`${buttonBase} bg-transparent text-brand! hover:bg-brand hover:text-bg!`}
            >
              {t("View all work", "Ver todo el trabajo")}
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
