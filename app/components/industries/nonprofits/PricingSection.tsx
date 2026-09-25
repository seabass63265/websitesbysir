import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "Choose Your Starting Point" — pricing cards for Nonprofits. Same layout
 * and `.tier-*` CSS as the Local Businesses pricing section, with the copy
 * written for nonprofits and community organizations.
 */
type Tier = {
  level: string;
  name: string;
  blurb: React.ReactNode;
  price: string;
  priceUnit?: string;
  monthlyPrice?: string;
  monthlyUnit?: string;
  caption?: string;
  buildItems: string[];
  monthlyItems?: string[];
  cta: string;
  featured?: boolean;
  /** Overrides "One-time build includes:". */
  buildLabel?: string;
  /** Overrides "Monthly service includes:". */
  monthlyLabel?: string;
};

const tiers: Tier[] = [
  {
    level: "Tier 1",
    name: "Essential",
    blurb:
      "For nonprofits that need a simple, professional online home for their mission.",
    price: "$1,300",
    priceUnit: "one-time build",
    monthlyPrice: "$250",
    monthlyUnit: "per month after",
    buildItems: [
      "Up to 3 pages",
      "Home page",
      "Mission and programs pages",
      "Donate button linked to your donation platform",
      "Contact information",
      "Custom mobile-responsive design",
      "Domain connection",
      "Testing and publishing",
      "Two revision rounds",
    ],
    monthlyItems: [
      "Managed website hosting",
      "SSL security and automated backups",
      "Uptime and performance monitoring",
      "Software and dependency maintenance",
      "Technical troubleshooting and support",
      "Program, event, and content updates",
      "Up to one hour of monthly development support",
    ],
    cta: "Request a Quote",
  },
  {
    level: "Tier 2",
    name: "Growth",
    blurb:
      "For nonprofits that want their website to actively support donations, volunteers, and community growth.",
    featured: true,
    price: "$1,500",
    priceUnit: "one-time build",
    monthlyPrice: "$350",
    monthlyUnit: "per month after",
    buildItems: [
      "Up to 6 pages",
      "Home page",
      "Mission and programs pages",
      "Our Story page",
      "Photo gallery and impact highlights",
      "Donation platform connection",
      "Volunteer and event sign-up forms",
      "Newsletter sign-up and email connection",
      "Instagram and Facebook connections",
      "English and Spanish website option",
      "Three revision rounds",
    ],
    monthlyItems: [
      "Managed website hosting",
      "SSL security and automated backups",
      "Uptime and performance monitoring",
      "Software and dependency maintenance",
      "Technical troubleshooting and support",
      "Program, event, and content updates",
      "Fundraising campaign and event deployments",
      "Priority technical support and faster response times",
      "Up to two hours of monthly development support",
    ],
    cta: "Request a Quote",
  },
  {
    level: "Tier 3",
    name: "Tailored",
    blurb: (
      <>
        For <strong>organizations that need</strong> something outside our
        standard packages—whether that means a focused website on{" "}
        <strong>
          a smaller budget ($) OR a fully customized digital experience ($$$).
        </strong>
      </>
    ),
    price: "Custom Pricing",
    caption: "Built around your goals, needs, and budget.",
    buildLabel: "Your custom build may include:",
    buildItems: [
      "A focused, essentials-only website",
      "Custom page structure",
      "Multiple programs, chapters, or locations",
      "Custom interactions and animations",
      "Advanced donation, membership, and grant forms",
      "Content and copywriting support",
      "Unique custom functionality",
    ],
    monthlyLabel: "Monthly service may include:",
    monthlyItems: [
      "Managed website hosting",
      "SSL security and automated backups",
      "Uptime and performance monitoring",
      "Software and dependency maintenance",
      "Technical troubleshooting and support",
      "Program, event, and content updates",
      "Development support based on your selected plan",
      "Additional services tailored to your website",
    ],
    cta: "Plan a Custom Project",
  },
];

export default function PricingSection() {
  return (
    <NumberedSection
      n="04"
      label="Pricing"
      id="pricing"
      className="inverted"
      tag="04 / PRICING"
    >
      <div className="pad-global border-b">
        <div className="text-sm" style={{ marginBottom: "0.5rem" }}>
          Nonprofits &amp; Organizations Pricing
        </div>
        <h2 className="text-lg" style={{ marginBottom: "1rem" }}>
          Choose Your Starting Point
        </h2>
        <p className="text-md">
          A one-time flat fee covers the design, development, and launch. A
          monthly service fee covers hosting, maintenance, updates, and
          technical support. No hidden fees.
        </p>
      </div>

      <div className="tier-grid">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={
              tier.featured ? "tier-card tier-card--featured" : "tier-card"
            }
          >
            {tier.featured && (
              <div className="tier-card__badge">Most Common</div>
            )}

            <div className="pill-tag tier-card__level">{tier.level}</div>
            <h3 className="text-lg">{tier.name}</h3>
            <p className="text-sm tier-card__blurb">{tier.blurb}</p>

            {tier.priceUnit && (
              <div className="tier-card__price-lead">Starting at</div>
            )}
            <div className="tier-card__price-row">
              <span className="tier-card__price">{tier.price}</span>
              {tier.priceUnit && (
                <span className="tier-card__price-unit">
                  {tier.priceUnit}
                </span>
              )}
            </div>

            {tier.monthlyPrice ? (
              <div className="tier-card__monthly">
                <div className="tier-card__price-connector">
                  and after, just
                </div>
                <div className="tier-card__price-row">
                  <span className="tier-card__price">
                    {tier.monthlyPrice}
                  </span>
                  {tier.monthlyUnit && (
                    <span className="tier-card__price-unit">
                      {tier.monthlyUnit}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              tier.caption && (
                <div className="tier-card__caption">{tier.caption}</div>
              )
            )}

            <a href="#contact" className="btn-pill tier-card__cta">
              {tier.cta}
            </a>

            <div className="tier-list__group-label text-sm">
              {tier.buildLabel ?? "One-time build includes:"}
            </div>
            <ul className="tier-list text-xs">
              {tier.buildItems.map((label) => (
                <li key={label}>
                  <span className="tier-list__check" aria-hidden="true">
                    ✓
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            {tier.monthlyItems && (
              <>
                <div
                  className="tier-list__group-label text-sm"
                  style={{ marginTop: "1.5rem" }}
                >
                  {tier.monthlyLabel ?? "Monthly service includes:"}
                </div>
                <ul className="tier-list text-xs">
                  {tier.monthlyItems.map((label) => (
                    <li key={label}>
                      <span className="tier-list__check" aria-hidden="true">
                        ✓
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="tier-footnote">
        <div className="tier-footnote__item">
          <div className="tier-footnote__label text-sm">Service Term</div>
          <p>
            Both plans require an initial 12-month website service
            agreement. After the initial term, service renews every 6
            months.
          </p>
        </div>
        <div className="tier-footnote__item">
          <div className="tier-footnote__label text-sm">
            Third-Party Costs
          </div>
          <p>
            Domain registration, donation and fundraising platforms,
            payment processing fees, email and CRM systems, and other
            third-party subscriptions are billed separately.
          </p>
        </div>
      </div>
    </NumberedSection>
  );
}
