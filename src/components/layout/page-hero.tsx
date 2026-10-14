import type { ReactNode } from "react"

import { Eyebrow } from "@/components/ui/eyebrow"
import { cn } from "@/lib/utils"

/**
 * The opening entry of a page.
 *
 * Nine files were writing this by hand — the same `<section>`, the same
 * `clamp()` heading, the same two-column grid — and they had already drifted:
 * some set `role="region"` and some did not, the aside column came in six
 * different widths, and the heading's `max-w` varied per page for no reason
 * anyone recorded.
 *
 * There *was* a `PageHero` before, and it was deleted on 14 October 2026. Worth
 * saying why this one is different, because the first one failed for reasons
 * that are easy to repeat:
 *
 *   - The old one had **zero importers**. It was written from a design that no
 *     page used, then enforced by a rule in the constitution rather than by
 *     being the easiest thing to reach for. This one is extracted *from* the
 *     nine pages that exist, so adopting it is a deletion on their side.
 *   - It took five colour strings (`gradientFrom`, `borderColor`, …). A
 *     component that accepts colour as a string cannot stay consistent. This
 *     one takes no colour at all.
 *
 * The layout is one `lg` grid: lead text in the wide column, optional
 * particulars in the narrow one. Below `lg` the aside stacks under the lead,
 * which is the right order — the facts support the paragraph, they do not
 * precede it.
 */

/** The narrow column's width. These are the widths the pages already used. */
const ASIDE_WIDTH = {
  sm: "lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)]",
  md: "lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]",
  lg: "lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]",
  xl: "lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]",
} as const

/**
 * How many characters the heading is allowed before it wraps. A heading is set
 * to break where its meaning breaks, so this is per page rather than global.
 */
const TITLE_WIDTH = {
  tight: "max-w-[16ch]",
  snug: "max-w-[17ch]",
  default: "max-w-[18ch]",
  roomy: "max-w-[20ch]",
  wide: "max-w-[22ch]",
} as const

/**
 * Two display scales.
 *
 * `display` is the top-level entry of a section of the site. `page` is one step
 * down, for a page that sits *inside* one — a single service under `/servicios`
 * — so the hierarchy between the index and its entries survives at a glance.
 */
const TITLE_SCALE = {
  display: "text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.94]",
  page: "text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.96]",
} as const

interface PageHeroProps {
  /** The column label above the heading. Omit when the heading stands alone. */
  eyebrow?: string
  /**
   * `faint` (default) for a label that names the page. `stamp` for one that
   * reports a state the reader needs to register — `/not-found` and the error
   * boundary use it, and those are the only two places that should.
   */
  eyebrowTone?: "faint" | "stamp"
  title: ReactNode
  /** Anchor for `aria-labelledby`; pass the same id the page's section uses. */
  headingId: string
  titleWidth?: keyof typeof TITLE_WIDTH
  titleScale?: keyof typeof TITLE_SCALE
  /**
   * A ruled row above the heading — where a page carries its own navigation,
   * like the back link and position counter on a service page. It renders on
   * the same strong rule `SectionHeader` uses, so the two read as one system.
   */
  topBar?: ReactNode
  /** The opening paragraphs. */
  children?: ReactNode
  /** The particulars column — usually a `<SpecList>`. */
  aside?: ReactNode
  asideWidth?: keyof typeof ASIDE_WIDTH
  /** Calls to action, on their own ruled row under the entry. */
  actions?: ReactNode
  className?: string
}

export function PageHero({
  eyebrow,
  eyebrowTone = "faint",
  title,
  headingId,
  titleWidth = "default",
  titleScale = "display",
  topBar,
  children,
  aside,
  asideWidth = "md",
  actions,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative w-full pt-6 md:pt-10", className)} aria-labelledby={headingId}>
      <div className="container mx-auto px-4">
        {topBar ? (
          <div className="mb-8 flex items-baseline justify-between gap-6 border-b border-rule-strong pb-2">
            {topBar}
          </div>
        ) : null}

        {eyebrow ? (
          <Eyebrow as="p" size="md" tracking="wider" tone={eyebrowTone}>
            {eyebrow}
          </Eyebrow>
        ) : null}

        <h1
          id={headingId}
          className={cn(
            "font-sans font-semibold tracking-[-0.04em] text-balance text-paper",
            TITLE_SCALE[titleScale],
            TITLE_WIDTH[titleWidth],
            eyebrow && "mt-3",
          )}
        >
          {title}
        </h1>

        {(children || aside) && (
          <div className={cn("mt-8 grid gap-x-14 gap-y-8", aside && ASIDE_WIDTH[asideWidth])}>
            {children ? (
              <div className="max-w-[68ch] space-y-5 font-sans text-base leading-relaxed text-paper-dim md:text-lg">
                {children}
              </div>
            ) : null}
            {aside}
          </div>
        )}

        {actions ? (
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rule-strong pt-5">
            {actions}
          </div>
        ) : null}
      </div>
    </section>
  )
}
