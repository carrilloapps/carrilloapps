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
      <motion.header 
        className="space-y-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
            {post.title}
          </h1>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap gap-6 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-600/30 shadow-lg shadow-blue-500/10 overflow-hidden">
              {post.author === "José Carrillo" ? (
                <Image
                  src="https://avatars.githubusercontent.com/u/16759783"
                  alt={post.author}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="h-4 w-4 text-blue-400" />
              )}
            </div>
            <span className="text-zinc-300 font-medium">{post.author}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border border-purple-600/30 shadow-lg shadow-purple-500/10">
              <Calendar className="h-4 w-4 text-purple-400" />
            </div>
            <span className="text-zinc-300 font-medium">{formattedDate}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 flex items-center justify-center border border-green-600/30 shadow-lg shadow-green-500/10">
              <Clock className="h-4 w-4 text-green-400" />
            </div>
            <span className="text-zinc-300 font-medium">{readingTime} min de lectura</span>
          </motion.div>
        </motion.div>
      </motion.header>

      <div className="prose prose-invert prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Metadata Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 overflow-hidden hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-[1px]" />
          <CardContent className="p-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-600/30 shadow-lg shadow-blue-500/10 overflow-hidden">
                  {post.author === "Junior Carrillo" ? (
                    <Image
                      src="https://avatars.githubusercontent.com/u/16759783"
                      alt={post.author}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="w-6 h-6 text-blue-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">{post.author}</p>
                  <p className="text-sm text-zinc-400">Vía Medium</p>
                </div>
              </motion.div>
              <div className="flex flex-wrap gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 gap-1.5 transition-all duration-300">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Me gusta</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 gap-1.5 transition-all duration-300">
                    <Share2 className="h-4 w-4" />
                    <span>Compartir</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/20 gap-1.5 transition-all duration-300">
                    <Bookmark className="h-4 w-4" />
                    <span>Guardar</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25 gap-1.5 transition-all duration-300">
                    <a href={post.link} className="flex gap-2 justify-center items-center" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Leer en Medium
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                  <p className="text-sm text-zinc-400 font-medium mb-1">Publicado el</p>
                  <p className="text-zinc-300 font-medium">{formattedDate}</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                  <p className="text-sm text-zinc-400 font-medium mb-1">Tiempo de lectura</p>
                  <p className="text-zinc-300 font-medium">{readingTime} minutos</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                  <p className="text-sm text-zinc-400 font-medium mb-1">ID del artículo</p>
                  <p className="text-zinc-300 text-sm truncate font-mono">{post.guid}</p>
                </div>
              </motion.div>
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
                  <p className="text-sm text-zinc-400 font-medium mb-2">Categorías</p>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge 
                          variant="outline" 
                          className="capitalize bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-white backdrop-blur-sm shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 transition-all duration-300"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {category}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                  <p className="text-sm text-zinc-400 font-medium mb-2">Estadísticas</p>
                  <div className="flex items-center gap-4 text-zinc-300">
                    <motion.div 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MessageSquare className="h-4 w-4 text-zinc-400" />
                      <span>0 comentarios</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ThumbsUp className="h-4 w-4 text-zinc-400" />
                      <span>0 likes</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

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
