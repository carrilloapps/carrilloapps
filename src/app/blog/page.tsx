import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { Substack } from "@/components/icons/social-icons"
import { getSubstackPosts, type SubstackPost } from "@/lib/substack-service"
import { formatDateES } from "@/lib/utils"

/**
 * The writing index.
 *
 * Everything here is published on Substack, so every title leaves the site —
 * this page is the register of what exists, not a reader. It is rendered on the
 * server straight from the RSS feed rather than fetched in the browser: the
 * feed is the same for everyone, it changes a few times a month, and a client
 * fetch would trade a fast first paint for a spinner and an empty page for
 * anyone crawling it.
 *
 * `revalidate` matches the service's own window, so a new post appears within
 * half an hour without a deploy.
 */
export const revalidate = 1800

const FEED_LIMIT = 24
const SUBSTACK_URL = "https://carrilloapps.substack.com/"

export default async function BlogPage() {
  const posts = await getSubstackPosts(FEED_LIMIT)
  const [lead, ...rest] = posts

  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        <section className="relative w-full pt-6 md:pt-10" aria-labelledby="blog-heading">
          <div className="container mx-auto px-4">
            <p className="font-mono text-[11px] tracking-[0.16em] text-paper-faint uppercase">
              Escritura
            </p>

            <h1
              id="blog-heading"
              className="mt-3 max-w-[18ch] font-sans text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-balance text-paper"
            >
              Qué se rompió y cómo se arregló
            </h1>

            <div className="mt-8 grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
              <p className="max-w-[68ch] font-sans text-base leading-relaxed text-paper-dim md:text-lg">
                Escribo sobre lo que aprendo operando sistemas de pago: incidentes reales,
                decisiones de arquitectura que envejecieron bien o mal, y el oficio de liderar
                equipos técnicos. Publico en Substack; aquí está el índice completo, en vivo desde
                el feed.
              </p>

              <dl className="self-start border-y border-rule">
                {[
                  { term: "Publicado en", value: "Substack" },
                  { term: "Entradas", value: posts.length ? `${posts.length}` : "—" },
                  { term: "Idioma", value: "Español" },
                  { term: "Suscripción", value: "Gratuita" },
                ].map(({ term, value }) => (
                  <div
                    key={term}
                    className="flex items-baseline justify-between gap-4 border-b border-rule py-3 last:border-b-0"
                  >
                    <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                      {term}
                    </dt>
                    <dd className="text-right font-sans text-base text-paper tabular-nums">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t-2 border-rule-strong pt-5">
              <Link
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-stamp"
              >
                <Substack className="h-4 w-4" aria-hidden="true" />
                Suscribirme en Substack
              </Link>

              <Link href="/rss.xml" className="cta-quiet">
                Feed RSS
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {posts.length === 0 ? <FeedUnavailable /> : null}

        {lead ? (
          <section className="relative pt-10 md:pt-16" aria-labelledby="blog-latest">
            <div className="container mx-auto px-4">
              <h2
                id="blog-latest"
                className="border-b-2 border-rule-strong pb-2 font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase"
              >
                Lo último
              </h2>
              <LeadEntry post={lead} />
            </div>
          </section>
        ) : null}

        {rest.length > 0 ? (
          <section className="relative pt-10 md:pt-16" aria-labelledby="blog-archive">
            <div className="container mx-auto px-4">
              <div className="flex items-baseline justify-between gap-6 border-b-2 border-rule-strong pb-2">
                <h2
                  id="blog-archive"
                  className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase"
                >
                  Archivo
                </h2>
                <span className="font-mono text-[11px] text-paper-faint tabular-nums">
                  {rest.length}
                </span>
              </div>

              <ul>
                {rest.map((post) => (
                  <ArchiveRow key={post.url} post={post} />
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="relative pt-10 pb-16 md:pt-16 md:pb-20" aria-labelledby="blog-closing">
          <div className="container mx-auto px-4">
            <p className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
              Siguiente paso
            </p>
            <h2
              id="blog-closing"
              className="mt-4 max-w-[24ch] font-sans text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-paper"
            >
              ¿Te suena alguno de estos problemas?
            </h2>
            <p className="mt-3 max-w-[62ch] font-sans text-base leading-relaxed text-paper-dim">
              Si lo que lees se parece a lo que tienes en producción, hablemos una hora. Salgo con
              los riesgos priorizados y tú con un plan.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t-2 border-rule-strong pt-5">
              <Link href="/agendamiento" className="cta">
                Agendar una asesoría
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/servicios" className="cta-quiet">
                Ver servicios
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

/* -------------------------------------------------------------------------- */

/** The most recent piece, at the scale a front page gives its lead. */
function LeadEntry({ post }: { post: SubstackPost }) {
  return (
    <article className="mt-6 border-b border-rule pb-8">
      <Link
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]"
      >
        <div className="min-w-0">
          <Meta post={post} />
          <h3 className="mt-3 max-w-[22ch] font-sans text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance break-words text-paper transition-colors group-hover:text-stamp-text">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="mt-3 max-w-[72ch] font-sans text-base leading-relaxed break-words text-paper-dim">
              {post.excerpt}
            </p>
          ) : null}
          <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase transition-colors group-hover:text-stamp-text">
            Leer en Substack
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>

        {post.thumbnail ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-rule bg-ink-raised">
            <Image
              src={post.thumbnail}
              alt={post.thumbnailAlt}
              fill
              sizes="(min-width: 768px) 20rem, 100vw"
              className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
          </div>
        ) : null}
      </Link>
    </article>
  )
}

/** Everything else: one ruled row apiece, figures right. */
function ArchiveRow({ post }: { post: SubstackPost }) {
  return (
    <li className="border-b border-rule">
      <Link
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid items-baseline gap-x-10 gap-y-2 py-4 md:grid-cols-[minmax(0,1fr)_auto]"
      >
        <div className="min-w-0">
          <span className="inline-flex items-baseline gap-2 font-sans text-lg leading-tight break-words text-paper transition-colors group-hover:text-stamp-text">
            {post.title}
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-paper-faint transition-colors group-hover:text-stamp-text"
              aria-hidden="true"
            />
          </span>
          {post.excerpt ? (
            <p className="mt-1 max-w-[82ch] font-sans text-sm leading-relaxed break-words text-paper-dim">
              {post.excerpt}
            </p>
          ) : null}
        </div>

        <Meta post={post} className="justify-between md:justify-end" />
      </Link>
    </li>
  )
}

function Meta({ post, className = "" }: { post: SubstackPost; className?: string }) {
  return (
    <div
      className={`flex items-baseline gap-6 font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase md:whitespace-nowrap ${className}`.trim()}
    >
      <time dateTime={post.pubDate}>{formatDateES(post.pubDate)}</time>
      {post.readingTime ? <span className="tabular-nums">{post.readingTime} min</span> : null}
    </div>
  )
}

/**
 * Substack is a third party and the feed can be down. Saying so beats an empty
 * page that looks like nothing has ever been written.
 */
function FeedUnavailable() {
  return (
    <section className="relative pt-10 md:pt-16">
      <div className="container mx-auto px-4">
        <div className="border-y border-rule py-12 text-center">
          <p className="font-sans text-base text-paper">
            No pude leer el feed de Substack en este momento.
          </p>
          <p className="mt-1 font-sans text-sm text-paper-faint">
            Los artículos siguen publicados; ábrelos directamente.
          </p>
          <Link
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-quiet mt-4"
          >
            Ir a Substack
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
