"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchRelatedMediumPosts } from "@/lib/medium"
import type { MediumPost } from "@/types/medium"

export function BlogRelated({ currentSlug }: { currentSlug: string }) {
  const [relatedPosts, setRelatedPosts] = useState<MediumPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRelatedPosts() {
      try {
        setLoading(true)
        const posts = await fetchRelatedMediumPosts("@carrilloapps", currentSlug)
        setRelatedPosts(posts.slice(0, 3)) // Limitamos a 3 posts relacionados
      } catch (err) {
        console.error("Error fetching related Medium posts:", err)
        setRelatedPosts([])
      } finally {
        setLoading(false)
      }
    }

    loadRelatedPosts()
  }, [currentSlug])

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="bg-zinc-900 border-zinc-800">
              <div className="aspect-video bg-zinc-800 animate-pulse"></div>
              <CardContent className="p-6 space-y-4">
                <div className="h-6 bg-zinc-800 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 bg-zinc-800 rounded animate-pulse w-20"></div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    )
  }

  if (relatedPosts.length === 0) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6 text-center">
          <p className="text-zinc-400">No hay artículos relacionados disponibles.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {relatedPosts.map((post, index) => (
        <motion.div
          key={post.guid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Link href={`/blog/${post.slug}`} className="block h-full">
            <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full flex flex-col">
              <div className="aspect-video bg-zinc-800 relative">
              <Image
                src={post.thumbnail || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover" />
              </div>
              <CardContent className="p-6 space-y-4 flex-grow">
                <h3 className="text-lg font-bold line-clamp-2">{post.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {post.categories.slice(0, 1).map((category, i) => (
                    <Badge key={i} variant="outline" className="border-zinc-700 text-zinc-400">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-10 flex justify-between border-t border-zinc-800 mt-auto">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.pubDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} min
                </div>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
