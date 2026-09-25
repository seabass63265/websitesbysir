import { Resend } from "resend";

/**
 * Shared Resend client for transactional email. Server-only — never import this
 * into a Client Component. Set RESEND_API_KEY in the environment.
 *
 * Lazily constructed so the app still builds/runs when the key is absent; the
 * error only surfaces when email is actually sent.
 */
let client: Resend | undefined;

export function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}
