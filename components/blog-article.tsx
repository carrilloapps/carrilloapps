"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, Tag, ThumbsUp, MessageSquare, Share2, Bookmark, BookmarkCheck, ArrowLeft, Home, BookOpen, Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DisqusComments } from "@/components/disqus-comments"
import { BlogContentRenderer } from "@/components/blog-content-renderer"
import { BlogTableOfContents, extractHeadings } from "@/components/blog-table-of-contents"
import { SocialShareDialog } from "@/components/social-share-dialog"
import { getSiteUrl } from '@/lib/env'
import { formatDateES } from '@/lib/utils'
import { useDisqusComments, useDisqusReactions, useDisqusSaves } from "@/hooks/use-disqus-comments"
import type { BlogPost } from "@/types/blog"

interface BlogArticleProps {
  slug: string
  post: BlogPost
  relatedPosts: BlogPost[]
  categories: string[]
}

export function BlogArticle({ slug, post, relatedPosts, categories }: BlogArticleProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  
  // Get comment count using the custom hook
  const { count: commentCount, isLoading: commentLoading } = useDisqusComments(slug)
  
  // Get reactions/likes using the custom hook
  const { reactions, hasReacted, toggleReaction, isLoading: reactionsLoading } = useDisqusReactions(slug)
  
  // Get saves/bookmarks using the custom hook
  const { reactions: saves, hasSaved, toggleSave, isLoading: savesLoading } = useDisqusSaves(slug)

  const formattedDate = formatDateES(post.pubDate)

  // Extract headings for Table of Contents
  const tocHeadings = useMemo(() => extractHeadings(post.content), [post.content])

  // Calcular tiempo estimado de lectura
  const readingTime = post.readingTime || Math.ceil(post.content.split(" ").length / 200)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb + Título — full-bleed sobre el grid de contenido para
          que el H1 use todo el ancho disponible. */}
      <motion.nav
        className="flex items-center gap-2 text-sm text-zinc-400 mb-8 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-1">
          <Home className="h-4 w-4" aria-hidden="true" />
          Inicio
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/blog" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-1">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          Blog
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-zinc-300 line-clamp-1 max-w-[60ch]">{post.title}</span>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-10 md:mb-14"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
          {post.title}
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
          className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="surface-card-subtle flex items-center gap-3 p-4 flex-1 sm:flex-initial sm:min-w-[200px]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-600/30 shadow-lg shadow-blue-500/10 overflow-hidden flex-shrink-0">
              {post.author === "José Carrillo" ? (
                <Image
                  src="/profile.jpg"
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
            className="surface-card-subtle flex items-center gap-3 p-4 flex-1 sm:flex-initial sm:min-w-[180px]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 rounded-full bg-zinc-800/60 flex items-center justify-center border border-zinc-700/50 flex-shrink-0">
              <Calendar className="h-5 w-5 text-purple-400" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs text-zinc-500 font-medium">Publicado</span>
              <span className="text-zinc-300 font-semibold truncate">{formattedDate}</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="surface-card-subtle flex items-center gap-3 p-4 flex-1 sm:flex-initial sm:min-w-[160px]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 rounded-full bg-zinc-800/60 flex items-center justify-center border border-zinc-700/50 flex-shrink-0">
              <Clock className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs text-zinc-500 font-medium">Lectura</span>
              <span className="text-zinc-300 font-semibold truncate">{readingTime} min</span>
            </div>
          </motion.div>
          
          <motion.button
            onClick={() => setShareDialogOpen(true)}
            className="surface-card-subtle flex items-center gap-3 p-4 flex-1 sm:flex-initial sm:min-w-[160px] cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            aria-label="Compartir artículo"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 flex items-center justify-center border border-blue-600/30 shadow-lg shadow-blue-500/10 flex-shrink-0">
              <Share2 className="h-5 w-5 text-blue-400" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs text-zinc-500 font-medium">Compartir</span>
              <span className="text-zinc-300 font-semibold truncate">Artículo</span>
            </div>
          </motion.button>
            </motion.div>
          </motion.header>

          {/* Featured Image */}
          {post.thumbnail && (
            <motion.figure
              className="mb-12"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-700/50 shadow-2xl shadow-blue-500/10">
                <Image
                  src={post.thumbnail}
                  alt={post.thumbnailAlt || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 via-transparent to-transparent" />
              </div>
              {post.thumbnailCaption && (
                <figcaption className="mt-3 text-center text-sm text-zinc-400 italic">
                  {post.thumbnailCaption}
                </figcaption>
              )}
            </motion.figure>
          )}

          <BlogContentRenderer content={post.content} />

          {/* Metadata Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="surface-card">
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <CardContent className="p-6 relative z-[2]">
                {/* Header row: autor a la izquierda, acciones a la derecha.
                    En mobile colapsa en columna; las acciones quedan sobre
                    una sola fila scroll-free gracias a `flex-wrap`. */}
                <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
                  {/* Autor */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30 overflow-hidden flex-shrink-0 shadow-lg shadow-blue-500/10">
                      {post.authorAvatar ? (
                        <Image
                          src={post.authorAvatar}
                          alt={post.author}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : post.author === "José Carrillo" || post.author === "Junior Carrillo" ? (
                        <Image
                          src="/profile.jpg"
                          alt={post.author}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <User className="w-6 h-6 text-blue-400" aria-hidden="true" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate">{post.author}</p>
                      <p className="text-sm text-zinc-400 leading-snug line-clamp-2">
                        {post.authorBio || "Autor"}
                      </p>
                    </div>
                  </div>

                  {/* Acciones — botones consistentes en tamaño con scroll
                      horizontal interno en viewports muy estrechos. */}
                  <div
                    className="flex flex-wrap gap-2 shrink-0"
                    role="group"
                    aria-label="Acciones del artículo"
                  >
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={toggleReaction}
                      className={`gap-1.5 ${hasReacted ? "border-blue-500/50 text-blue-400" : ""}`}
                      aria-pressed={hasReacted}
                    >
                      <ThumbsUp
                        className={`h-4 w-4 ${hasReacted ? "fill-current" : ""}`}
                        aria-hidden="true"
                      />
                      <span>{hasReacted ? "Te gusta" : "Me gusta"}</span>
                    </Button>
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => setShareDialogOpen(true)}
                      className="gap-1.5"
                    >
                      <Share2 className="h-4 w-4" aria-hidden="true" />
                      <span>Compartir</span>
                    </Button>
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={toggleSave}
                      className={`gap-1.5 ${hasSaved ? "border-emerald-500/50 text-emerald-400" : ""}`}
                      aria-pressed={hasSaved}
                    >
                      {hasSaved ? (
                        <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Bookmark className="h-4 w-4" aria-hidden="true" />
                      )}
                      <span>{hasSaved ? "Guardado" : "Guardar"}</span>
                    </Button>
                  </div>
                </div>

            {/* Meta-data grid — definition list pattern, sin cards anidadas.
                Cada par label/value ocupa una fila con hairline divisor entre
                rows. Lee como tabla de metadatos en vez de tiled-cards. */}
            <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4 pt-2 border-t border-white/[0.06]">
              <div className="flex flex-col gap-0.5 pt-3">
                <dt className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 font-medium">
                  Publicado
                </dt>
                <dd className="text-zinc-200 font-medium">{formattedDate}</dd>
              </div>
              <div className="flex flex-col gap-0.5 pt-3">
                <dt className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 font-medium">
                  Tiempo de lectura
                </dt>
                <dd className="text-zinc-200 font-medium">{readingTime} minutos</dd>
              </div>
              <div className="flex flex-col gap-0.5 pt-3">
                <dt className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 font-medium">
                  ID del artículo
                </dt>
                <dd className="text-zinc-300 text-sm font-mono truncate">{post.guid}</dd>
              </div>
              {post.lastModified && post.lastModified !== post.pubDate && (
                <div className="flex flex-col gap-0.5 pt-3">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 font-medium">
                    Última actualización
                  </dt>
                  <dd className="text-zinc-200 font-medium">{formatDateES(post.lastModified)}</dd>
                </div>
              )}
              <div className="flex flex-col gap-2 pt-3 md:col-span-2">
                <dt className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 font-medium">
                  Categorías
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {post.categories.map((category, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Link href={`/blog?category=${encodeURIComponent(category)}`}>
                        <Badge
                          variant="outline"
                          className="capitalize bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/15 transition-colors cursor-pointer"
                        >
                          <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
                          {category}
                        </Badge>
                      </Link>
                    </motion.div>
                  ))}
                </dd>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-col gap-2 pt-3 md:col-span-2">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 font-medium">
                    Etiquetas
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge
                          variant="outline"
                          className="capitalize bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/15 transition-colors"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </dd>
                </div>
              )}
              <div className="flex flex-col gap-2 pt-3 md:col-span-2">
                <dt className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 font-medium">
                  Estadísticas
                </dt>
                <dd>
                  <div className="flex flex-col gap-3 text-zinc-300">
                    <motion.div 
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MessageSquare className="h-4 w-4 text-blue-400" />
                      <span className="flex-1 w-full text-sm">
                        {commentLoading ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            <span className="text-zinc-300">Sincronizando...</span>
                          </span>
                        ) : (
                          <span className="font-medium">{commentCount} {commentCount === 1 ? 'comentario' : 'comentarios'}</span>
                        )}
                      </span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ThumbsUp className={`h-4 w-4 ${hasReacted ? 'text-blue-400' : 'text-zinc-400'}`} />
                      <span className="flex-1 w-full text-sm">
                        {reactionsLoading ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            <span className="text-zinc-300">Cargando...</span>
                          </span>
                        ) : (
                          <span className={hasReacted ? 'font-medium text-blue-400' : 'font-medium'}>{reactions} me gusta</span>
                        )}
                      </span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Bookmark className={`h-4 w-4 ${hasSaved ? 'text-emerald-400 fill-emerald-400' : 'text-zinc-400'}`} />
                      <span className="flex-1 w-full text-sm">
                        {savesLoading ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            <span className="text-zinc-300">Cargando...</span>
                          </span>
                        ) : (
                          <span className={hasSaved ? 'font-medium text-emerald-400' : 'font-medium'}>{saves} {saves === 1 ? 'guardado' : 'guardados'}</span>
                        )}
                      </span>
                    </motion.div>
                  </div>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </motion.div>
    </motion.article>
    {/* Disqus Comments */}
    <DisqusComments
      identifier={post.slug}
      title={post.title}
      url={`${getSiteUrl()}/blog/${post.slug}`}
    />

    {/* Social Share Dialog */}
    <SocialShareDialog
      open={shareDialogOpen}
      onOpenChange={setShareDialogOpen}
      title={post.title}
      url={`${getSiteUrl()}/blog/${post.slug}`}
    />
  </motion.div>

  {/* Sidebar */}
  <motion.aside
    className="lg:col-span-1 space-y-6"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
    {/* Sticky wrapper for TOC */}
    <div className="lg:sticky lg:top-24 space-y-6">

    {/* Table of Contents */}
    <BlogTableOfContents headings={tocHeadings} />

    {/* Quick Navigation */}
    <Card className="surface-card">
      <CardContent className="py-3 px-4 space-y-1">
        <Link 
          href="/blog" 
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors duration-300 text-zinc-400 hover:text-blue-400 text-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al blog
        </Link>
        <Link 
          href="/" 
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors duration-300 text-zinc-400 hover:text-blue-400 text-sm"
        >
          <Home className="h-3.5 w-3.5" />
          Página principal
        </Link>
      </CardContent>
    </Card>

    {/* Categories */}
    {categories.length > 0 && (
      <Card className="surface-card">
        <CardHeader className="pb-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
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
      <Card className="surface-card">
        <CardHeader className="pb-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
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
                <div className="space-y-3 p-3 rounded-lg hover:bg-white/[0.04] transition-colors duration-200">
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
                      {formatDateES(relatedPost.pubDate)}
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
            <Button variant="glass" size="sm" className="w-full gap-2">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              Ver todos los artículos
            </Button>
          </Link>
        </CardContent>
      </Card>
    )}

    {/* Newsletter or CTA */}
    <Card className="surface-card relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-purple-600/8 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <CardContent className="p-6 text-center space-y-4 relative z-[2]">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
          <ThumbsUp className="h-5 w-5 text-blue-400" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-white">
            ¿Te gustó este artículo?
          </h4>
          <p className="text-sm text-zinc-300">
            Compártelo con otros desarrolladores y sígueme para más contenido.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="gradient"
            size="sm"
            onClick={() => setShareDialogOpen(true)}
            className="flex-1 touch-manipulation"
          >
            <Share2 className="h-4 w-4 mr-1" aria-hidden="true" />
            Compartir
          </Button>
          <Button
            variant="glass"
            size="sm"
            onClick={toggleSave}
            className={hasSaved ? "border-emerald-500/50 text-emerald-400" : ""}
            aria-label={hasSaved ? "Guardado" : "Guardar artículo"}
          >
            {hasSaved ? <BookmarkCheck className="h-4 w-4" aria-hidden="true" /> : <Bookmark className="h-4 w-4" aria-hidden="true" />}
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>{/* Close sticky wrapper */}
  </motion.aside>
</div>
</div>
  )
}
