/**
 * Single source of truth for the carrillo.app mark and wordmark.
 *
 * Concept: a document letterhead written at a prompt. The mark is a chevron
 * and a block cursor over the validation stamp, and the wordmark is set in the
 * page's own type with the TLD dropped to the faint ink, so `carrillo` carries
 * the name and `.app` reads as the address it is.
 *
 * The mark used to be the initials boxed in a rule. Two things were wrong with
 * it: at 16px the letterforms mushed into the frame, and initials say who
 * without saying what. The prompt is two shapes, survives a browser tab, and
 * states the trade. The identity did not move far — it lives in the wordmark
 * beside it, and in every raster under public/icons, which is generated from
 * this same geometry.
 */

import type { SVGProps } from "react"

const STAMP = "#c4362f"

type BrandMarkProps = SVGProps<SVGSVGElement> & {
  /** @deprecated The mark no longer uses a gradient; kept so call sites compile. */
  gradientId?: string
  /**
   * "block" (default) — the rule beneath the prompt is the stamp red.
   * "monoline" — the rule is drawn in the current text colour, for use on a
   *   surface where the stamp would compete.
   */
  variant?: "block" | "monoline"
}

/**
 * The prompt mark: a chevron, a block cursor, and the rule they sit on.
 *
 * Three shapes, no letterforms — which is why it survives a 16px browser tab
 * where the old boxed initials did not. Every coordinate is a multiple of 4 so
 * the 64-unit canvas divides exactly into a 16px tab and a 32px retina one; on
 * a 7-unit grid the diagonal chevron absorbed the half-pixel but the
 * axis-aligned cursor and rule rendered grey and deformed next to it.
 *
 * The geometry is duplicated verbatim in `src/app/icon.svg`, in the generator
 * behind `public/icons`, and in `BrandCell` in `src/lib/og.tsx`; change one and
 * change all four.
 */
export function BrandMark({
  gradientId: _gradientId,
  variant = "block",
  ...props
}: BrandMarkProps) {
  const rule = variant === "block" ? STAMP : "currentColor"

  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="carrillo.app" {...props}>
      <rect width="64" height="64" fill="#0b0c0e" />
      <path
        d="M 16 16 L 28 28 L 16 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <rect x="36" y="32" width="16" height="8" fill="currentColor" />
      <rect x="0" y="56" width="64" height="8" fill={rule} />
    </svg>
  )
}

interface BrandWordmarkProps {
  /** Mark height in px. The wordmark scales from it. */
  size?: number
  /** Tailwind class for the wordmark text. */
  textClassName?: string
  /** Render the identification cell beside the wordmark. */
  showMark?: boolean
  /** Hide the wordmark and show only the cell — used where the page already
   *  states the name, so the header does not repeat it. */
  markOnly?: boolean
}

export function BrandWordmark({
  size = 32,
  textClassName = "text-paper",
  showMark = true,
  markOnly = false,
}: BrandWordmarkProps) {
  const fontSize = Math.round(size * 0.62)

  return (
    <span className="inline-flex items-center gap-2.5">
      {showMark ? (
        <BrandMark
          width={size}
          height={size}
          className={textClassName}
          style={{ width: size, height: size }}
        />
      ) : null}

      {markOnly ? (
        <span className="sr-only">carrillo.app</span>
      ) : (
        <span
          className={`font-sans font-semibold tracking-[-0.03em] ${textClassName}`}
          style={{ fontSize }}
        >
          carrillo
          <span className="text-paper-faint">.app</span>
        </span>
      )}
    </span>
  )
}
