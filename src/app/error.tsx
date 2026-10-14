"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, RotateCw } from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { DynamicBackground } from "@/components/layout/dynamic-background"
import { PageHero } from "@/components/layout/page-hero"
import { SpecList } from "@/components/ui/spec-list"

/**
 * The route-level error boundary.
 *
 * The app had none, so any thrown render error fell through to Next's default
 * black-on-white stack trace — a different site, in a different typeface,
 * telling a visitor about a digest hash. This states what happened, offers the
 * one action that usually fixes it, and keeps the header and footer so the
 * reader is still somewhere rather than nowhere.
 *
 * `digest` is the only thing worth surfacing: it is the id that ties what the
 * visitor saw to the entry in the server logs, so quoting it in a message
 * actually helps.
 */
export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        <PageHero
          eyebrow="Error 500 · Asiento fallido"
          eyebrowTone="stamp"
          title="Algo se rompió de mi lado"
          headingId="error-heading"
          className="pb-20 md:pb-28"
          asideWidth="lg"
          aside={
            <SpecList
              items={[
                {
                  term: "Identificador",
                  value: (
                    <span className="font-mono text-sm break-all">
                      {error.digest ?? "sin registro"}
                    </span>
                  ),
                },
                { term: "Estado", value: "Reintentable" },
              ]}
            />
          }
          actions={
            <>
              <button type="button" onClick={reset} className="cta cursor-pointer">
                Reintentar
                <RotateCw className="h-4 w-4" aria-hidden="true" />
              </button>
              <Link href="/" className="cta-quiet">
                Ir al inicio
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link href="/contacto" className="cta-quiet">
                Reportarlo
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </>
          }
        >
          <p>
            No es culpa tuya ni del enlace: esta página lanzó un error al construirse. Suele ser
            pasajero — reintentar la carga resuelve la mayoría de los casos.
          </p>
          <p>
            Si vuelve a ocurrir, escríbeme con el identificador de abajo. Con él encuentro
            exactamente esta ejecución en los registros.
          </p>
        </PageHero>
      </main>

      <SiteFooter />
    </div>
  )
}
