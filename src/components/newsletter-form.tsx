"use client"

import { useCallback, useId, useRef, useState, type FormEvent, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { trackNewsletterSignup } from "@/lib/analytics"
import { blogSubscribeUrl } from "@/lib/substack-service"
import { cn } from "@/lib/utils"
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
 * Every placement renders this: both footer colophons and the /blog index. It
 * used to be two components — a live one in site-footer.tsx that resolved a
 * 500ms timer and claimed success without subscribing anybody, and this file,
 * which was wired to the API but wore the pre-ledger surface and had no call
 * sites at all. One form, one contract.
 *
 * The address is validated here and handed to Substack, which runs its captcha,
 * records the signup and sends the confirmation mail. Nothing is stored on this
 * side and there is one list, the one that powers blog.carrillo.app.
 *
 * It used to post to a route that forwarded to Substack's own signup endpoint.
 * That endpoint answers `200` to a request it does not trust — just without the
 * `subscription_id` that proves anything happened — so the site told readers
 * they had subscribed when nobody had. See `blogSubscribeUrl` for the detail.
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

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

    trackNewsletterSignup(email, source, true)

    /*
      Opened straight out of the submit handler so it stays inside the click
      gesture and no popup blocker eats it. The address travels in the query
      string, so the reader lands on a filled-in form and finishes in one click.
    */
    window.open(blogSubscribeUrl(email), "_blank", "noopener,noreferrer")
    setEmail("")

    toast.success("Te llevo a confirmar", {
      description: "Termina la suscripción en la pestaña que acabo de abrir.",
    })
  }

  return (
    <form className={className} aria-labelledby={labelledBy} onSubmit={handleSubmit}>
      <Label htmlFor={inputId} className="sr-only">
        Correo electrónico
      </Label>

      {/*
        Deliberately a bare input and not `ui/input`: a honeypot is a bot trap,
        never painted and never read by anyone, so dressing it in the system's
        field styling would only help a bot reading classes mistake it for a
        real field. Same shape as the traps on /contacto and the compact
        contact section.
      */}
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
        <Input
          id={inputId}
          name="email"
          type="email"
          inputMode="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          autoCapitalize="off"
          spellCheck={false}
          className={inline ? "sm:flex-1" : ""}
        />
        {/*
          `.cta` on a real button, the way /contacto, /error and the CV modal
          submit. The Button component carries its own radius and height, which
          the ledger CTA is drawn against — reaching for it here would mean
          fighting both.
        */}
        <button type="submit" className={`cta ${inline ? "sm:mt-0 sm:shrink-0" : "mt-3"}`}>
          Suscribirme
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}

interface NewsletterBandProps {
  /** Id of the eyebrow that names the band — the form points `aria-labelledby` at it. */
  id: string
  /** Eyebrow above the pitch. */
  label?: string
  /** The pitch, one or two lines. */
  description: string
  /** Where the signup happened, recorded on the analytics event. */
  source?: string
  /** Secondary routes under the form (Substack, RSS…). */
  children?: ReactNode
  className?: string
}

/**
 * The newsletter as a band, for a placement inside the content measure.
 *
 * The footer's form is a column: an eyebrow, a pitch and a stacked field, all
 * sized for a quarter of the grid. Dropping that same column into a full-width
 * content block left everything pinned to the left edge with the rest of the
 * measure empty — the field stopped at 22rem and nothing claimed the rest.
 *
 * This is the horizontal composition, not a narrower copy of the column: the
 * pitch holds the left of the rule and the form the right, so the block reads
 * across the measure it was given. The footer keeps the column; every in-content
 * placement uses this.
 */
export function NewsletterBand({
  id,
  label = "Suscríbete",
  description,
  source,
  children,
  className,
}: NewsletterBandProps) {
  return (
    <div className={cn("border-t-2 border-rule-strong pt-5", className)}>
      <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-start">
        <div className="min-w-0">
          <p id={id} className="font-mono text-[11px] tracking-[0.16em] text-paper-faint uppercase">
            {label}
          </p>
          <p className="mt-3 max-w-[52ch] font-sans text-[15px] leading-relaxed text-paper-dim">
            {description}
          </p>
        </div>

        <div className="min-w-0">
          <NewsletterForm labelledBy={id} source={source} inline />

          {children ? (
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">{children}</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
