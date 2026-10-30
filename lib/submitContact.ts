/**
 * POSTs to /api/contact with one silent retry after a short delay — a brief
 * upstream blip (Resend, cold start) shouldn't surface as a user-facing
 * error on the very first attempt. Shared by IntakeForm and ContactForm,
 * the two forms that hit this endpoint.
 */
export async function submitContact(payload: unknown): Promise<boolean> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) return true;
    } catch {
      // Network error — fall through to the retry below.
    }
    if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 800));
  }
  return false;
}
