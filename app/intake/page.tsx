import type { Metadata } from "next";
import IntakeBar from "@/app/components/contact/IntakeBar";
import IntakeForm from "@/app/components/contact/IntakeForm";
import { IntakeProgressProvider } from "@/app/components/contact/IntakeProgress";

export const metadata: Metadata = {
  title: "SIR_ Websites | System Intake",
  description:
    "Start a project with SIR_ Websites — tell us where you are and we'll keep the next questions relevant to your business.",
};

export default function ContactPage() {
  return (
    <div className="intake-page min-h-dvh flex flex-col items-center justify-center pt-16 pb-16 px-6 sm:px-8 selection:bg-[var(--intake-fg)] selection:text-[var(--intake-bg)]">
      <main className="w-full max-w-[1100px] mx-auto relative">
        <IntakeProgressProvider>
          <IntakeBar />
          <IntakeForm />
        </IntakeProgressProvider>
      </main>
    </div>
  );
}
