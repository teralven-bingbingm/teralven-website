// The design system first, so every component's styles come after it and can refine it.
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { RevealObserver } from "@/components/site/reveal-observer";
import { PALETTE, PALETTES, PALETTE_STORAGE_KEY } from "@/content/palettes";
import { SITE } from "@/content/site";

/** Headlines and long reading: an editorial serif with optical sizes, light at display sizes. */
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-serif", display: "swap" });
/** Interface and body copy. */
const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
/** Numbers, dates and labels. */
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

/**
 * Runs before the first paint: marks that scripts run (for the fade-ins), and applies the mode
 * the visitor chose before, so the page never flashes the wrong colours.
 */
const BOOT = `(function(){var r=document.documentElement;r.classList.add("js");try{var chosen=localStorage.getItem("${PALETTE_STORAGE_KEY}");if(${JSON.stringify(PALETTES)}.indexOf(chosen)>-1)r.setAttribute("data-palette",chosen);}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: "/",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${SITE.name} | ${SITE.tagline}`, description: SITE.description },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-palette={PALETTE} className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
