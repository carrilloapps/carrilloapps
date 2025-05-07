import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ScheduleLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12" id="main-content">
        {/* Hero Section Skeleton */}
        <section className="py-12 md:py-24 space-y-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="w-48 h-6 bg-zinc-800 rounded-full animate-pulse"></div>
                <div className="w-full h-12 bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="w-3/4 h-8 bg-zinc-800 rounded-lg animate-pulse"></div>
              </div>
              <div className="w-full h-24 bg-zinc-800 rounded-lg animate-pulse"></div>
              <div className="flex gap-4">
                <div className="w-40 h-10 bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="w-40 h-10 bg-zinc-800 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl bg-zinc-800 animate-pulse"></div>
          </div>
        </section>

        {/* Form Section Skeleton */}
        <section className="py-12 md:py-24 space-y-8">
          <div className="space-y-4 text-center">
            <div className="w-64 h-10 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
            <div className="w-full max-w-2xl h-6 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <div className="h-6 w-48 bg-zinc-800 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-full bg-zinc-800 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse"></div>
                    <div className="h-10 w-full bg-zinc-800 rounded animate-pulse"></div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse"></div>
                      <div className="h-10 w-full bg-zinc-800 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse"></div>
                      <div className="h-10 w-full bg-zinc-800 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-zinc-800 rounded animate-pulse"></div>
                    <div className="h-10 w-full bg-zinc-800 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-zinc-800 rounded animate-pulse"></div>
                    <div className="h-10 w-full bg-zinc-800 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-zinc-800 rounded animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-2">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="h-10 bg-zinc-800 rounded animate-pulse"></div>
                        ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-zinc-800 rounded animate-pulse"></div>
                    <div className="h-32 w-full bg-zinc-800 rounded animate-pulse"></div>
                  </div>
                  <div className="h-10 w-full bg-zinc-800 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="h-6 w-40 bg-zinc-800 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-full bg-zinc-800 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-zinc-800 rounded animate-pulse"></div>
                    <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 w-40 bg-zinc-800 rounded animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-8 bg-zinc-800 rounded animate-pulse"></div>
                      <div className="h-8 bg-zinc-800 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-64 bg-zinc-800 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-zinc-800 rounded animate-pulse"></div>
                    <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="h-6 w-48 bg-zinc-800 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-24 bg-zinc-800 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-5 w-40 bg-zinc-800 rounded animate-pulse"></div>
                    <div className="h-32 bg-zinc-800 rounded animate-pulse"></div>
                  </div>
                  <div className="h-24 bg-zinc-800 rounded animate-pulse"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
