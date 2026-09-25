import type { Metadata } from "next";
import WorkHeader from "@/app/components/work/WorkHeader";
import WorkShowcase from "@/app/components/work/WorkShowcase";

export const metadata: Metadata = {
  title: "SIR_ Websites | Selected Work",
  description:
    "A closer look at the visual language behind SIR_ builds — texture, contrast, and detail from the work. Built directly with Sebastian Rocha in Los Angeles.",
};

export default function WorkPage() {
  return (
    <>
      <WorkHeader />
      <main className="grid-container">
        <WorkShowcase />
      </main>
    </>
  );
}
