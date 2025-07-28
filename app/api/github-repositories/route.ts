import { NextResponse } from "next/server"
import { unstable_cache } from "next/cache"

// Cache function for GitHub API calls
const getCachedGitHubRepos = unstable_cache(
  async (username: string) => {
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
  ['github-repos'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['github-repositories']
  }
)

const getCachedGitHubUserInfo = unstable_cache(
  async (username: string) => {
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
  ['github-user'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['github-user-info']
  }
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "carrilloapps"
  const page = Number.parseInt(searchParams.get("page") || "1")
  const language = searchParams.get("language") || "all"
  const search = searchParams.get("search") || ""
  const pinnedOnly = searchParams.get("pinned_only") === "true"
  const perPage = 6

  try {
    // Get cached data
    const [data, userInfo] = await Promise.all([
      getCachedGitHubRepos(username),
      getCachedGitHubUserInfo(username)
    ])

    // Get pinned repositories (simulate by taking top starred repos)
    const pinnedRepos = data
      .filter((repo: any) => repo.stargazers_count > 0)
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)

    // Apply filters
    let filteredData = data

    if (language !== "all") {
      filteredData = filteredData.filter(
        (repo: any) => repo.language && repo.language.toLowerCase() === language.toLowerCase(),
      )
    }

    if (search) {
      filteredData = filteredData.filter(
        (repo: any) =>
          repo.name.toLowerCase().includes(search.toLowerCase()) ||
          (repo.description && repo.description.toLowerCase().includes(search.toLowerCase())),
      )
    }

    // Apply pagination
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedData = filteredData.slice(startIndex, endIndex)

    // Transform the data to match our Repository type
    const repositories = paginatedData.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || "",
      language: repo.language || "Not specified",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updated_at: repo.updated_at,
      html_url: repo.html_url,
      pinned: pinnedRepos.some((pinnedRepo: any) => pinnedRepo.id === repo.id),
    }))

    const totalCount = filteredData.length
    const totalPages = Math.ceil(totalCount / perPage)

    const pinnedRepositories = pinnedRepos.map((repo: any) => ({
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
    if (pinnedOnly) {
      return NextResponse.json({
        repositories: [],
        totalCount: 0,
        totalPages: 0,
        pinnedRepos: pinnedRepositories,
      })
    }

    return NextResponse.json({
      repositories,
      totalCount,
      totalPages,
      pinnedRepos: pinnedRepositories,
    })
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 })
  }
}
