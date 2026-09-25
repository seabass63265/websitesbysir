import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "What We Can Build" — six hoverable aspect-square capability cards,
 * generalized for any local business rather than a single industry.
 */
const capabilities = [
  {
    title: "Service & Product Pages",
    body: "Clear, mobile-friendly pages that explain what you offer, answer common questions, and help customers choose the right service.",
  },
  {
    title: "Booking & Scheduling",
    body: "Connect your website to the scheduling system you already use so customers can book appointments without calling.",
  },
  {
    title: "Quotes & Inquiry Forms",
    body: "Custom forms that collect the project details you need before responding, quoting, or scheduling a consultation.",
  },
  {
    title: "Local Search & Maps",
    body: "Help customers find your business with location pages, service areas, Google Maps, hours, and local search setup.",
  },
  {
    title: "Payments & Integrations",
    body: "Connect payment platforms, customer-management tools, social media, reviews, and other systems your business already uses.",
  },
  {
    title: "And Much More",
    body: "Whatever your business needs, we can meet it. Tell us what you have in mind and we'll build it around your goals.",
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
