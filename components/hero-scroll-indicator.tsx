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
      className={`fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-medium">
        scroll
      </span>
      <div className="w-5 h-9 border border-zinc-600 rounded-full flex justify-center pt-1.5">
        <div className="w-0.5 h-2 bg-zinc-400 rounded-full animate-bounce" />
      </div>
    </div>
  )
}
