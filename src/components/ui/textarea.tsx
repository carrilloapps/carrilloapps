import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "focus:outline-none2 flex w-full text-base transition-all placeholder:text-muted-foreground focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "min-h-[80px] rounded-md border border-input bg-background px-3 py-2",
        /** Glass — espejo del `<Input variant="glass">`. */
        glass:
          "min-h-[120px] resize-y border border-rule bg-ink-raised px-3.5 py-2.5 text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] placeholder:text-zinc-500 hover:border-white/20 focus-visible:border-stamp focus-visible:bg-white/[0.05]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface TextareaProps
  extends React.ComponentProps<"textarea">, VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea className={cn(textareaVariants({ variant }), className)} ref={ref} {...props} />
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
