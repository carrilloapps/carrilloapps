import type { ReactNode } from "react"

import { Eyebrow } from "@/components/ui/eyebrow"
import { cn } from "@/lib/utils"

/**
 * The particulars block: a ruled list of term/value pairs.
 *
 * This is the small table that sits beside a page's opening paragraph and
 * states the facts a reader scans for before reading anything — "Respuesta ·
 * < 24 h hábiles", "Publicado en · Substack", "Modalidad · Remoto · LATAM".
 * It existed as a hand-written `<dl>` in six files, identical down to the
 * `last:border-b-0`, differing only in whether the value carried
 * `tabular-nums`.
 *
 * Semantics matter here and are easy to lose when copying: it is a real `<dl>`
 * with `<dt>`/`<dd>` pairs, so a screen reader announces each value *as* the
 * answer to its term. A pair of `<span>`s in a flex row looks identical and
 * tells an assistive reader nothing.
 */
export interface SpecItem {
  term: string
  value: ReactNode
  /** Align this value's digits with the rest. Defaults to the list setting. */
  numeric?: boolean
}

interface SpecListProps {
  items: SpecItem[]
  /**
   * `framed` (default) closes the list with a rule above and below — the form
   * used beside a hero. `open` draws only the separators between rows, for a
   * list that already sits inside a bordered surface.
   */
  variant?: "framed" | "open"
  /**
   * `rows` (default) is one ruled row per pair, term left, value right.
   *
   * `grid` pairs them in two columns on phones and stacks to one from `md`,
   * with the term above its value — the form `/servicios` uses for three short
   * facts, where full-width rows left most of the line empty. Separators come
   * off in this layout: with three items in a 2×2 grid, a rule under each cell
   * draws a box around nothing.
   */
  layout?: "rows" | "grid"
  /** Right-align every value's digits. Individual items can still opt in. */
  numeric?: boolean
  className?: string
}

export function SpecList({
  items,
  variant = "framed",
  layout = "rows",
  numeric = false,
  className,
}: SpecListProps) {
  const framed = variant === "framed"

  return (
    <dl
      className={cn(
        "self-start",
        framed ? "border-y border-rule" : "border-t border-rule",
        layout === "grid"
          ? "grid grid-cols-2 gap-y-6 py-6 md:grid-cols-1 md:gap-y-5"
          : "max-w-[26rem] lg:max-w-none",
        className,
      )}
    >
      {items.map(({ term, value, numeric: itemNumeric }) =>
        layout === "grid" ? (
          <div key={term} className="flex flex-col gap-1.5 md:flex-row md:justify-between">
            <Eyebrow as="dt">{term}</Eyebrow>
            <dd
              className={cn(
                "font-sans text-base text-paper",
                (itemNumeric ?? numeric) && "tabular-nums",
              )}
            >
              {value}
            </dd>
          </div>
        ) : (
          <div
            key={term}
            className="flex items-baseline justify-between gap-4 border-b border-rule py-3 last:border-b-0"
          >
            <Eyebrow as="dt">{term}</Eyebrow>
            <dd
              className={cn(
                "text-right font-sans text-base text-paper",
                (itemNumeric ?? numeric) && "tabular-nums",
              )}
            >
              {value}
            </dd>
          </div>
        ),
      )}
    </dl>
  )
}
