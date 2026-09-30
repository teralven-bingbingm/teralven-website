"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useSubmit } from "@/components/forms/use-submit";
import styles from "@/components/forms/form.module.css";
import { ArrowRight } from "@/components/ui/icons";
import { FOCUS } from "@/content/focus";
import { PITCH, RAISING_OPTIONS, SOURCE_OPTIONS, STAGE_OPTIONS } from "@/content/pitch";
import { SITE } from "@/content/site";

const ONE_LINER = 140;

function Part({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <fieldset className={styles.part}>
      <legend className={styles.legend}>
        <span className="num">{number}</span>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Choice({ name, label, options, required = false }: { name: string; label: string; options: readonly string[]; required?: boolean }) {
  return (
    <label className={`${styles.field} ${styles.select}`}>
      <span>
        {label}
        {!required && <i>optional</i>}
      </span>
      <select name={name} defaultValue="" required={required}>
        <option value="" disabled>
          Choose one
        </option>
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

/**
 * The pitch: who the founder is, what the company does, where the round stands and the story,
 * in four parts. It posts to /api/pitch (lib/inbox.ts). Only what a first read needs is
 * required; the rest helps. The "fax" field is a trap for bots.
 */
export function PitchForm() {
  const { status, submit, reset } = useSubmit("/api/pitch", "reach us through the contact page.", {
    fields: "Please fill in the required fields: your name, role, company, one line, focus area, stage, fundraising and what you are building.",
    consent: "Please confirm that we may keep your pitch to review it.",
  });
  const [oneLiner, setOneLiner] = useState("");

  if (status.state === "sent") {
    return (
      <div className={styles.sent} role="status">
        <span className={styles.sentMark} aria-hidden="true" />
        <h2 className="display d-s">
          Thank you. <em>Your pitch is with our team.</em>
        </h2>
        <p className="body">We read every submission. If there is a fit, we will be in touch to set up a first conversation.</p>
        <button
          type="button"
          className="link"
          onClick={() => {
            setOneLiner("");
            reset();
          }}
        >
          Submit another <ArrowRight />
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form className={styles.form} onSubmit={submit}>
      <Part number="01" title="About you">
        <div className={styles.row}>
          <label className={styles.field}>
            <span>Full name</span>
            <input name="name" type="text" autoComplete="name" required maxLength={120} />
          </label>
          <label className={styles.field}>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required maxLength={254} />
          </label>
        </div>
        <div className={styles.row}>
          <label className={styles.field}>
            <span>Your role</span>
            <input name="role" type="text" autoComplete="organization-title" required maxLength={120} placeholder="CEO and co-founder" />
          </label>
          <label className={styles.field}>
            <span>
              LinkedIn <i>optional</i>
            </span>
            <input name="linkedin" type="url" inputMode="url" maxLength={300} placeholder="https://linkedin.com/in/" />
          </label>
        </div>
      </Part>

      <Part number="02" title="Your company">
        <div className={styles.row}>
          <label className={styles.field}>
            <span>Company name</span>
            <input name="company" type="text" autoComplete="organization" required maxLength={120} />
          </label>
          <label className={styles.field}>
            <span>
              Website <i>optional</i>
            </span>
            <input name="website" type="url" inputMode="url" maxLength={300} placeholder="https://" />
          </label>
        </div>
        <label className={styles.field}>
          <span>What you do, in one line</span>
          <span className={styles.counter} aria-hidden="true">
            {oneLiner.length}/{ONE_LINER}
          </span>
          <input
            name="oneLiner"
            type="text"
            required
            maxLength={ONE_LINER}
            placeholder="We help… do… by…"
            value={oneLiner}
            onChange={event => setOneLiner(event.target.value)}
          />
        </label>
        <div className={styles.row}>
          <Choice name="focus" label="Focus area" options={[...FOCUS.map(area => area.title), "Something else"]} required />
          <Choice name="stage" label="Stage" options={STAGE_OPTIONS} required />
        </div>
        <label className={styles.field}>
          <span>
            Where you are based <i>optional</i>
          </span>
          <input name="location" type="text" autoComplete="address-level2" maxLength={120} placeholder="City, country" />
        </label>
      </Part>

      <Part number="03" title="Your round">
        <div className={styles.row}>
          <Choice name="raising" label="Fundraising" options={RAISING_OPTIONS} required />
          <label className={styles.field}>
            <span>
              Round size <i>optional</i>
            </span>
            <input name="roundSize" type="text" maxLength={60} placeholder="For example, $2M" />
          </label>
        </div>
        <label className={styles.field}>
          <span>
            Pitch deck <i>optional, but it helps</i>
          </span>
          <input name="deck" type="url" inputMode="url" maxLength={500} placeholder="A DocSend, Google Drive or Dropbox link" />
          <span className={styles.hint}>A link we can open without asking for access.</span>
        </label>
      </Part>

      <Part number="04" title="The story">
        <label className={styles.field}>
          <span>What are you building, and why now?</span>
          <textarea name="building" rows={6} required maxLength={3000} placeholder="The problem, your insight, and why your team is the one to build it." />
        </label>
        <label className={styles.field}>
          <span>
            Traction so far <i>optional</i>
          </span>
          <textarea name="traction" rows={4} maxLength={2000} placeholder="Users, revenue, growth, pilots, anything that shows momentum." />
        </label>
        <div className={styles.row}>
          <Choice name="source" label="How did you hear about us?" options={SOURCE_OPTIONS} />
          <label className={styles.field}>
            <span>
              Who introduced you? <i>optional</i>
            </span>
            <input name="referrer" type="text" maxLength={120} />
          </label>
        </div>
      </Part>

      <label className={styles.trap} aria-hidden="true">
        Fax
        <input name="fax" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <label className={styles.consent}>
        <input name="consent" type="checkbox" required />
        <span>
          I agree that {SITE.name} may keep this information to review a possible investment, as described in the{" "}
          <Link href="/legal/privacy">Privacy Policy</Link>.
        </span>
      </label>

      <div className={styles.submit}>
        <button type="submit" className="button" disabled={sending}>
          {sending ? "Sending…" : "Submit pitch"} <ArrowRight />
        </button>
        <p className={styles.note}>{PITCH.note}</p>
      </div>

      {status.state === "error" && (
        <p className={styles.error} role="alert">
          {status.message}
        </p>
      )}
    </form>
  );
}
