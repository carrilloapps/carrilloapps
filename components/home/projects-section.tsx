"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, FolderKanban } from "lucide-react"
import { motion } from "@/lib/motion"
import { type Project } from "@/types/project"
import { Button } from "@/components/ui/button"
import { SurfaceCard } from "@/components/ui/surface-card"
import { SectionHeader } from "@/components/section-header"
import { AnimatedSection } from "@/components/animated-section"
import { DynamicProjectDialog as ProjectDialog } from "@/components/dynamic-imports"
import { trackButtonClick, trackProjectView } from "@/lib/analytics"
import { projects as defaultProjects } from "@/data/projects"

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
    <AnimatedSection
      className="py-16 md:py-24 relative"
      delay={0.3}
      role="region"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          eyebrow="Portafolio"
          eyebrowIcon={FolderKanban}
          title="Casos de impacto"
          description="Sistemas financieros y de pagos que diseñé y operé en producción — con métricas reales detrás."
          headingId="projects-heading"
          align="left"
        />

        <div
          className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2"
          aria-label="Lista de proyectos destacados"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {showCta && (
          <div className="text-center mt-10">
            <Button variant="ghostLink" size="lg" asChild>
              <Link
                href="/recursos"
                className="inline-flex items-center gap-2 min-h-[48px] touch-manipulation"
                aria-label="Ver todos los proyectos en la página de recursos"
                onClick={() =>
                  trackButtonClick("Ver otros proyectos", "home-projects-section")
                }
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
      </div>
    </AnimatedSection>
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
          className="cursor-pointer h-full flex flex-col"
          aria-labelledby={`project-title-${project.id}`}
        >
          <ProjectHero project={project} headline={headline} />

          <div className="flex flex-col gap-5 p-6 flex-1">
            {metrics.length > 0 && <MetricsRow metrics={metrics} />}

            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              {project.shortDescription}
            </p>

            <div className="mt-auto pt-4 border-t border-white/[0.06] space-y-4">
              <TechStackLine technologies={project.technologies} />

              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="glass"
                  size="sm"
                  className="touch-manipulation"
                  aria-label={`Ver detalles del caso ${project.shortTitle}`}
                  onClick={() =>
                    trackProjectView(project.shortTitle, project.category ?? "")
                  }
                >
                  Ver caso completo
                  <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Button>
                <span
                  id={`project-title-${project.id}`}
                  className="sr-only"
                >
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

function ProjectHero({
  project,
  headline,
}: {
  project: Project
  headline: string
}) {
  const chips = [project.type, project.role, project.year].filter(
    (chip): chip is string => Boolean(chip)
  )

  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
      {project.image ? (
        <Image
          src={project.image}
          alt={
            project.imageAlt ||
            `Captura del proyecto ${project.title}`
          }
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
        className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Capa de contenido encima del gradient. */}
      <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6">
        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {chips.map((chip, idx) => (
              <span
                key={`${chip}-${idx}`}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-200 bg-white/10 backdrop-blur-md border border-white/15"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight max-w-[28ch] drop-shadow-md">
          {headline}
        </h3>
      </div>
    </div>
  )
}

function MetricsRow({ metrics }: { metrics: NonNullable<Project["metrics"]> }) {
  return (
    <ul
      className="grid grid-cols-3 gap-2 md:gap-3 list-none p-0 m-0"
      aria-label="Métricas de impacto"
    >
      {metrics.slice(0, 3).map((metric) => (
        <li
          key={metric.label}
          className="surface-card-subtle px-3 py-3 md:px-4 md:py-4 text-center"
        >
          <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-white tabular-nums leading-none">
            {metric.value}
          </div>
          <div className="mt-1.5 text-[11px] md:text-xs text-zinc-300 leading-tight">
            {metric.label}
          </div>
        </li>
      ))}
    </ul>
  )
}

function TechStackLine({ technologies }: { technologies: string[] }) {
  if (!technologies?.length) return null
  return (
    <div className="flex items-center gap-2 text-xs text-zinc-500 flex-wrap">
      <span className="uppercase tracking-[0.14em] font-medium text-zinc-400">
        Stack
      </span>
      <span className="text-zinc-700" aria-hidden="true">
        ·
      </span>
      <span className="font-mono text-zinc-400">
        {technologies.slice(0, 6).join(" · ")}
      </span>
    </div>
  )
}
