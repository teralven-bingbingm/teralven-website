import type { JSX } from "react";
import type { FocusId } from "@/content/focus";
import styles from "./glyph.module.css";

/**
 * A drawing for each focus area, in fine line on a 400 × 400 field: a constellation for AI,
 * a fan of frames for media, a stack for infrastructure, flows for fintech, a helix for
 * health, a circle of circles for consumer, orbits for frontier technology. Lines take the
 * text colour; the accent marks one element in each. Everything is computed here, once, at
 * render — the drawings are plain SVG.
 */

const C = 200;
const f = (value: number) => value.toFixed(2);
/** Opacities, rounded so the server's HTML and the browser's render agree. */
const o = (value: number) => ({ opacity: Math.round(value * 1000) / 1000 });
const polar = (radius: number, degrees: number, cx = C, cy = C) => {
  const angle = (degrees * Math.PI) / 180;
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)] as const;
};

function Intelligence() {
  const inner = Array.from({ length: 6 }, (_, i) => polar(64, i * 60 - 90));
  const middle = Array.from({ length: 12 }, (_, i) => polar(122, i * 30 - 75));
  const outer = Array.from({ length: 24 }, (_, i) => polar(172, i * 15 - 90));
  return (
    <>
      <circle cx={C} cy={C} r={64} className={styles.faint} />
      <circle cx={C} cy={C} r={122} className={styles.faint} />
      <circle cx={C} cy={C} r={172} className={`${styles.faint} ${styles.dash}`} />
      <g className={styles.spin}>
        {middle.map(([x, y], i) => {
          const [ox, oy] = outer[(i * 2 + 1) % 24];
          return <line key={i} x1={f(x)} y1={f(y)} x2={f(ox)} y2={f(oy)} className={styles.soft} />;
        })}
        {outer.map(([x, y], i) => (
          <circle key={i} cx={f(x)} cy={f(y)} r={i % 2 ? 2.2 : 1.4} className={styles.dot} />
        ))}
      </g>
      {inner.map(([x, y], i) => (
        <g key={i}>
          <line x1={C} y1={C} x2={f(x)} y2={f(y)} className={styles.soft} />
          {[middle[i * 2], middle[i * 2 + 1]].map(([mx, my], j) => (
            <line key={j} x1={f(x)} y1={f(y)} x2={f(mx)} y2={f(my)} className={styles.soft} />
          ))}
        </g>
      ))}
      {middle.map(([x, y], i) => (
        <circle key={i} cx={f(x)} cy={f(y)} r={3} className={styles.node} />
      ))}
      {inner.map(([x, y], i) => (
        <circle key={i} cx={f(x)} cy={f(y)} r={4.5} className={styles.node} />
      ))}
      <circle cx={C} cy={C} r={16} className={styles.accentLine} />
      <circle cx={C} cy={C} r={6} className={styles.accentFill} />
    </>
  );
}

function Media() {
  const angles = [-30, -15, 0, 15, 30];
  return (
    <>
      {angles.map((angle, i) => (
        <g key={angle} transform={`rotate(${angle} 200 338)`}>
          <rect x={146} y={70} width={108} height={192} rx={7} className={angle === 0 ? styles.accentLine : styles.line} style={o(angle === 0 ? 1 : 0.28 + (2 - Math.abs(i - 2)) * 0.2)} />
          {angle !== 0 && <line x1={158} y1={246} x2={206} y2={246} className={styles.soft} />}
        </g>
      ))}
      <path d="M190 150 L218 166 L190 182 Z" className={styles.accentFill} />
      <line x1={158} y1={246} x2={242} y2={246} className={styles.faint} />
      <line x1={158} y1={246} x2={196} y2={246} className={styles.accentLine} />
      <path d="M92 338 A108 108 0 0 1 308 338" className={`${styles.faint} ${styles.dash}`} />
    </>
  );
}

function Infrastructure() {
  const levels = [118, 160, 202, 244, 286];
  const diamond = (y: number) => `M200 ${y - 58} L328 ${y} L200 ${y + 58} L72 ${y} Z`;
  return (
    <>
      <line x1={72} y1={118} x2={72} y2={286} className={`${styles.faint} ${styles.dash}`} />
      <line x1={328} y1={118} x2={328} y2={286} className={`${styles.faint} ${styles.dash}`} />
      <line x1={200} y1={176} x2={200} y2={344} className={`${styles.faint} ${styles.dash}`} />
      {levels
        .slice()
        .reverse()
        .map((y, i) => (
          <path key={y} d={diamond(y)} className={y === 118 ? styles.accentLine : styles.line} style={o(y === 118 ? 1 : 0.3 + i * 0.12)} />
        ))}
      {/* A grid on the top face, parallel to its edges. */}
      {[0.25, 0.5, 0.75].map(t => (
        <g key={t}>
          <line x1={f(72 + t * 128)} y1={f(118 - t * 58)} x2={f(200 + t * 128)} y2={f(176 - t * 58)} className={styles.soft} />
          <line x1={f(200 + t * 128)} y1={f(60 + t * 58)} x2={f(72 + t * 128)} y2={f(118 + t * 58)} className={styles.soft} />
        </g>
      ))}
      <circle cx={200} cy={118} r={4} className={styles.accentFill} />
    </>
  );
}

