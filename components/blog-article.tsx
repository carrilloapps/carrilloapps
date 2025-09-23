"use client"

import { useState, useEffect } from "react"
import Image from "next/legacy/image"
import Link from "next/link"
import { Calendar, Clock, User, ExternalLink, Tag, ThumbsUp, MessageSquare, Share2, Bookmark, ArrowLeft, Home, BookOpen, Filter, Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DisqusComments } from "@/components/disqus-comments"
import { getSiteUrl } from '@/lib/env'
import { getCachedMediumPostBySlug, getCachedRelatedMediumPosts, getCachedMediumCategories } from "@/lib/rss-client";
import { useDisqusComments } from "@/hooks/use-disqus-comments"
import type { MediumPost } from "@/types/medium"

export function BlogArticle({ slug }: { slug: string }) {
  const [post, setPost] = useState<MediumPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<MediumPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Get comment count using the custom hook
  const { count: commentCount, isLoading: commentLoading } = useDisqusComments(slug)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [postData, relatedData, categoriesData] = await Promise.all([
          getCachedMediumPostBySlug(slug),
          getCachedRelatedMediumPosts(slug).catch(() => []),
          getCachedMediumCategories().catch(() => [])
        ])
        
        setPost(postData)
        setRelatedPosts(relatedData.slice(0, 4))
        setCategories(categoriesData.slice(0, 8))
      } catch (err) {
        console.error("Error fetching Medium post:", err)
        setError("No pudimos cargar el artículo. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-3 space-y-8">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2 text-sm">
              <div className="h-4 bg-zinc-800 rounded animate-pulse w-12"></div>
              <div className="h-4 bg-zinc-800 rounded animate-pulse w-1"></div>
              <div className="h-4 bg-zinc-800 rounded animate-pulse w-16"></div>
              <div className="h-4 bg-zinc-800 rounded animate-pulse w-1"></div>
              <div className="h-4 bg-zinc-800 rounded animate-pulse w-24"></div>
            </div>

            {/* Header Skeleton */}
            <div className="space-y-6">
              <div className="h-12 bg-zinc-800 rounded animate-pulse w-full"></div>
              <div className="h-8 bg-zinc-800 rounded animate-pulse w-3/4"></div>
              
              {/* Meta info skeleton */}
              <div className="flex flex-wrap gap-6">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-zinc-800/50 animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-zinc-700"></div>
                    <div className="h-4 bg-zinc-700 rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-zinc-800 rounded animate-pulse w-5/6"></div>
                  {i % 3 === 0 && <div className="h-4 bg-zinc-800 rounded animate-pulse w-4/6"></div>}
                </div>
              ))}
            </div>

            {/* Metadata Card Skeleton */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-zinc-800 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-zinc-800 rounded animate-pulse w-24"></div>
                  <div className="h-3 bg-zinc-800 rounded animate-pulse w-16"></div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="p-4 bg-zinc-800/50 rounded-xl space-y-2">
                    <div className="h-3 bg-zinc-700 rounded animate-pulse w-20"></div>
                    <div className="h-4 bg-zinc-700 rounded animate-pulse w-32"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1 space-y-6">
            {/* Navigation Skeleton */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-3">
              <div className="h-5 bg-zinc-800 rounded animate-pulse w-24"></div>
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded">
                  <div className="w-4 h-4 bg-zinc-800 rounded animate-pulse"></div>
                  <div className="h-4 bg-zinc-800 rounded animate-pulse w-20"></div>
                </div>
              ))}
            </div>

            {/* Categories Skeleton */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-3">
              <div className="h-5 bg-zinc-800 rounded animate-pulse w-20"></div>
              <div className="flex flex-wrap gap-2">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="h-6 bg-zinc-800 rounded-full animate-pulse w-16"></div>
                ))}
              </div>
            </div>

            {/* Related Posts Skeleton */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-4">
              <div className="h-5 bg-zinc-800 rounded animate-pulse w-32"></div>
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-video bg-zinc-800 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4"></div>
                    <div className="flex gap-2">
                      <div className="h-5 bg-zinc-800 rounded-full animate-pulse w-12"></div>
                      <div className="h-5 bg-zinc-800 rounded-full animate-pulse w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb Navigation */}
          <motion.nav 
            className="flex items-center gap-2 text-sm text-zinc-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-1">
              <Home className="h-4 w-4" />
              Inicio
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Blog
            </Link>
            <span>/</span>
            <span className="text-zinc-300 truncate max-w-[800px]">{post.title}</span>
          </motion.nav>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
            {post.title}
          </h1>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 flex-1 sm:flex-initial sm:min-w-[200px]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-600/30 shadow-lg shadow-blue-500/10 overflow-hidden flex-shrink-0">
              {post.author === "José Carrillo" ? (
                <Image
                  src="https://avatars.githubusercontent.com/u/16759783"
                  alt={post.author}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="h-5 w-5 text-blue-400" />
              )}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs text-zinc-500 font-medium">Autor</span>
              <span className="text-zinc-300 font-semibold truncate">{post.author}</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 flex-1 sm:flex-initial sm:min-w-[180px]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border border-purple-600/30 shadow-lg shadow-purple-500/10 flex-shrink-0">
              <Calendar className="h-5 w-5 text-purple-400" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs text-zinc-500 font-medium">Publicado</span>
              <span className="text-zinc-300 font-semibold truncate">{formattedDate}</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 flex-1 sm:flex-initial sm:min-w-[160px]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 flex items-center justify-center border border-green-600/30 shadow-lg shadow-green-500/10 flex-shrink-0">
              <Clock className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs text-zinc-500 font-medium">Lectura</span>
              <span className="text-zinc-300 font-semibold truncate">{readingTime} min</span>
            </div>
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
                    <span className="flex-1 w-full">Me gusta</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 gap-1.5 transition-all duration-300">
                    <Share2 className="h-4 w-4" />
                    <span className="flex-1 w-full">Compartir</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/20 gap-1.5 transition-all duration-300">
                    <Bookmark className="h-4 w-4" />
                    <span className="flex-1 w-full">Guardar</span>
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
                      <span className="flex-1 w-full">
                        {commentLoading ? (
                          <span className="inline-flex items-center gap-1">
                            <span className="w-3 h-3 bg-zinc-600 rounded animate-pulse"></span>
                            comentarios
                          </span>
                        ) : (
                          `${commentCount} ${commentCount === 1 ? 'comentario' : 'comentarios'}`
                        )}
                      </span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ThumbsUp className="h-4 w-4 text-zinc-400" />
                      <span className="flex-1 w-full">0 likes</span>
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
        identifier={post.slug}
        title={post.title}
        url={`${getSiteUrl()}/blog/${post.slug}`}
      />
    </motion.article>
  </motion.div>

  {/* Sidebar */}
  <motion.aside
    className="lg:col-span-1 space-y-6"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
    {/* Quick Navigation */}
    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 overflow-hidden hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-400" />
          Navegación
        </h3>
      </CardHeader>
      <CardContent className="space-y-2">
        <Link 
          href="/blog" 
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors duration-300 text-zinc-300 hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </Link>
        <Link 
          href="/" 
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors duration-300 text-zinc-300 hover:text-blue-400"
        >
          <Home className="h-4 w-4" />
          Página principal
        </Link>
        <Link 
          href="/contacto" 
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors duration-300 text-zinc-300 hover:text-blue-400"
        >
          <MessageSquare className="h-4 w-4" />
          Contacto
        </Link>
      </CardContent>
    </Card>

    {/* Categories */}
    {categories.length > 0 && (
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 overflow-hidden hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
        <CardHeader className="pb-3">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent flex items-center gap-2">
            <Tag className="h-5 w-5 text-purple-400" />
            Categorías
          </h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={`/blog?category=${encodeURIComponent(category)}`}>
                  <Badge 
                    variant="outline" 
                    className="capitalize bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-600/30 text-white backdrop-blur-sm shadow-lg shadow-purple-600/10 hover:shadow-purple-600/20 transition-all duration-300 cursor-pointer"
                  >
                    {category}
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    )}

    {/* Related Posts */}
    {relatedPosts.length > 0 && (
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 overflow-hidden hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
        <CardHeader className="pb-3">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-green-400" />
            Artículos relacionados
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {relatedPosts.map((relatedPost, index) => (
            <motion.div
              key={relatedPost.guid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link href={`/blog/${relatedPost.slug}`} className="block group">
                <div className="space-y-3 p-3 rounded-lg hover:bg-zinc-800/30 transition-all duration-300">
                  {relatedPost.thumbnail && (
                    <div className="aspect-video relative overflow-hidden rounded-lg">
                      <Image
                        src={relatedPost.thumbnail}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium line-clamp-2 group-hover:text-blue-100 transition-colors duration-300">
                      {relatedPost.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(relatedPost.pubDate).toLocaleDateString('es-ES', {
                        month: 'short',
                        day: 'numeric'
                      })}
                      <Clock className="h-3 w-3 ml-2" />
                      {relatedPost.readingTime || 5} min
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {relatedPost.categories.slice(0, 2).map((cat, i) => (
                        <Badge 
                          key={i}
                          variant="outline" 
                          className="capitalize text-xs border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          <Separator className="bg-zinc-700/50" />
          
          <Link href="/blog" className="block">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/20 gap-2 transition-all duration-300"
            >
              <ArrowRight className="h-4 w-4" />
              Ver todos los artículos
            </Button>
          </Link>
        </CardContent>
      </Card>
    )}

    {/* Newsletter or CTA */}
    <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-700/30 overflow-hidden hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
      <CardContent className="p-6 text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-600/30">
          <ThumbsUp className="h-6 w-6 text-blue-400" />
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            ¿Te gustó este artículo?
          </h4>
          <p className="text-sm text-zinc-400">
            Compártelo con otros desarrolladores y sígueme para más contenido.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25"
          >
            <Share2 className="h-4 w-4 mr-1" />
            Compartir
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 hover:border-blue-500/30"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.aside>
</div>
</div>
  )
}
