import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "What We Can Build" — six hoverable aspect-square capability cards,
 * written for projects that don't fit a standard mold.
 */
const capabilities = [
  {
    title: "Custom Features",
    body: "Forms, calculators, galleries, member areas, and anything else your project needs, built from scratch instead of bolted on.",
  },
  {
    title: "Third-Party Integrations",
    body: "Connect payments, email, calendars, databases, and the other systems you already rely on so everything works together.",
  },
  {
    title: "Mobile-Responsive",
    body: "A design that looks and works beautifully on phones, tablets, and computers, tested on real devices before launch.",
  },
  {
    title: "SEO & Discoverability",
    body: "Clean structure, fast pages, and search setup so the right people can find your project and understand it quickly.",
  },
  {
    title: "Ongoing Support",
    body: "Hosting, updates, and technical help after launch, so your website stays fast, secure, and current.",
  },
  {
    title: "And Much More",
    body: "Whatever your project needs, we can meet it. Tell us what you have in mind and we'll build it around your goals.",
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
