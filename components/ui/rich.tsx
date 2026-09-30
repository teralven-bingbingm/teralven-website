import { Fragment } from "react";

/**
 * The one piece of markup the copy uses: *asterisks* set a phrase in italic, the house
 * accent for headlines. In a headline, "|" breaks it into lines ("Early conviction.|*Enduring
 * companies.*").
 */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, index) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? <em key={index}>{part.slice(1, -1)}</em> : <Fragment key={index}>{part}</Fragment>,
      )}
    </>
  );
}

export function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("|").map((line, index) => (
        <span key={index} className="line">
          <Rich text={line} />
        </span>
      ))}
    </>
  );
}

/** The same text without its markup, for metadata. */
export const plain = (text: string) => text.replace(/\|/g, " ").replace(/\*/g, "");
