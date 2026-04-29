"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Decorative SVG variants — all use the brand gradient and stay subtle.
 * Pick one per section to give each its own "anchor" without screaming.
 */
type Variant = "brackets" | "grid" | "rings" | "diagonals"

interface ParallaxBackdropProps {
  variant?: Variant
  /** Where the artwork sits inside the section. */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center"
  /** Scroll multiplier — higher means stronger parallax. 0 disables motion. */
  speed?: number
  /** Tailwind opacity utility (e.g. "opacity-[0.06]"). */
  opacityClass?: string
}

/**
 * Lightweight scroll-driven parallax decoration.
 *
 * Subscribes to the document scroll once and translates the wrapper based on
 * the element's position relative to the viewport — no IntersectionObserver,
 * no ResizeObserver, no per-frame state updates beyond a transform write.
 * Pauses for `prefers-reduced-motion`.
 */
export function ParallaxBackdrop({
  variant = "brackets",
  position = "top-right",
  speed = 0.18,
  opacityClass = "opacity-[0.07]",
}: ParallaxBackdropProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  // Read once via useSyncExternalStore-style helpers wired through a ref so
  // updating motion preference does not require setState inside an effect.
  const reduceMotionRef = useRef(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    reduceMotionRef.current = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      reduceMotionRef.current = e.matches
      setReduceMotion(e.matches)
    }
    mq.addEventListener("change", handler)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduceMotion(mq.matches)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const node = wrapperRef.current
    if (!node) return

    let ticking = false
    const update = () => {
      const rect = node.getBoundingClientRect()
      const viewportCentre = window.innerHeight / 2
      const sectionCentre = rect.top + rect.height / 2
      const delta = sectionCentre - viewportCentre
      // Translate inversely to scroll direction so the artwork drifts as the
      // section enters / exits the viewport.
      node.style.transform = `translate3d(0, ${(-delta * speed).toFixed(1)}px, 0)`
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
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [reduceMotion, speed])

  return (
    <div
      ref={wrapperRef}
      className={`pointer-events-none absolute z-0 ${opacityClass} ${positionClass(position)}`}
      aria-hidden="true"
    >
      <Artwork variant={variant} />
    </div>
  )
}

function positionClass(p: NonNullable<ParallaxBackdropProps["position"]>) {
  switch (p) {
    case "top-right":
      return "top-0 right-0 -translate-y-1/4 translate-x-1/4"
    case "top-left":
      return "top-0 left-0 -translate-y-1/4 -translate-x-1/4"
    case "bottom-right":
      return "bottom-0 right-0 translate-y-1/4 translate-x-1/4"
    case "bottom-left":
      return "bottom-0 left-0 translate-y-1/4 -translate-x-1/4"
    default:
      return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  }
}

function Artwork({ variant }: { variant: Variant }) {
  switch (variant) {
    case "brackets":
      return <BracketsArt />
    case "grid":
      return <GridArt />
    case "rings":
      return <RingsArt />
    case "diagonals":
      return <DiagonalsArt />
  }
}

function BracketsArt() {
  return (
    <svg width="640" height="640" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pb-brackets" x1="0" y1="0" x2="640" y2="640" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>
      <path d="M 280 160 L 160 320 L 280 480" stroke="url(#pb-brackets)" strokeWidth="60" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M 360 160 L 480 320 L 360 480" stroke="url(#pb-brackets)" strokeWidth="60" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function GridArt() {
  return (
    <svg width="720" height="720" viewBox="0 0 720 720" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pb-grid" x1="0" y1="0" x2="720" y2="720" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`h-${i}`} x1="0" y1={i * 60} x2="720" y2={i * 60} stroke="url(#pb-grid)" strokeWidth="1" />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`v-${i}`} x1={i * 60} y1="0" x2={i * 60} y2="720" stroke="url(#pb-grid)" strokeWidth="1" />
      ))}
    </svg>
  )
}

function RingsArt() {
  return (
    <svg width="640" height="640" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pb-rings" x1="0" y1="0" x2="640" y2="640" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>
      {[80, 160, 240, 320].map((r) => (
        <circle key={r} cx="320" cy="320" r={r} stroke="url(#pb-rings)" strokeWidth="1.5" fill="none" />
      ))}
    </svg>
  )
}

function DiagonalsArt() {
  return (
    <svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pb-diag" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={i} x1={-200 + i * 80} y1="0" x2={-200 + i * 80 + 600} y2="600" stroke="url(#pb-diag)" strokeWidth="1.5" />
      ))}
    </svg>
  )
}
