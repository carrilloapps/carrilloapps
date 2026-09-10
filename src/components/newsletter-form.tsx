"use client"

import { useCallback, useId, useRef, useState, type FormEvent } from "react"
import { ArrowRight } from "lucide-react"
import { trackNewsletterSignup } from "@/lib/analytics"
import { useNewsletterSubscribe } from "@/lib/queries"
import { toast } from "sonner"

/** Simple client-side throttle: three attempts a minute, as on /contacto. */
const useRateLimit = (limit = 3, windowMs = 60_000) => {
  const [attempts, setAttempts] = useState<number[]>([])

  const isLimited = useCallback(
    () => attempts.filter((t) => Date.now() - t < windowMs).length >= limit,
    [attempts, limit, windowMs],
  )
  const recordAttempt = useCallback(
    () => setAttempts((prev) => [...prev.filter((t) => Date.now() - t < windowMs), Date.now()]),
    [windowMs],
  )

  return { isLimited: isLimited(), recordAttempt }
}

interface NewsletterFormProps {
  /** Id of the heading that names this form, for `aria-labelledby`. */
  labelledBy: string
  /** Where the signup happened, recorded on the analytics event. */
  source?: string
  className?: string
  /** Lay the field and the button on one row where there is width for it. */
  inline?: boolean
}

/**
 * The one newsletter form on the site.
 *
 * Every placement renders this: both footer columns, the /blog index, and
 * `DynamicNewsletterForm`. It used to be two components — a live one in
 * site-footer.tsx that resolved a 500ms timer and claimed success without
 * subscribing anybody, and this file, which was wired to the API but wore the
 * pre-ledger surface and had no call sites at all. One form, one contract.
 *
 * It posts to `/api/newsletter`, which forwards to Substack, so the address
 * lands in the same list that powers blog.carrillo.app and nothing is stored
 * on this side. Substack sends its own confirmation mail.
 *
 * It carries the three defenses docs/API.md asks of every form: a honeypot, a
 * minimum dwell, and a throttle.
 */
export function NewsletterForm({
  labelledBy,
  source = "footer",
  className = "",
  inline = false,
}: NewsletterFormProps) {
  const inputId = useId()
  const [email, setEmail] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const startTime = useRef(Date.now())
  const { isLimited, recordAttempt } = useRateLimit()
  const subscribe = useNewsletterSubscribe()
  const isSubmitting = subscribe.isPending

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    // Three cheap filters that stop the bulk of automated submissions without
    // asking a person to prove anything.
    if (honeypot) return
    if (Date.now() - startTime.current < 1000) return
    if (isLimited) {
      toast.error("Demasiados intentos", {
        description: "Espera un momento antes de volver a intentarlo.",
      })
      return
    }
    recordAttempt()

    subscribe.mutate(email, {
      onSuccess: (data) => {
        trackNewsletterSignup(email, source, true)
        setEmail("")
        // Substack answers a new signup and a repeat one identically, so the
        // copy has to be true of both: "already on the list" is the one state
        // the route can never actually report.
        toast.success(
          data?.alreadySubscribed ? "Ya estabas suscrito" : "¡Listo, quedaste suscrito!",
          {
            description: data?.alreadySubscribed
              ? "Tu correo ya está en la lista."
              : "Si es tu primera vez, Substack te enviará un correo de bienvenida.",
          },
        )
      },
      onError: (error) => {
        trackNewsletterSignup(email, source, false)
        // When the upstream path fails the route hands back Substack's own
        // subscribe page, so the reader gets somewhere to go instead of a
        // dead end.
        const { subscribeUrl } = error as Error & { subscribeUrl?: string }
        toast.error("Error al suscribirse", {
          description: error.message,
          ...(subscribeUrl && {
            action: {
              label: "Suscribirme en el blog",
              onClick: () => window.open(subscribeUrl, "_blank", "noopener,noreferrer"),
            },
          }),
        })
      },
    })
  }

  return (
    <form className={className} aria-labelledby={labelledBy} onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="sr-only">
        Correo electrónico
      </label>
      {/* Bots fill anything with a name field. People never see this one. */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px opacity-0"
      />

      <div className={inline ? "flex flex-col gap-3 sm:flex-row sm:items-stretch" : ""}>
        <input
          id={inputId}
          name="email"
          type="email"
          inputMode="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          autoComplete="email"
          autoCapitalize="off"
          spellCheck={false}
          className={`min-h-[52px] w-full border border-rule bg-field px-3 font-sans text-base text-paper transition-colors placeholder:text-paper-faint hover:border-rule-strong disabled:opacity-50 ${
            inline ? "sm:max-w-[22rem]" : ""
          }`}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`cta ${inline ? "sm:mt-0" : "mt-3"}`}
        >
          {isSubmitting ? "Suscribiendo…" : "Suscribirme"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}
