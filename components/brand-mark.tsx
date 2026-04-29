/**
 * Single source of truth for the carrillo.app brand mark and wordmark.
 *
 * Concept: a solid gradient block (matching the site's primary CTA gradient,
 * blue-600 → purple-600) housing a clean monoline "j" — the initial of José.
 * The j's tittle is enlarged into a focal dot which mirrors the "." in .app.
 *
 * Why a filled block over an outline glyph:
 *   - Dense fill reads at every size, especially at 16×16 favicons where thin
 *     strokes vanish.
 *   - Matches the surrounding UI language of solid CTA buttons.
 *   - Negative-space letterform feels modern and intentional rather than
 *     adapted-from-a-font.
 */

import { useId, type SVGProps } from "react"

const GRADIENT_FROM = "#2563eb" // blue-600 — the site's CTA start
const GRADIENT_TO = "#9333ea" // purple-600 — the site's CTA end

type BrandMarkProps = SVGProps<SVGSVGElement> & {
  /** Override the gradient id (useful when SSR-stable ids are required). */
  gradientId?: string
  /**
   * "block" (default) — solid gradient background with a white j.
   * "monoline" — transparent background, gradient strokes (for use over a
   *   coloured surface where the block would compete with it).
   */
  variant?: "block" | "monoline"
}

/*
 * Mark glyph: dev brackets `< >` — the universal symbol for "code", drawn
 * as two confident chevrons facing each other. The empty space between them
 * is the design space (where the wordmark visually "lives").
 *
 * Geometry on a 64u canvas:
 *   - Left chevron points to the inside (apex at x=18, y=32)
 *   - Right chevron mirrors across x=32 (apex at x=46, y=32)
 *   - Both span y=18 → y=46 (28u tall, 14u of vertical breathing room above and below)
 *   - Stroke 8u with round caps and round joins keeps the corners chunky-soft
 *     instead of sharp — modern, developer-friendly, but premium.
 *   - Inner edges sit 6u apart at the apex line, leaving negative space that
 *     reads as a code-block payload.
 */
const MARK_BRACKET_STROKE = 8
const MARK_LEFT_BRACKET = "M 28 18 L 18 32 L 28 46"
const MARK_RIGHT_BRACKET = "M 36 18 L 46 32 L 36 46"

export function BrandMark({ gradientId, variant = "block", ...props }: BrandMarkProps) {
  // useId() returns the same id during SSR and the first client render, so the
  // gradient `<linearGradient id>` and the matching `fill="url(#id)"` stay in
  // sync across hydration. A module-level counter would not, because the order
  // of component renders can differ between server and client.
  const reactId = useId()
  const id = gradientId ?? `brand-grad-${reactId.replace(/:/g, "")}`
  const highlightId = `${id}-highlight`
  const renderBrackets = (color: string) => (
    <>
      <path
        d={MARK_LEFT_BRACKET}
        stroke={color}
        strokeWidth={MARK_BRACKET_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d={MARK_RIGHT_BRACKET}
        stroke={color}
        strokeWidth={MARK_BRACKET_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  )

  if (variant === "monoline") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        role="img"
        aria-label="carrillo"
        {...props}
      >
        <defs>
          <linearGradient id={id} x1="10" y1="10" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={GRADIENT_FROM} />
            <stop offset="100%" stopColor={GRADIENT_TO} />
          </linearGradient>
        </defs>
        {renderBrackets(`url(#${id})`)}
      </svg>
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="carrillo"
      {...props}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={GRADIENT_FROM} />
          <stop offset="100%" stopColor={GRADIENT_TO} />
        </linearGradient>
        <linearGradient id={highlightId} x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="64" height="64" rx="14" ry="14" fill={`url(#${id})`} />
      <rect x="0" y="0" width="64" height="64" rx="14" ry="14" fill={`url(#${highlightId})`} />
      {renderBrackets("#ffffff")}
    </svg>
  )
}

type BrandWordmarkProps = {
  /** Tailwind class names applied to the outer flex container. */
  className?: string
  /** Mark height (px). Text scales relatively. */
  size?: number
  /** Tailwind class for the text color. Defaults to white. */
  textClassName?: string
  /** Render the isotype to the left of the wordmark (defaults to true).
   *  Set to false in surfaces where the wordmark stands alone (e.g. site header). */
  showMark?: boolean
}

/**
 * Logotype: isotype mark + "carrillo" with an `.app` pill badge anchored to
 * the final "o". The badge sits as a notification-style pill at the upper-right
 * of the "o", partially overlapping — modern app-icon language that ties the
 * domain to the wordmark without bolting on a separate text element.
 */
export function BrandWordmark({
  className = "",
  size = 28,
  textClassName = "text-white",
  showMark = true,
}: BrandWordmarkProps) {
  const fontSize = Math.round(size * 0.85)
  const badgeFontSize = Math.max(9, Math.round(fontSize * 0.36))
  const badgePadY = Math.max(1, Math.round(badgeFontSize * 0.22))
  const badgePadX = Math.round(badgeFontSize * 0.65)
  // Notification-badge offset: pull the badge up and outward from the "o" so
  // it sits like a sticker on the upper-right shoulder of the glyph.
  const badgeTop = -Math.round(fontSize * 0.32)
  const badgeRight = -Math.round(fontSize * 0.5)
  return (
    <div
      className={`inline-flex items-center gap-2.5 ${className}`}
      style={{ height: size }}
    >
      {showMark && <BrandMark style={{ width: size, height: size, flexShrink: 0 }} />}
      <span
        className={`font-bold tracking-tight leading-none ${textClassName}`}
        style={{ fontSize, letterSpacing: "-0.025em", paddingRight: -badgeRight + badgePadX }}
      >
        carrill
        <span className="relative inline-block">
          o
          <span
            aria-hidden="true"
            className="absolute font-semibold leading-none rounded-full text-white whitespace-nowrap"
            style={{
              top: badgeTop,
              right: badgeRight,
              fontSize: badgeFontSize,
              padding: `${badgePadY}px ${badgePadX}px`,
              background: `linear-gradient(135deg, ${GRADIENT_FROM} 0%, ${GRADIENT_TO} 100%)`,
              letterSpacing: "0.04em",
              boxShadow: "0 2px 8px rgba(37, 99, 235, 0.35)",
            }}
          >
            app
          </span>
        </span>
        <span className="sr-only">.app</span>
      </span>
    </div>
  )
}
