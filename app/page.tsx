import SiteHeader from "@/app/components/marketing/SiteHeader";
import Hero from "@/app/components/marketing/Hero";
import BusinessShowcase from "@/app/components/marketing/BusinessShowcase";
import ServicesList from "@/app/components/marketing/ServicesList";
import WorkGrid from "@/app/components/marketing/WorkGrid";
import LanguageToast from "@/app/components/marketing/LanguageToast";
import ClosingCta from "@/app/components/marketing/ClosingCta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="grid-container">
        <Hero />
        <WorkGrid />
        <BusinessShowcase />
        <ServicesList />
        <ClosingCta />
      </main>
      <LanguageToast />
    </>
  );
}
