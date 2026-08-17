"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { type Project } from "@/types/project"
import { Section } from "@/components/ui/section"
import { DynamicProjectDialog as ProjectDialog } from "@/components/dynamic-imports"
import { trackButtonClick, trackProjectView } from "@/lib/analytics"
import { projects as defaultProjects } from "@/lib/data/projects"

interface ProjectsSectionProps {
  /** Override de los proyectos — defaultea a la selección curada del home. */
  projects?: Project[]
  /** Oculta el CTA "Ver todos los casos" cuando se usa fuera del home. */
  showCta?: boolean
}

/**
 * Casos de impacto como asientos del libro.
 *
 * La versión anterior era una grilla de dos columnas de case-study cards:
 * imagen con overlay, chips flotando encima, tres stat tiles y un botón por
 * card. Esa forma reparte el peso entre la foto y el dato, y en este mundo el
 * dato es la prueba. Cada caso es ahora una fila: el outcome lidera, la
 * atribución va en mono, y las métricas caen en la columna derecha donde el
 * lector ya aprendió a buscarlas. Abrir la fila sigue mostrando el
 * `ProjectDialog` con el caso completo.
 */
export function ProjectsSection({
  projects = defaultProjects,
  showCta = true,
}: ProjectsSectionProps) {
  return (
    <Section
      header={{
        columnLabel: "Portafolio",
        title: "Casos de impacto",
        description:
          "Sistemas financieros y de pagos que diseñé y operé en producción — con métricas reales detrás.",
        headingId: "projects-heading",
      }}
    >
      <ul className="divide-y divide-rule border-t border-rule">
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </ul>

      {showCta && (
        <div className="mt-8 flex justify-end border-t border-rule-strong pt-4">
          <Link
            href="/recursos"
            className="inline-flex min-h-[48px] touch-manipulation items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-paper-dim uppercase transition-colors hover:text-stamp-text focus-visible:text-stamp-text"
            onClick={() => trackButtonClick("Ver otros proyectos", "home-projects-section")}
          >
            Ver todos los casos
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      )}
    </Section>
  )
}

function ProjectRow({ project }: { project: Project }) {
  const headline = project.outcome ?? project.shortTitle
  const metrics = (project.metrics ?? []).slice(0, 3)
  const attribution = [project.type, project.role, project.year].filter(Boolean).join(" · ")

  return (
    <li className="group">
      <ProjectDialog project={project}>
        <article
          className="grid w-full cursor-pointer grid-cols-1 items-start gap-x-8 gap-y-4 py-7 text-left md:py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]"
          aria-labelledby={`project-title-${project.id}`}
          onClick={() => trackProjectView(project.shortTitle, project.category ?? "")}
        >
          <div className="min-w-0">
            <h3
              id={`project-title-${project.id}`}
              className="max-w-[42ch] font-sans text-xl leading-snug font-medium text-paper transition-colors group-hover:text-stamp-text md:text-2xl"
            >
              {headline}
            </h3>
            {attribution ? (
              <p className="mt-2 font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase">
                {attribution}
              </p>
            ) : null}
            <p className="mt-3 max-w-[68ch] font-sans text-sm leading-relaxed text-paper-dim">
              {project.shortDescription}
            </p>
            <p className="mt-3 font-mono text-[11px] text-paper-faint">
              {project.technologies.slice(0, 6).join(" · ")}
            </p>
          </div>

          {/* Las métricas del caso, en la columna de cifras. */}
          {metrics.length > 0 ? (
            <dl className="grid grid-cols-3 gap-x-4 border-t border-rule pt-4 md:border-t-0 md:pt-1">
              {metrics.map((metric) => (
                <div key={metric.label} className="text-right">
                  <dd className="font-mono text-lg text-paper tabular-nums md:text-xl">
                    {metric.value}
                  </dd>
                  <dt className="mt-0.5 font-mono text-[10px] leading-tight tracking-[0.08em] text-paper-faint uppercase">
                    {metric.label}
                  </dt>
                </div>
              ))}
            </dl>
          ) : null}
        </article>
      </ProjectDialog>
    </li>
  )
}
