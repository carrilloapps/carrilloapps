"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { trackCTAClick } from "@/lib/analytics"

interface LedgerFigure {
  /** What was measured. */
  concept: string
  /** Who it was measured at. Attribution is the proof. */
  org: string
  /** The figure itself, already formatted. */
  value: string
  /** Optional unit or qualifier. */
  unit?: string
}

interface HomeStatsProps {
  figures?: LedgerFigure[]
  ariaLabel?: string
}

/**
 * The balance page.
 *
 * This section used to be a fourth list of rows, which made the whole page
 * read as one long table. A statement does not set its balance at body size —
 * it prints it large, in its own field, because the number is the point. So
 * the figures run at display scale across ruled columns, and everything that
 * qualifies them (concept, employer) stays small underneath.
 *
 * Same grammar as the rest of the page — rules, mono labels, tabular figures —
 * at a completely different density.
 */
const DEFAULT_FIGURES: LedgerFigure[] = [
  {
    value: "12M",
    concept: "Facturas conciliadas por trimestre",
    org: "Yummy (YC S21)",
  },
  {
    value: "13M",
    concept: "Pagadores en la red",
    org: "Wompi · Bancolombia",
  },
  {
    value: "$50B",
    unit: "COP",
    concept: "Procesado al año",
    org: "Wompi · Bancolombia",
  },
  {
    value: "4d → 15min",
    concept: "Ciclo de facturación",
    org: "Yummy (YC S21)",
  },
]

export function HomeStats({
  figures = DEFAULT_FIGURES,
  ariaLabel = "Cifras de producción",
}: HomeStatsProps) {
  return (
    <section className="relative py-14 md:py-20" aria-labelledby="figures-heading">
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex items-baseline justify-between border-b border-rule-strong pb-2">
          <h2
            id="figures-heading"
            className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase"
          >
            Cifras de producción
          </h2>
          <span
            className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase"
            aria-hidden="true"
          >
            Verificable en referencias
          </span>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" aria-label={ariaLabel}>
          {figures.map((figure, i) => (
            <div
              key={figure.concept}
              className={`flex flex-col justify-between gap-6 border-b border-rule py-8 md:py-10 lg:border-b-0 ${
                i > 0 ? "sm:odd:border-l-0 lg:border-l lg:border-rule lg:pl-6" : ""
              } ${i % 2 === 1 ? "sm:border-l sm:border-rule sm:pl-6 lg:pl-6" : ""}`}
            >
              <dd className="font-mono text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[0.9] text-paper tabular-nums">
                {figure.value}
                {figure.unit ? (
                  <span className="ml-2 align-super text-base text-paper-faint">{figure.unit}</span>
                ) : null}
              </dd>
              <dt>
                <span className="block max-w-[22ch] font-sans text-sm leading-snug text-paper-dim">
                  {figure.concept}
                </span>
                <span className="mt-2 block font-mono text-[10px] tracking-[0.12em] text-paper-faint uppercase">
                  {figure.org}
                </span>
              </dt>
            </div>
          ))}
        </dl>

        {/* Where these numbers came from. The role history used to run inline
            underneath; it is a full account and belongs on its own page. */}
        <div className="flex flex-col gap-4 border-t-2 border-rule-strong pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[52ch] font-sans text-base text-paper-dim">
            Cada cifra salió de un rol concreto, con un equipo y un sistema en producción detrás.
          </p>
          <Link
            href="/sobre-mi"
            onClick={() => trackCTAClick("Ver trayectoria", "secondary", "home-stats")}
            className="cta"
          >
            Roles donde dejé huella
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
