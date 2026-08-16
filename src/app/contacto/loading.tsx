import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FormLoading } from "@/components/unified-loading"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <main className="container space-y-12 py-12" id="main-content">
        <section className="space-y-8 py-12 md:py-24">
          <div className="space-y-4 text-center">
            <Skeleton className="mx-auto h-10 w-64 rounded-lg border border-white/[0.04] bg-white/[0.04]" />
            <Skeleton className="mx-auto h-6 w-full max-w-2xl rounded-lg border border-white/[0.04] bg-white/[0.04]" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <FormLoading />

            <div className="space-y-8">
              <Card className="surface-card">
                <CardHeader>
                  <div className="mb-2 h-6 w-48 animate-pulse rounded-sm border border-white/[0.04] bg-white/[0.04]"></div>
                  <div className="h-4 w-full animate-pulse rounded-sm border border-white/[0.04] bg-white/[0.04]"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-start space-x-4">
                        <div className="mt-0.5 h-5 w-5 animate-pulse rounded-full border border-white/[0.04] bg-white/[0.04]"></div>
                        <div className="flex-1 space-y-1">
                          <div className="h-5 w-24 animate-pulse rounded-sm border border-white/[0.04] bg-white/[0.04]"></div>
                          <div className="h-4 w-48 animate-pulse rounded-sm border border-white/[0.04] bg-white/[0.04]"></div>
                          <div className="h-4 w-64 animate-pulse rounded-sm border border-white/[0.04] bg-white/[0.04]"></div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>

              <Card className="surface-card">
                <CardHeader>
                  <div className="mb-2 h-6 w-48 animate-pulse rounded-sm border border-white/[0.04] bg-white/[0.04]"></div>
                  <div className="h-4 w-full animate-pulse rounded-sm border border-white/[0.04] bg-white/[0.04]"></div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="h-24 animate-pulse rounded-sm border border-white/[0.04] bg-white/[0.04]"
                        ></div>
                      ))}
                  </div>
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
