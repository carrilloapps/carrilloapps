"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SurfaceCard } from "@/components/ui/surface-card"
import { SpinnerLoading } from "@/components/unified-loading"
import { useNewsletterStatus, useNewsletterSubscribe } from "@/lib/queries"
import { toast } from "sonner"

/**
 * Standalone newsletter capture card. Reusable en cualquier página que quiera
 * el módulo "suscribite al newsletter" con la estética del home (surface-card
 * + glass input + gradient button).
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("")
  // available: true = Mailchimp wired up, false = not configured yet,
  // undefined = still checking.
  const { data: available } = useNewsletterStatus()
  const subscribe = useNewsletterSubscribe()
  const isSubmitting = subscribe.isPending

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (available === false) return
    subscribe.mutate(email, {
      onSuccess: () => {
        setEmail("")
        toast.success("¡Gracias por suscribirte!", {
          description: "Te avisaré cuando publique algo nuevo.",
        })
      },
      onError: (error) => {
        const status = (error as Error & { status?: number }).status
        toast.error(status === 503 ? "Newsletter no disponible" : "Error al suscribirse", {
          description: error.message,
        })
      },
    })
  }

  return (
    <SurfaceCard>
      <div className="space-y-6 p-6 md:p-8">
        <div className="flex flex-col items-center space-y-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10">
            <Mail className="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-medium tracking-[0.18em] text-zinc-500 uppercase">
              Newsletter
            </p>
            <h3 className="text-xl font-bold text-white">Suscríbete al newsletter</h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-300">
            Recibe las últimas notas sobre desarrollo, fintech y liderazgo técnico directamente en
            tu correo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label htmlFor="newsletter-email" className="sr-only">
            Correo electrónico
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
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
              disabled={isSubmitting || available === false}
            />
            <Button
              type="submit"
              variant="gradient"
              size="default"
              className="touch-manipulation"
              disabled={isSubmitting || available === false}
            >
              {available === false ? (
                "Muy pronto disponible"
              ) : isSubmitting ? (
                <>
                  <SpinnerLoading className="h-4 w-4" />
                  Suscribiendo…
                </>
              ) : (
                "Suscribirse"
              )}
            </Button>
          </div>
          {available === false && (
            <p className="text-center text-xs text-zinc-400">
              El newsletter estará disponible muy pronto. ¡Vuelve pronto!
            </p>
          )}
        </form>
      </div>
    </SurfaceCard>
  )
}
