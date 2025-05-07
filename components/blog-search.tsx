"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export function BlogSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="search"
        placeholder="Buscar artículos..."
        className="w-full px-4 py-2 pl-10 bg-zinc-950 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
        aria-label="Buscar"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  )
}
