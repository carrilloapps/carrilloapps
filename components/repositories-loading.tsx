import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"

interface RepositoriesLoadingProps {
  count?: number
  showPagination?: boolean
}

export function RepositoriesLoading({ count = 6, showPagination = true }: RepositoriesLoadingProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-2/3 bg-zinc-800" />
                  <Skeleton className="h-4 w-full bg-zinc-800" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/4 bg-zinc-800" />
                  <Skeleton className="h-4 w-full bg-zinc-800" />
                  <Skeleton className="h-4 w-full bg-zinc-800" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-16 bg-zinc-800" />
                  <Skeleton className="h-4 w-16 bg-zinc-800" />
                </div>
                <Skeleton className="h-9 w-28 bg-zinc-800" />
              </CardFooter>
            </Card>
          ))}
      </div>

      {showPagination && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Skeleton className="h-9 w-9 bg-zinc-800 rounded-md" />
              </PaginationItem>
              <PaginationItem>
                <Skeleton className="h-9 w-9 bg-zinc-800 rounded-md" />
              </PaginationItem>
              <PaginationItem>
                <Skeleton className="h-9 w-9 bg-zinc-800 rounded-md" />
              </PaginationItem>
              <PaginationItem>
                <Skeleton className="h-9 w-9 bg-zinc-800 rounded-md" />
              </PaginationItem>
              <PaginationItem>
                <Skeleton className="h-9 w-9 bg-zinc-800 rounded-md" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
