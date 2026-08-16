"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"
import { ChevronDown, Search } from "lucide-react"

/** Above this many options, a picker must offer a filter. */
const SEARCH_THRESHOLD = 10

export interface ComboOption {
  /** The stored value. */
  code: string
  /** Optional trailing detail — a dial code, a count, a version. */
  dial?: string
  /** What the reader looks for. */
  name: string
}

/** Kept so the phone field's existing import keeps working. */
export type CountryOption = ComboOption

interface CountrySelectProps {
  value: string
  options: ComboOption[]
  onChange: (code: string) => void
  disabled?: boolean
  /** Rendered as the accessible name of the control. */
  label: string
  /**
   * Optional visual for each row and for the trigger. The country picker passes
   * a flag; a picker of programming languages passes nothing, and the rows fall
   * back to their name alone. Without this the component would have had to be
   * copied to be reused, and the copy would have asked for `/flags/TypeScript.svg`.
   */
  renderIcon?: (code: string) => React.ReactNode
  /** Trigger width. Defaults to the phone field's country column. */
  triggerClassName?: string
  /** Shown on the trigger. Defaults to the option's `dial`, then its `name`. */
  triggerLabel?: (option: ComboOption) => React.ReactNode
}

/**
 * A country picker that can show a flag.
 *
 * The field started with a native `<select>`, which is the better control in
 * almost every way — the system wheel on phones, type-to-jump on desktop, no
 * ARIA to get wrong. It has one hard limit: an `<option>` renders text and
 * nothing else. Flags there mean regional-indicator emoji, and those are tofu
 * on any machine without an emoji font and bare letters on Windows. A native
 * select also sizes itself to its widest option, so adding country names blew
 * the control across the whole field.
 *
 * So this is the APG combobox-with-listbox-popup pattern, built to carry an
 * image: the button shows flag, code and dial at a fixed width, and the popup
 * filters by name, code or dial — which 245 entries need and a native select
 * never offered. Flags are SVGs under `public/flags`, fetched only for the rows
 * actually on screen; the alternative was a 6.3 MB component package in the
 * bundle for the same pictures.
 */
export function CountrySelect({
  value,
  options,
  onChange,
  disabled,
  label,
  renderIcon = (code) => <Flag code={code} />,
  triggerClassName = "w-[7.5rem]",
  triggerLabel = (option) => option.dial || option.name,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)

  const baseId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const selected = options.find((o) => o.code === value) ?? options[0]

  /**
   * Ten is the line. Below it a list is scanned; above it, it is searched — so
   * any picker with more options than that gets a filter, and this one has 245.
   */
  const searchable = options.length > SEARCH_THRESHOLD

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.code.toLowerCase().includes(q) ||
        (o.dial?.includes(q.replace(/^\+?/, "+")) ?? false),
    )
  }, [options, query])

  // Opening focuses the filter and puts the active row on the current country.
  useEffect(() => {
    if (!open) return
    const i = filtered.findIndex((o) => o.code === value)
    setActiveIndex(i >= 0 ? i : 0)
    ;(inputRef.current ?? listRef.current)?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Keep the active row in view as the arrows walk past the fold.
  useEffect(() => {
    if (!open) return
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" })
  }, [activeIndex, open])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  const commit = (code: string) => {
    onChange(code)
    setOpen(false)
    setQuery("")
    buttonRef.current?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault()
      setOpen(false)
      setQuery("")
      buttonRef.current?.focus()
      return
    }
    if (e.key === "Enter") {
      e.preventDefault()
      const option = filtered[activeIndex]
      if (option) commit(option.code)
      return
    }
    const last = filtered.length - 1
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => (i >= last ? 0 : i + 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => (i <= 0 ? last : i - 1))
    } else if (e.key === "Home") {
      e.preventDefault()
      setActiveIndex(0)
    } else if (e.key === "End") {
      e.preventDefault()
      setActiveIndex(last)
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${baseId}-listbox`}
        aria-label={`${label}: ${selected?.name ?? value}`}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex h-full min-h-[48px] cursor-pointer items-center gap-2 border-rule px-3 font-mono text-[13px] tracking-[0.06em] text-paper-dim transition-colors group-focus-within:border-stamp hover:text-paper focus:outline-none disabled:cursor-not-allowed ${triggerClassName}`}
      >
        {renderIcon?.(selected?.code ?? value)}
        <span className="truncate tabular-nums">{selected ? triggerLabel(selected) : value}</span>
        <ChevronDown
          className={`ml-auto h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          /* The handler lives here and not on the filter: below the search
             threshold there is no filter to hang it on, and the arrows still
             have to walk the list. */
          onKeyDown={onKeyDown}
          className="absolute top-full left-0 z-50 mt-1.5 w-[20rem] max-w-[calc(100vw-2rem)] border border-rule-strong bg-ink shadow-[0_24px_48px_-16px_rgba(0,0,0,0.95)]"
        >
          {searchable ? (
            <div className="flex items-center gap-2.5 border-b border-rule px-3">
              <Search className="h-3.5 w-3.5 shrink-0 text-paper-faint" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                role="searchbox"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActiveIndex(0)
                }}
                onKeyDown={onKeyDown}
                data-bare-field
                placeholder="Buscar país o prefijo"
                aria-label="Buscar país"
                aria-controls={`${baseId}-listbox`}
                aria-activedescendant={
                  filtered[activeIndex] ? `${baseId}-opt-${filtered[activeIndex].code}` : undefined
                }
                className="min-h-[44px] w-full border-0 bg-transparent p-0 font-sans text-sm text-paper placeholder:text-paper-faint focus:border-0 focus:ring-0 focus:outline-none"
              />
            </div>
          ) : null}

          <ul
            ref={listRef}
            id={`${baseId}-listbox`}
            role="listbox"
            aria-label={label}
            tabIndex={searchable ? -1 : 0}
            aria-activedescendant={
              !searchable && filtered[activeIndex]
                ? `${baseId}-opt-${filtered[activeIndex].code}`
                : undefined
            }
            className="max-h-64 overflow-y-auto focus:outline-none"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-6 text-center font-sans text-sm text-paper-faint">
                Sin resultados
              </li>
            ) : (
              filtered.map((option, i) => {
                const isActive = i === activeIndex
                const isSelected = option.code === value
                return (
                  <li
                    key={option.code}
                    id={`${baseId}-opt-${option.code}`}
                    role="option"
                    aria-selected={isSelected}
                    data-index={i}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => commit(option.code)}
                    className={`flex cursor-pointer items-center gap-3 border-b border-rule px-3 py-2.5 text-sm transition-colors last:border-b-0 ${
                      isActive ? "bg-ink-raised text-paper" : "text-paper-dim"
                    }`}
                  >
                    <Flag code={option.code} />
                    <span className="min-w-0 flex-1 truncate font-sans">{option.name}</span>
                    <span className="shrink-0 font-mono text-[12px] text-paper-faint tabular-nums">
                      {option.dial}
                    </span>
                    {isSelected ? (
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-stamp" />
                    ) : null}
                  </li>
                )
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

/**
 * The flag itself. A plain `<img>` on a committed SVG rather than `next/image`:
 * these are 1–3 KB vectors that need no resizing, no format negotiation and no
 * optimisation round-trip, and only the rows on screen ever request one.
 */
function Flag({ code }: { code: string }) {
  return (
    <img
      src={`/flags/${code}.svg`}
      alt=""
      width={20}
      height={14}
      loading="lazy"
      decoding="async"
      className="h-[14px] w-[20px] shrink-0 object-cover"
    />
  )
}
