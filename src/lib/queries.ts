"use client"

import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query"
import type { FeaturedProject } from "@/lib/data/featured-projects"

/* -------------------------------------------------------------------------- */
/*  Shared types                                                              */
/* -------------------------------------------------------------------------- */

/*
  The repository contract lives in `@/types/repository`, not here: this module
  is `"use client"`, and route handlers were importing their types from it.
  Re-exported so existing call sites keep working.
*/
import type { RepositoriesResponse, RepositoryDetails, SourcedRepository } from "@/types/repository"

export type {
  Repository,
  SourcedRepository,
  RepositoriesResponse,
  RepositoryDetails,
} from "@/types/repository"

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
  // `sort()` with no comparator sorts by UTF-16 code unit, which is not a
  // stable alphabetical order once a name carries a non-ASCII character — and
  // this string is the React Query cache key, so two orderings of the same set
  // would be two cache entries for one request. (SonarQube typescript:S2871.)
  const key = [...packages].sort((a, b) => a.localeCompare(b)).join(",")
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
