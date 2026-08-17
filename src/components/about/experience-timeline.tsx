"use client"

import { useEffect, useId, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

import { EXPERIENCE, type ExperienceEntry } from "@/lib/data/experience"
import { trackButtonClick } from "@/lib/analytics"

/** Oldest first, so the axis runs left to right the way a period does. */
const ENTRIES = [...EXPERIENCE].reverse()

/**
 * How long an entry stays open before the axis moves on.
 *
 * Sized for a skim, not for the full read: the heading and the first line of
 * the description at a comfortable pace. Anyone who wants the rest stops it —
 * which happens on its own the moment they hover, focus or touch the section.
 */
const DWELL_MS = 7000

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
  // Opens on the oldest stop, so the axis is read the way a period runs: left
  // to right, from where the career started. The advance below wraps, so after
  // the present role it comes back round to the beginning.
  const [activeId, setActiveId] = useState(ENTRIES[0]!.id)
  const [userPaused, setUserPaused] = useState(false)
  const [held, setHeld] = useState(false)
  const [inView, setInView] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [reduced, setReduced] = useState(true)
  const baseId = useId()
  const stopRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const listRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const hasScrolled = useRef(false)

  /**
   * The axis only runs when running is the right thing to do: the reader has
   * not stopped it, is not hovering or tabbing through it, the section is on
   * screen, the tab is in the foreground, and the machine has not asked for
   * less motion. Each of those is its own flag — folding the tab's visibility
   * into the hover hold meant coming back to the tab released a hold the
   * pointer still owned.
   */
  const playing = !userPaused && !held && !hidden && inView && !reduced

  // `prefers-reduced-motion` starts pessimistic (`reduced = true`) so nothing
  // moves before the first client render decides. Autoplay is exactly the kind
  // of motion that setting exists to stop.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  // Off screen or in a background tab, advancing is work nobody sees.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const io = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), {
      threshold: 0.4,
    })
    io.observe(el)

    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  // The advance itself. Keyed on `activeId` too, so selecting a stop by hand
  // restarts the dwell instead of cutting it short.
  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => {
      const i = ENTRIES.findIndex((e) => e.id === activeId)
      setActiveId(ENTRIES[(i + 1) % ENTRIES.length]!.id)
    }, DWELL_MS)
    return () => window.clearTimeout(id)
  }, [playing, activeId])

  /**
   * Keep the open stop inside the strip.
   *
   * On phones the axis scrolls horizontally and only two stops fit, so the open
   * stop has to be brought into the strip or the reader sees an entry belonging
   * to neither of the stops in front of them. It matters most as the clock
   * advances past the second stop, and again when the loop wraps back to the
   * first — both move the selection outside the visible window.
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

  /**
   * Step the axis by hand. Manual control never fights the clock: selecting
   * restarts the dwell, so the entry you just opened gets its full turn.
   *
   * Focus deliberately stays on the button that was pressed. Moving it onto the
   * stop — which the arrow keys do, because there focus *is* the selection —
   * painted a focus outline around the stop on every mouse click of these two
   * controls, and took a keyboard user off the control they were still using.
   */
  const step = (delta: number) => {
    const i = (activeIndex + delta + ENTRIES.length) % ENTRIES.length
    select(ENTRIES[i]!)
  }

  return (
    <div
      ref={rootRef}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false)
      }}
    >
      {/*
        Controls above the axis.

        An explicit stop is not a nicety here: content that starts moving on its
        own and runs longer than five seconds has to offer one (WCAG 2.2.2). The
        hover and focus holds below cover the common case — you reach for it, it
        waits — but a reader who simply wants it still needs a control they can
        find, and a touch reader has no hover at all.
      */}
      <div className="mb-6 flex items-center justify-between gap-2 border-b border-rule pb-3 md:gap-6">
        <p className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase tabular-nums">
          {activeIndex + 1} / {ENTRIES.length}
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => step(-1)}
            className="inline-flex h-11 w-11 touch-manipulation items-center justify-center text-paper-faint transition-colors hover:text-paper focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-stamp"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Período anterior</span>
          </button>

          {!reduced && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-pressed={userPaused}
              className="inline-flex h-11 items-center gap-2 px-2 font-mono text-[10px] tracking-[0.14em] text-paper-faint uppercase transition-colors hover:text-paper focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-stamp"
            >
              {userPaused ? (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">{userPaused ? "Reanudar" : "Pausar"}</span>
              <span className="sr-only">
                {userPaused ? "Reanudar el avance automático" : "Detener el avance automático"}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => step(1)}
            className="inline-flex h-11 w-11 touch-manipulation items-center justify-center text-paper-faint transition-colors hover:text-paper focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-stamp"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Período siguiente</span>
          </button>
        </div>
      </div>

      {/* The axis. */}
      <div
        ref={listRef}
        role="tablist"
        aria-label="Trayectoria profesional por período"
        onKeyDown={onKeyDown}
        className="flex snap-x snap-mandatory gap-0 overflow-x-auto lg:-mx-4 lg:grid lg:snap-none lg:overflow-visible lg:px-4"
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
              className="group relative min-w-[11rem] shrink-0 cursor-pointer snap-start border-t-2 pt-4 pr-6 text-left transition-colors focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp lg:min-w-0"
              style={{
                // While the clock runs, the open stop keeps the neutral rule and
                // the stamp arrives as the dwell bar filling over it. Stopped,
                // the whole rule is stamped — the same mark, just already there.
                borderTopColor:
                  selected && !playing ? "var(--ledger-stamp)" : "var(--ledger-rule-strong)",
              }}
            >
              {/* The dwell bar: the entry's remaining turn, drawn on its own
                  rule. Keyed on the entry so the animation restarts per stop. */}
              {selected && playing ? (
                <span
                  key={`${entry.id}-dwell`}
                  aria-hidden="true"
                  className="animate-dwell absolute -top-0.5 right-0 left-0 block h-0.5 bg-stamp"
                  style={{ ["--dwell" as string]: `${DWELL_MS}ms` }}
                />
              ) : null}

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
          <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)]">
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
