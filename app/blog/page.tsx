import { Suspense } from "react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogPosts } from "@/components/blog-posts"
import { BlogFeatured } from "@/components/blog-featured"
import { BlogLoading } from "@/components/blog-loading"
import { Badge } from "@/components/ui/badge"

export default function BlogPage({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  const { category, search } = searchParams

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12" id="main-content">
        <section className="py-12 md:py-24 space-y-8">
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Insights & Experiencias</h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Artículos sobre desarrollo de software, sistemas financieros y de pago, liderazgo técnico y recursos para desarrolladores.
            </p>
          </div>

          <div className="h-8" />

          <Suspense fallback={<BlogLoading type="featured" />}>
            <BlogFeatured />
          </Suspense>
        </section>

        <section className="py-12 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              {search ? `Resultados para "${search}"` : category ? `Categoría: ${category}` : "Artículos Recientes"}
            </h2>
          </div>

          <Suspense fallback={<BlogLoading type="grid" />}>
            <BlogPosts category={category} search={search} />
          </Suspense>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
