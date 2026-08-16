"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { openSourceProjects, type OpenSourceProject } from "@/lib/data/open-source"
import { trackButtonClick } from "@/lib/analytics"
import { Section } from "@/components/ui/section"

/**
 * The open-source register.
 *
 * Previously a three-column grid of same-size cards — the lazy container the
 * design system bans, and a shape that hides the one thing a reader wants:
 * how to install this. Now each project is a ledger row. The name and its
 * summary hold the left column, the registry and language sit in the middle in
 * mono, and the live version lands right-aligned where every figure in this
 * site lands.
 */

/**
 * Live npm version badge, resolved by shields.io at request time so it tracks
 * the latest published release without a redeploy. Recoloured for the ledger:
 * paper on ink, no green pill.
 */
function NpmVersionBadge({ name }: { name: string }) {
  const src = `https://img.shields.io/npm/v/${encodeURIComponent(
    name,
  )}?style=flat&label=&color=0b0c0e&labelColor=0b0c0e`
  // `unoptimized` is deliberate here only: the optimizer would cache this SVG
  // for a year and freeze the version.
  return (
    <Image
      src={src}
      alt={`Última versión de ${name} en npm`}
      width={56}
      height={20}
      unoptimized
      className="h-[18px] w-auto opacity-80"
    />
  )
}

function ProjectRow({ project }: { project: OpenSourceProject }) {
  const packageSlug = project.packageName ?? project.name

  return (
    <li className="group">
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackButtonClick(`open-source: ${project.name}`, "home-open-source")}
        className="grid min-h-[48px] grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-5 md:grid-cols-[minmax(0,1fr)_10rem_6rem] md:py-6"
      >
        <div className="min-w-0">
          <span className="inline-flex items-baseline gap-2 font-sans text-lg font-medium text-paper transition-colors group-hover:text-stamp-text md:text-xl">
            {project.name}
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-paper-faint transition-colors group-hover:text-stamp-text"
              aria-hidden="true"
            />
          </span>
          <p className="mt-1 max-w-[64ch] font-sans text-sm leading-relaxed text-paper-dim">
            {project.description}
          </p>
        </div>

        <div className="font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase">
          <span>{project.registry}</span>
          <span aria-hidden="true"> · </span>
          <span>{project.language}</span>
        </div>

        <div className="text-right">
          {project.registry === "npm" ? (
            <NpmVersionBadge name={packageSlug} />
          ) : (
            <span className="font-mono text-sm text-rule-strong" aria-label="Sin versión publicada">
              ——
            </span>
          )}
        </div>
      </Link>
    </li>
  )
}

interface OpenSourceSectionProps {
  /** The tools page states the heading in its own masthead. */
  showHeading?: boolean
}

export function OpenSourceSection({ showHeading = true }: OpenSourceSectionProps = {}) {
  return (
    <Section
      header={
        showHeading
          ? {
              title: "Herramientas que mantengo",
              description:
                "Librerías y CLIs publicados en npm, más proyectos en GitHub que uso a diario y comparto con la comunidad.",
              headingId: "open-source-heading",
              trailing: (
                <Link
                  href="https://github.com/carrilloapps?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackButtonClick("ver todos repos", "home-open-source")}
                  className="cta-quiet"
                >
                  Ver todos
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              ),
            }
          : undefined
      }
    >
      <ul className="divide-y divide-rule border-t border-rule">
        {openSourceProjects.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </ul>
    </Section>
  )
}
