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

const SPACING: Record<SectionSpacing, string> = {
  // First section under a PageHero — tighter top, normal bottom.
  hero: "pt-6 pb-12 md:pt-8 md:pb-16",
  compact: "py-12 md:py-16",
  default: "py-16 md:py-24",
  spacious: "py-20 md:py-28",
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
      <div className={cn("container mx-auto px-4 relative z-10", containerClassName)}>
        {header ? <SectionHeader {...header} /> : null}
        {children}
      </div>
    </AnimatedSection>
  )
}
