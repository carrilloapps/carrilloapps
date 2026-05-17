"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { Code2, Mail, MapPin, ArrowUpRight } from "lucide-react"
import { Github, Linkedin, Substack } from "@/components/icons/social-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { SkillsMarquee } from "@/components/skills-horizontal-section"
import {
  trackSocialClick,
  trackNavigation,
  trackNewsletterSignup,
} from "@/lib/analytics"
import { toast } from "sonner"

// Computed at module load, safe for both server and client.
const currentYear = new Date().getFullYear()

const QUICK_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Recursos", href: "/recursos" },
  { label: "Substack", href: "https://carrilloapps.substack.com/" },
  { label: "Contacto", href: "/contacto" },
] as const

const SERVICES = [
  { label: "Liderazgo técnico", href: "/servicios#technical-leadership" },
  { label: "Sistemas financieros", href: "/servicios#financial-systems" },
  { label: "Soluciones de backoffice", href: "/servicios#backoffice-solutions" },
  { label: "Diseño de arquitectura", href: "/servicios#architecture-design" },
] as const

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
 *   1. Skills band (top) — el `<SkillsMarquee>` (los dos marquees contra-
 *      rotativos del home) actúa como "identity strip" del footer, con un
 *      pequeño header editorial encima. Heredado de la sección de skills
 *      que vivía en el home, ahora reubicado aquí para liberar peso del
 *      main y darle al footer un visual hook propio.
 *
 *   2. Columns band — 4 columnas en lg, 2 en sm, 1 en mobile:
 *        Brand + tagline + social  ·  Navega  ·  Servicios  ·  Newsletter
 *      Newsletter usa `<Button variant="gradient">` (mismo CTA que el hero)
 *      y `<Input>` con el palette slate del home.
 *
 *   3. Bottom band — copyright a la izquierda, legales a la derecha.
 *
 * Cada banda está separada por un hairline gradient (`from-transparent via-X
 * to-transparent`) en vez de borders flat — coherente con el lenguaje del
 * `surface-card`. Base `bg-slate-950` con un wash radial superior tenue para
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
      className="relative isolate overflow-hidden bg-slate-950 text-zinc-300"
      role="contentinfo"
    >
      {/* Glow ambiental — un wash sutil del azul/violeta del sistema en el
          tope del footer, para que la transición desde la última sección
          del home (Casos de impacto / Contacto) se sienta lograda. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute right-1/4 top-10 h-[320px] w-[520px] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      {/* Hairline superior — firma del inicio del footer. */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
        aria-hidden="true"
      />

      {/* ── Banda 1 · Skills marquee ─────────────────────────────────── */}
      <section
        className="relative pt-12 md:pt-16 pb-10 md:pb-14"
        aria-labelledby="footer-skills-heading"
      >
        <div className="container mx-auto px-4 mb-8 md:mb-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <Code2 className="w-4 h-4 text-blue-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
                Stack
              </p>
              <h2
                id="footer-skills-heading"
                className="text-lg md:text-xl font-bold text-white leading-tight"
              >
                Habilidades técnicas
              </h2>
            </div>
          </div>
        </div>
        <SkillsMarquee />
      </section>

      {/* Hairline divisor entre skills y columnas. */}
      <div
        className="container mx-auto px-4"
        aria-hidden="true"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Banda 2 · Columnas (Brand · Navega · Servicios · Newsletter) ─ */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Tech Leader & Senior Full Stack — especializado en sistemas de
              pago, microservicios y plataformas críticas.
            </p>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
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
                  onClick={() =>
                    trackSocialClick(label, "profile_visit", href)
                  }
                  className="surface-card-subtle inline-flex h-10 w-10 items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navega */}
          <FooterColumn
            id="footer-quick-links"
            title="Navega"
            links={QUICK_LINKS}
          />

          {/* Servicios */}
          <FooterColumn
            id="footer-services"
            title="Servicios"
            links={SERVICES}
          />

          {/* Newsletter */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
                Boletín
              </p>
              <h3
                className="text-base font-bold text-white"
                id="footer-newsletter"
              >
                Conversemos por correo
              </h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Notas ocasionales sobre arquitectura, fintech y liderazgo
              técnico. Sin spam.
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
                variant="gradient"
                size="default"
                className="w-full touch-manipulation"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
      <div
        className="container mx-auto px-4"
        aria-hidden="true"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <div className="container mx-auto px-4 py-6 md:py-7">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 text-center md:text-left">
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
                className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors"
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
      <p
        className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium"
        id={id}
      >
        {title}
      </p>
      <nav
        className="flex flex-col space-y-2.5"
        aria-labelledby={id}
      >
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={() => trackNavigation(label, href, "footer")}
            className="group inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors w-fit"
          >
            <span>{label}</span>
            <ArrowUpRight
              className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
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
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
