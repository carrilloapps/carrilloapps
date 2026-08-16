"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { Mail, MapPin, ArrowUpRight } from "lucide-react"
import { SERVICES as SERVICE_CATALOGUE } from "@/lib/data/services"
import { Github, Linkedin, Substack } from "@/components/icons/social-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { trackSocialClick, trackNavigation, trackNewsletterSignup } from "@/lib/analytics"
import { toast } from "sonner"

// Computed at module load, safe for both server and client.
const currentYear = new Date().getFullYear()

const QUICK_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Herramientas", href: "/herramientas" },
  { label: "Recursos", href: "/recursos" },
  { label: "Substack", href: "https://carrilloapps.substack.com/" },
  { label: "Contacto", href: "/contacto" },
] as const

// Derived from the catalogue rather than hand-kept: this list held four of the
// seven services, pointing at fragments of a page that no longer has them.
const SERVICE_LINKS = SERVICE_CATALOGUE.slice(0, 4).map((service) => ({
  label: service.title,
  href: `/servicios/${service.slug}`,
}))

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/carrilloapps",
    Icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/carrilloapps",
    Icon: Linkedin,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/carrilloapps",
    Icon: XIcon,
  },
  {
    label: "Substack",
    href: "https://carrilloapps.substack.com/",
    Icon: Substack,
  },
] as const

const LEGAL_LINKS = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos", href: "/terminos" },
  { label: "Cookies", href: "/cookies" },
] as const

/**
 * Footer del sitio — pieza estructurada en tres bandas:
 *
 *   1. Columnas de navegación y newsletter.
 *   2. Columns band — 4 columnas en lg, 2 en sm, 1 en mobile:
 *        Brand + tagline + social  ·  Navega  ·  Servicios  ·  Newsletter
 *      Newsletter usa `<Button variant="outline">` (mismo CTA que el hero)
 *      y `<Input>` con el palette slate del home.
 *
 *   3. Bottom band — copyright a la izquierda, legales a la derecha.
 *
 * Cada banda está separada por un regla hairline (`bg-rule`)
 * to-transparent`) en vez de borders flat — coherente con el lenguaje del
 * `surface-card`. Base `bg-ink` con una regla de sello arriba, sin wash radial:
 * "firmar" el inicio del footer sin pelear con la última sección del home.
 */
export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    <footer
      className="relative isolate overflow-hidden border-t border-rule-strong bg-ink text-paper-dim"
      role="contentinfo"
    >
      {/* Glow ambiental — un wash sutil del azul/violeta del sistema en el
          tope del footer, para que la transición desde la última sección
          del home (Casos de impacto / Contacto) se sienta lograda. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64"
        aria-hidden="true"
      ></div>

      {/* Hairline superior — firma del inicio del footer. */}
      <div className="absolute inset-x-0 top-0 h-px bg-stamp/50" aria-hidden="true" />

      {/* Hairline divisor entre skills y columnas. */}
      <div className="container mx-auto px-4" aria-hidden="true">
        <div className="h-px bg-rule" />
      </div>

      {/* ── Banda 2 · Columnas (Brand · Navega · Servicios · Newsletter) ─ */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-paper-dim">
              Tech Leader & Senior Full Stack — especializado en sistemas de pago, microservicios y
              plataformas críticas.
            </p>
            <div className="flex items-center gap-3 text-xs text-paper-dim">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Medellín, CO · Remoto disponible</span>
            </div>
            <div className="flex gap-2 pt-1">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} de Junior Carrillo`}
                  onClick={() => trackSocialClick(label, "profile_visit", href)}
                  className="inline-flex h-10 w-10 items-center justify-center border border-rule bg-ink-raised text-paper-dim transition-colors hover:text-paper"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navega */}
          <FooterColumn id="footer-quick-links" title="Navega" links={QUICK_LINKS} />

          {/* Servicios */}
          <FooterColumn id="footer-services" title="Servicios" links={SERVICE_LINKS} />

          {/* Newsletter */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="space-y-1">
              <p className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase">
                Boletín
              </p>
              <h3 className="text-base font-bold text-paper" id="footer-newsletter">
                Conversemos por correo
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-paper-dim">
              Notas ocasionales sobre arquitectura, fintech y liderazgo técnico. Sin spam.
            </p>
            <form
              className="flex flex-col gap-2"
              aria-labelledby="footer-newsletter"
              onSubmit={handleNewsletterSubmit}
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Correo electrónico
              </label>
              <Input
                id="footer-newsletter-email"
                name="email"
                variant="glass"
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
              />
              <Button
                type="submit"
                variant="outline"
                size="default"
                className="w-full touch-manipulation"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-rule border-t-white" />
                    Suscribiendo…
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                    Suscribirme
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Banda 3 · Copyright + legales ───────────────────────────── */}
      <div className="container mx-auto px-4" aria-hidden="true">
        <div className="h-px bg-rule" />
      </div>
      <div className="container mx-auto px-4 py-6 md:py-7">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-xs text-paper-dim md:text-left">
            © {currentYear} Junior Carrillo. Todos los derechos reservados.
          </p>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
            aria-label="Enlaces legales"
          >
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => trackNavigation(label, href, "footer")}
                className="text-xs text-paper-dim transition-colors hover:text-zinc-200"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

/* ───────────────────────────── helpers ────────────────────────────── */

function FooterColumn({
  id,
  title,
  links,
}: {
  id: string
  title: string
  links: ReadonlyArray<{ label: string; href: string }>
}) {
  return (
    <div className="space-y-4">
      <p className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase" id={id}>
        {title}
      </p>
      <nav className="flex flex-col space-y-2.5" aria-labelledby={id}>
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={() => trackNavigation(label, href, "footer")}
            className="group inline-flex w-fit items-center gap-1.5 text-sm text-paper-dim transition-colors hover:text-paper"
          >
            <span>{label}</span>
            <ArrowUpRight
              className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
              aria-hidden="true"
            />
          </Link>
        ))}
      </nav>
    </div>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
