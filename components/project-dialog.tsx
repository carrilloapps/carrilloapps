"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Code, ArrowUpRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Github } from "@/components/icons/social-icons"
import type { Project } from "@/types/project"
import { StatTiles } from "./ui/stat-tiles"

interface ProjectDialogProps {
  /** Proyecto completo — el dialog deriva todo el contenido de aquí. */
  project: Project
  /** Trigger visual (típicamente la `<ProjectCard>`). */
  children: React.ReactNode
}

/**
 * Modal de case study. Mismo lenguaje visual que `<ProjectCard>` pero con
 * espacio para la `fullDescription` y los CTAs externos. Estructura:
 *
 *   ┌───────────────────────────────┐
 *   │ [Imagen hero + gradient + chips] │  aspect-[16/9]
 *   ├───────────────────────────────┤
 *   │ Outcome (DialogTitle)            │
 *   │ Título completo (Description)    │
 *   │ ─────                            │
 *   │ [stat tile · stat tile · stat]  │
 *   │ Resumen                          │
 *   │ Stack                            │
 *   │ [CTAs]                           │
 *   └───────────────────────────────┘
 *
 * El título se renderiza en el cuerpo (no encima de la imagen) — más robusto
 * en viewports pequeños y evita que el layout absoluto pelee con los defaults
 * de Radix Dialog.
 */
export function ProjectDialog({ project, children }: ProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const headline = project.outcome ?? project.shortTitle
  const metrics = project.metrics ?? []
  const chips = [project.type, project.role, project.year].filter((chip): chip is string =>
    Boolean(chip),
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex max-h-[92vh] flex-col gap-0 overflow-hidden border-white/10 bg-slate-950/95 p-0 text-white backdrop-blur-xl sm:max-w-[680px] [&>button[type='button']]:z-20 [&>button[type='button']]:rounded-full [&>button[type='button']]:border [&>button[type='button']]:border-white/20 [&>button[type='button']]:bg-black/60 [&>button[type='button']]:p-1.5 [&>button[type='button']]:text-white [&>button[type='button']]:opacity-100 [&>button[type='button']]:backdrop-blur-md [&>button[type='button']]:transition-colors [&>button[type='button']]:hover:bg-black/80">
        {/* Hero — imagen con gradient overlay + chips encima. */}
        <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-slate-900">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt || `Captura del proyecto ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 680px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              <span aria-hidden="true">{project.imageEmoji}</span>
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-slate-950/10"
            aria-hidden="true"
          />
          {chips.length > 0 && (
            <div className="absolute right-6 bottom-5 left-6 flex flex-wrap items-center gap-1.5">
              {chips.map((chip, idx) => (
                <span
                  key={`${chip}-${idx}`}
                  className="inline-flex items-center rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-medium tracking-[0.14em] text-zinc-100 uppercase backdrop-blur-md"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Cuerpo scrollable — titular + métricas + resumen + stack + CTAs. */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6 md:p-8">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-2xl leading-tight font-bold tracking-tight text-white md:text-3xl">
              {headline}
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-400">{project.title}</DialogDescription>
          </DialogHeader>

          {metrics.length > 0 && (
            <StatTiles
              metrics={metrics}
              variant="plain"
              size="md"
              ariaLabel="Métricas de impacto en la organización"
            />
          )}

          <section className="space-y-2">
            <h3 className="mt-4 text-[11px] font-medium tracking-[0.18em] text-zinc-500 uppercase">
              Resumen
            </h3>
            <p className="leading-relaxed text-zinc-300">{project.fullDescription}</p>
          </section>

          {project.technologies?.length > 0 && (
            <section className="space-y-2">
              <h3 className="text-[11px] font-medium tracking-[0.18em] text-zinc-500 uppercase">
                Stack
              </h3>
              <p className="font-mono text-sm leading-relaxed text-zinc-300">
                {project.technologies.join(" · ")}
              </p>
            </section>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            {project.demoUrl && (
              <Button
                variant="gradient"
                size="lg"
                className="w-full touch-manipulation sm:w-auto"
                asChild
              >
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  Ir al sitio
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button
                variant="glass"
                size="lg"
                className="w-full touch-manipulation sm:w-auto"
                asChild
              >
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                  Ver documentación
                </a>
              </Button>
            )}
            <Button
              variant="ghostLink"
              size="lg"
              className="w-full touch-manipulation justify-start sm:w-auto sm:justify-center"
              asChild
              onClick={() => setIsOpen(false)}
            >
              <a href="#contact">
                <Code className="mr-2 h-4 w-4" aria-hidden="true" />
                Consultar caso
                <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
