import Image from "next/image";
import styles from "./logo.module.css";

/**
 * The firm's logo: the mark (public/brand/mark.png) with the wordmark beside it
 * (public/brand/wordmark.png). Each comes in two versions, both made from the originals in
 * public/: navy and gold for a light ground, cream and gold for a dark one. The ground under
 * the logo decides which shows (--navy-logo / --cream-logo in globals.css), so the logo is
 * always legible in the bar, the footer and every palette.
 */

const MARK = { width: 515, height: 400 };
/** The bar's wordmark (public/Logo Word.png) and the footer's, which carries the tagline (public/Word Logo.png). */
const WORDS = {
  nav: { src: "/brand/wordmark", width: 1200, height: 246 },
  footer: { src: "/brand/wordmark-tagline", width: 1400, height: 385 },
};

export function Logo({ size = "nav" }: { size?: "nav" | "footer" }) {
  const markHeight = size === "nav" ? 40 : 68;
  const wordHeight = size === "nav" ? 30 : 64;
  const WORD = WORDS[size];
  const mark = { width: Math.round((markHeight * MARK.width) / MARK.height), height: markHeight };
  const word = { width: Math.round((wordHeight * WORD.width) / WORD.height), height: wordHeight };

  return (
    <span className={`${styles.logo} ${styles[size]}`}>
      <span className={styles.mark}>
        <Image src="/brand/mark.png" alt="" {...mark} className={styles.navy} priority={size === "nav"} />
        <Image src="/brand/mark-light.png" alt="" {...mark} className={styles.cream} priority={size === "nav"} />
      </span>
      <span className={styles.word}>
        <Image src={`${WORD.src}.png`} alt="" {...word} className={styles.navy} priority={size === "nav"} />
        <Image src={`${WORD.src}-light.png`} alt="" {...word} className={styles.cream} priority={size === "nav"} />
      </span>
    </span>
  );
}
