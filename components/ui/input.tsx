import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all",
  {
    variants: {
      variant: {
        /** Default — shadcn classic, light surface. */
        default:
          "h-10 rounded-md border border-input bg-background px-3 py-2 focus-visible:ring-ring",
        /**
         * Glass — superficie translúcida sobre backdrop-blur, mismo lenguaje
         * que `surface-card`. Usar en formularios sobre superficies oscuras
         * (footer, contact form, modales) para que los inputs se sientan
         * parte del sistema de glass cards y no como objetos extraños.
         */
        glass:
          "h-11 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-md px-3.5 py-2.5 text-zinc-100 placeholder:text-zinc-500 hover:border-white/20 focus-visible:border-blue-500/50 focus-visible:bg-white/[0.05] focus-visible:ring-blue-500/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

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
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
