"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "@/lib/motion"
import Link from "next/link"

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
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          exit={{ y: 60 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-rule-strong bg-ink"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          {/* A footing bar, not a card. A card at bottom-left covered a whole
              row of the tools ledger on a 390px screen — the one entry the
              first viewport exists to show. A single-line bar sits under the
              page instead of on top of it. */}
          <div className="container mx-auto flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h2 className="sr-only" id="cookie-consent-title">
                Uso de cookies
              </h2>
              <p
                className="max-w-[70ch] font-sans text-sm leading-snug text-paper-dim"
                id="cookie-consent-description"
              >
                Uso cookies para medir el tráfico del sitio. Consulta la{" "}
                <Link
                  href="/cookies"
                  className="text-paper underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text"
                >
                  política de cookies
                </Link>{" "}
                y la{" "}
                <Link
                  href="/privacidad"
                  className="text-paper underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text"
                >
                  privacidad
                </Link>
                .
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-5">
              <button
                type="button"
                onClick={rejectCookies}
                className="min-h-[48px] touch-manipulation font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase transition-colors hover:text-paper-dim focus-visible:text-paper-dim"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={acceptCookies}
                className="min-h-[48px] touch-manipulation border-b-2 border-stamp px-1 font-mono text-[11px] tracking-[0.1em] text-paper uppercase transition-colors hover:text-stamp-text focus-visible:text-stamp-text"
              >
                Aceptar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
