"use client";

import { useState, type FormEvent } from "react";

export type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

/**
 * Sends a form to one of the site's inboxes (/api/pitch, /api/contact) as JSON and keeps its
 * status. `messages` turns the server's error codes into words; anything else falls back to
 * `elsewhere`, a line saying where else to reach the firm.
 */
export function useSubmit(endpoint: string, elsewhere: string, messages: Record<string, string> = {}) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const fallback = (lead: string) => `${lead} Please try again in a moment, or ${elsewhere}`;
  const known: Record<string, string> = {
    email: "Please check the email address.",
    fields: "Please fill in the required fields.",
    slow_down: "That was a lot of tries. Please wait a minute and send it again.",
    not_connected: `This form isn't connected yet. Please ${elsewhere}`,
    ...messages,
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data: Record<string, unknown> = Object.fromEntries(new FormData(form).entries());
    for (const box of form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')) data[box.name] = box.checked;
    setStatus({ state: "sending" });
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const answer = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (response.ok && answer.ok) {
        setStatus({ state: "sent" });
        form.reset();
        window.scrollTo({ top: Math.max(0, form.getBoundingClientRect().top + window.scrollY - 140), behavior: "smooth" });
        return;
      }
      setStatus({ state: "error", message: known[answer.error ?? ""] ?? fallback("Something went wrong.") });
    } catch {
      setStatus({ state: "error", message: fallback("We couldn't reach the server.") });
    }
  }

  return { status, submit, reset: () => setStatus({ state: "idle" }) };
}
