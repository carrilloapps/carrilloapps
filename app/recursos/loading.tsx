import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RepositoriesLoading } from "@/components/unified-loading"
import { Skeleton } from "@/components/ui/skeleton"

export default function ResourcesLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-8 space-y-16" id="main-content">
        {/* Breadcrumb skeleton */}
        <Skeleton className="w-48 h-6 bg-zinc-800 rounded" />
        
        <section className="py-16 md:py-24 space-y-12">
          <div className="space-y-6 text-center">
            <Skeleton className="w-80 h-16 bg-zinc-800 rounded-lg mx-auto" />
            <Skeleton className="w-full max-w-3xl h-8 bg-zinc-800 rounded-lg mx-auto" />
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Skeleton className="w-32 h-8 bg-zinc-800 rounded-full" />
              <Skeleton className="w-40 h-8 bg-zinc-800 rounded-full" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="grid w-full md:w-auto md:inline-grid grid-cols-2 h-auto bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 p-1 rounded-lg">
              <Skeleton className="h-10 bg-zinc-800 rounded" />
              <Skeleton className="h-10 bg-zinc-800 rounded" />
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <Skeleton className="w-full md:w-80 h-12 bg-zinc-800 rounded-lg" />
              <div className="flex gap-3">
                <Skeleton className="w-44 h-12 bg-zinc-800 rounded-lg" />
                <Skeleton className="w-28 h-12 bg-zinc-800 rounded-lg" />
              </div>
            </div>
          </div>

          <RepositoriesLoading count={6} showPagination={true} />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
