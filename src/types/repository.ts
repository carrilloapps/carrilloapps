/**
 * The shapes the repository endpoints speak, shared by both sides of the wire.
 *
 * These lived in `src/lib/queries.ts`, which carries `"use client"`. Route
 * handlers and server components were importing their types from a client
 * module — harmless at runtime, because types erase, but it points the
 * dependency the wrong way and makes the client bundle look like the source of
 * truth for a server contract.
 *
 * `RepositoryDetails` was worse: `src/app/api/repository-details/route.ts`
 * declared its own copy, 25 identical lines. jscpd found it. Two declarations
 * of one contract drift in one direction — the handler adds a field, the client
 * never learns about it, and TypeScript cannot help because neither side knows
 * the other exists.
 */

/** One repository row, as both list endpoints return it. */
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

/** A repository tagged with the platform it came from, for the merged view. */
export type SourcedRepository = Repository & { source: "github" | "gitlab" }

export type RepositoriesResponse = {
  repositories: Repository[]
  pinnedRepos: Repository[]
  /** Matches after filtering, across every page. Both handlers send it. */
  totalCount: number
  totalPages: number
}

/** The detail view for a single repository, from `/api/repository-details`. */
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
