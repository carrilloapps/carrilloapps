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
      timestamp: new Date().toISOString()
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
          className="fixed bottom-4 left-4 right-4 md:left-4 md:right-auto md:max-w-md z-50"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <div className="surface-card p-5">
            {/* Gradient accent border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 pointer-events-none" />

            <div className="relative">
              <div className="mb-4">
                <h2 className="text-base font-bold mb-2 text-white" id="cookie-consent-title">
                  Uso de Cookies
                </h2>
                <p className="text-zinc-300 text-sm leading-relaxed" id="cookie-consent-description">
                  Utilizamos cookies para mejorar tu experiencia y analizar el uso del sitio. Consulta nuestra{" "}
                  <Link href="/cookies" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors">
                    política de cookies
                  </Link>
                  {" "}y{" "}
                  <Link href="/privacidad" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors">
                    privacidad
                  </Link>
                  .
                </p>
              </div>

              <div className="flex gap-3 w-full">
                <Button
                  variant="glass"
                  className="flex-1"
                  onClick={rejectCookies}
                >
                  Rechazar
                </Button>
                <Button
                  variant="gradient"
                  className="flex-1"
                  onClick={acceptCookies}
                >
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
