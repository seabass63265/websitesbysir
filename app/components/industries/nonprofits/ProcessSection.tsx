import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "From Domain To Launch" — the four-stage engagement, laid out as a
 * four-column grid on desktop and stacked on mobile.
 */
const steps = [
  {
    number: "1",
    name: "Domain Setup",
    body: "Already have a domain? We'll connect it. Need one? I'll help you find and purchase the right domain under your organization's name.",
  },
  {
    number: "2",
    name: "Architecture",
    body: "Structuring your mission, programs, and events, and setting up connections to your donation, volunteer, and email platforms.",
  },
  {
    number: "3",
    name: "Design & Build",
    body: "Custom UI/UX design and development tailored to your organization, optimized for performance across all devices.",
  },
  {
    number: "4",
    name: "Launch & QA",
    body: "Rigorous testing on phones, tablets, and computers before going live. *Domain and third-party fees billed separately.",
  },
];

export default function ProcessSection() {
  return (
    <NumberedSection
      n="01"
      label="Process"
      id="process"
      tag="01 / FULL SERVICE PROCESS"
    >
      <div className="pad-global border-b">
        <h2 className="text-lg">From Domain To Launch</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step.name}
            className={`pad-global${
              index < steps.length - 1 ? " border-b md:border-b-0 border-r" : ""
            }`}
          >
            <div className="text-huge" style={{ opacity: 0.2, marginBottom: "1rem" }}>
              {step.number}
            </div>
            <h3
              className="text-sm"
              style={{ fontSize: "1rem", marginBottom: "1rem" }}
            >
              {step.name}
            </h3>
            <p
              className="text-xs"
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.5,
                opacity: 0.8,
                textTransform: "none",
                letterSpacing: "normal",
              }}
            >
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </NumberedSection>
  );
}
