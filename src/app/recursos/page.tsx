"use client"

import { Suspense, useEffect, useState } from "react"
import { debounce, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, CalendarDays, Search, X } from "lucide-react"
import { Github, GitLabIcon } from "@/components/icons/social-icons"
import { CountrySelect } from "@/components/ui/country-select"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { AnimatedSection } from "@/components/animated-section"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/section-header"
import { OpenSourceSection } from "@/components/open-source-section"
import { RepositoriesList } from "@/components/repositories-list"
import { RepositoriesLoading } from "@/components/unified-loading"
import { CalPopupButton } from "@/components/cal-booking"
import { openSourceProjects } from "@/lib/data/open-source"

/**
 * Everything published, on one page.
 *
 * This used to be two: `/herramientas` listed the maintained packages in the
 * current design, and `/recursos` listed featured projects plus the live
 * repository feed in the old one. They overlapped — zefer, bcv-exchange-rate
 * and hfo appeared on both, described twice and drifting apart — and split a
 * single idea across two URLs competing for the same queries.
 *
 * `/recursos` is the survivor because its name covers both halves (a repository
 * is not a tool) and it carried the stronger link graph. `/herramientas` now
 * redirects here permanently.
 *
 * The two halves stay distinct because they are different claims: the packages
 * are maintained and installable, the repositories are simply public. Static
 * first, live second.
 */
