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