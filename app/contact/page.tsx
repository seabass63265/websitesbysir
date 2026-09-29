import type { Metadata } from "next";
import ContactBody from "@/app/components/contact-page/ContactBody";

export const metadata: Metadata = {
  title: "SIR_ Websites | Contact",
  description:
    "Questions, feedback, press, or anything else — send it to SIR_ Websites and we will get back to you within 2–3 business days.",
};

export default function ContactPage() {
  return <ContactBody />;
}
