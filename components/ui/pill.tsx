import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Canonical pill/badge used across the site for eyebrows, period/meta chips and
 * tags. Replaces the dozens of ad-hoc `<span className="...rounded-full...">`
 * that drifted apart (each section hand-rolled its own), giving one consistent
 * line. Pick a `variant` + `size`; compose an icon or dot as children.
 */
const pillVariants = cva(
  "inline-flex w-fit items-center gap-2 rounded-full border font-medium transition-colors whitespace-nowrap",
  {
    variants: {
      variant: {
        /** Section eyebrows / brand accents. */
        eyebrow: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 uppercase tracking-[0.18em]",
        /** Secondary meta (e.g. a period "2024 — Presente"). */
        accent: "bg-blue-500/10 border-blue-500/30 text-blue-300 uppercase tracking-[0.14em]",
        /** Neutral uppercase label. */
        neutral: "bg-white/5 border-white/10 text-zinc-300 uppercase tracking-[0.14em]",
        /** Tech tags / soft chips (no uppercase). */
        tag: "bg-white/[0.04] border-white/10 text-zinc-300",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[11px]",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "tag",
      size: "md",
    },
  }
)

export interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {}

export function Pill({ className, variant, size, ...props }: PillProps) {
  return <span className={cn(pillVariants({ variant, size }), className)} {...props} />
}

export { pillVariants }
