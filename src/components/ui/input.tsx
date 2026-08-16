import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full text-base transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        /**
         * Ledger — the field as this system draws one: square, a hairline rule,
         * raised ink, and 48px tall so it meets the touch target the rest of
         * the site holds to. It is the default because every form on this site
         * is on the ledger; `default` below was shadcn's light-surface field at
         * 40px, which was neither.
         */
        ledger:
          "min-h-[48px] border border-rule bg-field px-3 py-2.5 font-sans text-paper transition-colors placeholder:text-paper-faint hover:border-rule-strong",
        /** @deprecated shadcn classic, light surface — not this design. */
        default: "h-10 rounded-md border border-input bg-background px-3 py-2",
        /**
         * Plate — superficie mate con una regla hairline, mismo lenguaje
         * que `surface-card`. Usar en formularios sobre superficies oscuras
         * (footer, contact form, modales) para que los inputs se sientan
         * parte del sistema de glass cards y no como objetos extraños.
         */
        glass:
          "h-11 border border-rule bg-ink-raised px-3.5 py-2.5 text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] placeholder:text-zinc-500 hover:border-white/20 focus-visible:border-stamp focus-visible:bg-white/[0.05]",
      },
    },
    defaultVariants: {
      variant: "ledger",
    },
  },
)

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input, inputVariants }
