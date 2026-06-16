"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Briefcase } from "lucide-react"
import { motion } from "@/lib/motion"
import { Button } from "@/components/ui/button"
import { SurfaceCard } from "@/components/ui/surface-card"
import { Section } from "@/components/ui/section"
import { Pill } from "@/components/ui/pill"
import { StatTiles } from "@/components/ui/stat-tiles"
import { useIsMobile } from "@/hooks/use-media-query"
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
 * Línea de tiempo de roles recientes en formato case-study. Cada card lidera
 * con el outcome, soporta tres stat tiles y degrada el stack a una línea
 * sutil. Mismo lenguaje visual que `<ProjectsSection>` para que el home lea
 * como una sola pieza coherente.
 */
export function ExperienceSection({
  entries = DEFAULT_ENTRIES,
  showCta = true,
}: ExperienceSectionProps) {
  const isMobile = useIsMobile()

  return (
    <Section
      header={{
        eyebrow: "Trayectoria",
        eyebrowIcon: Briefcase,
        title: "Roles que dejaron huella",
        description:
          "Más de una década construyendo plataformas críticas para banca, pagos y fintech — con números reales detrás de cada rol.",
        headingId: "experience-heading",
        align: "left",
      }}
    >
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry, index) => (
            <ExperienceCard
              key={entry.id}
              entry={entry}
              index={index}
              wide={!isMobile && index === 2 && entries.length === 3}
            />
          ))}
        </div>

        {showCta && (
          <div className="text-center mt-10">
            <Button variant="ghostLink" size="lg" asChild>
              <Link
                href="/sobre-mi"
                className="inline-flex items-center gap-2 min-h-[48px] touch-manipulation"
                onClick={() =>
                  trackButtonClick(
                    "Ver más experiencia",
                    "home-experience-section"
                  )
                }
              >
                Ver toda la trayectoria
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">
                  - Navegar a la página completa de experiencia laboral
                </span>
              </Link>
            </Button>
          </div>
        )}
    </Section>
  )
}

interface ExperienceCardProps {
  entry: ExperienceEntry
  /** Stagger index — usado para offsetear el delay de entrada. */
  index?: number
  /** Span 2 columnas en sm pero quedarse en 1 col en lg — útil para que la
   *  3ra card no quede huérfana en tablet. */
  wide?: boolean
}

/**
 * Card individual de experiencia. Estructura:
 *
 *   [Período · Empresa]
 *   Outcome headline (protagonista)
 *   Rol — Empresa
 *   Descripción rica
 *   ─────
 *   [Stat tile · Stat tile · Stat tile]
 *   Stack: tech1 · tech2 · tech3
 *
 * Exportada para reusarse standalone (página /sobre-mi) con la misma estética.
 */
export function ExperienceCard({
  entry,
  index = 0,
  wide = false,
}: ExperienceCardProps) {
  const initials = entry.company
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      whileHover={{ y: -6 }}
      className={`group h-full ${wide ? "lg:col-span-1 sm:col-span-2" : ""}`}
    >
      <SurfaceCard
        as="article"
        className="h-full flex flex-col"
        aria-labelledby={`exp-${entry.id}-title`}
      >
        <div className="flex flex-col gap-5 p-6 flex-1">
          <div className="flex items-center justify-between gap-3">
            {entry.logo ? (
              // Brand logo on a uniform, centered light chip — consistent size
              // across companies and a soft ring/shadow so it reads as an
              // intentional lockup, not a stark sticker.
              <div className="inline-flex h-9 items-center justify-center rounded-xl bg-white px-3.5 ring-1 ring-black/[0.06] shadow-md shadow-black/20 transition-transform duration-300 group-hover:scale-105">
                <span className="relative block h-5 w-[5.5rem]">
                  <Image
                    src={entry.logo}
                    alt={`Logo de ${entry.company}`}
                    fill
                    sizes="150px"
                    className="object-contain object-center"
                  />
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2.5 rounded-xl bg-white/[0.06] border border-white/10 px-3 h-9 transition-transform duration-300 group-hover:scale-105">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border border-white/10 text-[11px] font-bold text-white"
                  aria-hidden="true"
                >
                  {initials}
                </span>
                <span className="text-sm font-semibold text-white whitespace-nowrap">
                  {entry.company}
                </span>
              </div>
            )}
            <Pill variant="accent" size="sm">
              {entry.period}
            </Pill>
          </div>

          <div className="space-y-2">
            <h3
              id={`exp-${entry.id}-title`}
              className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight"
            >
              {entry.outcome}
            </h3>
            <p className="text-sm text-zinc-400 font-medium">
              {entry.role} · {entry.company}
            </p>
          </div>

          <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
            {entry.description}
          </p>

          <div className="mt-auto pt-6 border-t border-white/[0.06] space-y-7">
            {entry.metrics && entry.metrics.length > 0 && (
              <StatTiles
                metrics={entry.metrics}
                size="sm"
                ariaLabel="Métricas del rol"
                variant="plain"
              />
            )}

            {entry.technologies?.length > 0 && (
              <div className="flex items-center mt-6 gap-2 text-xs text-zinc-500 flex-wrap">
                <span className="uppercase tracking-[0.14em] font-medium text-zinc-400">
                  Stack
                </span>
                <span className="text-zinc-700" aria-hidden="true">
                  ·
                </span>
                <span className="font-mono text-zinc-400">
                  {entry.technologies.slice(0, 6).join(" · ")}
                </span>
              </div>
            )}
          </div>
        </div>
      </SurfaceCard>
    </motion.div>
  );
}
