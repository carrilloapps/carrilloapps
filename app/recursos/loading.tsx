import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RepositoriesLoading } from "@/components/unified-loading"
import { Skeleton } from "@/components/ui/skeleton"

export default function ResourcesLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <main className="container space-y-16 py-8" id="main-content">
        {/* Breadcrumb skeleton */}
        <Skeleton className="h-6 w-48 rounded-sm border border-white/[0.04] bg-white/[0.04]" />

        <section className="space-y-12 py-16 md:py-24">
          <div className="space-y-6 text-center">
            <Skeleton className="mx-auto h-16 w-80 rounded-lg border border-white/[0.04] bg-white/[0.04]" />
            <Skeleton className="mx-auto h-8 w-full max-w-3xl rounded-lg border border-white/[0.04] bg-white/[0.04]" />
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Skeleton className="h-8 w-32 rounded-full border border-white/[0.04] bg-white/[0.04]" />
              <Skeleton className="h-8 w-40 rounded-full border border-white/[0.04] bg-white/[0.04]" />
            </div>
          </div>

          <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="grid h-auto w-full grid-cols-2 rounded-lg border border-zinc-800 bg-zinc-900/80 p-1 backdrop-blur-sm md:inline-grid md:w-auto">
              <Skeleton className="h-10 rounded-sm border border-white/[0.04] bg-white/[0.04]" />
              <Skeleton className="h-10 rounded-sm border border-white/[0.04] bg-white/[0.04]" />
            </div>

            <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
              <Skeleton className="h-12 w-full rounded-lg border border-white/[0.04] bg-white/[0.04] md:w-80" />
              <div className="flex gap-3">
                <Skeleton className="h-12 w-44 rounded-lg border border-white/[0.04] bg-white/[0.04]" />
                <Skeleton className="h-12 w-28 rounded-lg border border-white/[0.04] bg-white/[0.04]" />
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
