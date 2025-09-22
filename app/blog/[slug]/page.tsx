import { Suspense } from "react"
import { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogRelated } from "@/components/blog-related"
import { BlogGridLoading } from "@/components/unified-loading"
import { BlogArticle } from "@/components/blog-article"
import { JsonLd } from "@/components/json-ld"
import { ParticleHeroBackground } from "@/components/particle-hero-background"
import { BlogPostClient } from "./blog-post-client"
import { getCachedMediumPostBySlug, getCachedSitemapData } from "@/lib/rss-client"

// Función para pre-generar páginas estáticas usando el servicio centralizado
export async function generateStaticParams() {
  try {
    const blogPosts = await getCachedSitemapData()
    return blogPosts.map(post => ({
      slug: post.slug
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generar metadata dinámicamente usando el servicio centralizado
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getCachedMediumPostBySlug(slug)
  
  if (!post) {
    return {
      title: "Artículo no encontrado | José Carrillo",
      description: "El artículo que buscas no está disponible."
    }
  }
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.thumbnail ? [post.thumbnail] : undefined,
      type: "article",
      publishedTime: post.pubDate,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getCachedMediumPostBySlug(slug)
  
  // Datos estructurados para JSON-LD
  const jsonLdData = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.thumbnail || "https://carrillo.app/placeholder.jpg",
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://carrillo.app",
      "sameAs": [
        "https://medium.com/@carrilloapps",
        "https://linkedin.com/in/josecarrillo",
        "https://github.com/carrilloapps"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "José Carrillo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://carrillo.app/placeholder-logo.svg"
      }
    },
    "datePublished": post.pubDate,
    "dateModified": new Date(post.pubDate).toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://carrillo.app/blog/${slug}`
    },
    "url": `https://carrillo.app/blog/${slug}`,
    "wordCount": post.content.split(" ").length,
    "timeRequired": `PT${post.readingTime}M`,
    "keywords": post.categories.join(", "),
    "articleSection": post.categories[0] || "Tecnología",
    "inLanguage": "es-ES",
    "isAccessibleForFree": true,
    "copyrightHolder": {
      "@type": "Person",
      "name": post.author
    },
    "copyrightYear": new Date(post.pubDate).getFullYear(),
    "genre": "Technology",
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers, Tech Leads, Software Architects"
    }
  } : null

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Fondo de partículas */}
      <ParticleHeroBackground />
      
      {/* Datos estructurados JSON-LD */}
      {jsonLdData && <JsonLd data={jsonLdData} />}
      
      <SiteHeader />

      <main className="py-12 space-y-12 relative z-10 w-full" id="main-content">
        {/* Componente cliente para la UI interactiva - ancho completo */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {post && <BlogPostClient post={post} slug={slug} />}
        </div>

        {/* Contenido del artículo - contenedor normal */}
        <div className="container">
          <Suspense fallback={<BlogGridLoading />}>
            <BlogArticle slug={slug} />
          </Suspense>
        </div>

        {/* Sección de artículos relacionados - contenedor normal */}
        <div className="container">
          <section 
            className="py-12 space-y-8 border-t border-gradient-to-r from-transparent via-zinc-700/50 to-transparent" 
            aria-labelledby="related-articles"
          >
            <div className="text-center space-y-4">
              <h2 
                id="related-articles" 
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              >
                Artículos relacionados
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Descubre más contenido que podría interesarte sobre desarrollo de software, tecnología y liderazgo técnico, así como negocios y tendencias del sector TI.
              </p>
            </div>
            
            <Suspense fallback={<BlogGridLoading count={3} />}>
              <BlogRelated currentSlug={slug} />
            </Suspense>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
