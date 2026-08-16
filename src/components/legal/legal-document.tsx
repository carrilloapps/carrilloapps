import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"

export type LegalBlock =
  | {
      type: "p"
      text: string
      /** A single in-prose link, appended after `text`, with an optional tail. */
      link?: { href: string; label: string; tail?: string }
    }
  /** A bulleted list. `term` bolds a lead-in, the way legal prose defines terms. */
  | { type: "list"; items: { term?: string; text: string }[] }
  | { type: "table"; head: string[]; rows: string[][] }

export interface LegalSection {
  /** Anchor and table-of-contents target. */
  id: string
  heading: string
  blocks: LegalBlock[]
}

export interface LegalDocumentProps {
  title: string
  /** This document's own route, so it can drop itself from "otros documentos". */
  path: string
  /** ISO date. Rendered long-form in es-CO and machine-readable in `<time>`. */
  updated: string
  summary: string
  /** The four facts a reader checks before reading: scope, law, contact… */
  particulars: { term: string; value: string }[]
  sections: LegalSection[]
}

const RELATED = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos", href: "/terminos" },
  { label: "Cookies", href: "/cookies" },
]

/**
 * The shell every legal document shares.
 *
 * The three policies were three copies of the same page: a rounded
 * `SurfaceCard`, an emerald pill, `text-zinc-300` prose and no way to reach a
 * clause without scrolling the whole thing. They are now one component fed by
 * data, in the ledger's language — a document masthead, a numbered index that
 * follows you down the page, and clauses separated by rules instead of stacked
 * inside a card.
 *
 * Numbering is not decoration: it is how a reader cites a clause back to you.
 */
export function LegalDocument({
  title,
  path,
  updated,
  summary,
  particulars,
  sections,
}: LegalDocumentProps) {
  const updatedLabel = new Date(updated).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        {/*
          One section, one grid — not a masthead section stacked on a body
          section.

          Split in two, the boundary between them cost 80px of section padding
          plus the height difference between a three-line summary and a
          four-row particulars table: a dead band across the page before the
          first clause. Merged, the right rail runs continuously from the
          particulars into the index, and the prose starts one rule below the
          summary.
        */}
        <section
          className="relative w-full pt-6 pb-16 md:pt-10 md:pb-20"
          aria-labelledby="legal-heading"
        >
          <div className="container mx-auto px-4">
            <p className="font-mono text-[11px] tracking-[0.16em] text-paper-faint uppercase">
              Legal
            </p>

            <h1
              id="legal-heading"
              className="mt-3 max-w-[18ch] font-sans text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.96] font-semibold tracking-[-0.04em] text-balance text-paper"
            >
              {title}
            </h1>

            <div className="mt-8 grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:items-start">
              {/* Source order puts the prose first for reading, but on a phone
                  the rail stacks below it — and the particulars (updated, legal
                  framework, contact) are what a reader checks *before* the
                  clauses, not after ten of them. `order` flips only the stack. */}
              <div className="order-2 lg:order-1">
                <p className="max-w-[80ch] font-sans text-base leading-relaxed text-paper-dim md:text-lg">
                  {summary}
                </p>

                <div className="mt-8 border-t-2 border-rule-strong">
                  {sections.map((section, i) => (
                    <article
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-28 border-b border-rule py-6"
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className="font-mono text-[11px] text-paper-faint tabular-nums"
                          aria-hidden="true"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="font-sans text-xl leading-tight tracking-[-0.02em] text-paper md:text-2xl">
                          {section.heading}
                        </h2>
                      </div>

                      <div className="mt-3 max-w-[86ch] space-y-3.5 md:pl-[calc(1.5rem+8px)]">
                        {section.blocks.map((block, j) => (
                          <Block key={j} block={block} />
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/*
                One rail: the particulars, then the index, then the sibling
                documents. `sticky` keeps it beside the clause you are reading —
                an index that scrolls away with the text is a table of contents
                you have to go back for.
              */}
              <aside className="order-1 lg:sticky lg:top-24 lg:order-2">
                <dl className="border-y border-rule">
                  <div className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5">
                    <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                      Actualizado
                    </dt>
                    <dd className="text-right font-sans text-[15px] text-paper">
                      <time dateTime={updated}>{updatedLabel}</time>
                    </dd>
                  </div>
                  {particulars.map(({ term, value }) => (
                    <div
                      key={term}
                      className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5 last:border-b-0"
                    >
                      <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                        {term}
                      </dt>
                      <dd className="text-right font-sans text-[15px] text-paper">{value}</dd>
                    </div>
                  ))}
                </dl>

                <nav aria-labelledby="legal-index" className="mt-8 hidden lg:block">
                  <p
                    id="legal-index"
                    className="border-b border-rule-strong pb-2 font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase"
                  >
                    Índice
                  </p>
                  <ol>
                    {sections.map((section, i) => (
                      <li key={section.id} className="border-b border-rule">
                        <a
                          href={`#${section.id}`}
                          className="flex gap-3 py-2 font-sans text-[13px] leading-snug text-paper-dim transition-colors hover:text-paper"
                        >
                          <span className="font-mono text-[11px] text-paper-faint tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0">{section.heading}</span>
                        </a>
                      </li>
                    ))}
                  </ol>

                  <p className="mt-6 border-b border-rule-strong pb-2 font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                    Otros documentos
                  </p>
                  <ul>
                    {RELATED.filter((doc) => doc.href !== path).map((doc) => (
                      <li key={doc.href} className="border-b border-rule">
                        <Link
                          href={doc.href}
                          className="group flex items-center justify-between gap-3 py-2 font-sans text-[13px] text-paper-dim transition-colors hover:text-paper"
                        >
                          {doc.label}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-paper-faint transition-colors group-hover:text-stamp-text"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    return (
      <p className="font-sans text-base leading-relaxed text-paper-dim">
        {block.text}
        {block.link ? (
          <>
            {" "}
            <Link
              href={block.link.href}
              className="text-paper underline decoration-rule-strong underline-offset-4 transition-colors hover:text-stamp-text hover:decoration-stamp"
            >
              {block.link.label}
            </Link>
            {block.link.tail ?? ""}
          </>
        ) : null}
      </p>
    )
  }

  if (block.type === "list") {
    return (
      <ul className="border-t border-rule">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="border-b border-rule py-3 font-sans text-base leading-relaxed text-paper-dim"
          >
            {item.term ? (
              <>
                <strong className="font-medium text-paper">{item.term}</strong>{" "}
              </>
            ) : null}
            {item.text}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-rule-strong">
            {block.head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className="py-2 pr-6 font-mono text-[10px] font-normal tracking-[0.16em] text-paper-faint uppercase last:pr-0"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row[0]} className="border-b border-rule">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={`py-3 pr-6 align-top last:pr-0 ${
                    i === 0
                      ? "font-mono text-[13px] text-paper"
                      : "font-sans text-sm leading-relaxed text-paper-dim"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
