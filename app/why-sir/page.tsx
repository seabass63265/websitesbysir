import type { Metadata } from "next";
import WhySirHeader from "@/app/components/marketing/WhySirHeader";
import AboutStudio from "@/app/components/marketing/AboutStudio";
import HelmetSection from "@/app/components/marketing/HelmetSection";
import BudgetStatement from "@/app/components/marketing/BudgetStatement";

export const metadata: Metadata = {
  title: "SIR_ Websites | Why SIR_",
  description:
    "Why work directly with Sebastian Rocha: a technical foundation, human-reviewed engineering, and one person accountable for your website from kickoff to launch.",
};

export default function WhySirPage() {
  return (
    <>
      <WhySirHeader />
      <main className="grid-container">
        <HelmetSection />
        <BudgetStatement />
        <AboutStudio />
      </main>
    </>
  );
}
