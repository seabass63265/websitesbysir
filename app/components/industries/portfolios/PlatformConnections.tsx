import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "Built Around the Tools You Already Use" — the booking, social, email,
 * media, and payment platforms a creator or personal brand already uses,
 * grouped by job.
 * Same layout as the Restaurants page's tools section.
 */
const categories = [
  {
    name: "Booking & Scheduling",
    tools: ["Calendly", "Cal.com", "Google Calendar", "Square Appointments"],
  },
  {
    name: "Social Media",
    tools: [
      "Instagram",
      "TikTok",
      "YouTube",
      "Facebook",
      "LinkedIn",
      "Twitter/X",
      "Pinterest",
    ],
  },
  {
    name: "Newsletters & Email",
    tools: ["Mailchimp", "Substack", "Beehiiv", "Kit", "Brevo"],
  },
  {
    name: "Portfolio, Media & Payments",
    tools: [
      "Behance",
      "Dribbble",
      "Vimeo",
      "SoundCloud",
      "Spotify",
      "Stripe",
      "PayPal",
      "Venmo",
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
        <h2 className="text-lg">Your platforms, connected.</h2>
      </div>

      <div className="pad-global">
        <p className="text-md" style={{ marginBottom: "2.5rem" }}>
          Your website can connect with the booking, social, newsletter, media,
          and payment platforms you already use.
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
