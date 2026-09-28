/**
 * Forwards a form submission to a Google Sheet, via a small Apps Script
 * "Web App" endpoint deployed on the sheet itself (see the setup notes given
 * alongside this feature — there's no first-party Sheets API client here).
 *
 * Set GOOGLE_SHEETS_WEBHOOK_URL to that Web App's /exec URL. Left unset, this
 * is a no-op so the rest of the form still works. Best-effort: a failure here
 * should never block the email from sending — callers should catch it.
 */
export async function sendToSheet(row: Record<string, string>): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;

  const post = () =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });

  // Apps Script's redirect-based execution occasionally blips right after a
  // deploy or under cold start — one retry clears that up in practice.
  let res = await post();
  if (!res.ok) res = await post();

  if (!res.ok) {
    throw new Error(`Sheets webhook responded ${res.status}`);
  }
}
