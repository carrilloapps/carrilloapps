import { Suspense } from "react"
import { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogRelated } from "@/components/blog-related"
import { BlogLoading } from "@/components/blog-loading"
import { BlogArticle } from "@/components/blog-article"
import { JsonLd } from "@/components/json-ld"
import { ParticleHeroBackground } from "@/components/particle-hero-background"
import { BlogPostClient } from "./blog-post-client"

// Función para obtener datos del post en el servidor
async function getPostData(slug: string) {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@carrilloapps`, {
      next: { revalidate: 3600 } // Revalidar cada hora
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch post data')
    }
    
    const data = await response.json()
    
    if (data.status !== "ok") {
      throw new Error('Invalid RSS response')
    }
    
    const post = data.items.find((item: any) => {
      const postSlug = item.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      return postSlug === slug
    })
    
    if (!post) {
      return null
    }
    
    const description = post.description || 
      post.content
        .replace(/<[^>]*>/g, "")
        .substring(0, 160) + "..."
    
    const thumbnail = post.thumbnail || 
      post.content.match(/<img[^>]+src="([^">]+)"/)?.[1] || 
      null
    
    return {
      title: post.title,
      description,
      author: post.author,
      pubDate: post.pubDate,
      categories: post.categories || [],
      thumbnail,
      link: post.link,
      guid: post.guid,
      content: post.content,
      readingTime: Math.ceil(post.content.split(" ").length / 200)
    }
  } catch (error) {
    console.error('Error fetching post data:', error)
    return null
  }
}

// Función para pre-generar páginas estáticas
export async function generateStaticParams() {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@carrilloapps`)
    
    if (!response.ok) {
      return []
    }
    
    const data = await response.json()
    
    if (data.status !== "ok") {
      return []
    }
    
    // Generar slugs para todos los posts
    const slugs = data.items.map((item: any) => ({
      slug: item.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
    }))
    
    return slugs
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generar metadata dinámicamente
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostData(params.slug)
  
  if (!post) {
    return {
      title: "Artículo no encontrado | José Carrillo",
      description: "El artículo que buscas no está disponible."
    }
  }
  
  return {
    title: `${post.title} | José Carrillo`,
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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug)
  
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
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://carrillo.app/blog/${params.slug}`
    },
    "url": `https://carrillo.app/blog/${params.slug}`,
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

      <main className="container py-12 space-y-12 relative z-10" id="main-content">
        {/* Componente cliente para la UI interactiva */}
        {post && <BlogPostClient post={post} slug={params.slug} />}

        {/* Contenido del artículo */}
        <Suspense fallback={<BlogLoading variant="article" />}>
          <BlogArticle slug={params.slug} />
        </Suspense>

        {/* Sección de artículos relacionados */}
        <section 
          className="py-12 space-y-8 border-t border-gradient-to-r from-transparent via-zinc-700/50 to-transparent" 
          aria-labelledby="related-articles"
        >
          <div className="text-center space-y-4">
            <h2 
              id="related-articles" 
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
            >
              Artículos Relacionados
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Descubre más contenido que podría interesarte sobre desarrollo, tecnología y liderazgo técnico
            </p>
          </div>
          
          <Suspense fallback={<BlogLoading variant="related" />}>
            <BlogRelated currentSlug={params.slug} />
          </Suspense>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
