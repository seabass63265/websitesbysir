"use client";

import ScrollToTop from "@/app/components/providers/ScrollToTop";
import RestaurantsPageLoader from "@/app/components/industries/restaurants/RestaurantsPageLoader";
import SomethingElseHeader from "@/app/components/industries/something-else/SomethingElseHeader";
import SomethingElseHero from "@/app/components/industries/something-else/SomethingElseHero";
import SomethingElseTakeaway from "@/app/components/industries/something-else/SomethingElseTakeaway";
import ProcessSection from "@/app/components/industries/something-else/ProcessSection";
import Capabilities from "@/app/components/industries/something-else/Capabilities";
import PlatformConnections from "@/app/components/industries/something-else/PlatformConnections";
import PricingSection from "@/app/components/industries/something-else/PricingSection";
import NumberedSection from "@/app/components/industries/NumberedSection";
import IntakeSection from "@/app/components/contact/IntakeSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Something Else page body, split out from the server shell (which keeps
 * the static `metadata` export) so the intake copy here can switch
 * language live.
 */
export default function SomethingElseBody() {
  const t = useT();

  // Placeholders for the intake's "tell us about your project" question.
  const businessExamples = [
    t(
      "e.g. I run a nonprofit and need a website that shares our mission, takes donations, and lets volunteers sign up for events.",
      "ej. Manejo una organización sin fines de lucro y necesito un sitio web que comparta nuestra misión, reciba donaciones, y permita a voluntarios registrarse para eventos."
    ),
    t(
      "e.g. I lead a student organization and want a site with our team, upcoming events, and a simple way for new members to apply.",
      "ej. Dirijo una organización estudiantil y quiero un sitio con nuestro equipo, próximos eventos, y una forma simple para que nuevos miembros apliquen."
    ),
    t(
      "e.g. I'm organizing a conference and need a site with the schedule, speakers, ticket sales, and a place for sponsors.",
      "ej. Estoy organizando una conferencia y necesito un sitio con el horario, ponentes, venta de boletos, y un lugar para patrocinadores."
    ),
    t(
      "e.g. I'm a real estate agent and want listings, neighborhood guides, and an easy way for buyers and sellers to reach me.",
      "ej. Soy agente de bienes raíces y quiero listados, guías de vecindarios, y una forma fácil para que compradores y vendedores me contacten."
    ),
    t(
      "e.g. I'm part of a church community and need a site for service times, sermons, events, and online giving.",
      "ej. Soy parte de una comunidad religiosa y necesito un sitio para horarios de servicios, sermones, eventos, y donaciones en línea."
    ),
    t(
      "e.g. I run a local club and want a members-only area, a calendar, and a newsletter sign-up.",
      "ej. Manejo un club local y quiero un área solo para miembros, un calendario, y registro a boletín."
    ),
    t(
      "e.g. I sell a paid membership and need a site with sign-up, member content, and recurring billing.",
      "ej. Vendo una membresía paga y necesito un sitio con registro, contenido para miembros, y facturación recurrente."
    ),
    t(
      "e.g. I teach online and want a site for my courses, lesson previews, and student sign-ups.",
      "ej. Enseño en línea y quiero un sitio para mis cursos, vistas previas de lecciones, y registro de estudiantes."
    ),
    t(
      "e.g. I'm building a directory of local services and need searchable listings and a way for businesses to submit theirs.",
      "ej. Estoy construyendo un directorio de servicios locales y necesito listados con búsqueda y una forma para que los negocios envíen los suyos."
    ),
    t(
      "e.g. I'm running a community campaign and want a site that explains the cause, collects signatures, and shares updates.",
      "ej. Estoy dirigiendo una campaña comunitaria y quiero un sitio que explique la causa, recopile firmas, y comparta actualizaciones."
    ),
    t(
      "e.g. I have an idea for a custom web tool and need a site that explains it, with sign-in and a simple dashboard.",
      "ej. Tengo una idea para una herramienta web personalizada y necesito un sitio que la explique, con inicio de sesión y un panel simple."
    ),
    t(
      "e.g. I have an idea that doesn't fit any category and I'd like help figuring out what kind of website it needs.",
      "ej. Tengo una idea que no encaja en ninguna categoría y me gustaría ayuda para averiguar qué tipo de sitio web necesita."
    ),
  ];

  return (
    <>
      <ScrollToTop />
      <RestaurantsPageLoader />
      <SomethingElseHeader />
      <main className="grid-container">
        <SomethingElseHero />
        <SomethingElseTakeaway />
        <ProcessSection />
        <Capabilities />
        <PlatformConnections />
        <PricingSection />
        <NumberedSection
          n="05"
          label={t("Contact", "Contacto")}
          id="contact"
          tag={t("05 / START YOUR PROJECT", "05 / INICIA TU PROYECTO")}
        >
          <IntakeSection
            id="contact-form"
            scrollToId="contact"
            pricing={{ id: "pricing", label: "Custom Project" }}
            businessExamples={businessExamples}
            businessLabel={t("project", "proyecto")}
            websiteExample="www.yourproject.com"
            otherIndustry={{
              prompt: t("Have a business?", "¿Tienes un negocio?"),
              label: t("See the other service areas", "Ver las otras áreas de servicio"),
              href: "/#services",
            }}
            businessTypeHint={t(
              "Describe your project, what it's for, who it's for, and what you'd like the website to do in a few words.\n\n(nonprofit, school or club, event, real estate, community, membership site, online course, directory, campaign, custom web app, or something else.)",
              "Describe tu proyecto, para qué es, para quién es, y qué te gustaría que hiciera el sitio web en pocas palabras.\n\n(organización sin fines de lucro, escuela o club, evento, bienes raíces, comunidad, sitio de membresía, curso en línea, directorio, campaña, aplicación web personalizada, u otra cosa.)"
            )}
          />
        </NumberedSection>
      </main>
    </>
  );
}
