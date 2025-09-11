import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FormLoading } from "@/components/unified-loading"
import { Skeleton } from "@/components/ui/skeleton"

export default function ScheduleLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12" id="main-content">
        <section className="py-12 md:py-24 space-y-8">
          <div className="space-y-4 text-center">
            <Skeleton className="w-64 h-10 bg-zinc-800 rounded-lg mx-auto" />
            <Skeleton className="w-full max-w-2xl h-6 bg-zinc-800 rounded-lg mx-auto" />
          </div>

          <div className="max-w-2xl mx-auto">
            <FormLoading />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
