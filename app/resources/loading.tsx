import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"

export default function ResourcesLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12" id="main-content">
        <section className="py-12 md:py-24 space-y-8">
          <div className="space-y-4 text-center">
            <div className="w-64 h-10 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
            <div className="w-full max-w-2xl h-6 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="grid w-full md:w-auto md:inline-grid grid-cols-2 h-auto bg-zinc-900 p-1">
              <div className="h-10 bg-zinc-800 rounded animate-pulse"></div>
              <div className="h-10 bg-zinc-800 rounded animate-pulse"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="w-full md:w-80 h-10 bg-zinc-800 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="w-40 h-10 bg-zinc-800 rounded animate-pulse"></div>
                <div className="w-24 h-10 bg-zinc-800 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="bg-zinc-900 border-zinc-800">
                  <div className="aspect-video bg-zinc-800 animate-pulse"></div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="h-6 bg-zinc-800 rounded animate-pulse"></div>
                      <div className="h-4 bg-zinc-800 rounded animate-pulse"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array(4)
                        .fill(0)
                        .map((_, j) => (
                          <div key={j} className="h-6 w-16 bg-zinc-800 rounded animate-pulse"></div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <div className="h-9 w-32 bg-zinc-800 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
