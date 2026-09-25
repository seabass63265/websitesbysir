import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "What We Can Build" — six hoverable aspect-square capability cards,
 * for portfolios and personal brands.
 */
const capabilities = [
  {
    title: "Portfolio & Project Pages",
    body: "Clean, mobile-friendly galleries and case studies that show your best work and the story behind it.",
  },
  {
    title: "Appointment Booking",
    body: "Connect your website to the scheduling tool you already use so clients can book calls, sessions, or consultations without back-and-forth.",
  },
  {
    title: "Social Media Integration",
    body: "Link your Instagram, YouTube, TikTok, and other profiles so your website and your social presence work together.",
  },
  {
    title: "Testimonials & Reviews",
    body: "Showcase client praise, reviews, and press so visitors trust you before they ever reach out.",
  },
  {
    title: "Contact Forms & Newsletters",
    body: "Custom inquiry forms that collect the details you need, plus a mailing list so visitors can subscribe and stay in touch.",
  },
  {
    title: "And Much More",
    body: "Whatever your brand needs, we can meet it. Tell us what you have in mind and we'll build it around your goals.",
  },
];

export default function Capabilities() {
  return (
    <NumberedSection
      n="02"
      label="Capabilities"
      id="capabilities"
      className="inverted"
      tag="02 / CORE CAPABILITIES"
    >
      <div className="pad-global border-b">
        <h2 className="text-lg">What We Can Build</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {capabilities.map((item, index) => {
          const isLastCol = (index + 1) % 3 === 0;
          const isLastRow = index >= capabilities.length - 3;
          return (
            <div
              key={item.title}
              className={`pad-global aspect-square flex flex-col justify-between hover:bg-bg hover:text-brand group transition-colors cursor-crosshair${
                isLastRow ? "" : " border-b"
              }${isLastCol ? "" : " border-r"}`}
            >
              <div
                className="group-hover:opacity-100"
                style={{ opacity: 0.5, marginBottom: "1rem", fontSize: "1.1rem" }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-lg" style={{ marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
                <p
                  className="text-sm"
                  style={{
                    opacity: 0.8,
                    textTransform: "none",
                    letterSpacing: "normal",
                  }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </NumberedSection>
  );
}
