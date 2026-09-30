/**
 * The firm's inbox, shared by the pitch form (/api/pitch) and the contact form (/api/contact).
 *
 *   1. With RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL, a submission is emailed
 *      through Resend, with the sender's address as the reply-to, so answering is one click.
 *      Pitches go to PITCH_TO_EMAIL when it is set, and to CONTACT_TO_EMAIL otherwise.
 *   2. Otherwise, with CONTACT_WEBHOOK_URL, it is posted as JSON to a webhook (a Google Apps
 *      Script, a Power Automate flow, Zapier…), with CONTACT_SECRET and a `type` of "pitch"
 *      or "message", so one sheet or flow can take both.
 *   3. With neither, the forms answer "not connected".
 *
 * The keys and the webhook's address never leave the server.
 */

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** A handful of tries per visitor per minute: enough for a typo, not for a script. */
const WINDOW_MS = 60_000;
const LIMIT = 5;
const tries = new Map<string, number[]>();

export function allowed(request: Request, now = Date.now()) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const recent = (tries.get(key) ?? []).filter(time => now - time < WINDOW_MS);
  if (recent.length >= LIMIT) {
    tries.set(key, recent);
    return false;
  }
  tries.set(key, [...recent, now]);
  if (tries.size > 5000) for (const [item, times] of tries) if (times.every(time => now - time >= WINDOW_MS)) tries.delete(item);
  return true;
}

/** One line of text, without control characters, cut to `limit`. */
export function line(value: unknown, limit: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\p{Cc}\p{Cf}]/gu, " ").replace(/\s+/g, " ").trim().slice(0, limit);
}

/** A paragraph: keeps its line breaks. */
export function paragraph(value: unknown, limit: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n?/g, "\n").replace(/[^\P{Cc}\n]/gu, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, limit);
}

/** Only web addresses, so nothing else ends up as a link in the team's inbox. */
export function webAddress(value: unknown) {
  const text = line(value, 500);
  if (!text) return "";
  try {
    const url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : "";
  } catch {
    return "";
  }
}

export type Submission = {
  type: "pitch" | "message";
  subject: string;
  replyTo: string;
  /** The email, in reading order: [label, value] pairs, then the free text. */
  lines: [string, string][];
  body?: string;
  /** What the webhook receives. */
  fields: Record<string, string>;
};

export type Delivered = "sent" | "failed" | "not_connected";

async function viaResend(item: Submission) {
  const recipients = (item.type === "pitch" && process.env.PITCH_TO_EMAIL) || process.env.CONTACT_TO_EMAIL || "";
  const to = recipients.split(/[,;]/).map(address => address.trim()).filter(Boolean).slice(0, 20);
  const when = new Date().toISOString().replace("T", " ").slice(0, 16);
  const text = [
    ...item.lines.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
    ...(item.body ? ["", item.body] : []),
    "",
    `Sent from the website, ${when} UTC`,
  ].join("\n");

  const response = await fetch(`${process.env.RESEND_BASE_URL || "https://api.resend.com"}/emails`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL, to, reply_to: item.replyTo, subject: item.subject, text }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  if (!response.ok) {
    const answer = (await response.json().catch(() => null)) as { name?: string; message?: string } | null;
    console.error(`[inbox] Resend could not send the ${item.type}: ${[response.status, answer?.name, answer?.message].filter(Boolean).join(" ")}`);
  }
  return response.ok;
}

async function viaWebhook(address: string, item: Submission) {
  const response = await fetch(address, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: process.env.CONTACT_SECRET ?? "", type: item.type, ...item.fields, sentAt: new Date().toISOString() }),
    redirect: "follow",
    signal: AbortSignal.timeout(12_000),
    cache: "no-store",
  });
  if (!response.ok) return false;
  const answer = (await response.json().catch(() => null)) as { ok?: boolean } | null;
  return !(answer && answer.ok === false);
}

export async function deliver(item: Submission): Promise<Delivered> {
  try {
    if (process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && (process.env.CONTACT_TO_EMAIL || process.env.PITCH_TO_EMAIL)) {
      return (await viaResend(item)) ? "sent" : "failed";
    }
    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) return (await viaWebhook(webhook, item)) ? "sent" : "failed";
  } catch (error) {
    console.error(`[inbox] Delivery of a ${item.type} failed:`, error instanceof Error ? error.message : error);
    return "failed";
  }
  return "not_connected";
}

/** The JSON answer for each outcome. */
export function answer(result: Delivered) {
  if (result === "sent") return Response.json({ ok: true });
  if (result === "not_connected") return Response.json({ error: "not_connected" }, { status: 503 });
  return Response.json({ error: "send" }, { status: 502 });
}

/** Reads a JSON body, or null when there is none worth reading. */
export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}
