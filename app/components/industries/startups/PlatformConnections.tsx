import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "Built Around the Tools You Already Use" — the forms, email, analytics,
 * payment, and community platforms a startup already runs on, grouped by
 * job.
 * Same layout as the Restaurants page's tools section.
 */
const categories = [
  {
    name: "Waitlists, Forms & Demos",
    tools: ["Typeform", "Tally", "Airtable", "Calendly", "Cal.com", "Zapier"],
  },
  {
    name: "Email & CRM",
    tools: ["Mailchimp", "Brevo", "Beehiiv", "HubSpot", "Intercom"],
  },
  {
    name: "Analytics & Growth",
    tools: ["Google Analytics", "PostHog", "Mixpanel", "Hotjar", "Plausible"],
  },
  {
    name: "Payments & Billing",
    tools: ["Stripe", "Paddle", "PayPal"],
  },
  {
    name: "Community & Social",
    tools: [
      "LinkedIn",
      "Twitter/X",
      "Product Hunt",
      "Discord",
      "Slack",
      "YouTube",
    ],
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
          Your website can connect with the analytics, email, payment,
          scheduling, and community platforms your startup already uses.
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
