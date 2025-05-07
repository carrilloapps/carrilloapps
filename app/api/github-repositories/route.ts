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
    // Fetch repositories from GitHub's public API
    const apiUrl = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "carrillo-app",
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Get pinned repositories (we'll simulate this since the API doesn't directly expose pinned repos)
    // In a real implementation, you might want to hardcode the IDs of pinned repos or use a different approach
    const pinnedRepos = data.filter((repo: any) => repo.stargazers_count > 0).slice(0, 3)

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

    // Transform the data to match our Repository type
    const repositories = filteredData.map((repo: any) => ({
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

    // Get total count from GitHub API
    const countResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "carrillo-app",
      },
    })

    const countData = await countResponse.json()
    const totalCount = countData.public_repos || 0
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
