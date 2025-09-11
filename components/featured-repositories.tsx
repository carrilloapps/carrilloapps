"use client"

import { useState, useEffect } from "react"
import { Star, GitFork, Calendar, Code } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SpinnerLoading } from "@/components/unified-loading"

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
  source: "github" | "gitlab"
}

export function FeaturedRepositories() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPinnedRepositories() {
      setLoading(true)
      setError(null)

      try {
        // Fetch pinned repositories from GitHub
        const githubResponse = await fetch(`/api/github-repositories?username=carrilloapps&pinned_only=true`)
        if (!githubResponse.ok) {
          throw new Error("Failed to fetch GitHub repositories")
        }
        const githubResult = await githubResponse.json()
        const githubPinned = (githubResult.pinnedRepos || []).map((repo: any) => ({
          ...repo,
          source: "github" as const,
        }))

        // Fetch pinned repositories from GitLab
        const gitlabResponse = await fetch(`/api/gitlab-repositories?username=carrilloapps&pinned_only=true`)
        if (!gitlabResponse.ok) {
          throw new Error("Failed to fetch GitLab repositories")
        }
        const gitlabResult = await gitlabResponse.json()
        const gitlabPinned = (gitlabResult.pinnedRepos || []).map((repo: any) => ({
          ...repo,
          source: "gitlab" as const,
        }))

        // Combine and sort by stars
        const allPinned = [...githubPinned, ...gitlabPinned].sort((a, b) => b.stars - a.stars)
        setRepositories(allPinned)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setRepositories([])
      } finally {
        setLoading(false)
      }
    }

    fetchPinnedRepositories()
  }, [])

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
    return new Intl.DateTimeFormat("en-US", {
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
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6 text-center">
          <p className="text-red-500">Error: {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4 bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (repositories.length === 0) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6 text-center">
          <p className="text-zinc-400">No pinned repositories found.</p>
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
          <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full flex flex-col">
            <div className="aspect-video bg-zinc-800 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl">
                  {repo.language === "JavaScript" ? "🟨" : repo.language === "TypeScript" ? "🔵" : "📦"}
                </div>
              </div>
            </div>
            <CardContent className="p-6 space-y-4 flex-grow">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{repo.name}</h3>
                  <Badge className={`${repo.source === "github" ? "bg-purple-600" : "bg-orange-600"}`}>
                    {repo.source === "github" ? "GitHub" : "GitLab"}
                  </Badge>
                </div>
                <p className="text-zinc-400">{repo.description || "No description provided."}</p>
              </div>
              <div className="space-y-4 mt-auto">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                  {repo.language}
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Updated on {formatDate(repo.updated_at)}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-zinc-800 bg-zinc-900/50">
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
                  View Code
                </Button>
              </a>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
