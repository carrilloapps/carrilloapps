"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, FolderKanban } from "lucide-react"
import { motion } from "@/lib/motion"
import { type Project } from "@/types/project"
import { Button } from "@/components/ui/button"
import { SurfaceCard } from "@/components/ui/surface-card"
import { Section } from "@/components/ui/section"
import { StatTiles } from "@/components/ui/stat-tiles"
import { DynamicProjectDialog as ProjectDialog } from "@/components/dynamic-imports"
import { trackButtonClick, trackProjectView } from "@/lib/analytics"
import { projects as defaultProjects } from "@/lib/data/projects"

interface ProjectsSectionProps {
  /** Override de los proyectos — defaultea a la selección curada del home. */
  projects?: Project[]
  /** Oculta el CTA "Ver otros proyectos" cuando se usa fuera del home. */
  showCta?: boolean
}

/**
 * Grilla de proyectos destacados como case studies. Cada card lidera con el
 * outcome (headline encima de la imagen), seguido de tres stat tiles que
 * reemplazan a la antigua fila de badges de tecnologías. El stack técnico
 * pasa a una línea sutil al pie. Pensado para reusarse en otras páginas
 * (recursos, sobre-mí) inyectando otros proyectos vía `projects`.
 */
export function ProjectsSection({
  projects = defaultProjects,
  showCta = true,
}: ProjectsSectionProps) {
  return (
    <Section
      header={{
        eyebrow: "Portafolio",
        eyebrowIcon: FolderKanban,
        title: "Casos de impacto",
        description:
          "Sistemas financieros y de pagos que diseñé y operé en producción — con métricas reales detrás.",
        headingId: "projects-heading",
        align: "left",
      }}
    >
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {showCta && (
        <div className="mt-10 text-center">
          <Button variant="ghostLink" size="lg" asChild>
            <Link
              href="/recursos"
              className="inline-flex min-h-[48px] touch-manipulation items-center gap-2"
              onClick={() => trackButtonClick("Ver otros proyectos", "home-projects-section")}
            >
              Ver todos los casos
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">
                Navegar a la página de recursos para ver más proyectos
              </span>
            </Link>
          </Button>
        </div>
      )}
    </Section>
  )
}

interface ProjectCardProps {
  project: Project
  /** Stagger index — usado para offsetear el delay de entrada. */
  index?: number
}

/**
 * Card de case study individual. Estructura visual:
 *
 *   ┌─────────────────────────────────────┐
 *   │ [Imagen + gradient overlay]         │
 *   │   ↳ chips: industria · rol · año   │
 *   │   ↳ outcome headline (sobre la img)│
 *   ├─────────────────────────────────────┤
 *   │ [3 stat tiles]                      │
 *   │ Descripción rica                    │
 *   │ Stack técnico (línea muted)         │
 *   │            [Ver caso completo →]    │
 *   └─────────────────────────────────────┘
 *
 * Click en cualquier zona abre el `ProjectDialog` con el detalle completo.
 */
export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const headline = project.outcome ?? project.shortTitle
  const metrics = project.metrics ?? []

  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 + index * 0.1, duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="group h-full"
    >
      <ProjectDialog project={project}>
        <SurfaceCard
          as="article"
          className="flex h-full cursor-pointer flex-col"
          aria-labelledby={`project-title-${project.id}`}
        >
          <ProjectHero project={project} headline={headline} />

          <div className="flex flex-1 flex-col gap-5 p-6">
            {metrics.length > 0 && <MetricsRow metrics={metrics} variant="plain" />}

            <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
              {project.shortDescription}
            </p>

            <div className="mt-auto space-y-4 border-t border-white/[0.06] pt-4">
              <TechStackLine technologies={project.technologies} />

              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="glass"
                  size="sm"
                  className="touch-manipulation"
                  onClick={() => trackProjectView(project.shortTitle, project.category ?? "")}
                >
                  Ver caso completo
                  <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Button>
                <span id={`project-title-${project.id}`} className="sr-only">
                  {project.shortTitle}
                </span>
              </div>
            </div>
          </div>
        </SurfaceCard>
      </ProjectDialog>
    </motion.div>
  )
}

/* ────────────────────────────── sub-componentes ─────────────────────────── */

function ProjectHero({ project, headline }: { project: Project; headline: string }) {
  const chips = [project.type, project.role, project.year].filter((chip): chip is string =>
    Boolean(chip),
  )

  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
      {project.image ? (
        <Image
          src={project.image}
          alt={project.imageAlt || `Captura del proyecto ${project.title}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-5xl">
          <span aria-hidden="true">{project.imageEmoji}</span>
        </div>
      )}

      {/* Gradient overlay — oscurece la parte inferior para que el headline
          tenga contraste sin importar la imagen de fondo. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/10"
        aria-hidden="true"
      />

      {/* Capa de contenido encima del gradient. */}
      <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6">
        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {chips.map((chip, idx) => (
              <span
                key={`${chip}-${idx}`}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium tracking-[0.14em] text-zinc-200 uppercase backdrop-blur-md"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
        <h3 className="max-w-[28ch] text-xl leading-tight font-bold tracking-tight text-white drop-shadow-md md:text-2xl">
          {headline}
        </h3>
      </div>
    </div>
  )
}

function MetricsRow({
  metrics,
  variant,
}: {
  metrics: NonNullable<Project["metrics"]>
  variant?: "plain"
}) {
  return <StatTiles metrics={metrics} variant={variant} size="md" ariaLabel="Métricas de impacto" />
}

function TechStackLine({ technologies }: { technologies: string[] }) {
  if (!technologies?.length) return null
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
      <span className="font-medium tracking-[0.14em] text-zinc-400 uppercase">Stack</span>
      <span className="text-zinc-700" aria-hidden="true">
        ·
      </span>
      <span className="font-mono text-zinc-400">{technologies.slice(0, 6).join(" · ")}</span>
    </div>
  )
}
