"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SurfaceCard } from "@/components/ui/surface-card"
import { SpinnerLoading } from "@/components/unified-loading"
import { toast } from "sonner"

/**
 * Standalone newsletter capture card. Reusable en cualquier página que quiera
 * el módulo "suscribite al newsletter" con la estética del home (surface-card
 * + glass input + gradient button).
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      // TODO: integrar con servicio real (Mailchimp / Resend / Buttondown).
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStatus("success")
      setEmail("")
      toast.success("¡Gracias por suscribirte!", {
        description: "Te avisaré cuando publique algo nuevo.",
      })
    } catch {
      setStatus("error")
      toast.error("Error al suscribirse", {
        description: "Por favor intenta nuevamente en un momento.",
      })
    }
  }

  return (
    <SurfaceCard>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
            <Mail className="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
              Newsletter
            </p>
            <h3 className="text-xl font-bold text-white">
              Suscríbete al newsletter
            </h3>
          </div>
          <p className="text-sm text-zinc-300 max-w-md leading-relaxed">
            Recibe las últimas notas sobre desarrollo, fintech y liderazgo
            técnico directamente en tu correo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label htmlFor="newsletter-email" className="sr-only">
            Correo electrónico
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              id="newsletter-email"
              name="email"
              variant="glass"
              type="email"
              inputMode="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoCapitalize="off"
              spellCheck={false}
              disabled={status === "loading"}
            />
            <Button
              type="submit"
              variant="gradient"
              size="default"
              className="touch-manipulation"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <SpinnerLoading className="w-4 h-4" />
                  Suscribiendo…
                </>
              ) : (
                "Suscribirse"
              )}
            </Button>
          </div>
        </form>
      </div>
    </SurfaceCard>
  )
}
