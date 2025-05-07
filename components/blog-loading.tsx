import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface BlogLoadingProps {
  type: "featured" | "grid" | "article" | "related"
  count?: number
}

export function BlogLoading({ type, count = 6 }: BlogLoadingProps) {
  if (type === "featured") {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-video bg-zinc-800 animate-pulse"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-zinc-800 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4"></div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 bg-zinc-800 rounded animate-pulse w-20"></div>
              <div className="h-6 bg-zinc-800 rounded animate-pulse w-20"></div>
            </div>
            <div className="h-10 bg-zinc-800 rounded animate-pulse w-40 mt-4"></div>
          </div>
        </div>
      </Card>
    )
  }

  if (type === "grid") {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="bg-zinc-900 border-zinc-800">
              <div className="aspect-video bg-zinc-800 animate-pulse"></div>
              <CardContent className="p-6 space-y-4">
                <div className="h-6 bg-zinc-800 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 bg-zinc-800 rounded animate-pulse w-20"></div>
                  <div className="h-6 bg-zinc-800 rounded animate-pulse w-20"></div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-24"></div>
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-24"></div>
              </CardFooter>
            </Card>
          ))}
      </div>
    )
  }

  if (type === "article") {
    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <div className="h-10 bg-zinc-800 rounded animate-pulse w-3/4"></div>
          <div className="flex gap-4">
            <div className="h-6 bg-zinc-800 rounded animate-pulse w-32"></div>
            <div className="h-6 bg-zinc-800 rounded animate-pulse w-32"></div>
          </div>
        </div>
        <div className="aspect-video bg-zinc-800 rounded animate-pulse"></div>
        <div className="space-y-4">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
            ))}
        </div>
      </div>
    )
  }

  if (type === "related") {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="bg-zinc-900 border-zinc-800">
              <div className="aspect-video bg-zinc-800 animate-pulse"></div>
              <CardContent className="p-6 space-y-4">
                <div className="h-6 bg-zinc-800 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 bg-zinc-800 rounded animate-pulse w-20"></div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    )
  }

  return null
}
