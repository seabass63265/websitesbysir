"use client";

import ScrollToTop from "@/app/components/providers/ScrollToTop";
import RestaurantsPageLoader from "@/app/components/industries/restaurants/RestaurantsPageLoader";
import NonprofitHeader from "@/app/components/industries/nonprofits/NonprofitHeader";
import NonprofitHero from "@/app/components/industries/nonprofits/NonprofitHero";
import Capabilities from "@/app/components/industries/nonprofits/Capabilities";
import PlatformConnections from "@/app/components/industries/nonprofits/PlatformConnections";
import NonprofitTakeaway from "@/app/components/industries/nonprofits/NonprofitTakeaway";
import ProcessSection from "@/app/components/industries/nonprofits/ProcessSection";
import PricingSection from "@/app/components/industries/nonprofits/PricingSection";
import NumberedSection from "@/app/components/industries/NumberedSection";
import IntakeSection from "@/app/components/contact/IntakeSection";
import LaunchOfferToast from "@/app/components/marketing/LaunchOfferToast";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Nonprofits page body, split out from the server shell (which keeps the
 * static `metadata` export) so the intake copy here can switch language
 * live.
 */
export default function NonprofitsBody() {
  const t = useT();

  // Placeholders for the intake's "tell us about your organization" question.
  const businessExamples = [
    t(
      "e.g. I run a food pantry and need a website that explains our hours and locations, takes donations, and lets volunteers sign up for shifts.",
      "ej. Manejo una despensa de alimentos y necesito un sitio web que explique nuestros horarios y ubicaciones, reciba donaciones, y permita a voluntarios registrarse para turnos."
    ),
    t(
      "e.g. I direct an after-school program and want a site that shares our mission, our programs, and how families can enroll.",
      "ej. Dirijo un programa extracurricular y quiero un sitio que comparta nuestra misión, nuestros programas, y cómo las familias pueden inscribirse."
    ),
    t(
      "e.g. I run an animal rescue and need a place to show adoptable pets, collect adoption applications, and accept donations.",
      "ej. Manejo un rescate de animales y necesito un lugar para mostrar mascotas en adopción, recopilar solicitudes de adopción, y aceptar donaciones."
    ),
    t(
      "e.g. I lead a community arts organization and want a site with our events calendar, ticket links, and a newsletter sign-up.",
      "ej. Dirijo una organización de arte comunitario y quiero un sitio con nuestro calendario de eventos, enlaces de boletos, y registro a boletín."
    ),
    t(
      "e.g. I am starting a mutual aid group and need a simple site to share resources, request help, and collect donations.",
      "ej. Estoy iniciando un grupo de ayuda mutua y necesito un sitio simple para compartir recursos, solicitar ayuda, y recopilar donaciones."
    ),
    t(
      "e.g. I run a small foundation and want a professional site that shares our story, our grants, and our impact.",
      "ej. Manejo una pequeña fundación y quiero un sitio profesional que comparta nuestra historia, nuestras becas, y nuestro impacto."
    ),
    t(
      "e.g. I organize a neighborhood cleanup group and want a site for upcoming events, volunteer sign-ups, and photos of our work.",
      "ej. Organizo un grupo de limpieza del vecindario y quiero un sitio para próximos eventos, registro de voluntarios, y fotos de nuestro trabajo."
    ),
    t(
      "e.g. I run a health clinic nonprofit and need an English and Spanish website that explains our services and how to get care.",
      "ej. Manejo una clínica de salud sin fines de lucro y necesito un sitio web en inglés y español que explique nuestros servicios y cómo recibir atención."
    ),
    t(
      "e.g. I am part of a faith-based outreach group and want a site with our events, ways to give, and a way to contact us.",
      "ej. Soy parte de un grupo de alcance religioso y quiero un sitio con nuestros eventos, formas de donar, y una manera de contactarnos."
    ),
    t(
      "e.g. I run an advocacy campaign and need a website that shares our cause, collects sign-ups, and takes donations.",
      "ej. Manejo una campaña de defensoría y necesito un sitio web que comparta nuestra causa, recopile registros, y reciba donaciones."
    ),
  ];

  return (
    <>
      <ScrollToTop />
      <RestaurantsPageLoader />
      <LaunchOfferToast />
      <NonprofitHeader />
      <main className="grid-container">
        <NonprofitHero />
        <NonprofitTakeaway />
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
            pricing={{ id: "pricing", label: "Nonprofit" }}
            businessExamples={businessExamples}
            businessLabel={t("organization", "organización")}
            websiteExample="www.yourorganization.org"
            otherIndustry={{
              prompt: t("Run a business?", "¿Manejas un negocio?"),
              label: t("I run a local business", "Manejo un negocio local"),
              href: "/industries/local-businesses",
            }}
            businessTypeHint={t(
              "Describe your organization, the cause you serve, and how people give, volunteer, or get help in a few words.\n\n(community organization, food bank, youth or education program, animal rescue, health and wellness, arts and culture, faith-based group, environmental group, housing, advocacy, mutual aid, foundation, or something else.)",
              "Describe tu organización, la causa que sirves, y cómo la gente dona, es voluntaria, o recibe ayuda en pocas palabras.\n\n(organización comunitaria, banco de alimentos, programa juvenil o educativo, rescate de animales, salud y bienestar, arte y cultura, grupo religioso, grupo ambiental, vivienda, defensoría, ayuda mutua, fundación, u otra cosa.)"
            )}
          />
        </NumberedSection>
      </main>
    </>
  );
}
