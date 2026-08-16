"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, CalendarDays } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { HomeJsonLd } from "@/components/home-jsonld"
import { LatestPostsAside } from "@/components/latest-posts-section"
import { HomeHero } from "@/components/home/home-hero"
import { HomeStats } from "@/components/home/home-stats"
import { CalPopupButton } from "@/components/cal-booking"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { trackScrollDepth, trackCTAClick } from "@/lib/analytics"

/**
 * The home ledger.
 *
 * Three entries, in the order a reader needs them: who is writing and the
 * three tools that prove it, the numbers behind them, and a closing essay
 * with the latest writing running alongside it. Depth lives one click away,
 * never inlined.
 *
 * What used to be here and is not any more:
 *   - A contact form. `/contacto` owns that conversation and the header opens
 *     the calendar directly; a third copy on the home page split the action
 *     three ways and carried ~130 lines of rate limiting, honeypot and
 *     obfuscation logic that now lives in exactly one place.
 *   - A "Casos de impacto" grid. It proved the same thing as the trajectory
 *     entries with the same shape; the cases live on `/recursos`.
 *   - A skills marquee. A scrolling band of logos is not readable content —
 *     the stack is now written into prose, where a reader and a crawler can
 *     both use it.
 *   - The full open-source register and the role history. Both were long
 *     enough to deserve their own page and short-changed here: the tools now
 *     live at /recursos and the roles at /sobre-mi, each reachable from
 *     the entry that makes their case.
 */
export default function Home() {
  // Scroll depth tracking — fires once per quartile.
  useEffect(() => {
    const scrollDepths = [25, 50, 75, 100] as const
    const tracked = new Set<number>()

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      if (total <= 0) return
      const pct = Math.round((scrolled / total) * 100)
      for (const depth of scrollDepths) {
        if (pct >= depth && !tracked.has(depth)) {
          tracked.add(depth)
          trackScrollDepth(depth)
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        <HomeHero />

        <HomeStats />

        <ClosingEntry />
      </main>

      <SiteFooter />
      <HomeJsonLd />
    </div>
  )
}

/**
 * The closing entry.
 *
 * The page ends on a real close rather than a form: what I actually do, in
 * enough words to be worth reading and to describe the practice to a crawler,
 * then the two ways to continue — the calendar, and the contact route.
 */
function ClosingEntry() {
  return (
    <AnimatedSection
      id="contact"
      className="relative pt-10 md:pt-16"
      role="region"
      aria-labelledby="closing-heading"
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title="Sistemas de pago que no pueden fallar" headingId="closing-heading" />

        <div className="grid gap-x-14 gap-y-10 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <div className="space-y-5 font-sans text-base leading-relaxed text-paper-dim md:text-lg">
            <p>
              Diseño y opero la infraestructura financiera que mueve dinero en América Latina:
              pasarelas de pago, conciliación de alto volumen, core bancario y los servicios que los
              sostienen cuando el tráfico se multiplica. Es un dominio donde un error no es un bug
              cosmético — es plata que no llega, una factura que se duplica o una auditoría que no
              cuadra.
            </p>
            <p>
              Mi trabajo diario combina tres cosas: arquitectura de microservicios y event sourcing
              para que los sistemas sigan siendo comprensibles cuando crecen; observabilidad y
              pruebas para que los fallos se detecten antes que el usuario; y liderazgo técnico, que
              en la práctica significa que otras siete personas puedan tomar buenas decisiones sin
              esperarme.
            </p>
            <p>
              Trabajo sobre TypeScript y Node.js, con NestJS y React en el día a día, PostgreSQL y
              MongoDB como almacenamiento, y Kafka o RabbitMQ cuando el flujo lo pide. Despliego en
              AWS y GCP con Terraform y Docker, bajo requisitos de PCI-DSS e ISO 27001 — porque en
              pagos el cumplimiento no es una fase final, es una restricción de diseño desde el
              primer día.
            </p>
            <p>
              Lo que aprendo operando estos sistemas termina publicado: como{" "}
              <Link
                href="#open-source-heading"
                className="text-paper underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text hover:decoration-stamp"
              >
                herramientas de código abierto
              </Link>{" "}
              que puedes instalar hoy, o como artículos en Substack donde explico qué se rompió y
              cómo se arregló.
            </p>
          </div>

          {/* The writing rail. The posts used to hold a section of their own,
              which made a short page carry two consecutive reading blocks. As
              a margin column they support the essay instead of competing with
              it — the same relationship a feature has with its "latest" rail. */}
          <div className="md:border-l md:border-l-rule md:pl-10">
            <LatestPostsAside />
          </div>
        </div>

        {/* The total line: every way to continue, across the full measure. */}
        <div className="mt-12 grid gap-x-10 gap-y-6 border-t-2 border-rule-strong pt-6 sm:grid-cols-3">
          <div>
            <CalPopupButton source="home-closing" aria-label="Agendar una asesoría" className="cta">
              Agendar una asesoría
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
            </CalPopupButton>
            <p className="mt-2 max-w-[34ch] font-sans text-sm text-paper-dim">
              30 minutos, sobre tu arquitectura de pagos.
            </p>
          </div>

          <div>
            <Link
              href="/contacto"
              onClick={() => trackCTAClick("Contacto", "secondary", "home-closing")}
              className="cta-quiet"
            >
              Escribirme
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <p className="mt-2 max-w-[34ch] font-sans text-sm text-paper-dim">
              Respondo en menos de 24 horas hábiles.
            </p>
          </div>

          <div>
            <Link
              href="/servicios"
              onClick={() => trackCTAClick("Servicios", "secondary", "home-closing")}
              className="cta-quiet"
            >
              Ver servicios
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <p className="mt-2 max-w-[34ch] font-sans text-sm text-paper-dim">
              Consultoría, auditoría y liderazgo técnico.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
