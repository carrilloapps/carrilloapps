"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, BookOpen, Calendar, Clock } from "lucide-react"
import { formatDateES } from "@/lib/utils"
import { SectionHeader } from "@/components/section-header"
import { SurfaceCard } from "@/components/ui/surface-card"

interface LatestPost {
  title: string
  slug: string
  pubDate: string
  readingTime: number
  thumbnail: string | null
  thumbnailAlt: string
}

export function LatestPostsSection() {
  const [posts, setPosts] = useState<LatestPost[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    fetch("/api/latest-posts")
      .then((r) => r.json())
      .then((data) => {
        if (!active) return
        setPosts(Array.isArray(data?.posts) ? data.posts : [])
      })
      .catch(() => {
        if (!active) return
        setError(true)
      })
    return () => {
      active = false
    }
  }, [])

  // Soft-fail: hide section if there are no posts (initial load) or fetch failed.
  if (error || (posts && posts.length === 0)) return null

  return (
    <section
      className="py-16 md:py-24 relative"
      role="region"
      aria-labelledby="latest-posts-heading"
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          eyebrow="Blog"
          eyebrowIcon={BookOpen}
          title="Últimos artículos"
          description="Apuntes recientes sobre desarrollo, arquitectura y liderazgo técnico."
          headingId="latest-posts-heading"
          align="left"
          trailing={
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
            >
              Ver todos
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          }
        />

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {(posts ?? Array.from({ length: 4 })).map((post, index) => {
            const isPlaceholder = post == null
            return (
              <SurfaceCard
                as="article"
                key={isPlaceholder ? `skeleton-${index}` : (post as LatestPost).slug}
                className="group flex flex-col gap-4"
              >
                {isPlaceholder ? (
                  <>
                    <div className="aspect-[16/10] bg-zinc-800/60 animate-pulse" />
                    <div className="px-5 pb-5 space-y-3">
                      <div className="h-3 w-24 bg-zinc-800 rounded animate-pulse" />
                      <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                      <div className="h-4 w-3/4 bg-zinc-800 rounded animate-pulse" />
                    </div>
                  </>
                ) : (
                  <Link
                    href={`/blog/${(post as LatestPost).slug}`}
                    className="flex flex-col gap-4 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-600">
                          <BookOpen className="w-10 h-10" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 px-5 pb-5">
                      <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" aria-hidden="true" />
                          {formatDateES((post as LatestPost).pubDate)}
                        </span>
                        {(post as LatestPost).readingTime ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            {(post as LatestPost).readingTime} min
                          </span>
                        ) : null}
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-white leading-snug line-clamp-3 group-hover:text-blue-300 transition-colors duration-200">
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
