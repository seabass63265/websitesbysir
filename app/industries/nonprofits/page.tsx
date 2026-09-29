import type { Metadata } from "next";
import NonprofitsBody from "@/app/components/industries/nonprofits/NonprofitsBody";

export const metadata: Metadata = {
  title: "SIR_ Websites | Nonprofits & Organizations",
  description:
    "Custom website design and development for nonprofits and community organizations — food banks, youth and education programs, animal rescues, health and wellness, arts and culture, faith-based groups, environmental and housing organizations, advocacy, mutual aid, and foundations. Donations, events, volunteer forms, newsletters, and bilingual (EN/ES) sites. Built directly with Sebastian Rocha in Los Angeles.",
};

export default function NonprofitsPage() {
  return <NonprofitsBody />;
}
