import type { ComponentProps, ReactNode } from "react"

import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { cn } from "@/lib/utils"

/**
 * Single source of truth for section vertical rhythm. Every indexed page should
 * compose its sections from <Section> instead of hand-rolling `py-*`/`space-y-*`
 * so spacing stays consistent across the site (desktop AND mobile) — that ad-hoc
 * per-section padding was the root of the "random spacing" feel.
 *
 * `spacing` is the only knob; `align` on the header gives editorial variation.
 */
export type SectionSpacing = "default" | "compact" | "spacious" | "hero"

/*
  Top-only padding, deliberately.

  With `py-*` every boundary between two sections carried two paddings: a
  `pb-16 md:pb-24` closing one section and a `py-12 md:py-16` opening the next
  measured 160px of nothing on a 1440px screen — the single largest source of
  dead space on the site. One section owns the gap above it and nothing below,
  so a boundary is one value, not the sum of two. The last section on a page
  adds its own bottom padding before the footer.
*/
const SPACING: Record<SectionSpacing, string> = {
  // First section under an opening entry — the entry already left room.
  hero: "pt-6 md:pt-8",
  compact: "pt-8 md:pt-12",
  default: "pt-10 md:pt-16",
  spacious: "pt-12 md:pt-20",
}

interface SectionProps {
  children: ReactNode
  /** Standardized vertical rhythm — the single spacing knob. */
  spacing?: SectionSpacing
  /** Optional standardized header (eyebrow + title + description + align). */
  header?: ComponentProps<typeof SectionHeader>
  id?: string
  /** Extra classes on the <section> (e.g. background tweaks). */
  className?: string
  /** Extra classes on the inner container (e.g. max-width override). */
  containerClassName?: string
}

export function Section({
  children,
  spacing = "default",
  header,
  id,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <AnimatedSection
      id={id}
      role="region"
      aria-labelledby={header?.headingId}
      className={cn(SPACING[spacing], className)}
    >
      <div className={cn("relative z-10 container mx-auto px-4", containerClassName)}>
        {header ? <SectionHeader {...header} /> : null}
        {children}
      </div>
    </AnimatedSection>
  )
}
