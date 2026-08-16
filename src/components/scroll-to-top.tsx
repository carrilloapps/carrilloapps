"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Scroll reset on route change.
 *
 * It used to depend on `useSearchParams` as well, which made every filter a
 * navigation: typing in the repository search rewrote `?q=` on each keystroke,
 * this fired, and the page smooth-scrolled back to the masthead — so the
 * results could not be read while typing. A query string is state, not a
 * destination; only the pathname resets the reader's position.
 *
 * The hash guard keeps in-page anchors (`/recursos#open-source-heading` from
 * the menu) from being yanked back to the top a frame after they land.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.location.hash) return
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }, [pathname])

  return null
}
