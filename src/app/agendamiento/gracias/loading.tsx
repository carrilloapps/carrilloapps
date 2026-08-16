import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SpinnerLoading } from "@/components/unified-loading"

export default function ThankYouLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <main
        className="container flex min-h-[70vh] flex-col items-center justify-center py-12"
        id="main-content"
      >
        <div className="mx-auto max-w-2xl space-y-8 text-center">
          <div className="flex justify-center">
            <SpinnerLoading />
          </div>

          <div className="space-y-4">
            <div className="mx-auto h-12 w-64 animate-pulse rounded-lg border border-white/[0.04] bg-white/[0.04]"></div>
            <div className="mx-auto h-6 w-full animate-pulse rounded-lg border border-white/[0.04] bg-white/[0.04]"></div>
            <div className="mx-auto h-6 w-full animate-pulse rounded-lg border border-white/[0.04] bg-white/[0.04]"></div>
          </div>

          <div>
            <div className="space-y-4 rounded-lg border-zinc-800 bg-zinc-900 p-6">
              <div className="h-6 w-48 animate-pulse rounded-sm border border-white/[0.04] bg-white/[0.04]"></div>
              <div className="space-y-3">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-5 w-full animate-pulse rounded-sm border border-white/[0.04] bg-white/[0.04]"
                    ></div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <div className="h-10 w-40 animate-pulse rounded-lg border border-white/[0.04] bg-white/[0.04]"></div>
            <div className="h-10 w-40 animate-pulse rounded-lg border border-white/[0.04] bg-white/[0.04]"></div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
