"use client"

import Link from "next/link"
import { useId, useState, type FormEvent } from "react"
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react"
import { SERVICES as SERVICE_CATALOGUE } from "@/lib/data/services"
import { Github, Linkedin, Mail, Substack, XMark } from "@/components/icons/social-icons"
import { Logo } from "@/components/logo"
import { trackSocialClick, trackNavigation, trackNewsletterSignup } from "@/lib/analytics"
import { toast } from "sonner"

// Computed at module load, safe for both server and client.
const currentYear = new Date().getFullYear()

const QUICK_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/sobre-mi" },
  // One entry: "Herramientas" and "Recursos" were separate routes until the two
  // pages merged, and pointing both at /recursos left the column with the same
  // destination twice — and React with a duplicate key.
  { label: "Recursos", href: "/recursos" },
  // Points at the on-site index now that /blog exists, not straight out to
  // Substack: the index links every post there anyway, and keeping the first
  // hop internal means the footer no longer leaks every visitor off-site.
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
] as const

// Derived from the catalogue rather than hand-kept: this list held four of the
// seven services, pointing at fragments of a page that no longer has them.
const SERVICE_LINKS = SERVICE_CATALOGUE.map((service) => ({
  label: service.title,
  href: `/servicios/${service.slug}`,
}))

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/carrilloapps", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/carrilloapps", Icon: Linkedin },
  { label: "X (Twitter)", href: "https://x.com/carrilloapps", Icon: XMark },
  { label: "Substack", href: "https://carrilloapps.substack.com/", Icon: Substack },
  { label: "Correo", href: "mailto:m@carrillo.app", Icon: Mail },
] as const

const LEGAL_LINKS = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos", href: "/terminos" },
  { label: "Cookies", href: "/cookies" },
] as const

/**
 * The colophon.
 *
 * Two compositions, not one that shrinks. On a wide screen the footer is the
 * closing spread of the register: four ruled columns, every destination
 * visible, read left to right. On a phone that same grid became a five-screen
 * stack of near-identical link rows, so the mobile build inverts the priority —
 * the newsletter (the only action down here) comes first at thumb height, the
 * navigation follows as a two-up ruled index, and the seven services fold into
 * a disclosure instead of a column of their own.
 *
 * Both share the data above and the form below; only the arrangement differs.
 */
export function SiteFooter() {
  return (
    <footer
      className="relative border-t-2 border-rule-strong bg-ink text-paper-dim"
      role="contentinfo"
    >
      <DesktopColophon />
      <MobileColophon />
      <LegalBand />
    </footer>
  )
}

/* ─────────────────────────── desktop ─────────────────────────── */

function DesktopColophon() {
  return (
    <div className="container mx-auto hidden px-4 py-14 lg:block">
      <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.1fr)] gap-x-12">
        <div>
          <Logo showMark />
          <p className="mt-4 max-w-[34ch] font-sans text-[15px] leading-relaxed text-paper-dim">
            Tech Lead y full stack senior. Sistemas de pago, arquitectura distribuida y equipos que
            entregan sin heroísmos.
          </p>
          <p className="mt-4 flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Medellín, CO · Remoto
          </p>
          <SocialMarks className="mt-5 lg:-ml-2.5" />
        </div>

        <FooterIndex id="footer-quick-links" title="Navega" links={QUICK_LINKS} />
        <FooterIndex id="footer-services" title="Servicios" links={SERVICE_LINKS} />

        <div>
          <ColumnLabel id="footer-newsletter" ruled>
            Boletín
          </ColumnLabel>
          <p className="mt-4 max-w-[34ch] font-sans text-[15px] leading-relaxed text-paper-dim">
            Notas ocasionales sobre arquitectura, fintech y liderazgo técnico. Sin spam, sin
            cadencia forzada.
          </p>
          <NewsletterForm labelledBy="footer-newsletter" className="mt-5" />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── mobile ─────────────────────────── */

function MobileColophon() {
  return (
    <div className="container mx-auto px-4 py-10 lg:hidden">
      <Logo showMark size={26} />

      {/*
        The action first. On a phone the footer is reached by scrolling past
        everything else, so whatever sits at the top of it is what the thumb
        arrives at — and a column of links is not what anyone scrolled for.
      */}
      <div className="mt-6 border-t-2 border-rule-strong pt-5">
        <ColumnLabel id="footer-newsletter-mobile">Boletín</ColumnLabel>
        <p className="mt-3 font-sans text-[15px] leading-relaxed text-paper-dim">
          Notas ocasionales sobre arquitectura, fintech y liderazgo técnico. Sin spam.
        </p>
        <NewsletterForm labelledBy="footer-newsletter-mobile" className="mt-4" />
      </div>

      {/* Two-up: five short labels in one column is dead space on a 390px
          screen, and the same five in two columns is one glance. */}
      <nav className="mt-8 border-t border-rule-strong pt-4" aria-labelledby="footer-nav-mobile">
        <ColumnLabel id="footer-nav-mobile">Navega</ColumnLabel>
        <ul className="mt-1 grid grid-cols-2 gap-x-6">
          {QUICK_LINKS.map(({ label, href }) => (
            <li key={href} className="border-b border-rule">
              <FooterLink label={label} href={href} className="min-h-[52px] text-base" />
            </li>
          ))}
        </ul>
      </nav>

      {/* Seven services would be the longest block in the footer, and they are
          one tap from /servicios anyway. Folded, with the count on the summary
          so it is clear what opening it costs. */}
      <details className="group mt-6 border-t border-rule-strong">
        <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
          <span className="font-mono text-[11px] tracking-[0.16em] text-paper-faint uppercase">
            Servicios
          </span>
          <span className="flex items-center gap-2 font-mono text-[11px] text-paper-faint tabular-nums">
            {SERVICE_LINKS.length}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-open:rotate-90"
              aria-hidden="true"
            />
          </span>
        </summary>
        <ul className="pb-2">
          {SERVICE_LINKS.map(({ label, href }) => (
            <li key={href} className="border-t border-rule">
              <FooterLink label={label} href={href} className="min-h-[52px] text-base" />
            </li>
          ))}
        </ul>
      </details>

      <div className="mt-6 border-t border-rule-strong pt-4">
        <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          Medellín, CO · Remoto
        </p>
        <SocialMarks className="mt-2 lg:-ml-2.5" />
      </div>
    </div>
  )
}

