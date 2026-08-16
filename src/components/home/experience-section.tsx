"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { trackButtonClick } from "@/lib/analytics"
import { EXPERIENCE, type ExperienceEntry } from "@/lib/data/experience"

interface ExperienceSectionProps {
  /** Override de las entradas — defaultea al historial de José. */
  entries?: ExperienceEntry[]
  /** Oculta el CTA "Ver más experiencia" cuando se usa fuera del home. */
  showCta?: boolean
}

/**
 * Trayectoria como cronología, no como tabla.
 *
 * Tres secciones seguidas de filas convierten la página en un solo listado.
 * Un extracto tampoco imprime así su histórico: lo fecha y lo narra. Aquí cada
 * rol cuelga de un eje vertical — el año en el margen, un nodo en la regla, y
 * el cuerpo en prosa con sus métricas inline en vez de en una columna aparte.
 *
 * Misma gramática (regla, mono, cifras tabulares), otra estructura.
 */
export function ExperienceSection({
  entries = EXPERIENCE,
  showCta = true,
}: ExperienceSectionProps) {
  return (
    <Section
      header={{
        title: "Roles que dejaron huella",
        description:
          "Más de una década construyendo plataformas críticas para banca, pagos y fintech.",
        headingId: "experience-heading",
      }}
    >
      <ol className="relative">
        {/* El eje. Una sola regla continua sostiene toda la cronología. */}
        <span
          className="absolute top-2 bottom-2 left-0 hidden w-px bg-rule md:block"
          aria-hidden="true"
        />

        {entries.map((entry) => (
          <ExperienceEntryBlock key={entry.id} entry={entry} />
        ))}
      </ol>

      {showCta && (
        <div className="mt-10 flex justify-end border-t border-rule-strong pt-4">
          <Link
            href="/sobre-mi"
            className="cta-quiet"
            onClick={() => trackButtonClick("Ver más experiencia", "home-experience-section")}
          >
            Ver toda la trayectoria
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">Navegar a la página completa de experiencia laboral</span>
          </Link>
        </div>
      )}
    </Section>
  )
}

function ExperienceEntryBlock({ entry }: { entry: ExperienceEntry }) {
  const metrics = (entry.metrics ?? []).slice(0, 3)

  return (
    <li className="relative pb-12 md:pl-12 md:last:pb-0">
      {/* El nodo del año sobre el eje. */}
      <span
        className="absolute top-[0.6rem] -left-[3px] hidden h-[7px] w-[7px] bg-stamp md:block"
        aria-hidden="true"
      />

      <p className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase">
        {entry.period}
      </p>

      <h3 className="mt-3 max-w-[24ch] font-sans text-2xl leading-[1.1] font-medium tracking-[-0.02em] text-paper md:text-3xl">
        {entry.outcome}
      </h3>

      <p className="mt-2 font-mono text-[11px] tracking-[0.1em] text-paper-dim uppercase">
        {entry.role} · {entry.company}
      </p>

      <p className="mt-4 max-w-[70ch] font-sans text-base leading-relaxed text-paper-dim">
        {entry.description}
      </p>

      {metrics.length > 0 ? (
        <ul className="mt-5 flex flex-wrap items-baseline gap-x-8 gap-y-2">
          {metrics.map((metric) => (
            <li key={metric.label} className="flex items-baseline gap-2">
              <span className="font-mono text-lg text-paper tabular-nums">{metric.value}</span>
              <span className="font-mono text-[10px] tracking-[0.1em] text-paper-faint uppercase">
                {metric.label}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-4 font-mono text-[11px] text-paper-faint">
        {entry.technologies.slice(0, 6).join(" · ")}
      </p>
    </li>
  )
}
