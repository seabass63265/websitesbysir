import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "Designed for Los Angeles." — bilingual (EN/ES) positioning, inverted
 * two-column section with oversized HOLA/HELLO watermarks on the right.
 */
export default function BilingualSection() {
  return (
    <NumberedSection
      n="04"
      label="Bilingual"
      id="bilingual"
      className="inverted"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
      <div
        className="pad-global border-b md:border-r"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "5rem",
          paddingBottom: "5rem",
        }}
      >
        <div className="text-xs" style={{ opacity: 0.7, marginBottom: "2rem" }}>
          BILINGUAL BY DESIGN
        </div>
        <h2 className="text-lg" style={{ marginBottom: "1.5rem" }}>
          Designed for Los Angeles.
        </h2>
        <p className="text-md" style={{ marginBottom: "1.5rem" }}>
          Los Angeles is home to a large and diverse Spanish-speaking
          community. Offering a website in both English and Spanish helps
          more customers feel welcomed, informed, and confident choosing your
          business.
        </p>
        <p
          className="text-sm"
          style={{ opacity: 0.8, textTransform: "none", letterSpacing: "normal" }}
        >
          As a native Spanish speaker, I personally translate your website
          instead of relying on automated tools like Google Translate, which
          often miss context, tone, and cultural nuance. We&rsquo;ll work
          together to ensure both versions sound authentic to your brand.
        </p>
      </div>
      <div
        className="blueprint-grid"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-2.5rem",
            left: "-2.5rem",
            fontSize: "12vw",
            fontWeight: 700,
            lineHeight: 1,
            opacity: 0.1,
            transform: "rotate(-12deg)",
          }}
        >
          HOLA
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-2.5rem",
            right: "-2.5rem",
            fontSize: "12vw",
            fontWeight: 700,
            lineHeight: 1,
            opacity: 0.1,
            transform: "rotate(12deg)",
          }}
        >
          HELLO
        </div>
        <div
          className="border"
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "2rem",
            border: "var(--border)",
            backgroundColor: "var(--brand)",
          }}
        >
          <div className="text-md" style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
            ENG / ESP
          </div>
          <div className="text-xs">Native Translation Included</div>
        </div>
      </div>
      </div>
    </NumberedSection>
  );
}
