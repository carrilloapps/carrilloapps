import { unstable_cache } from "next/cache"

import {
  matchesSearch,
  parseRepositoryQuery,
  pinnedOnlyResponse,
  repositoriesResponse,
  upstreamUnavailable,
} from "@/lib/repository-api"

// GitHub API types
interface GitHubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  updated_at: string
  topics: string[]
}

interface GitHubUser {
  public_repos: number
}

// Cache function for GitHub API calls
const getCachedGitHubRepos = unstable_cache(
  async (username: string): Promise<GitHubRepo[]> => {
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "carrillo-app",
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }

    return response.json()
  },
  ["github-repos"],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ["github-repositories"],
  },
)

const getCachedGitHubUserInfo = unstable_cache(
  async (username: string): Promise<GitHubUser> => {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "carrillo-app",
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }

    return response.json()
  },
  ["github-user"],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ["github-user-info"],
  },
)

export async function GET(request: Request) {
  const parsed = parseRepositoryQuery(new URL(request.url).searchParams)
  if (!parsed.ok) return parsed.response
  const { username, page, language, search, pinnedOnly, perPage } = parsed.query

  try {
    // Get cached data
    const [data, _userInfo] = await Promise.all([
      getCachedGitHubRepos(username),
      getCachedGitHubUserInfo(username),
    ])

    // Apply filters first. Pinned repos are derived from the *filtered* set:
    // choosing them from the full list meant a search for "mcp" still returned
    // six unrelated repos in the featured block, which reads as a broken filter.
    let filteredData = data

    if (language !== "all") {
      filteredData = filteredData.filter(
        (repo: GitHubRepo) =>
          repo.language && repo.language.toLowerCase() === language.toLowerCase(),
      )
    }

    filteredData = filteredData.filter((repo: GitHubRepo) =>
      matchesSearch(repo.name, repo.description, search),
    )

    // "Pinned" is simulated by top-starred, since the REST API does not expose
    // the profile pins.
    const pinnedRepos = filteredData
      .filter((repo: GitHubRepo) => repo.stargazers_count > 0)
      .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)

    // Apply pagination
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedData = filteredData.slice(startIndex, endIndex)

    // Transform the data to match our Repository type
    const repositories = paginatedData.map((repo: GitHubRepo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || "",
      language: repo.language || "Not specified",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updated_at: repo.updated_at,
      html_url: repo.html_url,
      pinned: pinnedRepos.some((pinnedRepo: GitHubRepo) => pinnedRepo.id === repo.id),
    }))

    const totalCount = filteredData.length
    const totalPages = Math.ceil(totalCount / perPage)

    const pinnedRepositories = pinnedRepos.map((repo: GitHubRepo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || "",
      language: repo.language || "Not specified",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updated_at: repo.updated_at,
      html_url: repo.html_url,
      pinned: true,
    }))

    // If pinned_only is true, only return pinned repositories
    if (pinnedOnly) return pinnedOnlyResponse(pinnedRepositories)

    return repositoriesResponse({
      repositories,
      pinnedRepos: pinnedRepositories,
      totalCount,
      totalPages,
    })
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    return upstreamUnavailable("GitHub")
  }
}
