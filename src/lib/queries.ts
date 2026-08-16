"use client"

import { keepPreviousData, useMutation, useQueries, useQuery } from "@tanstack/react-query"
import type { FeaturedProject } from "@/lib/data/featured-projects"

/* -------------------------------------------------------------------------- */
/*  Shared types                                                              */
/* -------------------------------------------------------------------------- */

export type Repository = {
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

export type SourcedRepository = Repository & { source: "github" | "gitlab" }

export type RepositoriesResponse = {
  repositories: Repository[]
  pinnedRepos: Repository[]
  /** Matches after filtering, across every page. Both handlers already send it. */
  totalCount: number
  totalPages: number
}

export type RepositoryDetails = {
  id: number
  name: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  watchers: number
  updated_at: string
  html_url: string
  commits_count: number
  latest_release?: {
    tag_name: string
    name: string
    published_at: string
    html_url: string
  }
  latest_commit?: {
    sha: string
    message: string
    date: string
    html_url: string
  }
}

export type LatestPost = {
  title: string
  url: string
  pubDate: string
  readingTime: number | null
  thumbnail: string | null
  thumbnailAlt: string
}

/* -------------------------------------------------------------------------- */
/*  Fetch helper + query keys                                                 */
/* -------------------------------------------------------------------------- */

async function fetchJson<T>(url: string, message: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(message)
  return res.json() as Promise<T>
}

export const queryKeys = {
  repositories: (
    source: "github" | "gitlab",
    username: string,
    page: number,
    language: string,
    search: string,
  ) => ["repositories", source, username, page, language, search] as const,
  pinnedRepositories: () => ["pinned-repositories"] as const,
  repositoryDetails: (platform: string, repository: string) =>
    ["repository-details", platform, repository] as const,
  latestPosts: () => ["latest-posts"] as const,
  newsletterStatus: () => ["newsletter-status"] as const,
}

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                     */
/* -------------------------------------------------------------------------- */

/** Paginated + filtered repository listing for /recursos. */
export function useRepositories(params: {
  source: "github" | "gitlab"
  username: string
  page: number
  language: string
  search: string
}) {
  const { source, username, page, language, search } = params
  return useQuery({
    queryKey: queryKeys.repositories(source, username, page, language, search),
    queryFn: () =>
      fetchJson<RepositoriesResponse>(
        `/api/${source}-repositories?username=${username}&page=${page}&language=${language}&search=${search}`,
        source === "github"
          ? "Error al obtener los repositorios de GitHub"
          : "Error al obtener los repositorios de GitLab",
      ),
    // Smooth pagination: keep showing the previous page while the next loads.
    placeholderData: keepPreviousData,
  })
}

/** Pinned repos from GitHub + GitLab, fetched in parallel and merged by stars. */
export function usePinnedRepositories() {
  return useQuery({
    queryKey: queryKeys.pinnedRepositories(),
    queryFn: async (): Promise<SourcedRepository[]> => {
      const [github, gitlab] = await Promise.all([
        fetchJson<RepositoriesResponse>(
          `/api/github-repositories?username=carrilloapps&pinned_only=true`,
          "Failed to fetch GitHub repositories",
        ),
        fetchJson<RepositoriesResponse>(
          `/api/gitlab-repositories?username=carrilloapps&pinned_only=true`,
          "Failed to fetch GitLab repositories",
        ),
      ])

      const githubPinned: SourcedRepository[] = (github.pinnedRepos || []).map((repo) => ({
        ...repo,
        source: "github",
      }))
      const gitlabPinned: SourcedRepository[] = (gitlab.pinnedRepos || []).map((repo) => ({
        ...repo,
        source: "gitlab",
      }))

      return [...githubPinned, ...gitlabPinned].sort((a, b) => b.stars - a.stars)
    },
  })
}

/** Live repository metadata for each featured project, fetched in parallel. */
export function useRepositoryDetails(projects: FeaturedProject[]) {
  return useQueries({
    queries: projects.map((project) => ({
      queryKey: queryKeys.repositoryDetails(project.platform, project.repository),
      queryFn: () =>
        fetchJson<RepositoryDetails>(
          `/api/repository-details?platform=${project.platform}&repository=${project.repository}`,
          "Failed to fetch repository data",
        ),
    })),
  })
}

/** Latest Substack posts for the home page. */
export function useLatestPosts() {
  return useQuery({
    queryKey: queryKeys.latestPosts(),
    queryFn: async () => {
      const data = await fetchJson<{ posts?: LatestPost[] }>(
        "/api/latest-posts",
        "Failed to fetch latest posts",
      )
      return Array.isArray(data?.posts) ? data.posts : []
    },
  })
}

/** Whether the newsletter backend (Mailchimp) is configured. */
export function useNewsletterStatus() {
  return useQuery({
    queryKey: queryKeys.newsletterStatus(),
    queryFn: async () => {
      const res = await fetch("/api/newsletter")
      const data: { configured?: boolean } = res.ok ? await res.json() : { configured: false }
      return Boolean(data?.configured)
    },
    staleTime: Infinity, // config doesn't change within a session
  })
}

/** Newsletter subscription mutation. */
export function useNewsletterSubscribe() {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        const error = new Error(
          data?.error ?? "Por favor intenta nuevamente en un momento.",
        ) as Error & { status?: number }
        error.status = res.status
        throw error
      }
      return true
    },
  })
}

/**
 * Monthly npm downloads for the packages on the home ledger.
 *
 * A package the registry could not answer for comes back `null`, which the
 * ledger renders as an unlit cell rather than a zero.
 */
export interface NpmDownloads {
  month: number | null
  total: number | null
}

export function useNpmDownloads(packages: string[]) {
  const key = [...packages].sort().join(",")
  return useQuery({
    queryKey: ["npm-downloads", key],
    queryFn: async (): Promise<Record<string, NpmDownloads>> => {
      const res = await fetch(`/api/npm-downloads?packages=${encodeURIComponent(key)}`)
      if (!res.ok) return {}
      const data: { downloads?: Record<string, NpmDownloads> } = await res.json()
      return data.downloads ?? {}
    },
    staleTime: 60 * 60 * 1000,
    enabled: packages.length > 0,
  })
}
