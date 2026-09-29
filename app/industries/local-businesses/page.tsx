import type { Metadata } from "next";
import LocalBusinessesBody from "@/app/components/industries/local-businesses/LocalBusinessesBody";

export const metadata: Metadata = {
  title: "SIR_ Websites | Local Businesses",
  description:
    "Custom website design and development for local businesses — food and restaurants, barber and beauty, home services, professional services, retail, pet shops, repair, artists and performers, event planners, tattoo shops, marketing agencies, nonprofits, and more. Built directly with Sebastian Rocha in Los Angeles.",
};

export default function LocalBusinessesPage() {
  return <LocalBusinessesBody />;
}