export default function ResourcesPage() {
  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        <OpeningEntry />

        {/*
          The maintained packages, with their own heading. On the old
          /herramientas the page title said it, so the section suppressed it;
          here it is one section among several and an unlabelled block has no
          place in the document outline.
        */}
        <OpenSourceSection />

        <Repositories />

        <ClosingEntry />
      </main>

      <SiteFooter />
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function OpeningEntry() {
  return (
    <AnimatedSection
      className="relative w-full pt-6 md:pt-10"
      role="region"
      aria-labelledby="resources-heading"
    >
      <div className="container mx-auto px-4">
        <h1
          id="resources-heading"
          className="max-w-[17ch] font-sans text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-balance text-paper"
        >
          Lo que publico, en abierto
        </h1>

        <div className="mt-8 grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
          <div className="max-w-[68ch] space-y-5 font-sans text-base leading-relaxed text-paper-dim md:text-lg">
            <p>
              Todo lo que resuelvo dos veces en el trabajo termina siendo un paquete instalable.
              Tasas oficiales de banca central, cifrado que el servidor no puede leer, compuertas de
              aprobación para agentes de IA: herramientas que uso a diario y que están publicadas
              para que cualquiera las audite.
            </p>
            <p>
              Debajo está el resto — los repositorios públicos de GitHub y GitLab, traídos en vivo
              desde sus APIs. Lo primero lo mantengo; lo segundo simplemente está ahí, y esa
              distinción importa lo suficiente como para no mezclarlos.
            </p>
          </div>

          <dl className="self-start border-y border-rule">
            {[
              { term: "Paquetes", value: `${openSourceProjects.length} mantenidos` },
              { term: "Registro", value: "npm · GitHub" },
              { term: "Licencia", value: "MIT" },
              { term: "Repositorios", value: "En vivo" },
            ].map(({ term, value }) => (
              <div
                key={term}
                className="flex items-baseline justify-between gap-4 border-b border-rule py-3 last:border-b-0"
              >
                <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                  {term}
                </dt>
                <dd className="text-right font-sans text-base text-paper">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rule-strong pt-5">
          <Link
            href="https://github.com/carrilloapps"
            target="_blank"
            rel="noopener noreferrer"
            className="cta"
          >
            Ver GitHub
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link href="/servicios" className="cta-quiet">
            Ver servicios
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}

/**
 * The live half. Kept behind Suspense because the list reads `useSearchParams`
 * through nuqs for its shareable filters.
 */
function Repositories() {
  return (
    <Section
      spacing="compact"
      header={{
        columnLabel: "Repositorios",
        title: "Todo lo público",
        description:
          "Traído en vivo desde GitHub y GitLab. Busca por nombre o filtra por lenguaje; la URL guarda el filtro, así que se puede compartir.",
        headingId: "repositories-heading",
      }}
    >
      <Suspense fallback={<RepositoriesLoading />}>
        <RepositoryFeed />
      </Suspense>
    </Section>
  )
}

/**
 * The whole feed's state, owned by the page and kept in the URL.
 *
 * The source used to be a `?tab=` the header deep-linked into, and the search
 * and language filter lived inside `RepositoriesList` as component state — so
 * two of the three controls could not be shared, bookmarked or restored.
 *
 * nuqs now holds all three, with two options that matter:
 *
 *   `scroll: false` — without it every keystroke scrolled the document back to
 *   the top, so you could not read the results while typing.
 *
 *   `limitUrlUpdates: debounce(350)` — the field stays instant because it is
 *   local state; only the URL and the fetch wait. Writing a history entry and
 *   firing a request per character was the other half of the jitter.
 */
const SOURCES = [
  { id: "github", label: "GitHub", Icon: Github },
  { id: "gitlab", label: "GitLab", Icon: GitLabIcon },
] as const

const LANGUAGES = ["TypeScript", "JavaScript", "Go", "Python", "Shell", "Dockerfile"] as const

function RepositoryFeed() {
  const [tab, setTab] = useQueryState(
    "src",
    parseAsStringLiteral(["github", "gitlab"] as const)
      .withDefault("github")
      .withOptions({ scroll: false, shallow: true }),
  )
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      scroll: false,
      shallow: true,
      limitUrlUpdates: debounce(350),
    }),
  )
  const [language, setLanguage] = useQueryState(
    "lang",
    parseAsString.withDefault("all").withOptions({ scroll: false, shallow: true }),
  )

  // The field is uncontrolled by the URL: it echoes the keystroke immediately
  // and lets the debounced writer catch up.
  const [draft, setDraft] = useState(query)

  useEffect(() => {
    setDraft(query)
  }, [query])

  const languageOptions = [
    { code: "all", name: "Todos los lenguajes" },
    ...LANGUAGES.map((l) => ({ code: l, name: l })),
  ]

  return (
    <div>
      <div
        role="tablist"
        aria-label="Origen de los repositorios"
        className="flex border-b border-rule-strong"
      >
        {SOURCES.map(({ id, label, Icon }) => {
          const selected = tab === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(id === "github" ? null : id)}
              className={`-mb-px inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 border-b-2 px-1 pr-5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp md:pr-8 ${
                selected
                  ? "border-stamp text-paper"
                  : "border-transparent text-paper-faint hover:text-paper"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          )
        })}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div
          data-field-group
          className="group flex items-center gap-2.5 border border-rule bg-field px-3 transition-colors hover:border-rule-strong"
        >
          <Search className="h-4 w-4 shrink-0 text-paper-faint" aria-hidden="true" />
          <input
            type="search"
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value)
              setQuery(e.target.value || null)
            }}
            placeholder="Buscar por nombre o descripción"
            aria-label="Buscar repositorio"
            data-bare-field
            className="min-h-[48px] w-full border-0 bg-transparent p-0 font-sans text-base text-paper placeholder:text-paper-faint focus:border-0 focus:ring-0 focus:outline-none"
          />
          {draft ? (
            <button
              type="button"
              onClick={() => {
                setDraft("")
                setQuery(null)
              }}
              aria-label="Limpiar búsqueda"
              className="inline-flex h-11 w-8 shrink-0 cursor-pointer items-center justify-center text-paper-faint transition-colors hover:text-paper focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-[-4px] focus-visible:outline-stamp"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {/* Seven options, so no filter appears — the component only adds one
            past ten, which is the line between scanning and searching. */}
        <CountrySelect
          label="Lenguaje"
          value={language}
          options={languageOptions}
          onChange={(code) => setLanguage(code === "all" ? null : code)}
          renderIcon={undefined}
          triggerClassName="w-full border bg-field sm:w-[15rem]"
          triggerLabel={(option) => option.name}
        />
      </div>

      <div className="mt-10">
        <RepositoriesList source={tab} username="carrilloapps" search={query} language={language} />
      </div>
    </div>
  )
}

function ClosingEntry() {
  return (
    <AnimatedSection
      className="relative pt-10 pb-16 md:pt-16 md:pb-20"
      role="region"
      aria-labelledby="resources-closing"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          columnLabel="Siguiente paso"
          title="¿Necesitas algo que no está aquí?"
          description="Si una de estas herramientas casi resuelve tu problema pero no del todo, o si lo que necesitas es la arquitectura alrededor, hablemos una hora."
          headingId="resources-closing"
        />

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t-2 border-rule-strong pt-5">
          <CalPopupButton
            source="resources-closing"
            aria-label="Agendar una asesoría"
            className="cta"
          >
            Agendar una asesoría
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
          </CalPopupButton>

          <Link href="/contacto" className="cta-quiet">
            Escribirme
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}
