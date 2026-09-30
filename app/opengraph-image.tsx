import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

/**
 * The picture shown when a link to the site is shared: the firm's logo and line over a navy
 * horizon at first light, drawn at build time. The headline is set in Newsreader when Google
 * Fonts can be reached during the build, and in the default face otherwise.
 */

export const alt = `${SITE.name} | ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function newsreader(style: "normal" | "italic") {
  try {
    const family = style === "italic" ? "Newsreader:ital,wght@1,300" : "Newsreader:wght@300";
    // Without a browser's user agent, Google Fonts answers with TrueType, which the renderer reads.
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

const brand = async (file: string) => `data:image/png;base64,${(await readFile(join(process.cwd(), "public/brand", file))).toString("base64")}`;

export default async function OpenGraphImage() {
  const [regular, italic, mark, word] = await Promise.all([newsreader("normal"), newsreader("italic"), brand("mark-light.png"), brand("wordmark-light.png")]);
  const fonts = [
    ...(regular ? [{ name: "Newsreader", data: regular, style: "normal" as const, weight: 300 as const }] : []),
    ...(italic ? [{ name: "Newsreader", data: italic, style: "italic" as const, weight: 300 as const }] : []),
  ];
  const serif = fonts.length ? "Newsreader" : "serif";

  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", background: "#061529", overflow: "hidden" }}>
        {/* The light behind the planet. Stops end by 70%: the renderer measures to the far corner. */}
        <div
          style={{
            position: "absolute",
            left: 330,
            top: 170,
            width: 1100,
            height: 700,
            display: "flex",
            backgroundImage: "radial-gradient(ellipse at center, rgba(228,186,112,0.38) 0%, rgba(228,186,112,0.13) 26%, rgba(96,140,255,0.07) 48%, rgba(96,140,255,0) 70%)",
          }}
        />
        {/* The planet, its lit limb and the sun breaking over it. */}
        <div
          style={{
            position: "absolute",
            left: -1300,
            top: 500,
            width: 3800,
            height: 3800,
            borderRadius: 1900,
            display: "flex",
            background: "#030b18",
            boxShadow: "0 -1px 0 0 rgba(255,242,218,0.9), 0 -8px 30px 0 rgba(228,186,112,0.35)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 560,
            top: 486,
            width: 440,
            height: 28,
            display: "flex",
            backgroundImage: "radial-gradient(ellipse at center, rgba(255,250,240,1) 0%, rgba(255,236,200,0.75) 16%, rgba(228,186,112,0.22) 40%, rgba(228,186,112,0) 70%)",
          }}
        />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", padding: "64px 80px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mark} width={67} height={52} alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={word} width={200} height={41} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 64, fontFamily: serif, color: "#f3efe6", fontSize: 92, lineHeight: 1.02, letterSpacing: -2 }}>
            <span>Early conviction.</span>
            <span style={{ fontStyle: "italic" }}>Enduring companies.</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
