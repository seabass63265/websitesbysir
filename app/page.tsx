import SiteHeader from "@/app/components/marketing/SiteHeader";
import Hero from "@/app/components/marketing/Hero";
import BusinessShowcase from "@/app/components/marketing/BusinessShowcase";
import ServicesList from "@/app/components/marketing/ServicesList";
import WorkGrid from "@/app/components/marketing/WorkGrid";
import LanguageToast from "@/app/components/marketing/LanguageToast";
import SiteFooter from "@/app/components/marketing/SiteFooter";
import BlueprintCta from "@/app/components/marketing/BlueprintCta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="grid-container">
        <Hero />
        <WorkGrid />
        <BusinessShowcase />
        <ServicesList />
        <BlueprintCta />
      </main>
      <SiteFooter />
      <LanguageToast />
    </>
  );
}
