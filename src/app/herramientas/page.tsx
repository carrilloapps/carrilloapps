"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { OpenSourceSection } from "@/components/open-source-section"
import { AnimatedSection } from "@/components/animated-section"
import { trackCTAClick } from "@/lib/analytics"

/**
 * The tools register, in full.
 *
 * The home page shows the three installable tools that make its case and then
 * points here. This page is the complete register: everything published to npm
 * and every GitHub project worth handing to someone else, with the room to say
 * what each one is for.
 */
export default function HerramientasPage() {
  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        <AnimatedSection
          className="relative pt-10 pb-4 md:pt-14"
          aria-labelledby="tools-page-heading"
        >
          <div className="container mx-auto px-4">
            <h1
              id="tools-page-heading"
              className="max-w-[18ch] font-sans text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-paper"
            >
              Herramientas que mantengo
            </h1>

            <div className="mt-8 grid gap-x-12 gap-y-6 border-t border-rule pt-6 md:grid-cols-[minmax(0,42rem)_minmax(0,1fr)]">
              <p className="font-sans text-lg leading-relaxed text-paper-dim md:text-xl">
                Todo lo que publico como código abierto sale de un problema que tuve que resolver en
                producción: consultar tasas oficiales sin depender de un tercero, cifrar un archivo
                sin confiar en el servidor, mantener sincronizadas las reglas de varios agentes de
                IA. Si te ahorra el mismo rato que me ahorró a mí, cumplió su función.
              </p>

              <p className="font-mono text-[11px] leading-relaxed tracking-[0.06em] text-paper-faint uppercase">
                Publicado en npm y GitHub
                <br />
                Licencia MIT salvo indicación
                <br />
                Issues y PRs bienvenidos
              </p>
            </div>
          </div>
        </AnimatedSection>

        <OpenSourceSection showHeading={false} />

        <AnimatedSection className="relative pb-20 md:pb-28">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 border-t-2 border-rule-strong pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[46ch] font-sans text-base text-paper-dim">
                ¿Falta algo que te serviría? Cuéntame qué estás construyendo.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="https://github.com/carrilloapps?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick("GitHub", "primary", "herramientas-footer")}
                  className="cta"
                >
                  Ver todo en GitHub
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contacto"
                  onClick={() => trackCTAClick("Contacto", "secondary", "herramientas-footer")}
                  className="cta-quiet"
                >
                  Escribirme
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <SiteFooter />
    </div>
  )
}
