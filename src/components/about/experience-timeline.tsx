"use client"

import { useEffect, useId, useRef, useState } from "react"

import { EXPERIENCE, type ExperienceEntry } from "@/lib/data/experience"
import { trackButtonClick } from "@/lib/analytics"

/** Oldest first, so the axis runs left to right the way a period does. */
const ENTRIES = [...EXPERIENCE].reverse()

/**
 * The career as a period axis you can move along.
 *
 * The vertical list said everything at once and asked to be scrolled through;
 * three stacked blocks of the same shape is exactly the monotony this redesign
 * exists to break. A ledger states a period horizontally — a ruled axis with
 * marks on it — and only opens the entry you point at.
 *
 * So: the axis carries the years, each stop names the company and the role, and
 * the entry underneath swaps in place. It is an ARIA tablist, which is what this
 * pattern actually is: arrow keys walk the axis, Home and End jump to the ends,
 * and the panel is labelled by its stop. The panel is a live region only in the
 * sense that it re-renders — focus stays on the axis, so a keyboard user keeps
 * moving without being thrown into the detail.
 */
export function ExperienceTimeline() {
  const [activeId, setActiveId] = useState(ENTRIES[ENTRIES.length - 1]!.id)
  const baseId = useId()
  const stopRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const listRef = useRef<HTMLDivElement>(null)
  const hasScrolled = useRef(false)

  /**
   * Keep the open stop inside the strip.
   *
   * On phones the axis scrolls horizontally and only two stops fit. The default
   * entry is the most recent one, which sits at the far right — so the page
   * loaded showing two stops with no mark on either and the open entry below
   * belonging to neither. The strip follows the selection instead.
   *
   * Only the strip moves: this sets `scrollLeft` on the container rather than
   * calling `scrollIntoView`, which would drag the page vertically too.
   */
  useEffect(() => {
    const list = listRef.current
    const tab = stopRefs.current[activeId]
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    list.scrollTo({
      left: tab.offsetLeft - list.offsetLeft,
      // The first run is a layout correction, not a transition — animating it
      // would look like the page drifting on load.
      behavior: hasScrolled.current && !reduced ? "smooth" : "auto",
    })
    hasScrolled.current = true
  }, [activeId])

  const activeIndex = ENTRIES.findIndex((e) => e.id === activeId)
  const active = ENTRIES[activeIndex] ?? ENTRIES[0]!

  const select = (entry: ExperienceEntry) => {
    setActiveId(entry.id)
    trackButtonClick(`Timeline · ${entry.company}`, "about-timeline")
  }

  /** Roving focus along the axis, per the tablist keyboard contract. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = ENTRIES.length - 1
    let next: number | null = null

    if (e.key === "ArrowRight") next = activeIndex >= last ? 0 : activeIndex + 1
    else if (e.key === "ArrowLeft") next = activeIndex <= 0 ? last : activeIndex - 1
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = last

    if (next === null) return
    e.preventDefault()
    const entry = ENTRIES[next]!
    select(entry)
    stopRefs.current[entry.id]?.focus()
  }

  return (
    <div>
      {/* The axis. */}
      <div
        ref={listRef}
        role="tablist"
        aria-label="Trayectoria profesional por período"
        onKeyDown={onKeyDown}
        className="-mx-4 flex snap-x snap-mandatory gap-0 overflow-x-auto px-4 md:mx-0 md:grid md:snap-none md:overflow-visible md:px-0"
        style={{ gridTemplateColumns: `repeat(${ENTRIES.length}, minmax(0, 1fr))` }}
      >
        {ENTRIES.map((entry, i) => {
          const selected = entry.id === activeId
          return (
            <button
              key={entry.id}
              ref={(node) => {
                stopRefs.current[entry.id] = node
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${entry.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${entry.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(entry)}
              className="group relative min-w-[13rem] shrink-0 cursor-pointer snap-start border-t-2 pt-4 pr-6 text-left transition-colors focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp md:min-w-0"
              style={{
                borderTopColor: selected ? "var(--ledger-stamp)" : "var(--ledger-rule-strong)",
              }}
            >
              {/* The mark on the axis. Filled when this is the open entry. */}
              <span
                aria-hidden="true"
                className="absolute -top-[7px] left-0 block h-3 w-3 transition-colors"
                style={{
                  background: selected ? "var(--ledger-stamp)" : "var(--ledger-ink)",
                  border: `2px solid ${selected ? "var(--ledger-stamp)" : "var(--ledger-rule-strong)"}`,
                }}
              />

              <span className="block font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase tabular-nums">
                {entry.period}
              </span>
              <span
                className={`mt-2 block font-sans text-lg leading-tight tracking-[-0.02em] transition-colors md:text-xl ${
                  selected ? "text-paper" : "text-paper-dim group-hover:text-paper"
                }`}
              >
                {entry.company}
              </span>
              <span className="mt-1 block font-mono text-[10px] tracking-[0.12em] text-paper-faint uppercase">
                {entry.role}
              </span>

              {/* Index of the stop, so the axis reads as a sequence on mobile
                  where not every stop is visible at once. */}
              <span className="sr-only">
                Entrada {i + 1} de {ENTRIES.length}
              </span>
            </button>
          )
        })}
      </div>

      {/* The open entry. */}
      <div
        role="tabpanel"
        id={`${baseId}-panel-${active.id}`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        tabIndex={0}
        className="mt-10 focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp"
      >
        {/* Keyed on the entry so the browser treats each as new content and the
            fade replays — one authored moment, not a transition on every child. */}
        <div key={active.id} className="animate-entry">
          <div className="grid gap-x-14 gap-y-8 md:grid-cols-[minmax(0,1fr)_minmax(0,17rem)]">
            <div>
              <h3 className="max-w-[26ch] font-sans text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-paper">
                {active.outcome}
              </h3>
              <p className="mt-5 max-w-[68ch] font-sans text-base leading-relaxed text-paper-dim md:text-lg">
                {active.description}
              </p>
              <p className="mt-6 font-mono text-[11px] tracking-[0.1em] text-paper-faint">
                {active.technologies.join(" · ")}
              </p>
            </div>

            {active.metrics?.length ? (
              <dl className="border-t border-rule-strong">
                {active.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-baseline justify-between gap-4 border-b border-rule py-3"
                  >
                    <dt className="font-mono text-[10px] tracking-[0.14em] text-paper-faint uppercase">
                      {metric.label}
                    </dt>
                    <dd className="font-mono text-2xl leading-none text-paper tabular-nums">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
