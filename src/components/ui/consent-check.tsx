"use client"

import { Check } from "lucide-react"

interface ConsentCheckProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  /** The commitment itself. Kept short; the detail goes in `note`. */
  children: React.ReactNode
  /** Secondary line — what it means in practice, or how to undo it. */
  note?: string
  /** Consent the form cannot proceed without. */
  required?: boolean
}

/**
 * A consent row, drawn rather than borrowed.
 *
 * The native checkbox with `accent-color` was the one control on the page still
 * rendered by the browser: a rounded blue-grey box that matched nothing around
 * it, at 16px, well under the 48px target the rest of the site holds to. This
 * keeps the real `<input>` for semantics and keyboard — it is visually hidden,
 * not replaced — and paints a square mark beside it, stamped when checked.
 *
 * The whole row is the label, so the hit area is the sentence and not the box.
 */
export function ConsentCheck({
  id,
  checked,
  onChange,
  disabled,
  children,
  note,
  required,
}: ConsentCheckProps) {
  return (
    <div className="border-b border-rule last:border-b-0">
      <label
        htmlFor={id}
        className="group flex cursor-pointer items-start gap-3.5 py-4 has-[:disabled]:cursor-not-allowed"
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          required={required}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />

        {/* The mark. `peer-focus-visible` puts the focus ring on the shape the
            eye is looking at, since the input itself is off-screen. */}
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-stamp-text ${
            checked
              ? "border-stamp bg-stamp text-paper"
              : "border-rule-strong bg-field group-hover:border-paper-faint"
          }`}
        >
          {checked ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
        </span>

        <span className="min-w-0">
          <span className="block font-sans text-sm leading-snug text-paper-dim">
            {children}
            {required ? (
              <span className="ml-1 text-stamp-text" aria-hidden="true">
                *
              </span>
            ) : null}
          </span>
          {note ? (
            <span className="mt-1 block font-sans text-[13px] leading-snug text-paper-faint">
              {note}
            </span>
          ) : null}
        </span>
      </label>
    </div>
  )
}
