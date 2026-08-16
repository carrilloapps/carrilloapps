"use client"

import { motion, AnimatePresence } from "@/lib/motion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

/**
 * Loading, in the ledger's own language.
 *
 * The previous system was a "tech spinner": a rocket icon bobbing inside two
 * blurred aurora layers and an orbital ring, over gradient skeletons. Nothing
 * about that belongs to a document — it was the loudest surviving piece of the
 * old world, and it appeared on every route transition.
 *
 * A ledger shows pending work the way paper does: the row exists, ruled and
 * empty, and a mark travels across it until the figure lands. So loading here
 * is a hairline that fills, a mono label, and skeleton rows that keep the exact
 * shape of the entries they stand in for. No spin, no glow, no icon.
 */

interface UnifiedLoadingProps {
  variant:
    | "page" // Full page with header/footer
    | "overlay" // Full screen overlay
    | "spinner" // Inline indicator
    | "card" // Single entry skeleton
    | "grid" // Several entry skeletons
    | "repositories" // Repository entries
    | "form" // Form skeleton
    | "hero" // Masthead skeleton

  count?: number
  showPagination?: boolean
  title?: string
  description?: string
  className?: string
  isVisible?: boolean
}

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                */
/* -------------------------------------------------------------------------- */

/**
 * The travelling rule: an indeterminate progress mark that sweeps a hairline.
 * This is the world's only loading motion, reused at every size.
 */
function TravellingRule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-px w-full overflow-hidden bg-rule ${className}`}
      role="presentation"
    >
      <motion.span
        className="absolute inset-y-0 block w-1/3 bg-stamp"
        animate={{ x: ["-100%", "300%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

/** A cell awaiting its value. Same footprint as the content it replaces. */
function PendingCell({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-rule/60 ${className}`} aria-hidden="true" />
}

/** One skeleton entry, shaped like a real ledger row. */
function PendingRow() {
  return (
    <li className="grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-3 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)_7rem] md:items-center">
      <div className="min-w-0 space-y-2">
        <PendingCell className="h-5 w-48" />
        <PendingCell className="h-3.5 w-full max-w-[42ch]" />
      </div>
      <PendingCell className="col-span-2 h-11 w-full md:col-span-1" />
      <div className="flex flex-col items-end gap-1.5">
        <PendingCell className="h-6 w-14" />
        <PendingCell className="h-2.5 w-20" />
      </div>
    </li>
  )
}

/** The label that names what is pending, in the column-header voice. */
function PendingLabel({ title, description }: { title?: string; description?: string }) {
  return (
    <div className="space-y-2 text-center">
      <p
        className="font-mono text-[11px] tracking-[0.14em] text-paper-dim uppercase"
        role="status"
        aria-live="polite"
      >
        {title ?? "Cargando"}
      </p>
      {description ? <p className="font-sans text-sm text-paper-faint">{description}</p> : null}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Variants                                                                  */
/* -------------------------------------------------------------------------- */

export function UnifiedLoading({
  variant,
  count = 6,
  title,
  description,
  className = "",
  isVisible = true,
}: UnifiedLoadingProps) {
  if (variant === "overlay") {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink ${className}`}
            role="status"
            aria-live="polite"
            aria-label={title ?? "Cargando"}
          >
            <div className="w-full max-w-sm px-8">
              <TravellingRule />
              <div className="mt-5">
                <PendingLabel title={title} description={description} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  if (variant === "spinner") {
    return (
      <span
        className={`inline-flex items-center gap-2.5 ${className}`}
        role="status"
        aria-live="polite"
      >
        <span className="relative block h-px w-10 overflow-hidden bg-rule" aria-hidden="true">
          <motion.span
            className="absolute inset-y-0 block w-1/3 bg-stamp"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase">
          {title ?? "Cargando"}
        </span>
      </span>
    )
  }

  if (variant === "page") {
    return (
      <div className={`relative min-h-screen text-paper ${className}`}>
        <SiteHeader />
        <main className="relative z-10 container mx-auto px-4 py-16" id="main-content">
          <TravellingRule />
          <div className="mt-6 space-y-3">
            <PendingCell className="h-14 w-2/3 max-w-[28ch]" />
            <PendingCell className="h-4 w-1/2 max-w-[48ch]" />
          </div>
          <ul className="mt-12 divide-y divide-rule border-t border-rule">
            {Array.from({ length: 3 }).map((_, i) => (
              <PendingRow key={i} />
            ))}
          </ul>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (variant === "hero") {
    return (
      <div className={`container mx-auto px-4 ${className}`}>
        <PendingCell className="h-[clamp(3rem,9vw,7rem)] w-full max-w-[16ch]" />
        <div className="mt-8 grid grid-cols-2 gap-px border-y border-rule md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2 py-5">
              <PendingCell className="h-2.5 w-16" />
              <PendingCell className="h-5 w-28" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === "form") {
    return (
      <div className={`space-y-6 ${className}`}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <PendingCell className="h-3 w-24" />
            <PendingCell className="h-11 w-full" />
          </div>
        ))}
        <PendingCell className="h-12 w-40" />
      </div>
    )
  }

  // card · grid · repositories — all entry lists at different lengths.
  const rows = variant === "card" ? 1 : count

  return (
    <div className={className}>
      <ul className="divide-y divide-rule border-t border-rule" aria-hidden="true">
        {Array.from({ length: rows }).map((_, i) => (
          <PendingRow key={i} />
        ))}
      </ul>
      <span className="sr-only" role="status" aria-live="polite">
        {title ?? "Cargando"}
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Named variants — unchanged API, 30+ call sites depend on these            */
/* -------------------------------------------------------------------------- */

export const PageLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading variant="page" {...props} />
)

export const OverlayLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading variant="overlay" {...props} />
)

export const SpinnerLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading variant="spinner" {...props} />
)

export const CardLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading variant="card" {...props} />
)

export const GridLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading variant="grid" {...props} />
)

export const RepositoriesLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading variant="repositories" {...props} />
)

export const FormLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading variant="form" {...props} />
)

export const HeroLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading variant="hero" {...props} />
)
