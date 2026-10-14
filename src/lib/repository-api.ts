import { NextResponse } from "next/server"

import { isValidUsername, parsePage } from "@/lib/api-params"
import type { Repository } from "@/types/repository"

/**
 * The parts `/api/github-repositories` and `/api/gitlab-repositories` had in
 * common, written once.
 *
 * Both handlers parsed the same six query parameters, filtered by the same
 * search rule, mapped their upstream shape onto the same `Repository`, and
 * returned the same `pinned_only` early response — in two copies that had
 * already drifted apart in small ways. The upstream fetch and the per-platform
 * field mapping stay in their own files, because those genuinely differ.
 */

/** Both handlers page by six. */
export const REPOSITORIES_PER_PAGE = 6

export interface RepositoryQuery {
  username: string
  page: number
  language: string
  search: string
  pinnedOnly: boolean
  perPage: number
}

/**
 * Reads and validates the query string shared by both handlers.
 *
 * Returns either the parsed query or the `NextResponse` to send back, so a
 * caller handles the invalid case with one `if` and cannot forget to.
 * `username` is validated because it is interpolated into an upstream API URL
 * (see `api-params.ts`).
 */
export function parseRepositoryQuery(
  searchParams: URLSearchParams,
): { ok: true; query: RepositoryQuery } | { ok: false; response: NextResponse } {
  const username = searchParams.get("username") || "carrilloapps"

  if (!isValidUsername(username)) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Invalid username." }, { status: 422 }),
    }
  }

  return {
    ok: true,
    query: {
      username,
      page: parsePage(searchParams.get("page")),
      language: searchParams.get("language") || "all",
      search: searchParams.get("search") || "",
      pinnedOnly: searchParams.get("pinned_only") === "true",
      perPage: REPOSITORIES_PER_PAGE,
    },
  }
}

/** Case-insensitive match over a repository's name and description. */
export function matchesSearch(name: string, description: string | null, search: string): boolean {
  if (!search) return true
  const needle = search.toLowerCase()
  return name.toLowerCase().includes(needle) || !!description?.toLowerCase().includes(needle)
}

/** The `pinned_only=true` response: the featured set, and nothing paginated. */
export function pinnedOnlyResponse(pinnedRepos: Repository[]): NextResponse {
  return NextResponse.json({ repositories: [], totalCount: 0, totalPages: 0, pinnedRepos })
}

/** The normal response shape, identical across platforms. */
export function repositoriesResponse(params: {
  repositories: Repository[]
  pinnedRepos: Repository[]
  totalCount: number
  totalPages: number
}): NextResponse {
  return NextResponse.json(params)
}

/**
 * What to answer when the upstream API cannot be reached.
 *
 * `/api/gitlab-repositories` used to answer `200` with two invented
 * repositories — `backoffice-toolkit` and `financial-reporting`, complete with
 * star and fork counts — under the comment "return mock data for
 * demonstration". Visitors saw projects that do not exist, presented as this
 * person's work, and nothing on the page said otherwise. GitHub's handler
 * already did the honest thing and returned an error, so the two sides of the
 * same list disagreed about what failure means.
 *
 * `503` plus `Retry-After` is the accurate answer: the data is not available
 * right now, the client should try later, and the UI can say "no se pudieron
 * cargar" instead of showing fiction.
 */
export function upstreamUnavailable(platform: "GitHub" | "GitLab"): NextResponse {
  return NextResponse.json(
    {
      repositories: [],
      pinnedRepos: [],
      totalCount: 0,
      totalPages: 0,
      error: `${platform} API unavailable.`,
    },
    { status: 503, headers: { "Retry-After": "120" } },
  )
}
