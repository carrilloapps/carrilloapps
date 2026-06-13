"use client"

import { useState, useEffect } from "react"
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
  // null = checking, true = Mailchimp wired up, false = not configured yet.
  const [available, setAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true
    fetch("/api/newsletter")
      .then((res) => (res.ok ? res.json() : { configured: false }))
      .then((data: { configured?: boolean }) => {
        if (active) setAvailable(Boolean(data?.configured))
      })
      .catch(() => {
        if (active) setAvailable(false)
      })
    return () => {
      active = false
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (available === false) return
    setStatus("loading")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus("success")
        setEmail("")
        toast.success("¡Gracias por suscribirte!", {
          description: "Te avisaré cuando publique algo nuevo.",
        })
        return
      }

      const data = (await res.json().catch(() => ({}))) as { error?: string }
      setStatus("error")
      toast.error(
        res.status === 503 ? "Newsletter no disponible" : "Error al suscribirse",
        {
          description:
            data?.error ?? "Por favor intenta nuevamente en un momento.",
        }
      )
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
              disabled={status === "loading" || available === false}
            />
            <Button
              type="submit"
              variant="gradient"
              size="default"
              className="touch-manipulation"
              disabled={status === "loading" || available === false}
            >
              {available === false ? (
                "Muy pronto disponible"
              ) : status === "loading" ? (
                <>
                  <SpinnerLoading className="w-4 h-4" />
                  Suscribiendo…
                </>
              ) : (
                "Suscribirse"
              )}
            </Button>
          </div>
          {available === false && (
            <p className="text-xs text-zinc-400 text-center">
              El newsletter estará disponible muy pronto. ¡Vuelve pronto!
            </p>
          )}
        </form>
      </div>
    </SurfaceCard>
  )
}
