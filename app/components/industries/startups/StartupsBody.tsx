"use client";

import ScrollToTop from "@/app/components/providers/ScrollToTop";
import RestaurantsPageLoader from "@/app/components/industries/restaurants/RestaurantsPageLoader";
import StartupHeader from "@/app/components/industries/startups/StartupHeader";
import StartupHero from "@/app/components/industries/startups/StartupHero";
import StartupTakeaway from "@/app/components/industries/startups/StartupTakeaway";
import ProcessSection from "@/app/components/industries/startups/ProcessSection";
import Capabilities from "@/app/components/industries/startups/Capabilities";
import PlatformConnections from "@/app/components/industries/startups/PlatformConnections";
import PricingSection from "@/app/components/industries/startups/PricingSection";
import NumberedSection from "@/app/components/industries/NumberedSection";
import IntakeSection from "@/app/components/contact/IntakeSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Startups page body, split out from the server shell (which keeps the
 * static `metadata` export) so the intake copy here can switch language
 * live.
 */
export default function StartupsBody() {
  const t = useT();

  // Placeholders for the intake's "tell us about your startup" question.
  const businessExamples = [
    t(
      "e.g. I'm building a SaaS tool for freelancers and need a landing page with a clear pitch, pricing, and a waitlist for early access.",
      "ej. Estoy construyendo una herramienta SaaS para freelancers y necesito una página de aterrizaje con un pitch claro, precios, y una lista de espera para acceso anticipado."
    ),
    t(
      "e.g. I'm launching a mobile app next quarter and want a site with screenshots, a demo video, and App Store and Google Play links.",
      "ej. Voy a lanzar una app móvil el próximo trimestre y quiero un sitio con capturas de pantalla, un video de demo, y enlaces a App Store y Google Play."
    ),
    t(
      "e.g. I run an AI startup and need a site that explains what our product does, shows a live demo, and lets people request access.",
      "ej. Manejo una startup de IA y necesito un sitio que explique lo que hace nuestro producto, muestre una demo en vivo, y permita a la gente solicitar acceso."
    ),
    t(
      "e.g. I'm a fintech founder and need a trustworthy website with our story, security details, and a way to book a demo.",
      "ej. Soy fundador de una fintech y necesito un sitio web confiable con nuestra historia, detalles de seguridad, y una forma de reservar una demo."
    ),
    t(
      "e.g. I'm launching a direct-to-consumer brand and want a site that shows the product, tells our story, and collects launch-day sign-ups.",
      "ej. Voy a lanzar una marca directa al consumidor y quiero un sitio que muestre el producto, cuente nuestra historia, y recopile registros para el día de lanzamiento."
    ),
    t(
      "e.g. I'm building a health-tech platform and need a clean, credible site for patients, providers, and investors.",
      "ej. Estoy construyendo una plataforma de tecnología de salud y necesito un sitio limpio y creíble para pacientes, proveedores, e inversionistas."
    ),
    t(
      "e.g. I'm creating an education platform and want a site with our mission, product tour, and a sign-up flow for schools.",
      "ej. Estoy creando una plataforma educativa y quiero un sitio con nuestra misión, recorrido del producto, y un flujo de registro para escuelas."
    ),
    t(
      "e.g. I'm building a two-sided marketplace and need pages that speak to both buyers and sellers with a waitlist for each.",
      "ej. Estoy construyendo un mercado de dos lados y necesito páginas que hablen tanto a compradores como vendedores con una lista de espera para cada uno."
    ),
    t(
      "e.g. I'm developing a hardware product and want a site with a launch page, pre-order sign-ups, and press resources.",
      "ej. Estoy desarrollando un producto de hardware y quiero un sitio con una página de lanzamiento, registros de preventa, y recursos de prensa."
    ),
    t(
      "e.g. I run a climate-tech startup and need a site for customers, partners, and investors that explains our impact and traction.",
      "ej. Manejo una startup de tecnología climática y necesito un sitio para clientes, socios, e inversionistas que explique nuestro impacto y tracción."
    ),
    t(
      "e.g. I'm launching a crypto project and want a clear, professional site with our roadmap, team, and community links.",
      "ej. Voy a lanzar un proyecto cripto y quiero un sitio claro y profesional con nuestra hoja de ruta, equipo, y enlaces de comunidad."
    ),
    t(
      "e.g. I'm starting a media company and want a home for our content, a newsletter sign-up, and a sponsor page.",
      "ej. Estoy iniciando una empresa de medios y quiero un hogar para nuestro contenido, un registro de boletín, y una página de patrocinadores."
    ),
  ];

  return (
    <>
      <ScrollToTop />
      <RestaurantsPageLoader />
      <StartupHeader />
      <main className="grid-container">
        <StartupHero />
        <StartupTakeaway />
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
            pricing={{ id: "pricing", label: "Startup" }}
            businessExamples={businessExamples}
            businessLabel={t("startup", "startup")}
            websiteExample="www.yourstartup.com"
            otherIndustry={{
              prompt: t("Not a startup?", "¿No es una startup?"),
              label: t("I run a different business", "Manejo un negocio diferente"),
              href: "/#services",
            }}
            businessTypeHint={t(
              "Describe your startup, what it does, who it's for, and what stage you're at in a few words.\n\n(SaaS, mobile app, AI, fintech, e-commerce, health tech, edtech, marketplace, hardware, climate tech, crypto, media, or something else.)",
              "Describe tu startup, qué hace, para quién es, y en qué etapa estás en pocas palabras.\n\n(SaaS, app móvil, IA, fintech, comercio electrónico, tecnología de salud, edtech, mercado en línea, hardware, tecnología climática, cripto, medios, u otra cosa.)"
            )}
          />
        </NumberedSection>
      </main>
    </>
  );
}
