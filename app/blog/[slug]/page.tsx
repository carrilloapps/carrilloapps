import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { BlogRelated } from "@/components/blog-related"
import { BlogLoading } from "@/components/blog-loading"
import { BlogArticle } from "@/components/blog-article"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug

  // En un caso real, aquí obtendrías los datos del artículo para generar los metadatos
  // Por ahora, usamos valores genéricos
  return {
    title: `Artículo | José Carrillo Blog`,
    description: "Artículo detallado sobre desarrollo de software, sistemas financieros o liderazgo técnico.",
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `Artículo | José Carrillo Blog`,
      description: "Artículo detallado sobre desarrollo de software, sistemas financieros o liderazgo técnico.",
      url: `https://carrillo.app/blog/${slug}`,
      type: "article",
      publishedTime: new Date().toISOString(),
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12" id="main-content">
        <div className="flex items-center mb-8">
          <Button variant="ghost" className="text-zinc-400 hover:text-white" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Blog
            </Link>
          </Button>
        </div>

        <Suspense fallback={<BlogLoading type="article" />}>
          <BlogArticle slug={slug} />
        </Suspense>

        <section className="py-12 space-y-8 border-t border-zinc-800">
          <h2 className="text-2xl font-bold">Artículos Relacionados</h2>
          <Suspense fallback={<BlogLoading type="related" />}>
            <BlogRelated currentSlug={slug} />
          </Suspense>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
