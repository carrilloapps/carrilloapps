"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "@/lib/motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookieConsent")
    if (!hasAccepted) {
      // Show the banner immediately - it's mandatory
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    // Save consent as JSON object with analytics enabled
    const consent = {
      analytics: true,
      functional: true,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookieConsent", JSON.stringify(consent))

    // Dispatch event to notify analytics components to load immediately
    window.dispatchEvent(new Event("cookieConsentChange"))

    setIsVisible(false)
  }

  const rejectCookies = () => {
    // Don't save rejection - modal will reappear on next page/reload
    // This respects GDPR but encourages acceptance for full functionality
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed right-4 bottom-4 left-4 z-50 md:right-auto md:left-4 md:max-w-md"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          {/* Opaque base so the banner is fully legible over page content —
              surface-card alone is translucent (slate 55–70% + blur). */}
          <div className="surface-card p-5" style={{ backgroundColor: "rgb(2 6 23 / 0.98)" }}>
            {/* Gradient accent border effect */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10" />

            <div className="relative">
              <div className="mb-4">
                <h2 className="mb-2 text-base font-bold text-white" id="cookie-consent-title">
                  Uso de Cookies
                </h2>
                <p
                  className="text-sm leading-relaxed text-zinc-300"
                  id="cookie-consent-description"
                >
                  Utilizamos cookies para mejorar tu experiencia y analizar el uso del sitio.
                  Consulta nuestra{" "}
                  <Link
                    href="/cookies"
                    className="text-emerald-400 underline underline-offset-2 transition-colors hover:text-emerald-300"
                  >
                    política de cookies
                  </Link>{" "}
                  y{" "}
                  <Link
                    href="/privacidad"
                    className="text-emerald-400 underline underline-offset-2 transition-colors hover:text-emerald-300"
                  >
                    privacidad
                  </Link>
                  .
                </p>
              </div>

              <div className="flex w-full gap-3">
                <Button variant="glass" className="flex-1" onClick={rejectCookies}>
                  Rechazar
                </Button>
                <Button variant="gradient" className="flex-1" onClick={acceptCookies}>
                  Aceptar
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
