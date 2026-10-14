import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp",
  {
    variants: {
      variant: {
        /** The stamp, filled. Ink on stamp — paper on stamp is 2.30:1. */
        default: "border-transparent bg-stamp text-ink hover:bg-stamp/85",
        secondary: "border-rule bg-field text-paper-dim hover:border-rule-strong",
        destructive: "border-transparent bg-stamp text-ink hover:bg-stamp/85",
        /** Information, a link that leaves, a count. */
        support: "border-support/35 bg-support/10 text-support",
        /** Reconciled, shipped, closed. */
        settled: "border-settled/35 bg-settled/10 text-settled",
        /** A label with a rule around it and nothing else. */
        outline: "border-rule text-paper-dim",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
