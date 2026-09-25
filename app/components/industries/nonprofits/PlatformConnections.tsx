import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "Built Around the Tools You Already Use" — the donation, event, email, and
 * social platforms a nonprofit already runs on, grouped by job. Same layout
 * as the Local Businesses page's tools section.
 */
const categories = [
  {
    name: "Donations & Fundraising",
    tools: ["Stripe", "PayPal", "Venmo", "Zeffy", "Givebutter", "Donorbox"],
  },
  {
    name: "Events & Volunteers",
    tools: ["Eventbrite", "SignUpGenius", "Calendly", "Google Calendar"],
  },
  {
    name: "Email & Donor Management",
    tools: ["Mailchimp", "Brevo", "Constant Contact", "Bloomerang", "Airtable"],
  },
  {
    name: "Social & Communication",
    tools: ["Instagram", "Facebook", "YouTube", "Twitter/X", "WhatsApp"],
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
          Your website can connect with the donation, event, volunteer, email,
          and social platforms your organization already uses.
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
