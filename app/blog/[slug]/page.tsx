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
import { JsonLd } from "@/components/json-ld"

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

// Función para obtener datos del post en el servidor
async function getPostData(slug: string) {
  try {
    // Simulamos la llamada a la API de Medium en el servidor
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
    
    // Generar slug para cada post y encontrar el que coincida
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
    
    // Extraer descripción del contenido
    const description = post.description || 
      post.content
        .replace(/<[^>]*>/g, "")
        .substring(0, 160) + "..."
    
    // Extraer imagen destacada
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostData(slug)
  
  // Valores por defecto si no se encuentra el post
  const defaultTitle = "Artículo del Blog"
  const defaultDescription = "Artículo detallado sobre desarrollo de software, sistemas financieros o liderazgo técnico por José Carrillo, Tech Lead en Yummy Inc."
  
  if (!post) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: defaultTitle,
        description: defaultDescription,
        url: `https://carrillo.app/blog/${slug}`,
        type: "article",
        siteName: "José Carrillo - Tech Lead & Software Architect",
      },
      twitter: {
        card: "summary_large_image",
        title: defaultTitle,
        description: defaultDescription,
        creator: "@carrilloapps",
      },
      robots: {
        index: false,
        follow: true,
      }
    }
  }
  
  // Metadatos dinámicos basados en el contenido real
  const title = `${post.title} | José Carrillo`
  const description = post.description
  const publishedTime = new Date(post.pubDate).toISOString()
  const modifiedTime = new Date().toISOString()
  
  // Generar keywords basadas en categorías y contenido
  const keywords = [
    ...post.categories,
    "José Carrillo",
    "desarrollo software",
    "fintech",
    "liderazgo técnico",
    "arquitectura software",
    "tech lead"
  ].join(", ")
  
  return {
    title,
    description,
    keywords,
    authors: [{ name: post.author, url: "https://carrillo.app" }],
    creator: post.author,
    publisher: "José Carrillo",
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://carrillo.app/blog/${slug}`,
      type: "article",
      siteName: "José Carrillo - Tech Lead & Software Architect",
      publishedTime,
      modifiedTime,
      authors: [post.author],
      section: post.categories[0] || "Tecnología",
      tags: post.categories,
      images: post.thumbnail ? [
        {
          url: post.thumbnail,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [
        {
          url: "https://carrillo.app/placeholder.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@carrilloapps",
      images: post.thumbnail ? [post.thumbnail] : ["https://carrillo.app/placeholder.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "article:author": post.author,
      "article:published_time": publishedTime,
      "article:modified_time": modifiedTime,
      "article:section": post.categories[0] || "Tecnología",
      "article:tag": post.categories.join(","),
      "reading-time": `${post.readingTime} minutos`,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostData(slug)

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
    <div className="min-h-screen bg-black text-white">
      {/* Datos estructurados JSON-LD */}
      {jsonLdData && <JsonLd data={jsonLdData} />}
      
      <SiteHeader />

      <main className="container py-12 space-y-12" id="main-content">
        {/* Breadcrumb para SEO */}
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-400 mb-4">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-white" aria-current="page">
              {post?.title || "Artículo"}
            </li>
          </ol>
        </nav>

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

        <section className="py-12 space-y-8 border-t border-zinc-800" aria-labelledby="related-articles">
          <h2 id="related-articles" className="text-2xl font-bold">Artículos relacionados</h2>
          <Suspense fallback={<BlogLoading type="related" />}>
            <BlogRelated currentSlug={slug} />
          </Suspense>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
