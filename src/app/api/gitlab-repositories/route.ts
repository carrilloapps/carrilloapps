import {
  matchesSearch,
  parseRepositoryQuery,
  pinnedOnlyResponse,
  repositoriesResponse,
  upstreamUnavailable,
} from "@/lib/repository-api"

// GitLab API types
interface GitLabProject {
  id: number
  name: string
  description: string | null
  star_count: number
  forks_count: number
  web_url: string
  last_activity_at: string
  topics: string[]
  language?: string
}

export async function GET(request: Request) {
  const parsed = parseRepositoryQuery(new URL(request.url).searchParams)
  if (!parsed.ok) return parsed.response
  const { username, page, language, search, pinnedOnly, perPage } = parsed.query

  try {
    // Fetch repositories from GitLab's public API
    // Note: GitLab API requires a user ID, not username, for this endpoint
    // For simplicity, we'll first fetch the user ID from the username
    const userResponse = await fetch(`https://gitlab.com/api/v4/users?username=${username}`, {
      headers: {
        "User-Agent": "carrillo-app",
      },
    })

    if (!userResponse.ok) {
      throw new Error(`GitLab API responded with status: ${userResponse.status}`)
    }

    const userData = await userResponse.json()

    if (!userData.length) {
      throw new Error(`User ${username} not found on GitLab`)
    }

    const userId = userData[0].id

    /*
      A filtered request cannot be paginated upstream: GitLab would return page
      N of *everything*, we would filter those six rows, and the reader would
      get one result on page 1 and a pager offering ten more pages of nothing.
      When a filter is active we pull the whole list once and paginate locally,
      exactly as the GitHub route does.
    */
    const filtering = Boolean(search) || language !== "all"
    const apiUrl = filtering
      ? `https://gitlab.com/api/v4/users/${userId}/projects?page=1&per_page=100&order_by=updated_at`
      : `https://gitlab.com/api/v4/users/${userId}/projects?page=${page}&per_page=${perPage}&order_by=updated_at`

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "carrillo-app",
      },
    })

    if (!response.ok) {
      throw new Error(`GitLab API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Filters run before "pinned" is derived, so a search narrows both lists.
    // Featured repos that ignore the active query read as a broken filter.
    let filteredData = data

    // GitLab's projects API does not return a language, so there is nothing to
    // match on. Any language other than "all" therefore yields nothing here,
    // which is the honest answer — silently returning every project pretended
    // the filter had been applied.
    if (language !== "all") {
      filteredData = []
    }

    filteredData = filteredData.filter((repo: GitLabProject) =>
      matchesSearch(repo.name, repo.description, search),
    )

    const pinnedRepos = filteredData
      .filter((repo: GitLabProject) => repo.star_count > 0)
      .slice(0, 3)

    const pageData = filtering
      ? filteredData.slice((page - 1) * perPage, page * perPage)
      : filteredData

    // Transform the data to match our Repository type
    const repositories = pageData.map((repo: GitLabProject) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || "",
      language: repo.language || "Not specified", // GitLab doesn't directly expose this
      stars: repo.star_count,
      forks: repo.forks_count,
      updated_at: repo.last_activity_at,
      html_url: repo.web_url,
      pinned: pinnedRepos.some((pinnedRepo: GitLabProject) => pinnedRepo.id === repo.id),
    }))

    // Upstream headers only describe the unfiltered list.
    const totalCount = filtering
      ? filteredData.length
      : Number.parseInt(response.headers.get("X-Total") || "0")
    const totalPages = filtering
      ? Math.max(1, Math.ceil(filteredData.length / perPage))
      : Number.parseInt(response.headers.get("X-Total-Pages") || "1")

    const pinnedRepositories = pinnedRepos.map((repo: GitLabProject) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || "",
      language: "Not specified", // GitLab doesn't directly expose this
      stars: repo.star_count,
      forks: repo.forks_count,
      updated_at: repo.last_activity_at,
      html_url: repo.web_url,
      pinned: true,
    }))

    if (pinnedOnly) return pinnedOnlyResponse(pinnedRepositories)

    return repositoriesResponse({
      repositories,
      pinnedRepos: pinnedRepositories,
      totalCount,
      totalPages,
    })
  } catch (error) {
    console.error("Error fetching GitLab repositories:", error)
    return upstreamUnavailable("GitLab")
  }
}
