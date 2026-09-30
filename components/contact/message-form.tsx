"use client";

import { useSubmit } from "@/components/forms/use-submit";
import styles from "@/components/forms/form.module.css";
import { ArrowRight } from "@/components/ui/icons";
import { TOPIC_OPTIONS } from "@/content/pitch";

/**
 * A message to the firm: press, investor relations, careers or anything else. Pitches have
 * their own page and form (/pitch). Posts to /api/contact (lib/inbox.ts).
 */
export function MessageForm() {
  const { status, submit, reset } = useSubmit("/api/contact", {
    fields: "Please fill in your name, email and message.",
  });

  if (status.state === "sent") {
    return (
      <div className={styles.sent} role="status">
        <span className={styles.sentMark} aria-hidden="true" />
        <h2 className="display d-s">
          Thank you. <em>We&rsquo;ll be in touch.</em>
        </h2>
        <button type="button" className="link" onClick={reset}>
          Send another <ArrowRight />
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={254} />
        </label>
      </div>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>
            Company <i>optional</i>
          </span>
          <input name="company" type="text" autoComplete="organization" maxLength={120} />
        </label>
        <label className={`${styles.field} ${styles.select}`}>
          <span>Topic</span>
          <select name="topic" defaultValue={TOPIC_OPTIONS[0]}>
            {TOPIC_OPTIONS.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      <label className={styles.field}>
        <span>Message</span>
        <textarea name="message" rows={5} required maxLength={4000} />
      </label>

      <label className={styles.trap} aria-hidden="true">
        Fax
        <input name="fax" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className={styles.submit}>
        <button type="submit" className="button" disabled={sending}>
          {sending ? "Sending…" : "Send message"} <ArrowRight />
        </button>
      </div>

      {status.state === "error" && (
        <p className={styles.error} role="alert">
          {status.message}
        </p>
      )}
    </form>
  );
}
