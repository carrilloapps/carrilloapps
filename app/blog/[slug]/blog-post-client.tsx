"use client"

import Link from "next/link"
import { ArrowLeft, Home, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

interface BlogPostClientProps {
  post: any
  slug: string
}

export function BlogPostClient({ post, slug }: BlogPostClientProps) {
  // Verificación de seguridad
  if (!post || !slug) {
    return null
  }

  return (
    <article className="space-y-8 mb-12 w-full">
      {/* Breadcrumb mejorado */}
      <motion.nav 
        aria-label="Breadcrumb" 
        className="mb-8 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-2 p-4 rounded-xl bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 backdrop-blur-sm border border-zinc-700/30 w-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              href="/" 
              className="flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors duration-300 p-2 rounded-lg hover:bg-blue-500/10"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline flex-1 w-full">Inicio</span>
            </Link>
          </motion.div>
          
          <span className="text-zinc-600">/</span>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              href="/blog" 
              className="flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors duration-300 p-2 rounded-lg hover:bg-purple-500/10"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline flex-1 w-full">Blog</span>
            </Link>
          </motion.div>
          
          <span className="text-zinc-600">/</span>
          
          <span className="text-white font-medium truncate max-w-[800px] sm:max-w-lg flex-1 w-full" title={post?.title || "Artículo"}>
            {post?.title || "Artículo"}
          </span>
        </div>
      </motion.nav>

      {/* Botón de navegación mejorado */}
      <motion.div 
        className="flex items-center mb-12 w-full"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Button 
          variant="ghost" 
          className="group text-zinc-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 border border-transparent hover:border-blue-500/30 transition-all duration-300 w-full sm:w-auto" 
          asChild
        >
          <Link href="/blog" className="flex items-center gap-2 w-full">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="flex-1 w-full">Volver al Blog</span>
          </Link>
        </Button>
      </motion.div>
    </article>
  )
}