import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import { kv } from "@/lib/kv";
import { sendToSheet } from "@/lib/sheets";

/**
 * Shared endpoint for both forms on the site: the short /contact form and the
 * multi-step /intake flow (embedded on every industry page). Each POSTs its
 * fields as flat JSON plus a `source` tag; this route emails the submission
 * via Resend and — if configured — logs it as a new row in a Google Sheet.
 *
 * Required env: RESEND_API_KEY, CONTACT_INBOX (where submissions land).
 * Optional: CONTACT_FROM_EMAIL (needs a domain verified in Resend to deliver
 * outside your own Resend sign-up address), GOOGLE_SHEETS_WEBHOOK_URL,
 * KV_REST_API_URL/KV_REST_API_TOKEN (a submission counter; skipped if unset).
 */
type ContactPayload = {
  source?: "contact" | "intake";
  [key: string]: unknown;
};

/** Turns a flat payload into readable "Label: value" lines, skipping empties. */
function formatBody(fields: Record<string, unknown>): string {
  return Object.entries(fields)
    .filter(([, value]) => {
      if (value === undefined || value === null || value === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
    .join("\n");
}

/** Flattens fields to strings for the sheet row (one column per field). */
function toRow(fields: Record<string, unknown>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(", ") : String(value ?? ""),
    ])
  );
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const { source = "contact", ...fields } = body;

  const name =
    typeof fields.name === "string"
      ? fields.name
      : typeof fields.businessName === "string"
        ? fields.businessName
        : "";
  const email = typeof fields.email === "string" ? fields.email : "";

  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const subject =
    source === "intake"
      ? `New project intake — ${name || "unnamed"}`
      : `New contact form message from ${name || email}`;

  try {
    const { error } = await getResend().emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "SIR_ Website <onboarding@resend.dev>",
      to: process.env.CONTACT_INBOX ?? "delivered@resend.dev",
      replyTo: email,
      subject,
      text: formatBody(fields),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }

    try {
      await sendToSheet({
        timestamp: new Date().toISOString(),
        source,
        ...toRow(fields),
      });
    } catch (sheetErr) {
      // Never let a Sheets outage block the email that already sent.
      console.error("Google Sheets webhook failed:", sheetErr);
    }

    try {
      await kv.incr(`contact:submissions:${source}`);
    } catch {
      // KV isn't configured on this project — not required for the form.
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
