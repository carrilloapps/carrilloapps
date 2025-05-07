"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function ScrollToTop() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Scroll al inicio cuando cambia la ruta
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [pathname, searchParams])

  return null
}
