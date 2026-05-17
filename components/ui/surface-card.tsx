import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Canonical card surface used across carrillo.app — slate-tinted glass with a
 * blue/purple hover glow. Use this anywhere you'd reach for a shadcn `<Card>`
 * on dark surfaces; the styling lives in `.surface-card` (globals.css) so it
 * stays consistent across pages.
 *
 * Composition pattern:
 *   <SurfaceCard className="h-full">
 *     <SurfaceCardBody>
 *       …content…
 *     </SurfaceCardBody>
 *   </SurfaceCard>
 *
 * The body wrapper is optional — add it when you want consistent padding /
 * vertical rhythm. For full-bleed children (e.g. an `<Image>` filling the
 * top of the card) skip the body and apply your own padding to text blocks.
 *
 * Pass `interactive` if the card itself is the click target (Link/button) to
 * enable the hover halo without needing a parent `.group`.
 */
type SurfaceCardElement = "div" | "article" | "section" | "li"

interface SurfaceCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as a different tag — defaults to `div`. */
  as?: SurfaceCardElement
  /** Wrap children in a styled body. Skip when content needs full-bleed layout. */
  bodyClassName?: string
}

export const SurfaceCard = React.forwardRef<HTMLElement, SurfaceCardProps>(
  ({ as: Tag = "div", className, children, ...props }, ref) => {
    const Comp = Tag as React.ElementType
    return (
      <Comp
        ref={ref as React.Ref<HTMLElement>}
        className={cn("surface-card", className)}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
SurfaceCard.displayName = "SurfaceCard"

export const SurfaceCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative p-6 space-y-4", className)} {...props} />
))
SurfaceCardBody.displayName = "SurfaceCardBody"

/**
 * Subordinate surface — for chips, contact rows, and other elements that sit
 * INSIDE a `<SurfaceCard>` and need to feel related (same colour family) but
 * visually subordinate (no halo, less alpha). Maps to `.surface-card-subtle`.
 */
export const SubtleSurface = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("surface-card-subtle", className)}
    {...props}
  />
))
SubtleSurface.displayName = "SubtleSurface"
