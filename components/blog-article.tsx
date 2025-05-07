"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, Clock, User, ExternalLink, Tag, ThumbsUp, MessageSquare, Share2, Bookmark } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DisqusComments } from "@/components/disqus-comments"
import { fetchMediumPostBySlug } from "@/lib/medium"
import type { MediumPost } from "@/types/medium"

export function BlogArticle({ slug }: { slug: string }) {
  const [post, setPost] = useState<MediumPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true)
        const postData = await fetchMediumPostBySlug("@carrilloapps", slug)
        setPost(postData)
      } catch (err) {
        console.error("Error fetching Medium post:", err)
        setError("No pudimos cargar el artículo. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="h-10 bg-zinc-800 rounded animate-pulse w-3/4"></div>
          <div className="flex gap-4">
            <div className="h-6 bg-zinc-800 rounded animate-pulse w-32"></div>
            <div className="h-6 bg-zinc-800 rounded animate-pulse w-32"></div>
          </div>
        </div>
        <div className="aspect-video bg-zinc-800 rounded animate-pulse"></div>
        <div className="space-y-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
            ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6 text-center">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4 bg-blue-600 hover:bg-blue-700">
            Intentar de nuevo
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!post) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6 text-center">
          <p className="text-zinc-400">No se encontró el artículo solicitado.</p>
        </CardContent>
      </Card>
    )
  }

  // Calcular la fecha de publicación formateada
  const publishDate = new Date(post.pubDate)
  const formattedDate = publishDate.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Calcular tiempo estimado de lectura
  const readingTime = post.readingTime || Math.ceil(post.content.split(" ").length / 200)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <header className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {post.author}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formattedDate}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {readingTime} min de lectura
          </div>
        </div>
      </header>

      <div className="prose prose-invert prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Metadata Card */}
      <Card className="bg-zinc-900 border-zinc-800 mb-8 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                <User className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-zinc-400">Vía Medium</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800 gap-1.5">
                <ThumbsUp className="h-4 w-4" />
                <span>Me gusta</span>
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800 gap-1.5">
                <Share2 className="h-4 w-4" />
                <span>Compartir</span>
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800 gap-1.5">
                <Bookmark className="h-4 w-4" />
                <span>Guardar</span>
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800 gap-1.5">
                <a href={post.link} className="flex gap-2 justify-center items-center" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Leer en Medium
                </a>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-zinc-400 font-medium">Publicado el</p>
                <p className="text-zinc-300">{formattedDate}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400 font-medium">Tiempo de lectura</p>
                <p className="text-zinc-300">{readingTime} minutos</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400 font-medium">ID del artículo</p>
                <p className="text-zinc-300 text-sm truncate">{post.guid}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-zinc-400 font-medium">Categorías</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.categories.map((category, i) => (
                    <Badge key={i} variant="outline" className="border-zinc-700 text-zinc-300">
                      <Tag className="h-3 w-3 mr-1" />
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-zinc-400 font-medium">Estadísticas</p>
                <div className="flex items-center gap-4 mt-2 text-zinc-300">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-zinc-400" />
                    <span>0 comentarios</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4 text-zinc-400" />
                    <span>0 likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 pt-8">
      </div>

      {/* Disqus Comments */}
      <DisqusComments
        shortname="carrilloapps"
        identifier={post.slug}
        title={post.title}
        url={`https://carrillo.app/blog/${post.slug}`}
      />
    </motion.article>
  )
}
