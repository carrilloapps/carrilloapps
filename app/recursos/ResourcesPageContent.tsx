'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, GitCommit, Star, GitPullRequest, DoorOpenIcon as IssueOpened } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { SidebarFilters } from "@/components/sidebar-filters"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface Repo {
  id: string;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
  created_at: string;
  updated_at: string;
  source: 'github' | 'gitlab';
}

async function fetchGitHubRepos(): Promise<Repo[]> {
  const res = await fetch('https://api.github.com/users/carrilloapps/repos')
  const data = await res.json()
  return data.map((repo: any) => ({
    ...repo,
    source: 'github' as const,
    open_issues_count: repo.open_issues_count
  }))
}

async function fetchGitLabRepos(): Promise<Repo[]> {
  const res = await fetch('https://gitlab.com/api/v4/users/carrilloapps/projects')
  const data = await res.json()
  return data.map((repo: any) => ({
    ...repo,
    source: 'gitlab' as const,
    stargazers_count: repo.star_count,
    forks_count: repo.forks_count,
    open_issues_count: repo.open_issues_count,
    html_url: repo.web_url
  }))
}

function RepoSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6 mb-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-4 w-20" />
          ))}
        </div>
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

export default function ResourcesPageContent() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true)
      try {
        const [githubRepos, gitlabRepos] = await Promise.all([fetchGitHubRepos(), fetchGitLabRepos()])
        const allRepos = [...githubRepos, ...gitlabRepos]
        setRepos(allRepos)
        setFilteredRepos(allRepos)
      } catch (error) {
        console.error('Error fetching repos:', error)
        setRepos([])
        setFilteredRepos([])
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  const categories = Array.from(new Set(repos.map(repo => repo.language).filter(Boolean)))
  const tags = ['github', 'gitlab']

  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      setFilteredRepos(repos)
    } else {
      setFilteredRepos(repos.filter(repo => repo.language === category))
    }
  }

  const handleTagChange = (tag: string) => {
    setFilteredRepos(repos.filter(repo => repo.source === tag))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFilteredRepos(repos.filter(repo => new Date(repo.created_at).toDateString() === date.toDateString()))
    } else {
      setFilteredRepos(repos)
    }
  }

  const handleSearch = (term: string) => {
    setFilteredRepos(repos.filter(repo =>
      repo.name.toLowerCase().includes(term.toLowerCase()) ||
      repo.description?.toLowerCase().includes(term.toLowerCase())
    ))
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Recursos</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <SidebarFilters
            categories={categories}
            tags={tags}
            onCategoryChange={handleCategoryChange}
            onTagChange={handleTagChange}
            onDateChange={handleDateChange}
            onSearch={handleSearch}
          />
        </div>
        <div className="md:w-3/4">
          <div className="grid gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <RepoSkeleton key={index} />
              ))
            ) : filteredRepos.length > 0 ? (
              filteredRepos.map((repo) => (
                <Card key={repo.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{repo.name}</CardTitle>
                        <CardDescription>{repo.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="text-sm">
                        {repo.language || 'Varios'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{repo.stargazers_count} stars</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitPullRequest className="h-4 w-4" />
                        <span>{repo.forks_count} forks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IssueOpened className="h-4 w-4" />
                        <span>{repo.open_issues_count} open issues</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      <GitCommit className="h-4 w-4" />
                      <span>Ultima actualización: {format(new Date(repo.updated_at), 'MMMM d, yyyy', {locale: es})}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline">{repo.source}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" asChild>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          Ir al repositorio
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>Sin recursos disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

