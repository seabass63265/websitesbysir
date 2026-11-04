export type SubmitContactFailure = "invalid_email" | "email_service" | "server" | "network";

export type SubmitContactResult =
  | { ok: true }
  | { ok: false; reason: SubmitContactFailure };

/**
 * POSTs to /api/contact with one silent retry after a short delay — a brief
 * upstream blip (Resend, cold start) shouldn't surface as a user-facing
 * error on the very first attempt. Shared by IntakeForm and ContactForm,
 * the two forms that hit this endpoint. On a final failure, returns *why*
 * (the API route tags its error responses with a `reason`) so the form can
 * show something more useful than a flat "something went wrong."
 */
export async function submitContact(payload: unknown): Promise<SubmitContactResult> {
  let lastReason: SubmitContactFailure = "network";

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) return { ok: true };
      try {
        const body = (await res.json()) as { reason?: string };
        lastReason =
          body.reason === "invalid_email" || body.reason === "email_service" || body.reason === "server"
            ? body.reason
            : "server";
      } catch {
        lastReason = "server";
      }
    } catch {
      // Network error (offline, DNS, CORS) — fall through to the retry below.
      lastReason = "network";
    }
    if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 800));
  }

  return { ok: false, reason: lastReason };
}

/** Turns a `submitContact` failure reason into copy for the visitor — takes
 * `useT()`'s return value so both forms render the same wording. */
export function contactFailureMessage(
  reason: SubmitContactFailure,
  t: (en: string, es: string) => string
): string {
  switch (reason) {
    case "invalid_email":
      return t(
        "Please double-check your email address and try again.",
        "Por favor verifica tu correo electrónico e intenta de nuevo."
      );
    case "network":
      return t(
        "Couldn't reach our server — check your connection and try again.",
        "No pudimos conectar con nuestro servidor — revisa tu conexión e intenta de nuevo."
      );
    case "email_service":
    case "server":
    default:
      return t(
        "Something went wrong on our end sending your project — please try again, or email us directly at hello@sirwebsites.com.",
        "Algo salió mal de nuestro lado al enviar tu proyecto — por favor intenta de nuevo, o escríbenos directamente a hello@sirwebsites.com."
      );
  }
}
