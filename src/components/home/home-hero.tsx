"use client"

import { useCallback, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Check, Copy } from "lucide-react"

import { AnimatedSection } from "@/components/animated-section"
import { useNpmDownloads, type NpmDownloads } from "@/lib/queries"
import { CvDownloadButton } from "@/components/cv-download-button"
import { SocialRow } from "@/components/social-row"
import { trackButtonClick, trackCTAClick } from "@/lib/analytics"

/**
 * The ledger's opening entry.
 *
 * A developer arriving from a post is deciding whether this code is worth an
 * install. So the first viewport is not a portrait and a pair of buttons — it
 * is the document header followed immediately by the three installable tools,
 * command on the left, monthly downloads on the right, a hairline between each.
 */

interface LedgerEntry {
  name: string
  packageName: string
  summary: string
  install: string
  href: string
  since: string
}

const ENTRIES: LedgerEntry[] = [
  {
    name: "bcv-exchange-rate",
    packageName: "bcv-exchange-rate",
    summary: "Tasas oficiales BCV, TRM y PTAX. Librería Node y servidor MCP.",
    install: "npm i bcv-exchange-rate",
    href: "https://www.npmjs.com/package/bcv-exchange-rate",
    since: "2025",
  },
  {
    name: "zefer",
    packageName: "zefer-cli",
    summary: "Cifrado AES-256-GCM zero-knowledge. El servidor nunca ve tus datos.",
    install: "npm i -g zefer-cli",
    href: "https://www.npmjs.com/package/zefer-cli",
    since: "2025",
  },
  {
    name: "skill-rules",
    packageName: "skill-rules",
    summary: "Sincroniza skills de agentes IA entre Claude Code, Cursor y Windsurf.",
    install: "npx skill-rules init",
    href: "https://www.npmjs.com/package/skill-rules",
    since: "2026",
  },
]

const PACKAGES = ENTRIES.map((e) => e.packageName)

