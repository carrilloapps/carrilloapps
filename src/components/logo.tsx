"use client"

import Link from "next/link"
import { memo } from "react"

import { BrandWordmark } from "@/components/brand-mark"

interface LogoProps {
  className?: string
  linkClassName?: string
  href?: string
  /** @deprecated The ledger's letterhead does not bob on hover. */
  animationLevel?: "none" | "subtle" | "medium" | "playful"
  /** Mark height in px. Wordmark text scales relative to it. */
  size?: number
  /** Tailwind class for the wordmark text. */
  textClassName?: string
  /** Render the identification cell next to the wordmark. Defaults to true. */
  showMark?: boolean
  /**
   * Show only the cell, no wordmark. Used on the home page, where the document
   * header already sets the name in 88px type — repeating it in the bar is the
   * same fact twice in one viewport.
   */
  markOnly?: boolean
  /** @deprecated Kept so existing call sites compile. */
  variant?: "text" | "image"
  /** @deprecated kept so existing call sites compile — no longer used. */
  imageSrc?: string
  /** @deprecated kept so existing call sites compile — no longer used. */
  imageAlt?: string
  /** @deprecated kept so existing call sites compile — no longer used. */
  imageWidth?: number
  /** @deprecated kept so existing call sites compile — no longer used. */
  imageHeight?: number
  /** @deprecated kept so existing call sites compile — no longer used. */
  showDot?: boolean
  /** @deprecated kept so existing call sites compile — no longer used. */
  accentClassName?: string
}

/**
 * The letterhead, linked home.
 *
 * The mark used to lift on hover and drop in on mount. A letterhead is printed
 * on the sheet: it does not move. The hover state now lives where it belongs —
 * the stamp rule brightening — and the focus ring is the page's own.
 */
export const Logo = memo(function Logo({
  className = "",
  linkClassName = "",
  textClassName = "text-paper",
  href = "/",
  size = 32,
  showMark = true,
  markOnly = false,
}: LogoProps) {
  return (
    <div className={className}>
      <Link
        href={href}
        className={`${linkClassName} inline-flex items-center transition-opacity hover:opacity-80 focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp`}
      >
        <BrandWordmark
          size={size}
          textClassName={textClassName}
          showMark={showMark}
          markOnly={markOnly}
        />
      </Link>
    </div>
  )
})
