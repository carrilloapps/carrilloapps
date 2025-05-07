import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogLoading } from "@/components/blog-loading"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12" id="main-content">
        <section className="py-12 md:py-24 space-y-8">
          <div className="space-y-4 text-center">
            <div className="w-32 h-6 bg-zinc-800 rounded-full mx-auto animate-pulse"></div>
            <div className="w-64 h-10 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
            <div className="w-full max-w-2xl h-6 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
          </div>

          <BlogLoading type="featured" />
        </section>

        <section className="py-12 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse"></div>
            <div className="h-10 w-full md:w-80 bg-zinc-800 rounded animate-pulse"></div>
          </div>

          <BlogLoading type="grid" />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