export function HomeHero() {
  const { data: downloads, isPending } = useNpmDownloads(PACKAGES)

  return (
    <AnimatedSection
      className="relative w-full pt-6 pb-12 md:pt-10 md:pb-16"
      role="banner"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto px-4">
        {/* The masthead of a statement.
            The name used to sit on a baseline row with the role floated to the
            far right, which left ~730px of dead space across the widest part of
            the page and no structure holding the two together. Now the name
            spans the sheet and the facts underneath it are ruled cells, the way
            an account header states its own particulars. */}
        <header>
          <h1
            id="hero-heading"
            className="font-sans text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.86] font-semibold tracking-[-0.045em] text-paper"
          >
            Junior Carrillo
          </h1>

          {/* Particulars: four ruled cells across the full measure. */}
          <dl className="mt-8 grid grid-cols-2 border-y border-rule md:grid-cols-4">
            {[
              { term: "Rol", value: "Tech Leader" },
              { term: "Base", value: "Medellín, CO" },
              { term: "Trayectoria", value: "10+ años" },
              { term: "Enfoque", value: "Pagos y fintech" },
            ].map(({ term, value }, i) => (
              <div
                key={term}
                className={`px-0 py-4 md:px-5 md:py-5 ${
                  i > 0 ? "md:border-l md:border-rule" : ""
                } ${i % 2 === 1 ? "border-l border-rule pl-5 md:pl-5" : ""} ${
                  i < 2 ? "border-b border-rule md:border-b-0" : ""
                }`}
              >
                <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                  {term}
                </dt>
                <dd className="mt-1.5 font-sans text-base text-paper md:text-lg">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] md:items-start">
            <p className="font-sans text-xl leading-[1.45] text-paper md:text-2xl">
              Construyo sistemas de pago de alta transaccionalidad en LATAM. Lo que aprendo
              operándolos lo publico como herramientas instalables y como texto.
            </p>
            <SocialRow className="md:justify-end" />
          </div>
        </header>

        {/* The primary entry: three tools, ready to install. */}
        <section aria-labelledby="tools-heading" className="mt-10 md:mt-14">
          <div className="flex items-baseline justify-between border-b border-rule-strong pb-2">
            <h2
              id="tools-heading"
              className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase"
            >
              Herramientas publicadas
            </h2>
            <span
              className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase"
              aria-hidden="true"
            >
              <span className="hidden md:inline">Mes · Acumulado</span>
              <span className="md:hidden">Descargas</span>
            </span>
          </div>

          <ul className="divide-y divide-rule">
            {ENTRIES.map((entry) => (
              <LedgerRow
                key={entry.packageName}
                entry={entry}
                downloads={downloads?.[entry.packageName]}
                isPending={isPending}
              />
            ))}
          </ul>
        </section>

        {/* The total line: the action this page exists to produce. */}
        <div className="mt-10 flex flex-col gap-x-8 gap-y-4 border-t-2 border-rule-strong pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[46ch] font-sans text-base text-paper-dim">
            Escribo sobre lo que rompe en producción y cómo se arregla.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="#newsletter"
              onClick={() => trackCTAClick("Suscribirse", "primary", "home-hero")}
              className="cta"
            >
              Suscribirse al boletín
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <CvDownloadButton source="home-hero" />
            <Link
              href="/recursos"
              onClick={() => trackCTAClick("Ver herramientas", "secondary", "home-hero")}
              className="cta-quiet"
            >
              Ver otras herramientas
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function LedgerRow({
  entry,
  downloads,
  isPending,
}: {
  entry: LedgerEntry
  downloads: NpmDownloads | undefined
  isPending: boolean
}) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(entry.install)
      setCopied(true)
      trackButtonClick(`Copiar install ${entry.packageName}`, "home-hero")
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [entry.install, entry.packageName])

  return (
    <li className="group grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-3 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)_7rem] md:items-center">
      <div className="min-w-0">
        <a
          href={entry.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-baseline gap-2 font-sans text-xl font-medium text-paper transition-colors group-hover:text-stamp-text focus-visible:text-stamp-text md:text-2xl"
        >
          {entry.name}
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-paper-faint transition-colors group-hover:text-stamp-text"
            aria-hidden="true"
          />
        </a>
        <p className="mt-1.5 max-w-[52ch] font-sans text-sm leading-relaxed text-paper-dim">
          {entry.summary}
        </p>
      </div>

      <button
        type="button"
        onClick={copy}
        aria-label={`${entry.install} — copiar comando de instalación`}
        className="col-span-2 inline-flex min-h-[48px] w-full touch-manipulation items-center justify-between gap-3 border border-rule bg-ink-raised px-3 font-mono text-[13px] text-paper-dim transition-colors hover:border-rule-strong hover:text-paper focus-visible:border-stamp md:col-span-1 md:w-auto"
      >
        <span className="truncate">{entry.install}</span>
        {copied ? (
          <Check className="h-4 w-4 shrink-0 text-settled" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4 shrink-0 text-paper-faint" aria-hidden="true" />
        )}
        <span className="sr-only" role="status">
          {copied ? "Comando copiado" : ""}
        </span>
      </button>

      {/* The figure column: the month's movement over the running total —
          the pair a statement prints. An unread count is an unlit cell. */}
      <div className="text-right font-mono tabular-nums">
        {isPending ? (
          <span
            className="inline-block h-6 w-16 animate-pulse bg-rule align-middle"
            aria-hidden="true"
          />
        ) : typeof downloads?.month === "number" ? (
          <>
            <span className="text-xl text-paper md:text-2xl">
              {downloads.month.toLocaleString("es-CO")}
            </span>
            {typeof downloads.total === "number" ? (
              <div className="mt-0.5 font-mono text-[11px] tracking-[0.06em] text-paper-faint">
                {downloads.total.toLocaleString("es-CO")} total
              </div>
            ) : null}
          </>
        ) : (
          <span className="text-xl text-rule-strong md:text-2xl" title="Sin dato del registro">
            ——
          </span>
        )}
        <span className="sr-only">
          {typeof downloads?.month === "number"
            ? `${downloads.month} descargas el último mes${
                typeof downloads.total === "number"
                  ? `, ${downloads.total} descargas acumuladas`
                  : ""
              }`
            : "Descargas no disponibles"}
        </span>
        <div className="mt-0.5 font-mono text-[10px] tracking-[0.1em] text-paper-faint uppercase">
          desde {entry.since}
        </div>
      </div>
    </li>
  )
}
