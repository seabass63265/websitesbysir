import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "Built Around the Tools You Already Use" — the ordering, reservation,
 * and discovery platforms a restaurant already runs on, grouped by job.
 */
const categories = [
  {
    name: "Ordering",
    tools: ["Toast", "DoorDash", "Grubhub", "Uber Eats", "ChowNow"],
  },
  {
    name: "Reservations",
    tools: ["OpenTable", "Resy", "Yelp Reservations"],
  },
  {
    name: "Discovery",
    tools: [
      "Google Maps",
      "Yelp",
      "Instagram",
      "Facebook",
      "TikTok",
      "Twitter/X",
    ],
  },
];

export default function ToolsSection() {
  return (
    <NumberedSection
      n="03"
      label="Built Around the Tools You Already Use"
      id="tools"
      className="inverted"
      bodyClassName="pad-global"
    >
      <h2 className="text-lg" style={{ marginBottom: "1rem" }}>
        Your systems, connected.
      </h2>
      <p className="text-md" style={{ marginBottom: "2.5rem" }}>
        Your website can connect with the ordering, reservation, review,
        mapping, and social platforms your restaurant already uses.
      </p>

      {categories.map((category, index) => (
        <div
          key={category.name}
          style={{
            marginBottom:
              index < categories.length - 1 ? "2.5rem" : "3rem",
          }}
        >
          <div className="text-sm tools-category__title">{category.name}</div>
          <div className="logo-grid">
            {category.tools.map((tool) => (
              <div key={tool} className="logo-item">
                {tool}
              </div>
            ))}
          </div>
        </div>
      ))}
    </NumberedSection>
  );
}
