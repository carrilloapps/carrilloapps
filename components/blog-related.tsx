"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCachedRelatedMediumPosts } from "@/lib/rss-client";
import type { MediumPost } from "@/types/medium"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export function BlogRelated({ currentSlug }: { currentSlug: string }) {
  const [relatedPosts, setRelatedPosts] = useState<MediumPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRelatedPosts() {
      try {
        setLoading(true)
        const posts = await getCachedRelatedMediumPosts(currentSlug);
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
      <motion.div 
        className="grid gap-8 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="group h-full bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 animate-pulse"></div>
                <CardContent className="p-6 space-y-4">
                  <div className="h-6 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 rounded animate-pulse w-full"></div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-6 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 rounded animate-pulse w-20"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </motion.div>
    )
  }

  if (relatedPosts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30">
          <CardContent className="p-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-600/30">
              <Sparkles className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-300">No hay artículos relacionados</h3>
            <p className="text-zinc-400 max-w-md mx-auto">
              Aún no tenemos artículos relacionados disponibles, pero pronto habrá más contenido interesante.
            </p>
            <Button variant="outline" className="mt-4 border-zinc-700 hover:border-blue-500/50 hover:bg-blue-500/10" asChild>
              <Link href="/blog">
                <ArrowRight className="mr-2 h-4 w-4" />
                Ver todos los artículos
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="grid gap-8 md:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {relatedPosts.map((post, index) => (
        <motion.div
          key={post.guid}
          variants={itemVariants}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <Link href={`/blog/${post.slug}`} className="block h-full group">
            <Card className="h-full bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 overflow-hidden hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group-hover:scale-[1.02]">
              <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                <Image
                  src={post.thumbnail || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-blue-400" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4 flex-grow">
                <h3 className="text-lg font-bold line-clamp-2 group-hover:text-blue-100 transition-colors duration-300">
                  {post.title}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {post.categories.slice(0, 2).map((category, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="capitalize border-zinc-700/50 text-zinc-400 bg-zinc-800/30 hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="px-6 pb-6 pt-3 flex justify-between border-t border-zinc-800/50 mt-auto">
                <motion.div 
                  className="flex items-center gap-2 text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border border-purple-600/30">
                    <Calendar className="h-3 w-3 text-purple-400" />
                  </div>
                  {new Date(post.pubDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 flex items-center justify-center border border-green-600/30">
                    <Clock className="h-3 w-3 text-green-400" />
                  </div>
                  {post.readingTime} min
                </motion.div>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
