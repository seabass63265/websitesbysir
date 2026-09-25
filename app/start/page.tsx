import type { Metadata } from "next";
import IntakeFlow from "@/app/components/intake/IntakeFlow";

export const metadata: Metadata = {
  title: "SIR_ Websites | Start a Project",
  description:
    "Tell us about your business and where to reach you — the first steps of starting a website project with SIR_.",
};

export default function StartPage() {
  return <IntakeFlow />;
}
