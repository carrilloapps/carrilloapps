"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Download } from "lucide-react"
import { Github, Linkedin, Substack, Mail } from "@/components/icons/social-icons"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { trackCTAClick, trackButtonClick } from "@/lib/analytics"

interface HomeHeroProps {
  /** Triggered when the user clicks the "Descargar CV" button. */
  onRequestCv: () => void
}

/**
 * Hero block for the home page: badge → headline → tagline → CTAs → profile
 * portrait → social row. Self-contained and self-styled so it can be reused
 * by future landing pages with no carrier sections required.
 *
 * The CV download flow is delegated to the parent (via `onRequestCv`) so the
 * modal state lives next to its other consumers without this component
 * needing to know anything about it.
 */
export function HomeHero({ onRequestCv }: HomeHeroProps) {
  return (
    <AnimatedSection
      className="relative flex min-h-[calc(100svh-80px)] w-full flex-col justify-center pt-12 pb-20 md:min-h-screen md:pt-16 md:pb-24"
      role="banner"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto flex flex-1 flex-col justify-center px-4">
        <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
          {/* Mobile: image first; desktop: copy first. */}
          <div className="order-2 space-y-8 text-center md:order-1 md:text-left">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 px-4 py-2 text-sm font-medium text-emerald-400 shadow-lg shadow-emerald-600/10 backdrop-blur-sm"
                role="text"
              >
                Tech Leader | Senior Software Developer
              </div>
            </div>
            <h1
              id="hero-heading"
              className="text-5xl leading-tight font-extrabold tracking-tighter md:text-6xl lg:text-7xl"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
                Junior Carrillo
              </span>
            </h1>
            <p
              className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 md:mx-0 md:text-xl"
              role="text"
            >
              Como desarrollador de software senior y líder técnico, me especializo en la creación
              de{" "}
              <span className="font-semibold text-blue-300">
                soluciones de pago y sistemas financieros
              </span>{" "}
              de alta transaccionalidad y seguridad.
            </p>
            <div
              className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start"
              role="group"
              aria-label="Acciones principales"
            >
              <Button
                variant="gradient"
                size="xl"
                className="group w-full touch-manipulation font-bold sm:w-auto"
                asChild
                onClick={() => trackCTAClick("Contactarme", "primary", "home-hero")}
              >
                <Link href="/contacto" aria-describedby="contact-me-desc">
                  Contactarme
                  <ArrowRight
                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  <span id="contact-me-desc" className="sr-only">
                    Conversemos más a fondo sobre lo que desees
                  </span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="xl"
                className="w-full touch-manipulation text-zinc-400 hover:bg-transparent hover:text-white sm:w-auto"
                onClick={() => {
                  trackButtonClick("Descargar CV", "home-hero")
                  onRequestCv()
                }}
                aria-describedby="download-cv-desc"
              >
                Descargar CV
                <Download className="ml-2 h-4 w-4" aria-hidden="true" />
                <span id="download-cv-desc" className="sr-only">
                  Abrir formulario para descargar mi currículum vitae
                </span>
              </Button>
            </div>
          </div>

          {/* Profile portrait — tuned for LCP. */}
          <div
            className="group relative order-1 flex items-center justify-center md:order-2"
            role="img"
            aria-label="Foto de perfil de Junior Carrillo"
          >
            <div className="relative h-[320px] w-[320px] rounded-full md:h-[380px] md:w-[380px] lg:h-[420px] lg:w-[420px]">
              <div
                className="relative h-full w-full overflow-hidden rounded-full border-4 border-blue-500/40 transition-all duration-500 group-hover:border-blue-400/60"
                style={{
                  boxShadow:
                    "0 0 40px rgba(59, 130, 246, 0.25), 0 0 80px rgba(147, 51, 234, 0.15), 0 20px 60px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Junior Carrillo, desarrollador de software senior y líder técnico especializado en sistemas financieros"
                  width={420}
                  height={420}
                  className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  fetchPriority="high"
                  loading="eager"
                  quality={90}
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 380px, 420px"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/5 via-purple-600/3 to-transparent" />
              </div>

              {/* Status pill. */}
              <div className="absolute right-4 bottom-4 z-10 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-black/90 px-3 py-2 shadow-xl shadow-emerald-600/10 backdrop-blur-sm">
                <div
                  className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                  aria-hidden="true"
                />
                <div className="text-white">
                  <div className="text-xs leading-tight text-zinc-400">Status</div>
                  <div className="text-sm leading-tight font-semibold text-emerald-400">
                    On Work
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SocialRow />
      </div>

      {/* Soft hairline divider — separates hero from the rest of the page. */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"
        aria-hidden="true"
      />
    </AnimatedSection>
  )
}

function SocialRow() {
  const links = [
    {
      href: "https://github.com/carrilloapps",
      label: "GitHub",
      icon: <Github className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />,
    },
    {
      href: "https://linkedin.com/in/carrilloapps",
      label: "LinkedIn",
      icon: <Linkedin className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />,
    },
    {
      href: "https://x.com/carrilloapps",
      label: "X / Twitter",
      icon: (
        <svg
          className="h-6 w-6 md:h-7 md:w-7"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      href: "https://carrilloapps.substack.com/",
      label: "Substack",
      icon: <Substack className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />,
    },
    {
      href: "mailto:m@carrillo.app",
      label: "Email",
      icon: <Mail className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />,
    },
  ]

  return (
    <div
      className="flex items-center justify-center gap-4 pt-8 md:justify-start md:gap-8"
      aria-label="Enlaces de redes sociales"
    >
      {links.map((link) => {
        const isExternal = link.href.startsWith("http")
        return (
          <Link
            key={link.label}
            href={link.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="flex min-h-[48px] min-w-[48px] touch-manipulation items-center justify-center rounded-lg p-3 text-slate-400 transition-colors duration-200 hover:text-blue-400 focus-visible:text-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500/50 md:p-4"
            aria-label={
              isExternal
                ? `Visitar mi perfil de ${link.label} (se abre en nueva ventana)`
                : `Enviar correo electrónico a ${link.label}`
            }
          >
            {link.icon}
          </Link>
        )
      })}
    </div>
  )
}
