"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Star, GitFork, Calendar, Code, Pin } from "lucide-react"
import { useWindowVirtualizer } from "@tanstack/react-virtual"
import { motion } from "@/lib/motion"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SpinnerLoading } from "@/components/unified-loading"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRepositories, type Repository } from "@/lib/queries"
import { trackProjectView, trackProjectLinkClick, trackSearch } from "@/lib/analytics"

type RepositoriesListProps = {
  source: "github" | "gitlab"
  username: string
  /** When provided, the component uses this value for search instead of its internal state and hides its own search bar. */
  externalSearch?: string
  /** When provided, the component uses this value for language filter instead of its internal state. */
  externalLanguage?: string
}

/** Above this many repos in a single response we switch to a virtualized grid. */
const VIRTUALIZE_THRESHOLD = 24

const LANGUAGE_COLORS: Record<string, string> = {
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

function getLanguageColor(lang: string) {
  return LANGUAGE_COLORS[lang] || "bg-gray-500"
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString))
}

/** Pure card body — reused by the pinned grid, the normal grid and the virtualized grid. */
function RepositoryCard({
  repo,
  source,
  isPinned = false,
}: {
  repo: Repository
  source: "github" | "gitlab"
  isPinned?: boolean
}) {
  return (
    <Card className={`surface-card h-full ${isPinned ? "ring-2 ring-emerald-500/30" : ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-emerald-400"
          >
            {repo.name}
          </a>
          {isPinned && (
            <Badge className="ml-2 border border-emerald-500/30 bg-emerald-500/10 font-medium text-emerald-400">
              <Pin className="mr-1 h-3 w-3" />
              Destacado
            </Badge>
          )}
        </CardTitle>
        <CardDescription>{repo.description || "Sin descripción disponible."}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <div className={`h-3 w-3 rounded-full ${getLanguageColor(repo.language)}`} />
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
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackProjectView(repo.name, repo.language || "Unknown")
            trackProjectLinkClick(repo.name, source)
          }}
        >
          <Button variant="glass" className="gap-2">
            <Code className="h-4 w-4" />
            Ver proyecto
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}

/**
 * Window-scroll virtualized grid for long repository lists. Uses lanes as
 * responsive columns (1 / 2 / 3) so only the visible cards are mounted.
 */
function VirtualizedRepoGrid({
  repos,
  source,
}: {
  repos: Repository[]
  source: "github" | "gitlab"
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isTablet = useMediaQuery("(min-width: 768px)")
  const lanes = isDesktop ? 3 : isTablet ? 2 : 1

  const listRef = useRef<HTMLDivElement | null>(null)
  // The window virtualizer needs the list's distance from the top of the
  // document. Read it after mount (and on resize) — never during render.
  const [scrollMargin, setScrollMargin] = useState(0)

  useEffect(() => {
    const update = () => setScrollMargin(listRef.current?.offsetTop ?? 0)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const virtualizer = useWindowVirtualizer({
    count: repos.length,
    estimateSize: () => 280,
    overscan: 6,
    lanes,
    gap: 24,
    scrollMargin,
    getItemKey: (index) => repos[index].id,
  })

  return (
    <div ref={listRef} className="relative w-full">
      <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
        {virtualizer.getVirtualItems().map((item) => {
          const repo = repos[item.index]
          return (
            <div
              key={item.key}
              data-index={item.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: `${(item.lane / lanes) * 100}%`,
                width: `${100 / lanes}%`,
                transform: `translateY(${item.start - virtualizer.options.scrollMargin}px)`,
                paddingLeft: item.lane === 0 ? 0 : 12,
                paddingRight: item.lane === lanes - 1 ? 0 : 12,
              }}
            >
              <RepositoryCard repo={repo} source={source} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function RepositoriesList({
  source,
  username,
  externalSearch,
  externalLanguage,
}: RepositoriesListProps) {
  const isControlled = externalSearch !== undefined || externalLanguage !== undefined

  const [currentPage, setCurrentPage] = useState(1)

  // Internal state — only active when not controlled from outside
  const [searchQuery, setSearchQuery] = useState("")
  const [language, setLanguage] = useState("all")
  const [searchInput, setSearchInput] = useState("")

  const activeSearch = isControlled ? (externalSearch ?? "") : searchQuery
  const activeLang = isControlled ? (externalLanguage ?? "all") : language

  const { data, isLoading, isError, error } = useRepositories({
    source,
    username,
    page: currentPage,
    language: activeLang,
    search: activeSearch,
  })

  const repositories = useMemo(() => data?.repositories ?? [], [data])
  const pinnedRepos = data?.pinnedRepos ?? []
  const totalPages = data?.totalPages ?? 1

  // Languages available in the current result set (for the internal filter).
  const languages = useMemo(() => {
    const set = new Set<string>()
    repositories.forEach((repo) => {
      if (repo.language) set.add(repo.language)
    })
    return Array.from(set)
  }, [repositories])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  const handleSearch = () => {
    if (searchInput) trackSearch(searchInput)
    setSearchQuery(searchInput)
    setCurrentPage(1)
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    setCurrentPage(1)
  }

  if (isError) {
    return (
      <Card className="surface-card">
        <CardContent className="p-6 text-center">
          <p className="text-red-400">Error: {error?.message}</p>
          <Button onClick={() => window.location.reload()} variant="glass" className="mt-4">
            Intentar de nuevo
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Internal search bar — only shown when not controlled from outside */}
      {!isControlled && (
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="relative w-full md:w-80">
            <Input
              type="search"
              placeholder="Buscar repositorio..."
              variant="glass"
              className="w-full pl-9"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              variant="ghost"
              className="absolute top-0 right-0 h-full rounded-r-lg px-3 text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </div>
          <div className="flex gap-2">
            <Select onValueChange={handleLanguageChange} defaultValue={language}>
              <SelectTrigger
                variant="glass"
                className="w-full md:w-[180px]"
                aria-label="Filtrar por lenguaje"
              >
                <SelectValue placeholder="Lenguaje" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-slate-950/95 backdrop-blur-xl">
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
      )}

      {pinnedRepos.length > 0 && (
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Pin className="h-4 w-4 text-emerald-400" />
            Repositorios destacados
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pinnedRepos.map((repo) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <RepositoryCard repo={repo} source={source} isPinned />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Todos los repositorios</h3>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <SpinnerLoading />
          </div>
        ) : repositories.length === 0 ? (
          <Card className="surface-card">
            <CardContent className="p-12 text-center">
              <p className="mb-2 text-lg text-zinc-300">No se encontraron repositorios</p>
              <p className="text-sm text-zinc-500">
                Intenta ajustar los filtros de búsqueda o lenguaje
              </p>
            </CardContent>
          </Card>
        ) : repositories.length > VIRTUALIZE_THRESHOLD ? (
          <VirtualizedRepoGrid repos={repositories} source={source} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repositories.map((repo) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <RepositoryCard repo={repo} source={source} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
                  Ant.
                </PaginationLink>
              </PaginationItem>
            )}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber =
                currentPage <= 3
                  ? i + 1
                  : currentPage >= totalPages - 2
                    ? totalPages - 4 + i
                    : currentPage - 2 + i
              if (pageNumber <= 0 || pageNumber > totalPages) return null
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>
                  Sig.
                </PaginationLink>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
