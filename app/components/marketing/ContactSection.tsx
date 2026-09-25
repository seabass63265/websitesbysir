"use client";

import { useState } from "react";

const businessTypes = [
  "Restaurant / Café",
  "Service Provider",
  "E-commerce / Retail",
  "Nonprofit / Org",
  "Personal Brand",
  "Other",
];

const timelines = ["ASAP", "1-2 Months", "3+ Months"];

export default function ContactSection({ id = "contact" }: { id?: string }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id={id} className="inverted pad-global">
      <div className="info-block" style={{ paddingTop: "2rem" }}>
        <div>
          <h2
            className="text-huge"
            style={{ fontSize: "clamp(3rem, 6vw, 8rem)" }}
          >
            Start
            <br />
            Project
          </h2>
          <div className="text-xs" style={{ marginTop: "2rem" }}>
            sirwebsites.com
            <br />
            Los Angeles, CA
          </div>
        </div>

        <form
          className="form-grid"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="form-group">
            <label className="text-xs">Name</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label className="text-xs">Business Name</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label className="text-xs">Email</label>
            <input type="email" required />
          </div>
          <div className="form-group">
            <label className="text-xs">Phone</label>
            <input type="tel" />
          </div>

          <div className="form-group full">
            <label className="text-xs">Business Type</label>
            <select defaultValue={businessTypes[0]}>
              {businessTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group full">
            <label className="text-xs">Existing Website (if any)</label>
            <input type="url" placeholder="https://..." />
          </div>

          <div className="form-group full">
            <label className="text-xs">Features Needed (comma separated)</label>
            <input
              type="text"
              placeholder="e.g., Menus, Booking, Bilingual, Contact Form"
            />
          </div>

          <div className="form-group full">
            <label className="text-xs">Project Goals &amp; Additional Info</label>
            <textarea required placeholder="What are we trying to achieve?" />
          </div>

          <div className="form-group">
            <label className="text-xs">Timeline</label>
            <select defaultValue={timelines[0]}>
              {timelines.map((timeline) => (
                <option key={timeline}>{timeline}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="text-xs">Estimated Budget</label>
            <input type="text" placeholder="Based on custom quote" />
          </div>

          <div className="form-group full" style={{ marginTop: "2rem" }}>
            <button
              type="submit"
              className="btn-pill"
              style={{ width: "100%" }}
              disabled={submitted}
            >
              {submitted ? "// Inquiry Received" : "Submit Inquiry"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
