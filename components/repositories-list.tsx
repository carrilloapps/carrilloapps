"use client"

import { useState, useEffect } from "react"
import { Star, GitFork, Calendar, Code, Pin } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Repository = {
  id: number
  name: string
  description: string
  language: string
  stars: number
  forks: number
  updated_at: string
  html_url: string
  pinned?: boolean
}

type RepositoriesListProps = {
  source: "github" | "gitlab"
  username: string
}

export function RepositoriesList({ source, username }: RepositoriesListProps) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [pinnedRepos, setPinnedRepos] = useState<Repository[]>([])
  const [_loading, _setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [language, setLanguage] = useState("all")
  const [languages, setLanguages] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    async function fetchRepositories() {
      _setLoading(true)
      setError(null)

      try {
        let data: Repository[] = []
        let pinnedData: Repository[] = []
        const allLanguages: string[] = []

        if (source === "github") {
          const response = await fetch(
            `/api/github-repositories?username=${username}&page=${currentPage}&language=${language}&search=${searchQuery}`,
          )

          if (!response.ok) {
            throw new Error("Error al obtener los repositorios de GitHub")
          }

          const result = await response.json()
          data = result.repositories || []
          pinnedData = result.pinnedRepos || []
          setTotalPages(result.totalPages || 1)
        } else if (source === "gitlab") {
          const response = await fetch(
            `/api/gitlab-repositories?username=${username}&page=${currentPage}&language=${language}&search=${searchQuery}`,
          )

          if (!response.ok) {
            throw new Error("Error al obtener los repositorios de GitLab")
          }

          const result = await response.json()
          data = result.repositories || []
          pinnedData = result.pinnedRepos || []
          setTotalPages(result.totalPages || 1)
        }

        // Extract unique languages
        data.forEach((repo) => {
          if (repo.language && !allLanguages.includes(repo.language)) {
            allLanguages.push(repo.language)
          }
        })

        setLanguages(allLanguages)
        setRepositories(data)
        setPinnedRepos(pinnedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocurrió un error al cargar los repositorios")
        setRepositories([])
        setPinnedRepos([])
      } finally {
        _setLoading(false)
      }
    }

    fetchRepositories()
  }, [source, username, currentPage, searchQuery, language])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSearch = () => {
    setSearchQuery(searchInput)
    setCurrentPage(1)
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    setCurrentPage(1)
  }

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-500",
      Python: "bg-green-500",
      Java: "bg-red-500",
      Ruby: "bg-pink-500",
      Go: "bg-cyan-500",
      "C#": "bg-purple-500",
      PHP: "bg-indigo-500",
      HTML: "bg-orange-500",
      CSS: "bg-teal-500",
    }

    return colors[language] || "bg-gray-500"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  if (error) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6 text-center">
          <p className="text-red-500">Error: {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4 bg-blue-600 hover:bg-blue-700">
            Intentar de nuevo
          </Button>
        </CardContent>
      </Card>
    )
  }

  const renderRepository = (repo: Repository, isPinned = false) => (
    <motion.div
      key={repo.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className={`bg-zinc-900 ${isPinned ? "border-blue-800" : "border-zinc-800"}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              {repo.name}
            </a>
            {isPinned && (
                <Badge className="bg-blue-600 ml-2">
                <Pin className="h-3 w-3 mr-1" />
                Destacado
                </Badge>
            )}
          </CardTitle>
            <CardDescription>{repo.description || "Sin descripción disponible."}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
              {repo.language}
            </div>
            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Actualizado el {formatDate(repo.updated_at)}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {repo.stars}
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-4 w-4" />
              {repo.forks}
            </div>
          </div>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 gap-2">
              <Code className="h-4 w-4" />
              Ver proyecto
            </Button>
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="relative w-full md:w-80">
          <Input
            type="search"
            placeholder="Buscar repositorio..."
            className="pl-8 bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500 w-full"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            className="absolute right-0 top-0 h-full px-3 bg-transparent hover:bg-zinc-800"
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </div>
        <div className="flex gap-2">
          <Select onValueChange={handleLanguageChange} defaultValue={language}>
            <SelectTrigger className="w-full md:w-[180px] bg-zinc-950 border-zinc-800 focus:ring-blue-500">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 border-zinc-800">
              <SelectItem value="all">Todos los lenguajes</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {pinnedRepos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
        <Pin className="h-4 w-4 text-blue-500" />
        Repositorios destacados
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pinnedRepos.map((repo) => renderRepository(repo, true))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Todos los repositorios</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repositories.map((repo) => renderRepository(repo))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>Ant.</PaginationLink>
              </PaginationItem>
            )}

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber =
                currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i

              if (pageNumber <= 0 || pageNumber > totalPages) return null

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink onClick={() => handlePageChange(pageNumber)} isActive={currentPage === pageNumber}>
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>Sig.</PaginationLink>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
