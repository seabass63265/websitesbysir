"use client";

import ContactHeader from "@/app/components/contact-page/ContactHeader";
import ContactForm from "@/app/components/contact-page/ContactForm";
import { TransitionLink } from "@/app/components/providers/PageTransition";
import { useT } from "@/app/components/providers/LanguageProvider";

const icons = {
  email: (
    <>
      <path d="M3 6L12 13L21 6" />
      <rect x="3" y="6" width="18" height="12" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2" width="12" height="20" />
      <path d="M12 18H12.01" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  studio: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg
      className="contact-row__svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

/**
 * /contact page body. Split out from the page.tsx server shell (which keeps
 * the static `metadata` export) so the copy here can switch language live.
 */
export default function ContactBody() {
  const t = useT();
  return (
    <div className="contact-page">
      <div className="contact-page__grid" aria-hidden="true" />
      <div className="contact-page__inner">
        <ContactHeader />

        <main className="contact-main">
          <div className="contact-hero">
            <div className="contact-hero__eyebrow">
              {t("Not a website request? No problem.", "¿No es una solicitud de sitio web? No hay problema.")}
            </div>
            <h1 className="contact-hero__title">
              {t("Get in", "Ponte en")}{" "}
              <br />
              <span className="contact-hero__italic">{t("touch", "contacto")}</span>.
            </h1>
            <p className="contact-hero__sub">
              {t(
                "Questions, feedback, press, or anything else — send it here and we will get back to you within 2–3 business days.",
                "Preguntas, comentarios, prensa, o cualquier otra cosa — envíalo aquí y te responderemos dentro de 2 a 3 días hábiles."
              )}
            </p>
          </div>

          <div className="contact-body">
            <div className="contact-side">
              <div className="contact-side__eyebrow">{t("Reach us directly", "Contáctanos directamente")}</div>

              <div className="contact-rows">
                <a href="mailto:hello@sirwebsites.com" className="contact-row">
                  <div className="contact-row__icon"><Icon name="email" /></div>
                  <div>
                    <div className="contact-row__label">{t("Email", "Correo")}</div>
                    <div className="contact-row__value">hello@sirwebsites.com</div>
                  </div>
                </a>
                <a href="tel:+13104993005" className="contact-row">
                  <div className="contact-row__icon"><Icon name="phone" /></div>
                  <div>
                    <div className="contact-row__label">{t("Phone", "Teléfono")}</div>
                    <div className="contact-row__value">(310) 499-3005</div>
                  </div>
                </a>
                <div className="contact-row">
                  <div className="contact-row__icon"><Icon name="studio" /></div>
                  <div>
                    <div className="contact-row__label">{t("Studio", "Estudio")}</div>
                    <div className="contact-row__value">Los Angeles, CA</div>
                  </div>
                </div>
              </div>

              <TransitionLink href="/#services" className="contact-side__intake">
                {t("Need a website? Pick your service area", "¿Necesitas un sitio web? Elige tu área de servicio")}
                <span className="contact-side__arrow" aria-hidden="true">→</span>
              </TransitionLink>
            </div>

            <div className="contact-card">
              <ContactForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
