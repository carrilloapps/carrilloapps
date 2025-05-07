import { NextResponse } from "next/server"

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

    // Now fetch the repositories using the user ID
    const apiUrl = `https://gitlab.com/api/v4/users/${userId}/projects?page=${page}&per_page=${perPage}&order_by=updated_at`

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "carrillo-app",
      },
    })

    if (!response.ok) {
      throw new Error(`GitLab API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Get starred projects as a proxy for "pinned" since GitLab doesn't have a direct pinned concept
    // In a real implementation, you might want to hardcode the IDs of important repos
    const pinnedRepos = data.filter((repo: any) => repo.star_count > 0).slice(0, 3)

    // Apply filters
    let filteredData = data

    if (language !== "all") {
      filteredData = filteredData.filter((repo: any) => {
        // GitLab doesn't directly expose language in the projects API
        // You might need to make additional API calls or use a different approach
        return true // For now, we'll skip language filtering for GitLab
      })
    }

    if (search) {
      filteredData = filteredData.filter(
        (repo: any) =>
          repo.name.toLowerCase().includes(search.toLowerCase()) ||
          (repo.description && repo.description.toLowerCase().includes(search.toLowerCase())),
      )
    }

    // Transform the data to match our Repository type
    const repositories = filteredData.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || "",
      language: repo.language || "Not specified", // GitLab doesn't directly expose this
      stars: repo.star_count,
      forks: repo.forks_count,
      updated_at: repo.last_activity_at,
      html_url: repo.web_url,
      pinned: pinnedRepos.some((pinnedRepo: any) => pinnedRepo.id === repo.id),
    }))

    // Get total count from GitLab API
    const totalCount = Number.parseInt(response.headers.get("X-Total") || "0")
    const totalPages = Number.parseInt(response.headers.get("X-Total-Pages") || "1")

    const pinnedRepositories = pinnedRepos.map((repo: any) => ({
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
