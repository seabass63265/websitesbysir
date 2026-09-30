"use client";

import ScrollToTop from "@/app/components/providers/ScrollToTop";
import RestaurantsPageLoader from "@/app/components/industries/restaurants/RestaurantsPageLoader";
import PortfolioHeader from "@/app/components/industries/portfolios/PortfolioHeader";
import PortfolioHero from "@/app/components/industries/portfolios/PortfolioHero";
import PortfolioTakeaway from "@/app/components/industries/portfolios/PortfolioTakeaway";
import ProcessSection from "@/app/components/industries/portfolios/ProcessSection";
import Capabilities from "@/app/components/industries/portfolios/Capabilities";
import PlatformConnections from "@/app/components/industries/portfolios/PlatformConnections";
import PricingSection from "@/app/components/industries/portfolios/PricingSection";
import NumberedSection from "@/app/components/industries/NumberedSection";
import IntakeSection from "@/app/components/contact/IntakeSection";
import LaunchOfferToast from "@/app/components/marketing/LaunchOfferToast";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Portfolios & Personal Brands page body, split out from the server shell
 * (which keeps the static `metadata` export) so the intake copy here can
 * switch language live.
 */
export default function PortfoliosBody() {
  const t = useT();

  // Placeholders for the intake's "tell us about your brand" question.
  const businessExamples = [
    t(
      "e.g. I am a photographer and want a portfolio that shows my best work by category and makes it easy for clients to book a session.",
      "ej. Soy fotógrafo y quiero un portafolio que muestre mi mejor trabajo por categoría y facilite a los clientes reservar una sesión."
    ),
    t(
      "e.g. I am a graphic designer and need a portfolio with case studies, my process, and a contact form for new projects.",
      "ej. Soy diseñador gráfico y necesito un portafolio con casos de estudio, mi proceso, y un formulario de contacto para nuevos proyectos."
    ),
    t(
      "e.g. I am a musician and want a site with my music, upcoming shows, press photos, and a way for people to book me.",
      "ej. Soy músico y quiero un sitio con mi música, próximos shows, fotos de prensa, y una forma para que la gente me contrate."
    ),
    t(
      "e.g. I am a filmmaker and want a reel, project pages, and a simple way for clients to request a quote.",
      "ej. Soy cineasta y quiero un reel, páginas de proyectos, y una forma simple para que los clientes soliciten una cotización."
    ),
    t(
      "e.g. I am a life coach and want a website that explains my services, shares testimonials, and lets people book a free call.",
      "ej. Soy coach de vida y quiero un sitio web que explique mis servicios, comparta testimonios, y permita a la gente reservar una llamada gratuita."
    ),
    t(
      "e.g. I am a writer and want a home for my published work, an about page, and a newsletter sign-up.",
      "ej. Soy escritor y quiero un hogar para mi trabajo publicado, una página acerca de mí, y una suscripción a boletín."
    ),
    t(
      "e.g. I am a software developer looking for a portfolio that shows my projects, my skills, and how to hire me.",
      "ej. Soy desarrollador de software buscando un portafolio que muestre mis proyectos, mis habilidades, y cómo contratarme."
    ),
    t(
      "e.g. I am an interior designer and want to showcase completed projects and let new clients start a conversation.",
      "ej. Soy diseñador de interiores y quiero mostrar proyectos terminados y permitir que nuevos clientes inicien una conversación."
    ),
    t(
      "e.g. I am a student and need a clean portfolio and résumé site to share with employers.",
      "ej. Soy estudiante y necesito un portafolio limpio y un sitio de currículum para compartir con empleadores."
    ),
  ];

  return (
    <>
      <ScrollToTop />
      <RestaurantsPageLoader />
      <LaunchOfferToast />
      <PortfolioHeader />
      <main className="grid-container">
        <PortfolioHero />
        <PortfolioTakeaway />
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
            pricing={{ id: "pricing", label: "Portfolio" }}
            businessExamples={businessExamples}
            businessLabel={t("brand", "marca")}
            websiteExample="www.yourname.com"
            otherIndustry={{
              prompt: t("Run a business?", "¿Manejas un negocio?"),
              label: t("I run a local business", "Manejo un negocio local"),
              href: "/industries/local-businesses",
            }}
            businessTypeHint={t(
              "Describe who you are, what you create or offer, and how people find or work with you in a few words.\n\n(photographer, designer, artist, musician, filmmaker, model, writer, coach, consultant, developer, architect, student, freelancer, or something else.)",
              "Describe quién eres, qué creas u ofreces, y cómo la gente te encuentra o trabaja contigo en pocas palabras.\n\n(fotógrafo, diseñador, artista, músico, cineasta, modelo, escritor, coach, consultor, desarrollador, arquitecto, estudiante, freelancer, u otra cosa.)"
            )}
          />
        </NumberedSection>
      </main>
    </>
  );
}
