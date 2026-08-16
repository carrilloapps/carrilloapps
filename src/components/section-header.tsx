import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  /**
   * @deprecated Eyebrows are banned in this design system — the heading carries
   * its own weight. Kept in the signature so existing call sites keep compiling;
   * the value is used as the column label when `columnLabel` is absent, which is
   * where that text actually belongs.
   */
  eyebrow?: string
  /** @deprecated No icon renders in the ledger's section rule. */
  eyebrowIcon?: LucideIcon
  /** The ledger column label: small, mono, uppercase, on the section rule. */
  columnLabel?: string
  /** Main heading text. Renders as `<h2>` with the supplied id. */
  title: string
  /** Supporting text under the heading. */
  description?: string
  /** Anchor id for the heading (used by `aria-labelledby`). */
  headingId?: string
  /** Right-hand slot on the section rule — a link, a count, a period. */
  trailing?: ReactNode
  /** Override the bottom margin between header and content. */
  className?: string
}

/**
 * One section header for the whole ledger.
 *
 * Every section opens the same way a statement's section opens: a strong rule
 * carrying a small mono column label on the left and its counterpart on the
 * right, then the heading beneath it. The previous version stacked a pill
 * eyebrow over a centred display heading and let each section pick its own
 * alignment; alternating alignment reads as variety for its own sake, and the
 * ledger's authority comes from every entry starting at the same edge.
 */
export function SectionHeader({
  eyebrow,
  columnLabel,
  title,
  description,
  headingId,
  trailing,
  className = "mb-6 md:mb-8",
}: SectionHeaderProps) {
  const label = columnLabel ?? eyebrow

  return (
    <div className={className}>
      {(label || trailing) && (
        <div className="flex items-baseline justify-between gap-6 border-b border-rule-strong pb-2">
          {label ? (
            <span className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase">
              {label}
            </span>
          ) : (
            <span aria-hidden="true" />
          )}
          {trailing ? <div className="shrink-0">{trailing}</div> : null}
        </div>
      )}

      <div className="mt-5 flex max-w-3xl flex-col gap-2.5">
        <h2
          id={headingId}
          className="font-sans text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-paper"
        >
          {title}
        </h2>
        {description && (
          <p className="max-w-[68ch] font-sans text-base leading-relaxed text-paper-dim md:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
