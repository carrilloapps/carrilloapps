import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"

export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-24" id="main-content">
        {/* Hero Section Skeleton */}
        <section className="py-12 md:py-24 space-y-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="w-32 h-6 bg-gradient-to-r from-blue-800/50 to-purple-800/50 rounded-full animate-pulse"></div>
                <div className="w-full h-12 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg animate-pulse"></div>
                <div className="w-3/4 h-8 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg animate-pulse"></div>
              </div>
              <div className="w-full h-24 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg animate-pulse"></div>
              <div className="flex gap-4">
                <div className="w-40 h-10 bg-gradient-to-r from-blue-800/50 to-purple-800/50 rounded-lg animate-pulse"></div>
                <div className="w-40 h-10 bg-zinc-800/50 border border-zinc-700 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-blue-800/20 to-purple-800/20 border border-zinc-800/50 animate-pulse"></div>
          </div>
        </section>

        {/* Services Navigation Skeleton */}
        <section className="py-12 space-y-8">
          <div className="space-y-4 text-center">
            <div className="w-40 h-6 bg-gradient-to-r from-blue-800/50 to-purple-800/50 rounded-full mx-auto animate-pulse"></div>
            <div className="w-64 h-10 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg mx-auto animate-pulse"></div>
            <div className="w-full max-w-2xl h-6 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-wrap gap-2 h-auto bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-2 mb-8 rounded-xl">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-10 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg animate-pulse flex-1"></div>
              ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border-zinc-700/50 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-800/50 to-purple-800/50 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-40 h-6 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded animate-pulse"></div>
                    <div className="w-64 h-4 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-32 h-6 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="w-full h-5 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded animate-pulse"></div>
                      ))}
                  </div>
                </div>
                <div className="w-48 h-10 bg-gradient-to-r from-blue-800/50 to-purple-800/50 rounded animate-pulse"></div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border-zinc-700/50 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="w-24 h-6 bg-gradient-to-r from-blue-800/50 to-purple-800/50 rounded animate-pulse"></div>
                  <div className="w-48 h-6 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-24 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded animate-pulse"></div>
                <div className="w-48 h-10 bg-gradient-to-r from-blue-800/50 to-purple-800/50 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
