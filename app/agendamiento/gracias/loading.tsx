import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SpinnerLoading } from "@/components/unified-loading"

export default function ThankYouLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 flex flex-col items-center justify-center min-h-[70vh]" id="main-content">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <SpinnerLoading />
          </div>

          <div className="space-y-4">
            <div className="h-12 w-64 bg-zinc-800 rounded-lg animate-pulse mx-auto"></div>
            <div className="h-6 w-full bg-zinc-800 rounded-lg animate-pulse mx-auto"></div>
            <div className="h-6 w-full bg-zinc-800 rounded-lg animate-pulse mx-auto"></div>
          </div>

          <div>
            <div className="bg-zinc-900 border-zinc-800 rounded-lg p-6 space-y-4">
              <div className="h-6 w-48 bg-zinc-800 rounded animate-pulse"></div>
              <div className="space-y-3">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="h-5 w-full bg-zinc-800 rounded animate-pulse"></div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <div className="h-10 w-40 bg-zinc-800 rounded-lg animate-pulse"></div>
            <div className="h-10 w-40 bg-zinc-800 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
