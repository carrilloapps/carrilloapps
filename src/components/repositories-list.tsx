"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, GitFork, Star } from "lucide-react"

import { useRepositories, type Repository } from "@/lib/queries"
import { trackProjectView, trackProjectLinkClick } from "@/lib/analytics"

type RepositoriesListProps = {
  source: "github" | "gitlab"
  username: string
  /** Search term owned by the page (URL state). */
  search: string
  /** Language filter owned by the page (URL state). `all` disables it. */
  language: string
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(dateString))
}

/**
 * One repository, as a ledger entry.
 *
 * This was a `<Card>` with a rounded border, a coloured language dot, a hover
 * lift and a filled "Ver proyecto" button — five borrowed devices from the
 * design this site replaced, and three cards per row hid the only figures worth
 * comparing. A row states the name, what it is, and its numbers in tabular
 * mono, right-aligned like every other figure here, so the list can be scanned
 * down a column instead of read card by card.
 */
function RepositoryRow({
  repo,
  source,
  featured,
}: {
  repo: Repository
  source: "github" | "gitlab"
  featured?: boolean
}) {
  return (
    <li className="border-b border-rule">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackProjectView(repo.name, repo.language || "Unknown")
          trackProjectLinkClick(repo.name, source)
        }}
        className="group grid items-baseline gap-x-10 gap-y-2 py-4 md:grid-cols-[minmax(0,1fr)_auto]"
      >
        <div className="min-w-0">
          <span className="inline-flex items-baseline gap-2 font-sans text-lg leading-tight text-paper transition-colors group-hover:text-stamp-text">
            {repo.name}
            {featured ? (
              <span className="translate-y-[-2px] font-mono text-[10px] tracking-[0.16em] text-stamp-text uppercase">
                Destacado
              </span>
            ) : null}
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-paper-faint transition-colors group-hover:text-stamp-text"
              aria-hidden="true"
            />
          </span>
          <p className="mt-1 max-w-[82ch] font-sans text-sm leading-relaxed text-paper-dim">
            {repo.description || "Sin descripción."}
          </p>
        </div>

        {/*
          Metadata and figures travel together, pinned to the right edge. As
          three separate grid columns they left two voids on a wide screen — one
          after the description, another between the language and the counts —
          roughly 450px of nothing per row. One group means one gutter.
        */}
        <div className="flex items-baseline justify-between gap-8 md:justify-end">
          <span className="font-mono text-[11px] tracking-[0.1em] whitespace-nowrap text-paper-faint uppercase">
            {repo.language}
            <span aria-hidden="true"> · </span>
            {formatDate(repo.updated_at)}
          </span>

          <span className="flex w-[5.5rem] items-baseline justify-end gap-4 font-mono text-sm text-paper-dim tabular-nums">
            <span className="inline-flex items-center gap-1.5" title={`${repo.stars} estrellas`}>
              <Star className="h-3.5 w-3.5 text-paper-faint" aria-hidden="true" />
              {repo.stars}
            </span>
            <span className="inline-flex items-center gap-1.5" title={`${repo.forks} forks`}>
              <GitFork className="h-3.5 w-3.5 text-paper-faint" aria-hidden="true" />
              {repo.forks}
            </span>
          </span>
        </div>
      </a>
    </li>
  )
}

/** Placeholder rows at the real row height, so nothing under them moves. */
function SkeletonRows({ count = 6 }: { count?: number }) {
  return (
    <ul aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="border-b border-rule py-4">
          <div className="h-[22px] w-[38%] animate-pulse bg-rule" />
          <div className="mt-2 h-[17px] w-[64%] animate-pulse bg-rule/60" />
        </li>
      ))}
    </ul>
  )
}

export function RepositoriesList({ source, username, search, language }: RepositoriesListProps) {
  const [page, setPage] = useState(1)

  /*
    Any change to the query resets the page. Without this, searching from page 3
    asked the API for page 3 of a one-page result and the list came back empty —
    which read as "the filter is broken".
  */
  useEffect(() => {
    setPage(1)
  }, [source, search, language])

  const { data, isPending, isError, error } = useRepositories({
    source,
    username,
    page,
    language,
    search,
  })

  const repositories = data?.repositories ?? []
  const featured = new Set((data?.pinnedRepos ?? []).map((repo) => repo.id))
  const totalPages = data?.totalPages ?? 1
  const totalCount = data?.totalCount ?? repositories.length
  const filtering = Boolean(search) || language !== "all"

  if (isError) {
    return (
      <div className="border-y border-rule py-10 text-center">
        <p className="font-sans text-base text-paper">No pude traer los repositorios.</p>
        <p className="mt-1 font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase">
          {error?.message}
        </p>
        <button type="button" onClick={() => window.location.reload()} className="cta-quiet mt-4">
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-rule-strong pb-2">
        <p className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
          {source === "github" ? "GitHub" : "GitLab"}
        </p>
        <p
          className="font-mono text-[11px] text-paper-faint tabular-nums"
          aria-live="polite"
          aria-atomic="true"
        >
          {isPending
            ? "buscando…"
            : `${totalCount} ${totalCount === 1 ? "resultado" : "resultados"}`}
        </p>
      </div>

      {isPending ? (
        <SkeletonRows />
      ) : repositories.length === 0 ? (
        <div className="border-b border-rule py-12 text-center">
          <p className="font-sans text-base text-paper">Nada coincide con esa búsqueda.</p>
          <p className="mt-1 font-sans text-sm text-paper-faint">
            {filtering
              ? "Prueba con otro término o quita el filtro de lenguaje."
              : "Todavía no hay repositorios públicos en este origen."}
          </p>
        </div>
      ) : (
        <ul>
          {repositories.map((repo) => (
            <RepositoryRow
              key={repo.id}
              repo={repo}
              source={source}
              featured={featured.has(repo.id)}
            />
          ))}
        </ul>
      )}

      {totalPages > 1 ? <Pager page={page} totalPages={totalPages} onChange={setPage} /> : null}
    </div>
  )
}

/**
 * The pager.
 *
 * It does not scroll the window. The old one jumped to the top of the document
 * on every page change, which threw the reader out of the list they were in.
 */
function Pager({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
}) {
  const window_ = 5
  const first = Math.max(1, Math.min(page - 2, totalPages - window_ + 1))
  const pages = Array.from({ length: Math.min(window_, totalPages) }, (_, i) => first + i).filter(
    (n) => n >= 1 && n <= totalPages,
  )

  const step =
    "inline-flex min-h-[44px] items-center px-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-[-4px] focus-visible:outline-stamp disabled:cursor-not-allowed disabled:text-rule-strong"

  return (
    <nav className="mt-6 flex items-center justify-between gap-4" aria-label="Paginación">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={`${step} -ml-2 cursor-pointer text-paper-faint hover:text-paper`}
      >
        Anterior
      </button>

      <ul className="flex items-center">
        {pages.map((n) => (
          <li key={n}>
            <button
              type="button"
              onClick={() => onChange(n)}
              aria-current={n === page ? "page" : undefined}
              className={`inline-flex h-11 min-w-[2.75rem] cursor-pointer items-center justify-center font-mono text-[13px] tabular-nums transition-colors focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-[-4px] focus-visible:outline-stamp ${
                n === page
                  ? "border-b-2 border-stamp text-paper"
                  : "border-b-2 border-transparent text-paper-faint hover:text-paper"
              }`}
            >
              {n}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className={`${step} -mr-2 cursor-pointer text-paper-faint hover:text-paper`}
      >
        Siguiente
      </button>
    </nav>
  )
}
