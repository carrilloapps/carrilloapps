import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * The ledger's column label — the small mono, uppercase, letter-spaced text
 * that names what a column or a block holds.
 *
 * It is the most repeated thing in this codebase: 47 hand-written copies of
 * the same four or five class strings across 15 files, which had already
 * drifted into four different size/tracking pairs. The variants below are not
 * a taxonomy invented for the occasion — they are exactly the combinations
 * that existed, counted:
 *
 *   10px / 0.16em  33 uses      11px / 0.16em   5 uses
 *   11px / 0.14em  15 uses      10px / 0.14em   5 uses
 *
 * so `size` and `tracking` are separate knobs rather than one `size` that
 * silently changes both. Tone is `faint` almost everywhere; `stamp` marks a
 * label that is itself the signal, and `dim` lifts one that sits on a busier
 * surface.
 *
 * Not to be confused with a badge: an eyebrow is type, never a pill. The hero
 * mark with a border and a background is `Badge`.
 */
const eyebrowVariants = cva("font-mono uppercase", {
  variants: {
    size: {
      sm: "text-[10px]",
      md: "text-[11px]",
    },
    tracking: {
      wide: "tracking-[0.14em]",
      wider: "tracking-[0.16em]",
    },
    tone: {
      faint: "text-paper-faint",
      dim: "text-paper-dim",
      stamp: "text-stamp-text",
      /** Inherit — for a label inside a control that owns its own colour. */
      inherit: "",
    },
    /** Figures in the label align down the page like every other number. */
    numeric: {
      true: "tabular-nums",
      false: "",
    },
  },
  defaultVariants: {
    size: "sm",
    tracking: "wider",
    tone: "faint",
    numeric: false,
  },
})

export interface EyebrowProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">, VariantProps<typeof eyebrowVariants> {
  /** Defaults to `span`; use `p` when the label is a standalone line. */
  as?: "span" | "p" | "dt" | "div"
}

export function Eyebrow({
  as: Tag = "span",
  size,
  tracking,
  tone,
  numeric,
  className,
  ...props
}: EyebrowProps) {
  return (
    <Tag className={cn(eyebrowVariants({ size, tracking, tone, numeric }), className)} {...props} />
  )
}

export { eyebrowVariants }
