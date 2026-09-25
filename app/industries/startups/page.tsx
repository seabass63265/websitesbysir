import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "SIR_ Websites | Startups",
  description:
    "Custom website design and development for startups — landing pages, product demos, waitlists and sign-ups, investor and press pages, analytics, and more, for SaaS, apps, AI, fintech, e-commerce, health tech, edtech, marketplaces, hardware, climate tech, and beyond. Built directly with Sebastian Rocha in Los Angeles.",
};

// Placeholders for the intake's "tell us about your startup" question.
const businessExamples = [
  "e.g. I'm building a SaaS tool for freelancers and need a landing page with a clear pitch, pricing, and a waitlist for early access.",
  "e.g. I'm launching a mobile app next quarter and want a site with screenshots, a demo video, and App Store and Google Play links.",
  "e.g. I run an AI startup and need a site that explains what our product does, shows a live demo, and lets people request access.",
  "e.g. I'm a fintech founder and need a trustworthy website with our story, security details, and a way to book a demo.",
  "e.g. I'm launching a direct-to-consumer brand and want a site that shows the product, tells our story, and collects launch-day sign-ups.",
  "e.g. I'm building a health-tech platform and need a clean, credible site for patients, providers, and investors.",
  "e.g. I'm creating an education platform and want a site with our mission, product tour, and a sign-up flow for schools.",
  "e.g. I'm building a two-sided marketplace and need pages that speak to both buyers and sellers with a waitlist for each.",
  "e.g. I'm developing a hardware product and want a site with a launch page, pre-order sign-ups, and press resources.",
  "e.g. I run a climate-tech startup and need a site for customers, partners, and investors that explains our impact and traction.",
  "e.g. I'm launching a crypto project and want a clear, professional site with our roadmap, team, and community links.",
  "e.g. I'm starting a media company and want a home for our content, a newsletter sign-up, and a sponsor page.",
];

export default function StartupsPage() {
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
          label="Contact"
          id="contact"
          tag="05 / START YOUR PROJECT"
        >
          <IntakeSection
            id="contact-form"
            scrollToId="contact"
            pricing={{ id: "pricing", label: "Startup" }}
            businessExamples={businessExamples}
            businessLabel="startup"
            websiteExample="www.yourstartup.com"
            otherIndustry={{
              prompt: "Not a startup?",
              label: "I run a different business",
              href: "/#services",
            }}
            businessTypeHint={"Describe your startup, what it does, who it's for, and what stage you're at in a few words.\n\n(SaaS, mobile app, AI, fintech, e-commerce, health tech, edtech, marketplace, hardware, climate tech, crypto, media, or something else.)"}
          />
        </NumberedSection>
      </main>
    </>
  );
}
