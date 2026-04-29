"use client"

import Link from "next/link"
import { motion } from "@/lib/motion"
import { memo } from "react"

import { BrandWordmark } from "@/components/brand-mark"

interface LogoProps {
  className?: string
  linkClassName?: string
  href?: string
  animationLevel?: "none" | "subtle" | "medium" | "playful"
  /** Mark height in px. Wordmark text scales relative to it. */
  size?: number
  /** Tailwind class for the wordmark text. */
  textClassName?: string
  /** Render the isotype mark next to the wordmark. Defaults to true. */
  showMark?: boolean
  /** @deprecated Kept for backwards compatibility — both variants now render
   *  the same inline SVG + text wordmark for crisp rendering at every size. */
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

export const Logo = memo(function Logo({
  className = "",
  linkClassName = "",
  textClassName = "text-white",
  href = "/",
  animationLevel = "medium",
  size = 32,
  showMark = true,
}: LogoProps) {
  const inner = (
    <BrandWordmark size={size} textClassName={textClassName} showMark={showMark} />
  )

  if (animationLevel === "none") {
    return (
      <div className={className}>
        <Link
          href={href}
          className={`${linkClassName} inline-flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black rounded-md`}
          aria-label="Ir a la página de inicio — carrillo.app"
        >
          {inner}
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ y: -6 }}
      animate={{ y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={href}
        className={`${linkClassName} inline-flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black rounded-md`}
        aria-label="Ir a la página de inicio — carrillo.app"
      >
        {inner}
      </Link>
    </motion.div>
  )
})
