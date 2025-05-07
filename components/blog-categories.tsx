"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchMediumCategories } from "@/lib/medium"

export function BlogCategories() {
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
        const allCategories = await fetchMediumCategories("@carrilloapps")
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
    return <div className="w-full md:w-64 h-10 bg-zinc-800 rounded animate-pulse"></div>
  }

  return (
    <Select onValueChange={handleCategoryChange} defaultValue={currentCategory || "all"}>
      <SelectTrigger className="w-full md:w-[220px] bg-zinc-950 border-zinc-800 focus:ring-blue-500">
        <SelectValue placeholder="Filtrar por categoría" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-950 border-zinc-800">
        <SelectItem value="all">Todas las categorías</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
