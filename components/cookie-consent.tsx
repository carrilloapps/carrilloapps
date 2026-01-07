"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "@/lib/motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookieConsent")
    if (!hasAccepted) {
      // Show the banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
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
    
    // Dispatch event to notify analytics components
    window.dispatchEvent(new Event("cookieConsentChange"))
    
    setIsVisible(false)
  }

  const rejectCookies = () => {
    // Save rejection as JSON object with analytics disabled
    const consent = {
      analytics: false,
      functional: true,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem("cookieConsent", JSON.stringify(consent))
    
    // Dispatch event to notify analytics components
    window.dispatchEvent(new Event("cookieConsentChange"))
    
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
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-zinc-900 border-t border-zinc-800 shadow-lg"
          role="alert"
          aria-labelledby="cookie-consent-title"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1 pr-8">
              <h3 className="text-lg font-semibold mb-2" id="cookie-consent-title">
                Este sitio utiliza cookies
              </h3>
              <p className="text-zinc-400 text-sm">
                Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. Al
                hacer clic en "Aceptar", consientes el uso de cookies según nuestra{" "}
                <Link href="/cookies" className="text-blue-500 hover:underline">
                  política de cookies
                </Link>
                .
              </p>
            </div>
            <div className="flex gap-3 mt-2 md:mt-0 w-full md:w-auto">
              <Button
                variant="outline"
                className="border-zinc-700 hover:bg-zinc-800 flex-1 md:flex-auto"
                onClick={rejectCookies}
              >
                Rechazar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 flex-1 md:flex-auto" onClick={acceptCookies}>
                Aceptar
              </Button>
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 md:relative md:top-auto md:right-auto text-zinc-400 hover:text-white"
                aria-label="Cerrar aviso de cookies"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
