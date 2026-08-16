import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { HeroLoading } from "@/components/unified-loading"

export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <main className="container space-y-24 py-12" id="main-content">
        {/* Hero Section Skeleton */}
        <HeroLoading />

        {/* Services Navigation Skeleton */}
        <section className="space-y-8 py-12">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-6 w-40 animate-pulse rounded-full bg-gradient-to-r from-blue-800/50 to-purple-800/50"></div>
            <div className="mx-auto h-10 w-64 animate-pulse rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-700"></div>
            <div className="mx-auto h-6 w-full max-w-2xl animate-pulse rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-700"></div>
          </div>

          <div className="mb-8 grid h-auto grid-cols-2 gap-2 rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-2 backdrop-blur-sm md:grid-cols-4 lg:flex lg:flex-wrap">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-10 flex-1 animate-pulse rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-700"
                ></div>
              ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="surface-card">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 animate-pulse rounded-xl bg-gradient-to-r from-blue-800/50 to-purple-800/50"></div>
                  <div className="space-y-2">
                    <div className="h-6 w-40 animate-pulse rounded-sm bg-gradient-to-r from-zinc-800 to-zinc-700"></div>
                    <div className="h-4 w-64 animate-pulse rounded-sm bg-gradient-to-r from-zinc-800 to-zinc-700"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-6 w-32 animate-pulse rounded-sm bg-gradient-to-r from-zinc-800 to-zinc-700"></div>
                  <div className="space-y-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="h-5 w-full animate-pulse rounded-sm bg-gradient-to-r from-zinc-800 to-zinc-700"
                        ></div>
                      ))}
                  </div>
                </div>
                <div className="h-10 w-48 animate-pulse rounded-sm bg-gradient-to-r from-blue-800/50 to-purple-800/50"></div>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <div className="h-6 w-24 animate-pulse rounded-sm bg-gradient-to-r from-blue-800/50 to-purple-800/50"></div>
                  <div className="h-6 w-48 animate-pulse rounded-sm bg-gradient-to-r from-zinc-800 to-zinc-700"></div>
                </div>
                <div className="h-24 w-full animate-pulse rounded-sm bg-gradient-to-r from-zinc-800 to-zinc-700"></div>
                <div className="h-10 w-48 animate-pulse rounded-sm bg-gradient-to-r from-blue-800/50 to-purple-800/50"></div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
