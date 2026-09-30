import styles from "./horizon.module.css";

type Variant = "hero" | "band" | "cta";

/**
 * The brand's picture: the edge of a planet at first light. A very large dark disc whose top
 * crosses the frame, a thin lit limb that is brightest where the sun breaks, the atmosphere
 * above it, and a lens streak through the sun. All of it is CSS gradients — no images, no
 * blur filters — so it stays sharp at any size and costs almost nothing to draw.
 *
 * `hero` is the home page, `band` the header of an inner page, `cta` the closing call to
 * action. The parent must be position: relative; set --p (0 to 1) on it to lift the scene
 * as the page scrolls.
 */
export function Horizon({ variant = "hero", className }: { variant?: Variant; className?: string }) {
  return (
    <div className={`${styles.horizon} ${styles[variant]} ${className ?? ""}`} aria-hidden="true">
      <div className={styles.scene}>
        <div className={styles.wash} />
        <div className={styles.planet}>
          <div className={styles.surface} />
        </div>
        <div className={styles.halo} />
        <div className={styles.sun} />
        <div className={styles.streak} />
      </div>
    </div>
  );
}
