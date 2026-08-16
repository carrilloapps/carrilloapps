"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, RotateCw } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"

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
        <section
          className="relative w-full pt-6 pb-20 md:pt-10 md:pb-28"
          aria-labelledby="error-heading"
        >
          <div className="container mx-auto px-4">
            <p className="font-mono text-[11px] tracking-[0.16em] text-stamp-text uppercase">
              Error 500 · Asiento fallido
            </p>

            <h1
              id="error-heading"
              className="mt-3 max-w-[18ch] font-sans text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-balance text-paper"
            >
              Algo se rompió de mi lado
            </h1>

            <div className="mt-8 grid gap-x-14 gap-y-8 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
              <div className="max-w-[62ch] space-y-5 font-sans text-base leading-relaxed text-paper-dim md:text-lg">
                <p>
                  No es culpa tuya ni del enlace: esta página lanzó un error al construirse. Suele
                  ser pasajero — reintentar la carga resuelve la mayoría de los casos.
                </p>
                <p>
                  Si vuelve a ocurrir, escríbeme con el identificador de abajo. Con él encuentro
                  exactamente esta ejecución en los registros.
                </p>
              </div>

              <dl className="self-start border-y border-rule">
                <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
                  <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                    Identificador
                  </dt>
                  <dd className="text-right font-mono text-sm break-all text-paper">
                    {error.digest ?? "sin registro"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                    Estado
                  </dt>
                  <dd className="text-right font-sans text-base text-paper">Reintentable</dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t-2 border-rule-strong pt-5">
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
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
