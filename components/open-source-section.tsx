"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Package } from "lucide-react"
import { Github } from "@/components/icons/social-icons"
import { openSourceProjects, type OpenSourceProject } from "@/data/open-source"
import { trackButtonClick } from "@/lib/analytics"
import { Section } from "@/components/ui/section"
import { Pill } from "@/components/ui/pill"
import { SurfaceCard } from "@/components/ui/surface-card"

/**
 * Live npm version badge. The version is resolved by shields.io at request
 * time from the package slug, so it always tracks the latest published
 * release without us redeploying — mirroring each project's own README.
 */
function NpmVersionBadge({ name }: { name: string }) {
  const src = `https://img.shields.io/npm/v/${encodeURIComponent(
    name
  )}?style=flat&label=&color=10b981&labelColor=18181b`
  // width/height set the intrinsic aspect ratio; the className scales it to a
  // consistent 18px height while letting the width follow the version string.
  // `unoptimized` is intentional ONLY here: the optimizer would cache this SVG
  // for minimumCacheTTL (1y) and freeze the version. It's a ~1KB SVG, so there
  // is no real optimization to lose, and the badge stays live. Every other
  // image in the app stays optimized via next/image.
  return (
    <Image
      src={src}
      alt={`Última versión de ${name} en npm`}
      width={56}
      height={20}
      unoptimized
      className="h-[18px] w-auto"
    />
  )
}

function RegistryGlyph({ registry }: { registry: OpenSourceProject["registry"] }) {
  if (registry === "npm") {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 uppercase tracking-[0.18em]"
        aria-label="Publicado en npm"
      >
        <Package className="w-3 h-3" aria-hidden="true" />
        npm
      </span>
    )
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 uppercase tracking-[0.18em]"
      aria-label="Publicado en GitHub"
    >
      <Github className="w-3 h-3" aria-hidden="true" />
      github
    </span>
  )
}

function ProjectCard({ project }: { project: OpenSourceProject }) {
  return (
    <SurfaceCard
      as="div"
      className="group h-full"
    >
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackButtonClick(`open-source: ${project.name}`, "home-open-source")}
        className="flex flex-col gap-4 p-6 h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
      <div className="flex items-center justify-between">
        <RegistryGlyph registry={project.registry} />
        <ArrowUpRight
          className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200"
          aria-hidden="true"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h3 className="text-lg font-semibold text-white font-mono tracking-tight">
            {project.name}
          </h3>
          {project.registry === "npm" && (
            <NpmVersionBadge name={project.packageName ?? project.name} />
          )}
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-zinc-800/60">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: project.languageColor }}
            aria-hidden="true"
          />
          <span className="text-xs text-zinc-500">{project.language}</span>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <Pill key={tag} variant="tag" size="sm">
              {tag}
            </Pill>
          ))}
        </div>
      </div>
      </Link>
    </SurfaceCard>
  )
}

export function OpenSourceSection() {
  return (
    <Section
      header={{
        eyebrow: "Open source",
        eyebrowIcon: Package,
        title: "Herramientas que mantengo",
        description:
          "Librerías y CLIs publicados en npm + proyectos en GitHub que uso a diario y comparto con la comunidad.",
        headingId: "open-source-heading",
        align: "left",
        trailing: (
          <Link
            href="https://github.com/carrilloapps?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackButtonClick("ver todos repos", "home-open-source")}
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
          >
            Ver todos
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        ),
      }}
    >
      <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {openSourceProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  )
}
