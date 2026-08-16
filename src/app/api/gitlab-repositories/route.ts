import { NextResponse } from "next/server"

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
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "carrilloapps"
  const page = Number.parseInt(searchParams.get("page") || "1")
  const language = searchParams.get("language") || "all"
  const search = searchParams.get("search") || ""
  const pinnedOnly = searchParams.get("pinned_only") === "true"
  const perPage = 6

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

    if (search) {
      filteredData = filteredData.filter(
        (repo: GitLabProject) =>
          repo.name.toLowerCase().includes(search.toLowerCase()) ||
          (repo.description && repo.description.toLowerCase().includes(search.toLowerCase())),
      )
    }

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
    console.error("Error fetching GitLab repositories:", error)

    // If the real API fails, return mock data for demonstration
    const mockData = [
      {
        id: 101,
        name: "backoffice-toolkit",
        description: "A collection of tools for automating backoffice operations",
        language: "JavaScript",
        stars: 95,
        forks: 31,
        updated_at: "2023-12-12T08:45:30Z",
        html_url: "https://gitlab.com/carrilloapps/backoffice-toolkit",
        pinned: true,
      },
      {
        id: 102,
        name: "financial-reporting",
        description: "Automated financial reporting system with customizable templates",
        language: "Python",
        stars: 87,
        forks: 29,
        updated_at: "2023-11-05T16:20:15Z",
        html_url: "https://gitlab.com/carrilloapps/financial-reporting",
        pinned: true,
      },
    ]

    if (pinnedOnly) {
      return NextResponse.json({
        repositories: [],
        totalCount: 0,
        totalPages: 0,
        pinnedRepos: mockData,
      })
    }

    return NextResponse.json({
      repositories: mockData,
      totalCount: 24,
      totalPages: 4,
      pinnedRepos: mockData,
    })
  }
}
