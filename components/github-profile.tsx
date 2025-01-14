import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink } from 'lucide-react'
import { Suspense } from 'react'

interface GitHubProfileProps {
  username: string;
}

async function getGitHubProfile(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 } // Revalidate every hour
    })

    if (!res.ok) {
      throw new Error(`GitHub API responded with status ${res.status}`)
    }

    return res.json()
  } catch (error) {
    console.error('Failed to fetch GitHub profile:', error)
    return null
  }
}

function GitHubProfileSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-4" />
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="h-4 w-[50px] mb-1" />
              <Skeleton className="h-6 w-[50px]" />
            </div>
          ))}
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

function GitHubProfileContent({ profile }: { profile: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar_url} alt={profile.name} />
            <AvatarFallback>{profile.login.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{profile.name}</CardTitle>
            <p className="text-sm text-muted-foreground">@{profile.login}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{profile.bio}</p>
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm font-medium">Followers</p>
            <p className="text-2xl font-bold">{profile.followers}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Following</p>
            <p className="text-2xl font-bold">{profile.following}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Repositories</p>
            <p className="text-2xl font-bold">{profile.public_repos}</p>
          </div>
        </div>
        <Button asChild className="w-full">
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            Ver perfil en GitHub
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

export async function GitHubProfile({ username }: GitHubProfileProps) {
  return (
    <Suspense fallback={<GitHubProfileSkeleton />}>
      <GitHubProfileContent profile={await getGitHubProfile(username)} />
    </Suspense>
  )
}

