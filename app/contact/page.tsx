import type { Metadata } from "next";
import ContactHeader from "@/app/components/contact-page/ContactHeader";
import ContactForm from "@/app/components/contact-page/ContactForm";
import { TransitionLink } from "@/app/components/providers/PageTransition";

export const metadata: Metadata = {
  title: "SIR_ Websites | Contact",
  description:
    "Questions, feedback, press, or anything else — send it to SIR_ Websites and we will get back to you within 2–3 business days.",
};

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

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-page__grid" aria-hidden="true" />
      <div className="contact-page__inner">
        <ContactHeader />

        <main className="contact-main">
          <div className="contact-hero">
            <div className="contact-hero__eyebrow">Not a website request? No problem.</div>
            <h1 className="contact-hero__title">
              Get in{" "}
              <br />
              <span className="contact-hero__italic">touch</span>.
            </h1>
            <p className="contact-hero__sub">
              Questions, feedback, press, or anything else — send it here and we will get back to you
              within 2–3 business days.
            </p>
          </div>

          <div className="contact-body">
            <div className="contact-side">
              <div className="contact-side__eyebrow">Reach us directly</div>

              <div className="contact-rows">
                <a href="mailto:hello@sirwebsites.com" className="contact-row">
                  <div className="contact-row__icon"><Icon name="email" /></div>
                  <div>
                    <div className="contact-row__label">Email</div>
                    <div className="contact-row__value">hello@sirwebsites.com</div>
                  </div>
                </a>
                <a href="tel:+13104993005" className="contact-row">
                  <div className="contact-row__icon"><Icon name="phone" /></div>
                  <div>
                    <div className="contact-row__label">Phone</div>
                    <div className="contact-row__value">(310) 499-3005</div>
                  </div>
                </a>
                <div className="contact-row">
                  <div className="contact-row__icon"><Icon name="studio" /></div>
                  <div>
                    <div className="contact-row__label">Studio</div>
                    <div className="contact-row__value">Los Angeles, CA</div>
                  </div>
                </div>
              </div>

              <TransitionLink href="/#services" className="contact-side__intake">
                Need a website? Pick your service&nbsp;area
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
