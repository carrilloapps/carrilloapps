import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FormLoading } from "@/components/unified-loading"
import { Skeleton } from "@/components/ui/skeleton"

export default function ScheduleLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <main className="container space-y-12 py-12" id="main-content">
        <section className="space-y-8 py-12 md:py-24">
          <div className="space-y-4 text-center">
            <Skeleton className="mx-auto h-10 w-64 rounded-lg border border-white/[0.04] bg-white/[0.04]" />
            <Skeleton className="mx-auto h-6 w-full max-w-2xl rounded-lg border border-white/[0.04] bg-white/[0.04]" />
          </div>

          <div className="mx-auto max-w-2xl">
            <FormLoading />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
