"use client"

import { Star, GitFork, Calendar, Code } from "lucide-react"
import { motion } from "@/lib/motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SpinnerLoading } from "@/components/unified-loading"
import { usePinnedRepositories } from "@/lib/queries"

export function FeaturedRepositories() {
  const { data: repositories = [], isLoading: loading, error } = usePinnedRepositories()

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <SpinnerLoading />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="surface-card">
        <CardContent className="p-6 text-center">
          <p className="text-red-400">Error: {error.message}</p>
          <Button onClick={() => window.location.reload()} variant="glass" className="mt-4">
            Intentar de nuevo
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (repositories.length === 0) {
    return (
      <Card className="surface-card">
        <CardContent className="p-6 text-center">
          <p className="text-zinc-300">No se encontraron repositorios destacados.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {repositories.map((repo) => (
        <motion.div
          key={`${repo.source}-${repo.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -5 }}
        >
          <Card className="surface-card flex h-full flex-col">
            <div className="relative aspect-video bg-zinc-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl">
                  {repo.language === "JavaScript"
                    ? "🟨"
                    : repo.language === "TypeScript"
                      ? "🔵"
                      : "📦"}
                </div>
              </div>
            </div>
            <CardContent className="grow space-y-4 p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{repo.name}</h3>
                  <Badge
                    className={`${repo.source === "github" ? "bg-purple-600" : "bg-orange-600"}`}
                  >
                    {repo.source === "github" ? "GitHub" : "GitLab"}
                  </Badge>
                </div>
                <p className="text-zinc-300">{repo.description || "Sin descripción disponible."}</p>
              </div>
              <div className="mt-auto space-y-4">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <div className={`h-3 w-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
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
            <CardFooter className="flex justify-between border-t border-white/[0.06]">
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
                <Button variant="glass" className="gap-2">
                  <Code className="h-4 w-4" />
                  Ver código
                </Button>
              </a>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
