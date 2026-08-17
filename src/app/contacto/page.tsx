"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, CalendarDays, Check, Send } from "lucide-react"
import { toast } from "sonner"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { AnimatedSection } from "@/components/animated-section"
import { Section } from "@/components/ui/section"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { EMPTY_PHONE, PhoneField, type PhoneValue } from "@/components/ui/phone-field"
import { ConsentCheck } from "@/components/ui/consent-check"
import { Turnstile, isTurnstileEnabled } from "@/components/turnstile"
import { CalPopupButton } from "@/components/cal-booking"
import { contactFaq } from "@/lib/data/contact-faq"
import { buildContactWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp"
import {
  trackButtonClick,
  trackFormFieldInteraction,
  trackFormStart,
  trackFormSubmit,
} from "@/lib/analytics"

/* -------------------------------------------------------------------------- */
/*  Contact details, obfuscated at rest                                       */
/* -------------------------------------------------------------------------- */

/**
 * The address and the number are not in the markup in readable form. They are
 * encoded here and decoded only when the visitor asks, which keeps them out of
 * the reach of the scrapers that harvest `mailto:` and `tel:` from static HTML.
 * It is not security — anyone determined can read the bundle — it is the same
 * reason a printed form does not list a direct line in the footer.
 *
 * Worth knowing before trusting it too far: the site-wide `Organization`
 * JSON-LD in `json-ld.tsx` publishes both values in plain text on every page,
 * deliberately, because that is what makes them eligible for rich results. So
 * this encoding raises the cost for a naive scraper and nothing more.
 */
const obfuscateEmail = (email: string): string => btoa(email).split("").reverse().join("")
const deobfuscateEmail = (o: string): string => atob(o.split("").reverse().join(""))

const obfuscatePhone = (phone: string): string =>
  phone
    .split("")
    .map((c, i) => (i % 2 === 0 ? c : String.fromCharCode(c.charCodeAt(0) + 1)))
    .join("")
const deobfuscatePhone = (o: string): string =>
  o
    .split("")
    .map((c, i) => (i % 2 === 0 ? c : String.fromCharCode(c.charCodeAt(0) - 1)))
    .join("")

const OBFUSCATED_EMAIL = obfuscateEmail("m@carrillo.app")
const OBFUSCATED_PHONE = obfuscatePhone("+57 (300) 332 8389")

/** The particulars of the channel, stated before the form asks for anything. */
const PARTICULARS = [
  { term: "Respuesta", value: "< 24 h hábiles" },
  { term: "Base", value: "Medellín, CO" },
  { term: "Horario", value: "Lun–Vie · 9:00–18:00" },
  { term: "Idiomas", value: "Español · Inglés" },
]

/** Simple client-side throttle: three attempts a minute. */
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

/* -------------------------------------------------------------------------- */

/**
 * The contact page as a form on a ruled sheet.
 *
 * The previous one was the old world entire: an emerald pill badge over a
 * gradient title, two glass cards with blue-to-purple washes, and inputs that
 * lifted on hover. Underneath, the behaviour was and remains the same — the
 * form composes a WhatsApp message rather than posting to a backend, because
 * there is no backend. The one thing that changes besides the surface is that
 * the page now says so: the submit used to read "Enviar mensaje" and then
 * opened WhatsApp, which is not what that label promises.
 */
export default function ContactPage() {
  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        <OpeningEntry />
        <ContactForm />
        <Questions />
      </main>

      <SiteFooter />
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function OpeningEntry() {
  return (
    <AnimatedSection
      className="relative w-full pt-6 md:pt-10"
      role="region"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4">
        <h1
          id="contact-heading"
          className="max-w-[16ch] font-sans text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-balance text-paper"
        >
          Conversemos sobre tu proyecto
        </h1>

        <div className="mt-8 grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
          <div className="max-w-[68ch] space-y-5 font-sans text-base leading-relaxed text-paper-dim md:text-lg">
            <p>
              Cuéntame qué estás construyendo y dónde se está atascando. Cuanto más concreto sea el
              problema —el volumen que manejas, qué se rompe, qué fecha tienes encima— más útil será
              la primera respuesta.
            </p>
            <p>
              Si prefieres hablarlo directamente,{" "}
              <Link
                href="/agendamiento"
                className="text-paper underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text hover:decoration-stamp"
              >
                agenda una hora
              </Link>{" "}
              y lo revisamos en vivo. Y si aún estás mirando qué necesitas, el{" "}
              <Link
                href="/servicios"
                className="text-paper underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text hover:decoration-stamp"
              >
                catálogo de servicios
              </Link>{" "}
              lo detalla frente por frente.
            </p>
          </div>

          <dl className="self-start border-y border-rule">
            {PARTICULARS.map(({ term, value }) => (
              <div
                key={term}
                className="flex items-baseline justify-between gap-4 border-b border-rule py-3 last:border-b-0"
              >
                <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                  {term}
                </dt>
                <dd className="text-right font-sans text-base text-paper">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rule-strong pt-5">
          <CalPopupButton
            source="contact-hero"
            aria-label="Agendar una asesoría"
            className="cta min-h-[44px]"
          >
            Agendar una asesoría
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
          </CalPopupButton>

          <Link href="/servicios" className="cta-quiet min-h-[44px]">
            Ver servicios
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}

/* -------------------------------------------------------------------------- */

const FIELD_LABEL = "font-mono text-[10px] tracking-[0.14em] text-paper-faint uppercase"

function ContactForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    honeypot: "",
  })
  const [phone, setPhone] = useState<PhoneValue>(EMPTY_PHONE)
  const [termsAccepted, setTermsAccepted] = useState(false)
  // Opted in by default, and trivially opted out: someone writing to ask about
  // a project is the reader the newsletter is for. Terms stay unchecked — that
  // one has to be an actual decision.
  const [subscribe, setSubscribe] = useState(true)
  const [captchaToken, setCaptchaToken] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmission, setLastSubmission] = useState(0)
  const { isLimited, recordAttempt } = useRateLimit()
  const startTime = useRef(0)

  useEffect(() => {
    startTime.current = Date.now()
    trackFormStart("contact_form")
  }, [])

  const setField = (field: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
    if (value && !data[field]) trackFormFieldInteraction("contact_form", field)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot, minimum dwell and throttle: three cheap filters that stop the
    // bulk of automated submissions without asking a person to prove anything.
    if (data.honeypot) return
    if (!termsAccepted) return
    if (Date.now() - startTime.current < 1000) return

    if (isTurnstileEnabled() && !captchaToken) {
      toast.error("Falta la verificación", {
        description: "Completa el desafío para continuar.",
      })
      return
    }

    if (!phone.isValid) {
      toast.error("Revisa el número", {
        description: "Elige el país y escribe un número válido para WhatsApp.",
      })
      return
    }

    if (isLimited) {
      toast.error("Demasiados intentos", {
        description: "Espera un momento antes de intentar nuevamente.",
      })
      return
    }
    if (Date.now() - lastSubmission < 5000) {
      toast.warning("Espera un momento", { description: "Aún estoy procesando el anterior." })
      return
    }

    setIsSubmitting(true)
    recordAttempt()
    setLastSubmission(Date.now())

    try {
      window.open(
        // E.164 travels, not what was typed: the message is read by a person on
        // the other side who may be in another country.
        buildWhatsAppUrl(
          buildContactWhatsAppMessage({
            ...data,
            whatsapp: phone.e164,
            // Stated in the message so the intent is on the record, not only in
            // a checkbox nobody can see once the form is gone.
            subject: subscribe ? `${data.subject} · Quiere suscribirse al boletín` : data.subject,
          }),
        ),
        "_blank",
        "noopener,noreferrer",
      )
      trackFormSubmit("contact_form", true)
      setData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        honeypot: "",
      })
      setPhone(EMPTY_PHONE)
      setTermsAccepted(false)
      setSubscribe(false)
      toast.success("Abriendo WhatsApp…", {
        description: "Tu mensaje va redactado; solo tienes que enviarlo.",
      })
    } catch (error) {
      trackFormSubmit(
        "contact_form",
        false,
        error instanceof Error ? error.message : "Unknown error",
      )
      toast.error("No se pudo abrir WhatsApp", {
        description: "Escríbeme directamente a m@carrillo.app.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section
      spacing="compact"
      header={{
        columnLabel: "Formulario",
        title: "Escríbeme",
        description:
          "No hay servidor detrás de este formulario: al enviarlo se abre WhatsApp con el mensaje ya redactado, y tú decides si lo mandas. Nada se guarda aquí.",
        headingId: "form-heading",
      }}
    >
      {/*
        Two columns. The form used to run to a 52rem measure and leave the rest
        of the sheet empty, which read as an unfinished page — and the direct
        lines sat in a section of their own further down, where someone who
        just wanted the address had to scroll past the whole form to find it.
        Now they are beside each other: write, or take the line.
      */}
      <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <form onSubmit={handleSubmit} noValidate>
          {/* Bots fill anything with a name field. People never see this one. */}
          <input
            type="text"
            name="website"
            value={data.honeypot}
            onChange={(e) => setField("honeypot", e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="pointer-events-none absolute h-px w-px opacity-0"
          />

          <div className="grid gap-x-10 gap-y-6 border-t border-rule-strong pt-6 md:grid-cols-2">
            <Field id="name" label="Nombre completo" required>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Tu nombre"
                autoComplete="name"
                required
                disabled={isSubmitting}
              />
            </Field>

            <Field id="email" label="Correo electrónico" required>
              <Input
                id="email"
                type="email"
                inputMode="email"
                value={data.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="tu@correo.com"
                autoComplete="email"
                spellCheck={false}
                required
                disabled={isSubmitting}
              />
            </Field>

            <Field id="whatsapp" label="WhatsApp" required>
              <PhoneField
                id="whatsapp"
                value={phone}
                onChange={setPhone}
                required
                disabled={isSubmitting}
              />
            </Field>

            <Field id="company" label="Empresa" hint="Opcional">
              <Input
                id="company"
                value={data.company}
                onChange={(e) => setField("company", e.target.value)}
                placeholder="¿Dónde trabajas?"
                autoComplete="organization"
                disabled={isSubmitting}
              />
            </Field>

            <div className="md:col-span-2">
              <Field id="subject" label="Asunto" required>
                <Input
                  id="subject"
                  value={data.subject}
                  onChange={(e) => setField("subject", e.target.value)}
                  placeholder="¿En qué puedo ayudarte?"
                  required
                  disabled={isSubmitting}
                />
              </Field>
            </div>

            <div className="md:col-span-2">
              <Field
                id="message"
                label="Mensaje"
                required
                hint="Qué construyes, qué volumen manejas, qué se rompe"
              >
                <Textarea
                  id="message"
                  rows={6}
                  value={data.message}
                  onChange={(e) => setField("message", e.target.value)}
                  placeholder="Cuéntame el problema concreto…"
                  required
                  disabled={isSubmitting}
                />
              </Field>
            </div>
          </div>

          {isLimited && (
            <p role="alert" className="mt-6 font-mono text-xs text-stamp-text">
              Has alcanzado el límite de envíos. Espera un momento antes de intentarlo de nuevo.
            </p>
          )}

          <div className="mt-8 border-t border-rule-strong pt-2">
            <ConsentCheck
              id="terms"
              checked={termsAccepted}
              onChange={setTermsAccepted}
              disabled={isSubmitting}
              required
              note="Sin esto no puedo procesar el mensaje."
            >
              Acepto los{" "}
              <Link
                href="/terminos"
                className="text-paper underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text"
              >
                términos y condiciones
              </Link>{" "}
              y la{" "}
              <Link
                href="/privacidad"
                className="text-paper underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text"
              >
                política de privacidad
              </Link>
            </ConsentCheck>

            <ConsentCheck
              id="subscribe"
              checked={subscribe}
              onChange={setSubscribe}
              disabled={isSubmitting}
              note="Escribo sobre pagos, conciliación y arquitectura. Un correo cada tanto, y te das de baja en un clic."
            >
              Quiero suscribirme al boletín
            </ConsentCheck>
          </div>

          {/* Renders only once NEXT_PUBLIC_TURNSTILE_SITE_KEY exists. */}
          <Turnstile onVerify={setCaptchaToken} className="mt-6" />

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rule-strong pt-5">
            <button
              type="submit"
              className="cta min-h-[44px]"
              disabled={isSubmitting || isLimited || !termsAccepted || !phone.isValid}
            >
              {isSubmitting ? "Abriendo WhatsApp…" : "Enviar por WhatsApp"}
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>

            <CalPopupButton
              source="contact-form"
              aria-label="Agendar una asesoría"
              className="cta-quiet min-h-[44px]"
            >
              Prefiero agendar una hora
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            </CalPopupButton>
          </div>
        </form>

        <DirectChannels />
      </div>
    </Section>
  )
}

/** One ruled field: mono term, optional hint, then the control. */
function Field({
  id,
  label,
  hint,
  required = false,
  children,
}: {
  id: string
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      {/* Wraps: the longest hint reaches the right edge on a 390px screen,
          and a hint pinned to the label's line has nowhere to go. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <Label htmlFor={id} className={FIELD_LABEL}>
          {label}
          {required ? <span className="ml-1 text-stamp-text">*</span> : null}
        </Label>
        {hint ? <span className="font-sans text-[11px] text-paper-faint">{hint}</span> : null}
      </div>
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * The direct lines, revealed on request.
 *
 * A ruled record rather than a card: term on the left, the value in the middle
 * once asked for, the condition on the right. The reveal is the whole reason
 * the values are encoded, so the control has to be part of the row and not a
 * decoration next to it.
 */
/**
 * The direct lines, in the rail beside the form.
 *
 * A stacked record rather than the wide three-column one it was: at 20rem a row
 * of term, value and condition would have wrapped into a mess. Same content,
 * one column, and the reveal control sits in the row it belongs to — the reveal
 * is the whole reason the values are encoded, so it cannot be a decoration next
 * to them.
 */
function DirectChannels() {
  const [emailShown, setEmailShown] = useState(false)
  const [phoneShown, setPhoneShown] = useState(false)

  const email = deobfuscateEmail(OBFUSCATED_EMAIL)
  const phone = deobfuscatePhone(OBFUSCATED_PHONE)

  return (
    /*
      The rail opens on the same rule as the form, at the same height.
      It used to start with its own bottom-ruled heading while the form started
      with a top rule — two columns beginning on two different lines, which is
      exactly the misalignment you see before you can name it. Now both open
      with `border-t border-rule-strong pt-6`, and the first label in each
      column sits on the same baseline.
    */
    <aside
      aria-labelledby="channels-heading"
      className="border-t border-rule-strong pt-6 lg:sticky lg:top-28 lg:self-start"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3
          id="channels-heading"
          className="font-mono text-[10px] tracking-[0.14em] text-paper-faint uppercase"
        >
          Línea directa
        </h3>
        <span className="font-mono text-[10px] tracking-[0.14em] text-paper-faint uppercase">
          24 h
        </span>
      </div>

      <p className="mt-4 font-sans text-sm leading-relaxed text-paper-faint">
        El correo y el teléfono están codificados en el marcado para que no los recojan los
        rastreadores más simples. Un clic los muestra.
      </p>

      <dl className="mt-6 border-t border-rule">
        <ChannelRow
          term="Correo"
          note="Respuesta en menos de 24 h hábiles"
          shown={emailShown}
          onReveal={() => {
            setEmailShown(true)
            trackButtonClick("Revelar email", "contact-channels")
          }}
          value={email}
          href={`mailto:${email}`}
        />
        <ChannelRow
          term="Teléfono"
          note="Lun–Vie, 9:00–18:00 · America/Bogotá"
          shown={phoneShown}
          onReveal={() => {
            setPhoneShown(true)
            trackButtonClick("Revelar teléfono", "contact-channels")
          }}
          value={phone}
          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
        />

        <div className="border-b border-rule py-4">
          <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
            Ubicación
          </dt>
          <dd className="mt-2 font-sans text-base text-paper">Medellín, Colombia</dd>
          <dd className="mt-1 font-sans text-sm text-paper-faint">
            Remoto, con clientes en LATAM y EE. UU.
          </dd>
        </div>

        <div className="border-b border-rule py-4">
          <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
            ¿Qué ayuda a responder rápido?
          </dt>
          <dd className="mt-2">
            <ul className="space-y-1.5 font-sans text-sm leading-relaxed text-paper-dim">
              {[
                "El volumen que manejas hoy",
                "Qué se rompe, o qué no escala",
                "Si hay una fecha externa que cumplir",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-[0.5rem] inline-block h-1 w-1 shrink-0 bg-stamp"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-rule-strong pt-4">
        <Link href="/servicios" className="cta-quiet min-h-[44px]">
          Ver los siete frentes
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/*
        No SocialRow here. Its Email entry renders a plain `mailto:` right under
        the row that goes to the trouble of encoding the same address — the page
        would be undoing its own work in the same column. The other profiles are
        in the footer on every page anyway.
      */}
    </aside>
  )
}

/** One line of the record: term, then either the reveal or the value. */
function ChannelRow({
  term,
  note,
  value,
  href,
  shown,
  onReveal,
}: {
  term: string
  note: string
  value: string
  href: string
  shown: boolean
  onReveal: () => void
}) {
  return (
    <div className="border-b border-rule py-4">
      <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">{term}</dt>
      <dd className="mt-2">
        {shown ? (
          <a
            href={href}
            className="inline-flex items-center gap-2 font-mono text-[15px] break-all text-paper underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text hover:decoration-stamp"
          >
            <Check className="h-3.5 w-3.5 shrink-0 text-settled" aria-hidden="true" />
            {value}
          </a>
        ) : (
          <button type="button" onClick={onReveal} className="cta-quiet min-h-[44px]">
            Mostrar {term.toLowerCase()}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </dd>
      <dd className="mt-1 font-sans text-sm text-paper-faint">{note}</dd>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

/** The same ruled question shape the service pages use. */
function Questions() {
  return (
    <AnimatedSection
      className="relative pt-10 pb-16 md:pt-16 md:pb-20"
      role="region"
      aria-labelledby="contact-faq"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-10">
          <div className="flex items-baseline justify-between gap-6 border-b border-rule-strong pb-2">
            <span className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase">
              Preguntas
            </span>
            <span className="font-mono text-[11px] text-paper-faint tabular-nums">
              {contactFaq.length}
            </span>
          </div>
          <h2
            id="contact-faq"
            className="mt-6 font-sans text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-paper"
          >
            Antes de escribir
          </h2>
        </div>

        <dl className="border-t border-rule-strong">
          {contactFaq.map((item, i) => (
            <div
              key={`${item.question}-${i}`}
              className="grid gap-x-12 gap-y-2 border-b border-rule py-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]"
            >
              <dt className="font-sans text-lg leading-snug tracking-[-0.01em] text-paper">
                {item.question}
              </dt>
              <dd className="max-w-[68ch] font-sans text-base leading-relaxed text-paper-dim">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </AnimatedSection>
  )
}
