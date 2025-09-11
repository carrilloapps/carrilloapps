"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Filter, Sparkles } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCachedMediumCategories } from "@/lib/rss-client";
import { SpinnerLoading } from "@/components/unified-loading";

// Componente principal que envuelve con Suspense
export function BlogCategories() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-4">
        <SpinnerLoading />
      </div>
    }>
      <BlogCategoriesContent />
    </Suspense>
  )
}

// Componente interno que usa useSearchParams
function BlogCategoriesContent() {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || ""
  const currentSearch = searchParams.get("search") || ""

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true)
        const allCategories = await getCachedMediumCategories()
        setCategories(allCategories)
      } catch (err) {
        console.error("Error fetching Medium categories:", err)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams()

    if (value !== "all") {
      params.set("category", value)
    }

    if (currentSearch) {
      params.set("search", currentSearch)
    }

    const queryString = params.toString()
    router.push(`/blog${queryString ? `?${queryString}` : ""}`)
  }

  if (loading) {
    return (
      <motion.div 
        className="w-full md:w-64 h-12 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-lg animate-pulse relative overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-600/20 to-transparent animate-pulse" />
        <div className="flex items-center gap-3 p-3">
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 rounded animate-pulse flex-1" />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <Filter className="h-5 w-5 text-zinc-400 group-focus-within:text-blue-400 transition-colors duration-300" />
      </div>
      
      <Select onValueChange={handleCategoryChange} defaultValue={currentCategory || "all"}>
        <SelectTrigger className="w-full md:w-[280px] h-12 pl-10 pr-4 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
          <SelectValue placeholder="Filtrar por categoría" className="text-zinc-300" />
        </SelectTrigger>
        
        <SelectContent className="bg-gradient-to-br from-zinc-800/95 to-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-lg shadow-2xl shadow-black/50">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SelectItem 
              value="all" 
              className="text-zinc-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:text-blue-100 transition-all duration-300 cursor-pointer focus:bg-gradient-to-r focus:from-blue-600/20 focus:to-purple-600/20 focus:text-blue-100"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                <span className="flex-1 w-full">Todas las categorías</span>
              </div>
            </SelectItem>
            
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <SelectItem 
                  value={category}
                  className="text-zinc-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:text-blue-100 transition-all duration-300 cursor-pointer focus:bg-gradient-to-r focus:from-blue-600/20 focus:to-purple-600/20 focus:text-blue-100"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                    <span className="capitalize flex-1 w-full">{category}</span>
                    <Sparkles className="h-3 w-3 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </SelectItem>
              </motion.div>
            ))}
          </motion.div>
        </SelectContent>
      </Select>
    </motion.div>
  )
}
