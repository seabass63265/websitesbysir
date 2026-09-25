import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "The Build Process" — from first sketch to launch. A horizontal flow
 * (stacked on mobile) followed by the five stages of the engagement.
 */
const steps = [
  {
    name: "Discover",
    body: "We discuss your restaurant, customers, goals, budget, and the tools you currently use.",
  },
  {
    name: "Blueprint",
    body: "I organize your pages, menu, content, and customer journey before design begins.",
  },
  {
    name: "Design & Build",
    body: "I create and develop a mobile-first website that reflects the feeling of your restaurant.",
  },
  {
    name: "Connect & Test",
    body: "I connect ordering, reservations, maps, social platforms, and test everything across devices.",
  },
  {
    name: "Launch & Support",
    body: "I connect your domain, publish the website, and provide continued hosting and maintenance.",
  },
];

export default function LaunchProcess() {
  return (
    <NumberedSection
      n="01"
      label="The Build Process"
      id="process"
      className="inverted"
      bodyClassName="pad-global"
    >
      <h2 className="text-lg" style={{ marginBottom: "1rem" }}>
        From First Sketch to Launch
      </h2>
      <p className="text-md" style={{ marginBottom: "2.5rem" }}>
        I plan the structure, design the experience, and engineer the final
        website&mdash;working with you through every stage.
      </p>

      <div className="build-flow">
        {steps.map((step, index) => (
          <div className="build-flow__item" key={step.name}>
            <div className="build-flow__step">{step.name}</div>
            {index < steps.length - 1 && (
              <div className="build-flow__arrow" aria-hidden="true">
                →
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid-container" style={{ gap: "2rem" }}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <div
              key={step.name}
              className={isLast ? undefined : "border-b"}
              style={isLast ? undefined : { paddingBottom: "1rem" }}
            >
              <div
                className="text-sm build-step__label"
                style={{ marginBottom: "0.5rem" }}
              >
                {String(index + 1).padStart(2, "0")} &mdash; {step.name}
              </div>
              <div className="text-md">{step.body}</div>
            </div>
          );
        })}
      </div>
    </NumberedSection>
  );
}