function Flows() {
  const count = 11;
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const y0 = 110 + i * 18;
        const centre = Math.abs(i - (count - 1) / 2);
        const amplitude = 34 * (1 - centre / 7);
        const points = Array.from({ length: 81 }, (_, k) => {
          const x = 40 + k * 4;
          const y = y0 + amplitude * Math.sin(((x - 40) / 320) * Math.PI * 2 + i * 0.36) * Math.sin(((x - 40) / 320) * Math.PI);
          return `${k ? "L" : "M"}${f(x)} ${f(y)}`;
        }).join(" ");
        return <path key={i} d={points} className={i === 5 ? styles.accentLine : styles.line} style={o(i === 5 ? 1 : 0.24 + (1 - centre / 5) * 0.5)} />;
      })}
      <circle cx={40} cy={200} r={3} className={styles.node} />
      <circle cx={360} cy={200} r={3} className={styles.accentFill} />
    </>
  );
}

function Helix() {
  const steps = 120;
  const strand = (phase: number) =>
    Array.from({ length: steps + 1 }, (_, k) => {
      const t = k / steps;
      const y = 44 + t * 312;
      const x = C + 78 * Math.sin(t * Math.PI * 4 + phase);
      return `${k ? "L" : "M"}${f(x)} ${f(y)}`;
    }).join(" ");
  const rungs = Array.from({ length: 21 }, (_, k) => {
    const t = k / 20;
    const y = 44 + t * 312;
    const s = Math.sin(t * Math.PI * 4);
    return { y, a: C + 78 * s, b: C - 78 * s, depth: Math.abs(Math.cos(t * Math.PI * 4)) };
  });
  return (
    <>
      <path d={strand(0)} className={styles.line} />
      <path d={strand(Math.PI)} className={styles.line} style={o(0.5)} />
      {rungs.map((rung, k) => (
        <g key={k}>
          <line x1={f(rung.a)} y1={f(rung.y)} x2={f(rung.b)} y2={f(rung.y)} className={styles.soft} style={o(0.25 + (1 - rung.depth) * 0.45)} />
          <circle cx={f(rung.a)} cy={f(rung.y)} r={2.6} className={k === 7 || k === 13 ? styles.accentFill : styles.dot} />
          <circle cx={f(rung.b)} cy={f(rung.y)} r={1.8} className={styles.dot} style={o(0.6)} />
        </g>
      ))}
    </>
  );
}

function Community() {
  const around = Array.from({ length: 6 }, (_, i) => polar(66, i * 60 - 90));
  return (
    <>
      <circle cx={C} cy={C} r={148} className={`${styles.faint} ${styles.dash}`} />
      <circle cx={C} cy={C} r={132} className={styles.faint} />
      {around.map(([x, y], i) => (
        <circle key={i} cx={f(x)} cy={f(y)} r={66} className={styles.line} style={o(0.55)} />
      ))}
      <circle cx={C} cy={C} r={66} className={styles.accentLine} />
      {around.map(([x, y], i) => (
        <circle key={i} cx={f(x)} cy={f(y)} r={2.6} className={styles.node} />
      ))}
      <circle cx={C} cy={C} r={4} className={styles.accentFill} />
    </>
  );
}

function Orbits() {
  const orbits = [
    { rx: 166, ry: 50, angle: -18 },
    { rx: 150, ry: 62, angle: 34 },
    { rx: 128, ry: 40, angle: 82 },
  ];
  return (
    <>
      <circle cx={C} cy={C} r={176} className={`${styles.faint} ${styles.dash}`} />
      <g className={styles.spinSlow}>
        {orbits.map((orbit, i) => {
          const t = [0.7, 2.4, 4.1][i];
          const x = C + orbit.rx * Math.cos(t);
          const y = C + orbit.ry * Math.sin(t);
          return (
            <g key={i} transform={`rotate(${orbit.angle} 200 200)`}>
              <ellipse cx={C} cy={C} rx={orbit.rx} ry={orbit.ry} className={i === 0 ? styles.accentLine : styles.line} style={o(i === 0 ? 1 : 0.45)} />
              <circle cx={f(x)} cy={f(y)} r={i === 0 ? 5 : 3.2} className={i === 0 ? styles.accentFill : styles.node} />
            </g>
          );
        })}
      </g>
      <circle cx={C} cy={C} r={34} className={styles.planet} />
      <path d="M170 200 A30 30 0 0 1 230 200" className={styles.soft} />
    </>
  );
}

const DRAWINGS: Record<FocusId, () => JSX.Element> = {
  ai: Intelligence,
  media: Media,
  enterprise: Infrastructure,
  fintech: Flows,
  health: Helix,
  consumer: Community,
  frontier: Orbits,
};

export function Glyph({ id, className, animated = true }: { id: FocusId; className?: string; animated?: boolean }) {
  const Drawing = DRAWINGS[id];
  return (
    <svg viewBox="0 0 400 400" className={`${styles.glyph} ${animated ? styles.animated : ""} ${className ?? ""}`} fill="none" aria-hidden="true">
      <Drawing />
    </svg>
  );
}
