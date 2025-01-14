'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { X } from 'lucide-react'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-background border rounded-lg p-6 shadow-lg max-w-4xl mx-auto" role="alert" aria-live="polite">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-2">Valoro tu privacidad</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Utilizamos cookies para mejorar su experiencia de navegación, analizar nuestro tráfico y personalizar el contenido. Al hacer clic en "Aceptar", acepta nuestro uso de cookies como se describe en nuestra <Link className="underline" href="/cookies" passHref>política de cookies</Link>, o tambien puedes consultar las <Link className="underline" href="/privacy" passHref>política de privacidad</Link> y <Link className="underline" href="/terms" passHref>Términos de servicio</Link>.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={handleAccept}>Aceptar</Button>
            <Button variant="outline" size="sm" onClick={handleReject}>Rechazar</Button>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setShowBanner(false)} className="self-start" aria-label="Close cookie consent banner">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

