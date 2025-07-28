"use client"

import type React from "react"

import { useState } from "react"
import { Search, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export function BlogSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <motion.form 
      onSubmit={handleSearch} 
      className="relative w-full group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Icono de búsqueda */}
        <motion.div
          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
          animate={{
            scale: isFocused ? 1.1 : 1,
            color: isFocused ? "#60a5fa" : "#9ca3af"
          }}
          transition={{ duration: 0.2 }}
        >
          <Search className="h-5 w-5" />
        </motion.div>

        {/* Campo de entrada */}
        <input
          type="search"
          placeholder="Buscar artículos..."
          className="w-full pl-12 pr-12 py-3 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-zinc-400 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Icono decorativo cuando hay texto */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-600/30">
              <Sparkles className="h-3 w-3 text-blue-400" />
            </div>
          </motion.div>
        )}

        {/* Botón de envío invisible para accesibilidad */}
        <button
          type="submit"
          className="sr-only"
          aria-label="Buscar artículos"
        >
          Buscar
        </button>
      </div>

      {/* Indicador de estado de búsqueda */}
      {isFocused && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute top-full left-0 right-0 mt-2 p-3 bg-gradient-to-r from-zinc-800/95 to-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-lg shadow-2xl shadow-black/50"
        >
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Search className="h-4 w-4 text-blue-400" />
            <span className="flex-1 w-full">Presiona Enter para buscar</span>
          </div>
        </motion.div>
      )}
    </motion.form>
  )
}
