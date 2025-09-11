import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"

export default function ResourcesLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-8 space-y-16" id="main-content">
        {/* Breadcrumb skeleton */}
        <div className="w-48 h-6 bg-zinc-800 rounded animate-pulse"></div>
        <section className="py-16 md:py-24 space-y-12">
          <div className="space-y-6 text-center">
            <div className="w-80 h-16 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
            <div className="w-full max-w-3xl h-8 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="w-32 h-8 bg-zinc-800 rounded-full animate-pulse"></div>
              <div className="w-40 h-8 bg-zinc-800 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="grid w-full md:w-auto md:inline-grid grid-cols-2 h-auto bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 p-1 rounded-lg">
              <div className="h-10 bg-zinc-800 rounded animate-pulse"></div>
              <div className="h-10 bg-zinc-800 rounded animate-pulse"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="w-full md:w-80 h-12 bg-zinc-800 rounded-lg animate-pulse"></div>
              <div className="flex gap-3">
                <div className="w-44 h-12 bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="w-28 h-12 bg-zinc-800 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800 h-full">
                  <div className="aspect-video bg-zinc-800 animate-pulse rounded-t-lg"></div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="h-7 bg-zinc-800 rounded-lg animate-pulse"></div>
                      <div className="h-5 bg-zinc-800 rounded-lg animate-pulse"></div>
                      <div className="h-4 bg-zinc-800 rounded-lg animate-pulse w-3/4"></div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {Array(3)
                        .fill(0)
                        .map((_, j) => (
                          <div key={j} className="h-6 w-16 bg-zinc-800 rounded-full animate-pulse"></div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <div className="flex gap-4">
                        <div className="h-4 w-12 bg-zinc-800 rounded animate-pulse"></div>
                        <div className="h-4 w-12 bg-zinc-800 rounded animate-pulse"></div>
                      </div>
                      <div className="h-10 w-32 bg-zinc-800 rounded-lg animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        {/* Featured Projects Section Skeleton */}
        <section className="py-16 space-y-12">
          <div className="space-y-6 text-center">
            <div className="w-72 h-12 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
            <div className="w-full max-w-3xl h-6 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800 h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-800 rounded-lg animate-pulse"></div>
                      <div className="h-6 bg-zinc-800 rounded animate-pulse flex-1"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-zinc-800 rounded animate-pulse"></div>
                      <div className="h-4 bg-zinc-800 rounded animate-pulse w-4/5"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-zinc-800 rounded-full animate-pulse"></div>
                      <div className="h-6 w-20 bg-zinc-800 rounded-full animate-pulse"></div>
                      <div className="h-6 w-14 bg-zinc-800 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <div className="flex gap-4">
                        <div className="h-4 w-12 bg-zinc-800 rounded animate-pulse"></div>
                        <div className="h-4 w-12 bg-zinc-800 rounded animate-pulse"></div>
                      </div>
                      <div className="h-10 w-32 bg-zinc-800 rounded-lg animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        {/* Collaboration Section Skeleton */}
        <section className="py-16">
          <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm border-zinc-700">
            <CardContent className="p-8 md:p-12 space-y-8">
              <div className="space-y-6 text-center">
                <div className="w-80 h-12 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
                <div className="w-full max-w-4xl h-6 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
                <div className="w-3/4 max-w-2xl h-6 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="w-40 h-12 bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="w-48 h-12 bg-zinc-800 rounded-lg animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
