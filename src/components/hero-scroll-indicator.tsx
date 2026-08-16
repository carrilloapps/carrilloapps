"use client"

import { useEffect, useState } from "react"

/**
 * Pinned to the bottom of the viewport while scroll is at the top of the
 * page. Fades out the moment you start scrolling. Decoupled from the hero
 * section's height so it never falls below the fold on tall content / short
 * viewports.
 */
export function HeroScrollIndicator() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let ticking = false
    const update = () => {
      // Hide once the user has scrolled past 10% of the viewport.
      const threshold = window.innerHeight * 0.1
      setVisible(window.scrollY < threshold)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`pointer-events-none fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-500 md:bottom-8 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <span className="text-[10px] font-medium tracking-[0.3em] text-zinc-500 uppercase">
        scroll
      </span>
      <div className="flex h-9 w-5 justify-center rounded-full border border-zinc-600 pt-1.5">
        <div className="h-2 w-0.5 animate-bounce rounded-full bg-zinc-400" />
      </div>
    </div>
  )
}
