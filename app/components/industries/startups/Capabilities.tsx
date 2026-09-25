import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "What We Can Build" — six hoverable aspect-square capability cards,
 * written for startups at any stage, from idea to scale.
 */
const capabilities = [
  {
    title: "Landing & Product Pages",
    body: "Clear, fast pages that explain what you do, show the product, and turn visitors into sign-ups, demos, and customers.",
  },
  {
    title: "Waitlists & Sign-Ups",
    body: "Collect emails and early-access requests with forms that flow straight into the email and CRM tools you already use.",
  },
  {
    title: "Product Media",
    body: "Integrate your existing walkthrough videos, product screenshots, and interactive previews into the website so visitors can see your product in action before signing up.",
  },
  {
    title: "Investor & Press Pages",
    body: "Traction, team, press, and pitch-friendly pages that make a strong first impression on investors, partners, and reporters.",
  },
  {
    title: "Analytics & Growth",
    body: "Connect analytics, event tracking, A/B testing, and SEO so you can see what is working and where visitors drop off.",
  },
  {
    title: "And Much More",
    body: "Whatever your startup needs, we can meet it. Tell us what you have in mind and we'll build it around your goals.",
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
