/**
 * "Process" — approach and investment. Server component.
 */
export default function ProcessSection() {
  return (
    <section id="process" className="pad-global border-b">
      <div className="info-block border-b">
        <div className="text-sm">01 / Approach</div>
        <div className="text-md">
          Quick, clear, and focused. I build tools for independent businesses,
          startups, and personal brands. You work directly with me, Sebastian,
          from kickoff to launch.
        </div>
      </div>

      <div className="info-block">
        <div className="text-sm">02 / Investment</div>
        <div>
          <div className="text-md" style={{ marginBottom: "2rem" }}>
            No fixed prices or arbitrary tiers. Rates are strictly based on your
            specific needs, goals, features, and scope.
          </div>

          <div
            className="grid-container"
            style={{ gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
          >
            <div>
              <div className="pill-tag" style={{ marginBottom: "1rem" }}>
                Project Rate
              </div>
              <div className="text-sm">
                One-time flat fee covering custom design, full development,
                revisions, setup, and launch.
              </div>
            </div>
            <div>
              <div className="pill-tag" style={{ marginBottom: "1rem" }}>
                Service Fee
              </div>
              <div className="text-sm">
                Monthly retainer covering hosting, maintenance, security, tech
                support, and content updates.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
