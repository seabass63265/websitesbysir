import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import { kv } from "@/lib/kv";

/**
 * Example transactional-email route.
 * POST { name, email, message } -> sends an email via Resend and bumps a counter in KV.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "name, email and message are required" },
      { status: 400 }
    );
  }

  try {
    const { error } = await getResend().emails.send({
      from: "onboarding@resend.dev",
      to: process.env.CONTACT_INBOX ?? "delivered@resend.dev",
      replyTo: body.email,
      subject: `New enquiry from ${body.name}`,
      text: body.message,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }

    await kv.incr("contact:submissions");

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
