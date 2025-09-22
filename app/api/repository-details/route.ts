import { NextResponse } from "next/server"
import { unstable_cache } from "next/cache"

interface RepositoryDetails {
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

// Cache function for GitHub repository details
const getCachedGitHubRepoDetails = unstable_cache(
  async (owner: string, repo: string) => {
    const headers = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "carrillo-app",
    }

    // Fetch repository basic info
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
    })

    if (!repoResponse.ok) {
      throw new Error(`GitHub API responded with status: ${repoResponse.status}`)
    }

    const repoData = await repoResponse.json()

    // Fetch commits count (using search API for better accuracy)
    let commitsCount = 0
    try {
      const commitsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
        headers,
      })
      if (commitsResponse.ok) {
        const linkHeader = commitsResponse.headers.get('link')
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/)
          commitsCount = match ? parseInt(match[1]) : 1
        } else {
          commitsCount = 1
        }
      }
    } catch (error) {
      console.warn('Could not fetch commits count:', error)
    }

    // Fetch latest release
    let latestRelease = undefined
    try {
      const releaseResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
        headers,
      })
      if (releaseResponse.ok) {
        const releaseData = await releaseResponse.json()
        latestRelease = {
          tag_name: releaseData.tag_name,
          name: releaseData.name,
          published_at: releaseData.published_at,
          html_url: releaseData.html_url,
        }
      }
    } catch (error) {
      console.warn('Could not fetch latest release:', error)
    }

    // Fetch latest commit
    let latestCommit = undefined
    try {
      const commitResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
        headers,
      })
      if (commitResponse.ok) {
        const commitData = await commitResponse.json()
        if (commitData.length > 0) {
          const commit = commitData[0]
          latestCommit = {
            sha: commit.sha.substring(0, 7),
            message: commit.commit.message.split('\n')[0], // First line only
            date: commit.commit.author.date,
            html_url: commit.html_url,
          }
        }
      }
    } catch (error) {
      console.warn('Could not fetch latest commit:', error)
    }

    return {
      id: repoData.id,
      name: repoData.name,
      description: repoData.description,
      language: repoData.language,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      watchers: repoData.watchers_count,
      updated_at: repoData.updated_at,
      html_url: repoData.html_url,
      commits_count: commitsCount,
      latest_release: latestRelease,
      latest_commit: latestCommit,
    }
  },
  ['github-repo-details'],
  {
    revalidate: 1800, // Cache for 30 minutes
    tags: ['repository-details']
  }
)

// Cache function for GitLab repository details
const getCachedGitLabRepoDetails = unstable_cache(
  async (projectId: string) => {
    const headers = {
      "User-Agent": "carrillo-app",
    }

    // Fetch project basic info
    const projectResponse = await fetch(`https://gitlab.com/api/v4/projects/${encodeURIComponent(projectId)}`, {
      headers,
    })

    if (!projectResponse.ok) {
      throw new Error(`GitLab API responded with status: ${projectResponse.status}`)
    }

    const projectData = await projectResponse.json()

    // Fetch commits count
    let commitsCount = 0
    try {
      const commitsResponse = await fetch(`https://gitlab.com/api/v4/projects/${encodeURIComponent(projectId)}/repository/commits?per_page=1`, {
        headers,
      })
      if (commitsResponse.ok) {
        const totalHeader = commitsResponse.headers.get('x-total')
        commitsCount = totalHeader ? parseInt(totalHeader) : 0
      }
    } catch (error) {
      console.warn('Could not fetch commits count:', error)
    }

    // Fetch latest release/tag
    let latestRelease = undefined
    try {
      const tagsResponse = await fetch(`https://gitlab.com/api/v4/projects/${encodeURIComponent(projectId)}/repository/tags?per_page=1`, {
        headers,
      })
      if (tagsResponse.ok) {
        const tagsData = await tagsResponse.json()
        if (tagsData.length > 0) {
          const tag = tagsData[0]
          latestRelease = {
            tag_name: tag.name,
            name: tag.name,
            published_at: tag.commit.created_at,
            html_url: `${projectData.web_url}/-/tags/${tag.name}`,
          }
        }
      }
    } catch (error) {
      console.warn('Could not fetch latest tag:', error)
    }

    // Fetch latest commit
    let latestCommit = undefined
    try {
      const commitResponse = await fetch(`https://gitlab.com/api/v4/projects/${encodeURIComponent(projectId)}/repository/commits?per_page=1`, {
        headers,
      })
      if (commitResponse.ok) {
        const commitData = await commitResponse.json()
        if (commitData.length > 0) {
          const commit = commitData[0]
          latestCommit = {
            sha: commit.short_id,
            message: commit.title,
            date: commit.created_at,
            html_url: `${projectData.web_url}/-/commit/${commit.id}`,
          }
        }
      }
    } catch (error) {
      console.warn('Could not fetch latest commit:', error)
    }

    return {
      id: projectData.id,
      name: projectData.name,
      description: projectData.description,
      language: projectData.default_branch, // GitLab doesn't expose primary language easily
      stars: projectData.star_count,
      forks: projectData.forks_count,
      watchers: projectData.star_count, // GitLab doesn't have watchers, use stars
      updated_at: projectData.last_activity_at,
      html_url: projectData.web_url,
      commits_count: commitsCount,
      latest_release: latestRelease,
      latest_commit: latestCommit,
    }
  },
  ['gitlab-repo-details'],
  {
    revalidate: 1800, // Cache for 30 minutes
    tags: ['repository-details']
  }
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const platform = searchParams.get("platform") as 'github' | 'gitlab'
  const repository = searchParams.get("repository") // owner/repo format

  if (!platform || !repository) {
    return NextResponse.json(
      { error: "Platform and repository parameters are required" },
      { status: 400 }
    )
  }

  try {
    let repositoryDetails: RepositoryDetails

    if (platform === 'github') {
      const [owner, repo] = repository.split('/')
      if (!owner || !repo) {
        return NextResponse.json(
          { error: "Invalid repository format. Use 'owner/repo'" },
          { status: 400 }
        )
      }
      repositoryDetails = await getCachedGitHubRepoDetails(owner, repo)
    } else if (platform === 'gitlab') {
      // For GitLab, repository can be either "owner/repo" or project ID
      repositoryDetails = await getCachedGitLabRepoDetails(repository)
    } else {
      return NextResponse.json(
        { error: "Unsupported platform. Use 'github' or 'gitlab'" },
        { status: 400 }
      )
    }

    return NextResponse.json(repositoryDetails)
  } catch (error) {
    console.error(`Error fetching ${platform} repository details:`, error)
    return NextResponse.json(
      { error: `Failed to fetch repository details from ${platform}` },
      { status: 500 }
    )
  }
}