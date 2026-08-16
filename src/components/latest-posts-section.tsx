"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, BookOpen, Calendar, Clock } from "lucide-react"
import { formatDateES } from "@/lib/utils"
import { SectionHeader } from "@/components/section-header"
import { SurfaceCard } from "@/components/ui/surface-card"
import { Substack } from "@/components/icons/social-icons"
import { useLatestPosts, type LatestPost } from "@/lib/queries"

export function LatestPostsSection() {
  const { data: posts, isError, isLoading } = useLatestPosts()

  // Hide the whole section on error or when there are genuinely no posts.
  // While loading (isLoading) we keep rendering to show the skeleton grid.
  if (isError || (!isLoading && posts && posts.length === 0)) return null

  return (
    <section
      className="relative py-16 md:py-24"
      role="region"
      aria-labelledby="latest-posts-heading"
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader
          eyebrow="Substack"
          eyebrowIcon={BookOpen}
          title="Últimos artículos"
          description="Apuntes recientes sobre desarrollo, arquitectura y liderazgo técnico."
          headingId="latest-posts-heading"
          align="left"
          trailing={
            <Link
              href="https://carrilloapps.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm px-2 py-1 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-orange-400 focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
            >
              <Substack className="h-4 w-4" aria-hidden="true" />
              Ver en Substack
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(posts ?? Array.from({ length: 4 })).map((post, index) => {
            const isPlaceholder = post == null
            return (
              <SurfaceCard
                as="article"
                key={isPlaceholder ? `skeleton-${index}` : (post as LatestPost).url}
                className="group flex flex-col gap-4"
              >
                {isPlaceholder ? (
                  <>
                    <div className="aspect-[16/10] animate-pulse border border-white/[0.04] bg-white/[0.04]" />
                    <div className="space-y-3 px-5 pb-5">
                      <div className="h-3 w-24 animate-pulse rounded-sm border border-white/[0.04] bg-white/[0.04]" />
                      <div className="h-4 w-full animate-pulse rounded-sm border border-white/[0.04] bg-white/[0.04]" />
                      <div className="h-4 w-3/4 animate-pulse rounded-sm border border-white/[0.04] bg-white/[0.04]" />
                    </div>
                  </>
                ) : (
                  <Link
                    href={(post as LatestPost).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-4 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800">
                      {(post as LatestPost).thumbnail ? (
                        <Image
                          src={(post as LatestPost).thumbnail!}
                          alt={(post as LatestPost).thumbnailAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          loading={index < 2 ? "eager" : "lazy"}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-600">
                          <BookOpen className="h-10 w-10" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 px-5 pb-5">
                      <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] text-zinc-500 uppercase">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" aria-hidden="true" />
                          {formatDateES((post as LatestPost).pubDate)}
                        </span>
                        {(post as LatestPost).readingTime ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            {(post as LatestPost).readingTime} min
                          </span>
                        ) : null}
                      </div>
                      <h3 className="line-clamp-3 text-base leading-snug font-semibold text-white transition-colors duration-200 group-hover:text-orange-300 md:text-lg">
                        {(post as LatestPost).title}
                      </h3>
                    </div>
                  </Link>
                )}
              </SurfaceCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
