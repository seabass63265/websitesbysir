import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "Choose Your Starting Point" — pricing cards for Something Else. Same
 * layout and `.tier-*` CSS as the Local Businesses pricing section, with the
 * copy written for projects that don't fit the other service areas.
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
  /** White card on the inverted section. */
  featured?: boolean;
  /** Hides the "Most Common" badge on a featured card. */
  hideBadge?: boolean;
  /** Overrides "One-time build includes:". */
  buildLabel?: string;
  /** Overrides "Monthly service includes:". */
  monthlyLabel?: string;
};

const tiers: Tier[] = [
  {
    level: "",
    name: "Tailored",
    featured: true,
    hideBadge: true,
    blurb: (
      <>
        For projects that don’t fit neatly into a standard package—whether that
        means a focused website with a smaller scope or a fully customized
        digital experience.
      </>
    ),
    price: "Custom Pricing",
    caption:
      "Every project is quoted individually based on its goals, required features, integrations, timeline, and level of ongoing support.",
    buildLabel: "Your custom build may include:",
    buildItems: [
      "A focused, essentials-only website",
      "A completely custom page structure",
      "Multiple programs, brands, or audiences",
      "Custom calculators and interactive tools",
      "Member areas or customer portals",
      "Custom databases and content systems",
      "Advanced forms and third-party integrations",
      "Payment, booking, event, or donation workflows",
      "English and Spanish website options",
      "Custom interactions and animations",
      "Copywriting and content support",
      "Unique functionality built around your idea",
    ],
    monthlyLabel: "Hosting and maintenance may include:",
    monthlyItems: [
      "Managed website hosting",
      "SSL security and automated backups",
      "Uptime and performance monitoring",
      "Software and dependency maintenance",
      "Technical troubleshooting and support",
      "Page, content, and feature updates",
      "Custom integration support",
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
          Something Else Pricing
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

      <div className="tier-grid tier-grid--single">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={
              tier.featured ? "tier-card tier-card--featured" : "tier-card"
            }
          >
            {tier.featured && !tier.hideBadge && (
              <div className="tier-card__badge">Most Common</div>
            )}

            {tier.level && (
              <div className="pill-tag tier-card__level">{tier.level}</div>
            )}
            <h3 className="text-lg">{tier.name}</h3>
            <p className="text-sm tier-card__blurb">{tier.blurb}</p>

            {tier.priceUnit && (
              <div className="tier-card__price-lead">Starting at</div>
            )}
            <div className="tier-card__price-row">
              <span className="tier-card__price">{tier.price}</span>
              {tier.priceUnit && (
                <span className="tier-card__price-unit">{tier.priceUnit}</span>
              )}
            </div>

            {tier.monthlyPrice ? (
              <div className="tier-card__monthly">
                <div className="tier-card__price-connector">
                  and after, just
                </div>
                <div className="tier-card__price-row tier-card__price-row--stacked">
                  <span className="tier-card__price">{tier.monthlyPrice}</span>
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
            Hosting and maintenance require an initial 12-month website service
            agreement. After the initial term, service renews every 6 months.
          </p>
        </div>
        <div className="tier-footnote__item">
          <div className="tier-footnote__label text-sm">Third-Party Costs</div>
          <p>
            Domain registration, payment processing, email platforms, scheduling
            services, premium software, and other third-party subscriptions are
            billed separately.
          </p>
        </div>
      </div>
    </NumberedSection>
  );
}
