import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary hover:text-primary/80",
        /* Primary CTA — a stamped rule. This world has no gradient fills; a
           intensifies on hover. Matches the hero CTA, contact-form submit,
           and any "convert" action across the site. */
        gradient:
          "border border-stamp bg-transparent font-mono text-xs tracking-[0.08em] text-paper uppercase transition-colors hover:bg-stamp hover:text-ink",
        /* Glass — surface-card-style ghost button, blue accent on hover.
           Use for secondary actions inside dark cards. */
        glass:
          "border border-rule bg-transparent text-paper-dim transition-colors hover:border-rule-strong hover:text-paper",
        /* Subtle text link with arrow affordance — replaces the variant=link
           usages scattered across the home. */
        ghostLink: "text-paper-dim underline-offset-4 hover:text-stamp-text",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
