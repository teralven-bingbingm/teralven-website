import { EMAIL, allowed, answer, deliver, line, paragraph, readJson, webAddress } from "@/lib/inbox";
import { FOCUS } from "@/content/focus";
import { RAISING_OPTIONS, SOURCE_OPTIONS, STAGE_OPTIONS } from "@/content/pitch";

/**
 * Receives a pitch from /pitch and delivers it to the team (lib/inbox.ts). A choice outside
 * the form's own options is dropped rather than stored, and the hidden "fax" field is a trap
 * for bots: people never see it.
 */

const one = (value: unknown, options: readonly string[]) => {
  const text = line(value, 80);
  return options.includes(text) ? text : "";
};

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return Response.json({ error: "invalid" }, { status: 400 });
  if (line(body.fax, 200)) return Response.json({ ok: true });

  const pitch = {
    name: line(body.name, 120),
    email: line(body.email, 254).toLowerCase(),
    role: line(body.role, 120),
    linkedin: webAddress(body.linkedin),
    company: line(body.company, 120),
    website: webAddress(body.website),
    oneLiner: line(body.oneLiner, 160),
    focus: one(body.focus, [...FOCUS.map(area => area.title), "Something else"]),
    stage: one(body.stage, STAGE_OPTIONS),
    location: line(body.location, 120),
    raising: one(body.raising, RAISING_OPTIONS),
    roundSize: line(body.roundSize, 60),
    deck: webAddress(body.deck),
    building: paragraph(body.building, 3000),
    traction: paragraph(body.traction, 2000),
    source: one(body.source, SOURCE_OPTIONS),
    referrer: line(body.referrer, 120),
  };

  if (!EMAIL.test(pitch.email)) return Response.json({ error: "email" }, { status: 422 });
  const missing = !pitch.name || !pitch.role || !pitch.company || !pitch.oneLiner || !pitch.focus || !pitch.stage || !pitch.raising || !pitch.building;
  if (missing) return Response.json({ error: "fields" }, { status: 422 });
  if (body.consent !== true && body.consent !== "yes" && body.consent !== "on") return Response.json({ error: "consent" }, { status: 422 });
  if (!allowed(request)) return Response.json({ error: "slow_down" }, { status: 429 });

  const result = await deliver({
    type: "pitch",
    subject: `Pitch: ${pitch.company} (${pitch.stage}, ${pitch.focus})`,
    replyTo: pitch.email,
    lines: [
      ["Founder", `${pitch.name}, ${pitch.role} <${pitch.email}>`],
      ["LinkedIn", pitch.linkedin],
      ["Company", pitch.company],
      ["In one line", pitch.oneLiner],
      ["Website", pitch.website],
      ["Focus area", pitch.focus],
      ["Stage", pitch.stage],
      ["Based in", pitch.location],
      ["Fundraising", pitch.raising],
      ["Round size", pitch.roundSize],
      ["Deck", pitch.deck],
      ["Heard about us", pitch.source],
      ["Introduced by", pitch.referrer],
    ],
    body: [`What they are building, and why now:\n${pitch.building}`, ...(pitch.traction ? [`Traction:\n${pitch.traction}`] : [])].join("\n\n"),
    fields: pitch,
  });
  return answer(result);
}
