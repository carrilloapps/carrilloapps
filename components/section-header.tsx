import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

type Align = "left" | "center" | "right"

interface SectionHeaderProps {
  /** Optional small uppercase label above the title (e.g. "Experiencia"). */
  eyebrow?: string
  /** Lucide icon shown inside the eyebrow chip. */
  eyebrowIcon?: LucideIcon
  /** Main heading text. Renders as `<h2>` with the supplied id. */
  title: string
  /** Sub-headline / supporting text. */
  description?: string
  /** Anchor id for the heading (used by `aria-labelledby`). */
  headingId?: string
  /** Heading text alignment + flex distribution of the wrapper. */
  align?: Align
  /** Slot rendered on the opposite side of the title (only honoured when
   *  align is "left" or "right"). Useful for a "Ver todos" link. */
  trailing?: ReactNode
  /** Override the bottom margin between header and content. */
  className?: string
}

const wrapperByAlign: Record<Align, string> = {
  left: "flex-col md:flex-row md:items-end md:justify-between",
  center: "flex-col items-center text-center",
  right: "flex-col md:flex-row-reverse md:items-end md:justify-between text-right md:text-right",
}

const stackByAlign: Record<Align, string> = {
  left: "items-start",
  center: "items-center text-center",
  right: "items-end md:items-end text-right",
}

/**
 * A single source for section headers across the home.
 *
 * Each section can pick a different `align` to break the rhythm — alternating
 * left / center / right across the page is what gives the page editorial
 * variation instead of a wall of identical sections.
 */
export function SectionHeader({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  description,
  headingId,
  align = "left",
  trailing,
  className = "mb-10 md:mb-12",
}: SectionHeaderProps) {
  // Render badge as an `<inline-flex>` *without* `self-start` so it inherits
  // the parent's `align-items` rule. This is what keeps badge + title +
  // description visually anchored to the same edge instead of the previous
  // bug where the badge was always left-aligned even on centred sections.
  const stack = (
    <div className={`flex flex-col gap-3 max-w-2xl ${stackByAlign[align]}`}>
      {eyebrow && (
        <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium uppercase tracking-[0.18em]">
          {EyebrowIcon ? <EyebrowIcon className="w-3 h-3" aria-hidden="true" /> : null}
          {eyebrow}
        </span>
      )}
      <h2
        id={headingId}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
      >
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )

  return (
    <div className={`flex gap-6 ${wrapperByAlign[align]} ${className}`}>
      {stack}
      {trailing && align !== "center" && (
        <div className="self-start md:self-end shrink-0">{trailing}</div>
      )}
    </div>
  )
}
