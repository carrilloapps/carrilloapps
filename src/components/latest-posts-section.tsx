"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { formatDateES } from "@/lib/utils"
import { SectionHeader } from "@/components/section-header"
import { Substack } from "@/components/icons/social-icons"
import { useLatestPosts, type LatestPost } from "@/lib/queries"
import { trackCTAClick } from "@/lib/analytics"

/**
 * The writing index.
 *
 * Four identical rows say "these pieces are interchangeable", which is the
 * opposite of what a publication says about its latest one — and it was the
 * third list in a row on this page. So this reads like the front of a section:
 * the most recent post leads at full width with its plate and its own scale,
 * the rest fall into a compact index beneath it.
 *
 * The grammar is unchanged — rules, mono dates, right-aligned meta. Only the
 * hierarchy inside it moves.
 */
export function LatestPostsSection() {
  const { data: posts, isError, isLoading } = useLatestPosts()

  if (isError || (!isLoading && posts && posts.length === 0)) return null

  const [lead, ...rest] = posts ?? []

  return (
    <section className="relative py-16 md:py-24" aria-labelledby="latest-posts-heading">
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader
          title="Últimos artículos"
          description="Apuntes recientes sobre desarrollo, arquitectura y liderazgo técnico."
          headingId="latest-posts-heading"
          trailing={
            <Link
              href="https://carrilloapps.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-quiet"
            >
              <Substack className="h-3.5 w-3.5" aria-hidden="true" />
              Ver en Substack
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          }
        />

        {isLoading ? <LeadSkeleton /> : lead ? <LeadPost post={lead} /> : null}

        {rest.length > 0 ? (
          <ul className="mt-10 divide-y divide-rule border-t border-rule">
            {rest.map((post) => (
              <li key={post.url} className="group">
                <Link
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-1 items-baseline gap-x-8 gap-y-1 py-4 md:grid-cols-[9rem_1fr_5rem]"
                >
                  <time
                    dateTime={post.pubDate}
                    className="font-mono text-[11px] tracking-[0.08em] whitespace-nowrap text-paper-faint uppercase"
                  >
                    {formatDateES(post.pubDate)}
                  </time>
                  <h3 className="max-w-[64ch] font-sans text-base leading-snug text-paper-dim transition-colors group-hover:text-paper md:text-lg">
                    {post.title}
                  </h3>
                  <span className="hidden text-right font-mono text-[11px] whitespace-nowrap text-paper-faint uppercase md:block">
                    {post.readingTime ? `${post.readingTime} min` : "——"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

/** The lead piece: full width, at a scale that earns the position. */
function LeadPost({ post }: { post: LatestPost }) {
  return (
    <article className="group border-t-2 border-rule-strong pt-6">
      <Link
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="grid gap-x-10 gap-y-5 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-start"
      >
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase">
            <time dateTime={post.pubDate}>{formatDateES(post.pubDate)}</time>
            <span className="h-px w-8 bg-rule" aria-hidden="true" />
            <span>{post.readingTime ? `${post.readingTime} min de lectura` : "Substack"}</span>
          </div>

          <h3 className="mt-4 max-w-[26ch] font-sans text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.02em] text-paper transition-colors group-hover:text-stamp-text">
            {post.title}
          </h3>

          <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-paper-dim uppercase">
            Leer el artículo
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>

        {post.thumbnail ? (
          <div className="order-1 aspect-[16/10] w-full overflow-hidden border border-rule bg-ink-raised md:order-2">
            <Image
              src={post.thumbnail}
              alt={post.thumbnailAlt}
              width={352}
              height={220}
              className="h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
              loading="eager"
            />
          </div>
        ) : null}
      </Link>
    </article>
  )
}

function LeadSkeleton() {
  return (
    <div className="grid gap-x-10 gap-y-5 border-t-2 border-rule-strong pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
      <div className="space-y-4">
        <div className="h-3 w-40 animate-pulse bg-rule/60" />
        <div className="h-9 w-4/5 animate-pulse bg-rule/60" />
        <div className="h-9 w-3/5 animate-pulse bg-rule/60" />
      </div>
      <div className="aspect-[16/10] w-full animate-pulse bg-rule/60" />
    </div>
  )
}

/**
 * The writing, as a margin column.
 *
 * On the home page the posts no longer own a section of their own — they run
 * alongside the closing essay, the way a publication sets its "latest" rail
 * beside a feature. Same entries, no lead treatment, no plate: dates in mono,
 * titles at reading size, one rule between each.
 */
export function LatestPostsAside({ limit = 4 }: { limit?: number }) {
  const { data: posts, isError, isLoading } = useLatestPosts()

  if (isError) return null

  const rows = (posts ?? []).slice(0, limit)

  return (
    <aside aria-labelledby="aside-posts-heading">
      <div className="flex items-baseline justify-between border-b border-rule-strong pb-2">
        <h3
          id="aside-posts-heading"
          className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase"
        >
          Últimos artículos
        </h3>
        <Link
          href="https://carrilloapps.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase transition-colors hover:text-stamp-text focus-visible:text-stamp-text"
        >
          <Substack className="h-3 w-3" aria-hidden="true" />
          Substack
        </Link>
      </div>

      {isLoading ? (
        <ul className="divide-y divide-rule">
          {Array.from({ length: limit }).map((_, i) => (
            <li key={i} className="space-y-2 py-4">
              <div className="h-2.5 w-24 animate-pulse bg-rule/60" />
              <div className="h-4 w-full animate-pulse bg-rule/60" />
            </li>
          ))}
        </ul>
      ) : rows.length > 0 ? (
        <ul className="divide-y divide-rule">
          {rows.map((post) => (
            <li key={post.url} className="group">
              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-4"
              >
                <div className="flex items-baseline gap-3 font-mono text-[10px] tracking-[0.1em] text-paper-faint uppercase">
                  <time dateTime={post.pubDate} className="whitespace-nowrap">
                    {formatDateES(post.pubDate)}
                  </time>
                  {post.readingTime ? (
                    <>
                      <span className="h-px w-4 bg-rule" aria-hidden="true" />
                      <span className="whitespace-nowrap">{post.readingTime} min</span>
                    </>
                  ) : null}
                </div>
                <p className="mt-1.5 font-sans text-base leading-snug text-paper-dim transition-colors group-hover:text-paper">
                  {post.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-4 font-mono text-sm text-rule-strong">—— sin artículos por ahora</p>
      )}

      {/* The rail ends where the archive begins. Without this the column just
          stops after four entries, with no way to reach the rest. */}
      <div className="border-t border-rule-strong pt-4">
        <Link
          href="https://carrilloapps.substack.com/archive"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTAClick("Ver más artículos", "secondary", "home-posts-aside")}
          className="cta-quiet w-full justify-center"
        >
          Ver más artículos
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  )
}
