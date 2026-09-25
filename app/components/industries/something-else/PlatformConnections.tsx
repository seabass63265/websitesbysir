import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "Built Around the Tools You Already Use" — the payment, form, email,
 * scheduling, social, and analytics platforms a project already runs on,
 * grouped by job.
 * Same layout as the Restaurants page's tools section.
 */
const categories = [
  {
    name: "Payments & Donations",
    tools: ["Stripe", "PayPal", "Venmo", "Square", "Givebutter"],
  },
  {
    name: "Forms & Data",
    tools: ["Typeform", "Tally", "Airtable", "Google Sheets", "Notion", "Zapier"],
  },
  {
    name: "Email & Community",
    tools: ["Mailchimp", "Brevo", "Constant Contact", "HubSpot", "Discord", "Slack"],
  },
  {
    name: "Scheduling & Events",
    tools: ["Calendly", "Eventbrite", "Google Calendar", "Zoom"],
  },
  {
    name: "Social & Media",
    tools: ["Instagram", "Facebook", "YouTube", "LinkedIn", "TikTok", "Twitter/X"],
  },
  {
    name: "Analytics & Search",
    tools: ["Google Analytics", "Search Console", "Plausible", "Hotjar"],
  },
];

export default function PlatformConnections() {
  return (
    <NumberedSection
      n="03"
      label="Built Around the Tools You Already Use"
      id="platforms"
      tag="03 / CONNECT YOUR TOOLS"
    >
      <div className="pad-global border-b">
        <h2 className="text-lg">Your systems, connected.</h2>
      </div>

      <div className="pad-global">
        <p className="text-md" style={{ marginBottom: "2.5rem" }}>
          Your website can connect with the payment, form, email, scheduling,
          social, and analytics platforms your project already uses.
        </p>

        {categories.map((category, index) => (
          <div
            key={category.name}
            style={{
              marginBottom: index < categories.length - 1 ? "2.5rem" : "2rem",
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

        <p
          className="text-md inverted"
          style={{
            marginBottom: "1rem",
            padding: "1.25rem 1.5rem",
            fontWeight: 700,
          }}
        >
          Don&rsquo;t see the system you use? Just let us know &mdash; we can
          likely connect it.
        </p>
        <p className="text-xs" style={{ opacity: 0.7 }}>
          Available integrations. Not official partnerships.
        </p>
      </div>
    </NumberedSection>
  );
}
