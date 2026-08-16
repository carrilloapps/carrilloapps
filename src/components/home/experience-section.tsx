"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { trackButtonClick } from "@/lib/analytics"
import type { ProjectMetric } from "@/types/project"

export interface ExperienceEntry {
  id: string
  /** Período — se renderiza como chip ("2024 - Presente"). */
  period: string
  role: string
  company: string
  /** Optional brand logo (committed under /public/brands). Rendered on a light
   *  plate inside the card header. */
  logo?: string
  /** Headline orientado a outcome — protagonista visual de la card. */
  outcome: string
  /** Descripción rica de lo que hiciste / contexto. */
  description: string
  /** 3 stat tiles que reemplazan a la fila de tech-badges legacy. */
  metrics?: ProjectMetric[]
  /** Stack técnico — se renderiza como línea sutil al pie del card. */
  technologies: string[]
}

const DEFAULT_ENTRIES: ExperienceEntry[] = [
  {
    id: "yummy",
    period: "2024 — Presente",
    role: "Tech Leader",
    company: "Yummy Inc.",
    logo: "/brands/yummy.png",
    outcome: "Liderando pagos para una super-app de LATAM",
    description:
      "Conduzco un equipo de 7 desarrolladores en el diseño e implementación de herramientas de Pagos y Finanzas. Implementación de medios de pago y arquitectura de microservicios que mejoraron la confiabilidad del sistema en un 40%.",
    metrics: [
      { value: "7", label: "Team players" },
      { value: "+40%", label: "Confiabilidad" },
      { value: "2M", label: "Tx/día" },
    ],
    technologies: ["Node.js", "React", "AWS", "Microservicios"],
  },
  {
    id: "cencosud",
    period: "2022 — 2023",
    role: "Developer Lead",
    company: "Cencosud S.A.",
    logo: "/brands/cencosud.png",
    outcome: "2M+ transacciones semanales conciliadas con SAP",
    description:
      "Desarrollé herramientas y módulos de contabilidad con integración en SAP que gestionan cerca de 2 millones de transacciones semanales. Optimicé consultas de bases de datos y procesos batch, recortando el tiempo de procesamiento en un 60%.",
    metrics: [
      { value: "2M+", label: "Tx/semana" },
      { value: "−60%", label: "Tiempo" },
      { value: "SAP", label: "Integración" },
    ],
    technologies: ["TypeScript", "Amazon Redshift", "Terraform"],
  },
  {
    id: "sky",
    period: "2021 — 2022",
    role: "Sr. Software Engineer",
    company: "Sky Airline",
    logo: "/brands/sky.png",
    outcome: "1M+ transacciones mensuales en mobile",
    description:
      "Construí varios microservicios — entre ellos la gestión de perfiles — y escalé hasta Tech Leader Backup. Junto a mi equipo desarrollé la nueva versión de AppSales mientras se sostenía la versión anterior con más de 1 millón de transacciones mensuales en Android e iOS.",
    metrics: [
      { value: "1M+", label: "Tx/mes mobile" },
      { value: "iOS+", label: "Android" },
      { value: "5+", label: "Microservicios" },
    ],
    technologies: ["React Native", "NestJS", "Firebase", "GCP"],
  },
]

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
  entries = DEFAULT_ENTRIES,
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
