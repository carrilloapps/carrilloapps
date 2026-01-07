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
          <div className="relative bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-2xl p-5 overflow-hidden">
            {/* Gradient accent border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 pointer-events-none" />
            
            <div className="relative">
              <div className="mb-4">
                <h2 className="text-base font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent" id="cookie-consent-title">
                  🍪 Uso de Cookies
                </h2>
                <p className="text-zinc-300 text-sm leading-relaxed" id="cookie-consent-description">
                  Utilizamos cookies para mejorar tu experiencia y analizar el uso del sitio. Consulta nuestra{" "}
                  <Link href="/cookies" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
                    política de cookies
                  </Link>
                  {" "}y{" "}
                  <Link href="/privacidad" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
                    privacidad
                  </Link>
                  .
                </p>
              </div>
              
              <div className="flex gap-3 w-full">
                <Button 
                  variant="outline"
                  className="flex-1 border-zinc-700 text-zinc-300 bg-transparent hover:bg-zinc-800/70 hover:border-zinc-600 hover:text-white focus:bg-zinc-800/70 focus:ring-4 focus:ring-zinc-500/50 font-medium py-2.5 rounded-lg backdrop-blur-sm transition-all duration-300" 
                  onClick={rejectCookies}
                >
                  Rechazar
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:from-blue-700 focus:to-purple-700 focus:ring-4 focus:ring-blue-500/50 text-white font-medium py-2.5 rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300" 
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
