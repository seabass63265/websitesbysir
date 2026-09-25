"use client";

import { useState } from "react";

const TOPICS = ["General Question", "Support", "Press & Partnerships"];

/**
 * The general contact form. Same behaviour as the design: name, email and a
 * message are required, the topic is optional, and a successful send swaps the
 * form for a "message sent" panel. There's no endpoint yet, so the payload is
 * just logged (like the intake).
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [sent, setSent] = useState(false);

  const clearError = () => setShowError(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setShowError(true);
      setPulse(true);
      window.setTimeout(() => setPulse(false), 300);
      return;
    }
    setShowError(false);
    console.log("Contact Form Payload:", {
      name: name.trim(),
      email: email.trim(),
      topic: topic || "None specified",
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });
    setSent(true);
  }

  function reset() {
    setName("");
    setEmail("");
    setTopic("");
    setMessage("");
    setSent(false);
  }

  if (sent) {
    return (
      <div className="contact-sent" role="status">
        <div className="contact-sent__icon">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path
              className="contact-sent__check"
              d="M4 12L10 18L20 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </div>
        <h2 className="contact-sent__title">Message sent.</h2>
        <p className="contact-sent__text">We will get back to you within 2–3 business days.</p>
        <button type="button" className="contact-sent__reset" onClick={reset}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      className={pulse ? "contact-form is-pulsing" : "contact-form"}
    >
      <div className="contact-form__row">
        <div className="contact-field">
          <label htmlFor="contact-name" className="contact-label">Full Name</label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            className="contact-input"
            placeholder="JANE DOE"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError();
            }}
          />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email" className="contact-label">Email Address</label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            className="contact-input"
            placeholder="HELLO@EXAMPLE.COM"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError();
            }}
          />
        </div>
      </div>

      <fieldset className="contact-field contact-field--gap">
        <legend className="contact-label">Topic</legend>
        <div className="contact-topics">
          {TOPICS.map((option) => (
            <label key={option} className="contact-topic">
              <input
                type="radio"
                name="topic"
                value={option}
                className="contact-topic__input"
                checked={topic === option}
                // A radio only reports a change when it becomes checked, so the
                // click is what lets a chosen topic be un-chosen again.
                onChange={() => {}}
                onClick={() => setTopic((current) => (current === option ? "" : option))}
              />
              <span className="contact-topic__box" aria-hidden="true" />
              <span className="contact-topic__label">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="contact-field contact-field--gap">
        <label htmlFor="contact-message" className="contact-label">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={3}
          required
          className="contact-input contact-input--area"
          placeholder="TYPE YOUR MESSAGE HERE..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearError();
          }}
        />
      </div>

      {showError && (
        <div role="alert" className="contact-error">
          Fill in your name, email, and a message to send.
        </div>
      )}

      <button type="submit" className="contact-submit">
        <span>Send message</span>
        <span className="contact-submit__arrow" aria-hidden="true">→</span>
      </button>
    </form>
  );
}
