import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-24" id="main-content">
        {/* Hero Section Skeleton */}
        <section className="py-12 md:py-24 space-y-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="w-32 h-6 bg-zinc-800 rounded-full animate-pulse"></div>
                <div className="w-full h-12 bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="w-3/4 h-8 bg-zinc-800 rounded-lg animate-pulse"></div>
              </div>
              <div className="w-full h-24 bg-zinc-800 rounded-lg animate-pulse"></div>
              <div className="w-full h-24 bg-zinc-800 rounded-lg animate-pulse"></div>
              <div className="flex gap-4">
                <div className="w-40 h-10 bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="w-40 h-10 bg-zinc-800 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl bg-zinc-800 animate-pulse"></div>
          </div>
        </section>

        {/* Journey Section Skeleton */}
        <section className="py-12 space-y-8">
          <div className="space-y-4 text-center">
            <div className="w-32 h-6 bg-zinc-800 rounded-full mx-auto animate-pulse"></div>
            <div className="w-64 h-10 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
            <div className="w-full max-w-2xl h-6 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
          </div>

          <div className="relative border-l border-zinc-800 ml-3 md:ml-6 pl-6 md:pl-10 space-y-10">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[42px] md:-left-[50px] w-8 h-8 rounded-full bg-zinc-800 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-6 bg-zinc-800 rounded animate-pulse"></div>
                      <div className="w-64 h-6 bg-zinc-800 rounded animate-pulse"></div>
                    </div>
                    <div className="w-full h-16 bg-zinc-800 rounded animate-pulse"></div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {Array(3)
                        .fill(0)
                        .map((_, j) => (
                          <div key={j} className="w-24 h-6 bg-zinc-800 rounded animate-pulse"></div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