/* ─────────────────────────── shared ─────────────────────────── */

function LegalBand() {
  return (
    <div className="border-t border-rule">
      <div className="container mx-auto flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] text-paper-faint tabular-nums">
          © {currentYear} Junior Carrillo
        </p>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-1" aria-label="Enlaces legales">
          {LEGAL_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => trackNavigation(label, href, "footer")}
              className="inline-flex min-h-[44px] items-center font-mono text-[11px] tracking-[0.12em] text-paper-faint uppercase transition-colors hover:text-paper lg:min-h-0"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

/**
 * `ruled` draws the line under the head, which ties the desktop columns to one
 * shared horizontal. On mobile the sections already sit under their own rule,
 * so a second line right beneath the label would only double it.
 */
function ColumnLabel({
  id,
  ruled,
  children,
}: {
  id: string
  ruled?: boolean
  children: React.ReactNode
}) {
  return (
    <p
      id={id}
      className={`font-mono text-[11px] tracking-[0.16em] text-paper-faint uppercase ${
        ruled ? "border-b border-rule-strong pb-2" : ""
      }`}
    >
      {children}
    </p>
  )
}

function FooterLink({
  label,
  href,
  className = "",
}: {
  label: string
  href: string
  className?: string
}) {
  const external = href.startsWith("http")
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => trackNavigation(label, href, "footer")}
      className={`group flex items-center justify-between gap-3 font-sans text-[15px] text-paper-dim transition-colors hover:text-paper ${className}`.trim()}
    >
      <span className="min-w-0 truncate">{label}</span>
      {external ? (
        <ArrowUpRight
          className="h-3.5 w-3.5 shrink-0 text-paper-faint transition-colors group-hover:text-stamp-text"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  )
}

/** A ruled index column — one destination per row, like an entry list. */
function FooterIndex({
  id,
  title,
  links,
}: {
  id: string
  title: string
  links: ReadonlyArray<{ label: string; href: string }>
}) {
  return (
    <nav aria-labelledby={id}>
      <ColumnLabel id={id} ruled>
        {title}
      </ColumnLabel>
      <ul>
        {links.map(({ label, href }) => (
          <li key={href} className="border-b border-rule">
            <FooterLink label={label} href={href} className="py-2.5" />
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SocialMarks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-nowrap items-center ${className}`.trim()} aria-label="Perfiles">
      {SOCIAL_LINKS.map(({ label, href, Icon }) => (
        <li key={label}>
          <Link
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={label}
            onClick={() => trackSocialClick(label, "profile_visit", href)}
            className="inline-flex h-11 w-11 items-center justify-center text-paper-faint transition-colors hover:text-stamp-text focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-[-4px] focus-visible:outline-stamp"
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  )
}

/**
 * One form, two placements. Each instance mints its own input id so the two
 * copies never collide in the document, and the label stays bound either way.
 */
function NewsletterForm({
  labelledBy,
  className = "",
}: {
  labelledBy: string
  className?: string
}) {
  const inputId = useId()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    try {
      trackNewsletterSignup(email, "footer", true)
      // TODO: integrar con servicio real (Mailchimp / Resend / Buttondown).
      await new Promise((resolve) => setTimeout(resolve, 500))
      setEmail("")
      toast.success("¡Gracias por suscribirte!", {
        description: "Te avisaré cuando publique algo nuevo.",
      })
    } catch {
      trackNewsletterSignup(email, "footer", false)
      toast.error("Error al suscribirse", {
        description: "Inténtalo de nuevo en un momento.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={className} aria-labelledby={labelledBy} onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="sr-only">
        Correo electrónico
      </label>
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
        className="min-h-[52px] w-full border border-rule bg-field px-3 font-sans text-base text-paper transition-colors placeholder:text-paper-faint hover:border-rule-strong disabled:opacity-50"
      />
      <button type="submit" disabled={isSubmitting} className="cta mt-3">
        {isSubmitting ? "Suscribiendo…" : "Suscribirme"}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  )
}
