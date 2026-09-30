import { EMAIL, allowed, answer, deliver, line, paragraph, readJson } from "@/lib/inbox";
import { TOPIC_OPTIONS } from "@/content/pitch";

/**
 * Receives a message from /contact (press, investor relations, careers, anything that is not
 * a pitch; pitches go to /api/pitch) and delivers it to the team (lib/inbox.ts). The hidden
 * "fax" field is a trap for bots: people never see it.
 */
export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return Response.json({ error: "invalid" }, { status: 400 });
  if (line(body.fax, 200)) return Response.json({ ok: true });

  const topic = line(body.topic, 60);
  const message = {
    name: line(body.name, 120),
    email: line(body.email, 254).toLowerCase(),
    company: line(body.company, 120),
    topic: TOPIC_OPTIONS.includes(topic) ? topic : "General",
    message: paragraph(body.message, 4000),
  };

  if (!EMAIL.test(message.email)) return Response.json({ error: "email" }, { status: 422 });
  if (!message.name || !message.message) return Response.json({ error: "fields" }, { status: 422 });
  if (!allowed(request)) return Response.json({ error: "slow_down" }, { status: 429 });

  const result = await deliver({
    type: "message",
    subject: `${message.topic}: message from ${message.name}${message.company ? ` (${message.company})` : ""}`,
    replyTo: message.email,
    lines: [
      ["From", `${message.name} <${message.email}>`],
      ["Company", message.company],
      ["Topic", message.topic],
    ],
    body: message.message,
    fields: message,
  });
  return answer(result);
}
