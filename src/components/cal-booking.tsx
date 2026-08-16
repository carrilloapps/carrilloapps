"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"

import { trackCTAClick } from "@/lib/analytics"

/**
 * Cal.com booking, themed as part of the ledger and loaded only when wanted.
 *
 * The scheduling link is `cal.com/carrilloapps/asesorias`. Cal's loader is a
 * third-party script that sets a third-party cookie, so it must not run on
 * every page view just because a header button exists: the popup initialises
 * Cal on first interaction (pointer or focus), and the inline calendar mounts
 * it when the booking page actually renders one.
 */

export const CAL_LINK = "carrilloapps/asesorias"
const NAMESPACE = "asesorias"

/** Palette handed to Cal so its iframe matches the page. */
const CAL_UI = {
  theme: "dark" as const,
  cssVarsPerTheme: {
    dark: {
      "cal-bg": "#0b0c0e",
      "cal-bg-emphasis": "#101216",
      "cal-bg-subtle": "#101216",
      "cal-border": "#2a2d33",
      "cal-border-subtle": "#2a2d33",
      "cal-border-emphasis": "#3d424a",
      "cal-text": "#e8e6e1",
      "cal-text-emphasis": "#e8e6e1",
      "cal-text-subtle": "#a2a6ad",
      "cal-brand": "#c4362f",
      "cal-brand-emphasis": "#e0574e",
      "cal-brand-text": "#e8e6e1",
    },
    light: {},
  },
  /*
    Cal's own event header — avatar, title, "60m", the timezone picker — repeats
    what the appointment slip on the page already states, in Cal's typography
    rather than this one's. Hiding it leaves the embed doing the one thing only
    it can do: show real availability.
  */
  hideEventTypeDetails: true,
  layout: "month_view" as const,
}

/** Boots Cal once per page and applies the theme. Safe to call repeatedly. */
async function initCal() {
  const cal = await getCalApi({ namespace: NAMESPACE })
  cal("ui", CAL_UI)
  return cal
}

interface CalPopupButtonProps {
  children: React.ReactNode
  className?: string
  /** Analytics location, e.g. "header-desktop". */
  source: string
  "aria-label"?: string
}

/**
 * A button that opens the booking calendar over the current page.
 *
 * Cal is not loaded until the visitor shows intent — the first pointer-enter,
 * touch or keyboard focus warms it, and the click opens it. A reader who never
 * goes near the button never pays for the script, the connection or the cookie.
 */
export function CalPopupButton({ children, className, source, ...rest }: CalPopupButtonProps) {
  const warmed = useRef(false)

  const warm = useCallback(() => {
    if (warmed.current) return
    warmed.current = true
    void initCal()
  }, [])

  const open = useCallback(async () => {
    trackCTAClick("Agéndame", "primary", source)
    const cal = await initCal()
    cal("modal", { calLink: CAL_LINK, config: { layout: "month_view", theme: "dark" } })
  }, [source])

  return (
    <button
      type="button"
      onPointerEnter={warm}
      onTouchStart={warm}
      onFocus={warm}
      onClick={open}
      className={className}
      {...rest}
    >
      {children}
    </button>
  )
}

/** The full calendar, for the /agendamiento route. */
export function CalInline({ className = "" }: { className?: string }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    void initCal().then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    /*
      The reserved height applies only while Cal boots. Keeping it afterwards
      left ~110px of empty ink under the calendar, because the embed reports its
      own height (570px for a month view) and never grows to fill a taller box.
    */
    <div
      className={`relative border border-rule bg-ink-raised ${className}`}
      style={ready ? undefined : { minHeight: 640 }}
    >
      {!ready ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="inline-flex items-center gap-2.5" role="status" aria-live="polite">
            <span className="relative block h-px w-10 overflow-hidden bg-rule" aria-hidden="true">
              <span className="absolute inset-y-0 block w-1/3 animate-pulse bg-stamp" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase">
              Cargando calendario
            </span>
          </span>
        </div>
      ) : null}
      {/*
        No `overflow: scroll` and no fixed height: the embed reports its own
        size and grows the container. Forcing 640px with an inner scrollbar put
        a second scroll region inside the page, so picking a slot near the
        bottom of the month meant scrolling a box inside a box.
      */}
      <Cal
        namespace={NAMESPACE}
        calLink={CAL_LINK}
        style={{ width: "100%", height: "100%" }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </div>
  )
}
