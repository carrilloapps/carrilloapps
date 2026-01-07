import { Suspense } from "react"
import { Metadata } from "next"
import dynamic from "next/dynamic"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogGridLoading } from "@/components/unified-loading"
import { BlogArticle } from "@/components/blog-article"
import { JsonLd } from "@/components/json-ld"
import { ParticleHeroBackground } from "@/components/particle-hero-background"
import { BlogPostClient } from "./blog-post-client"
import { getCachedSitemapData, getCachedMediumPostBySlug } from "@/lib/rss-service"
import { MediumPost } from "@/types/medium"
import notFound from "@/app/not-found"

// Lazy loading para componentes no críticos
const BlogRelated = dynamic(() => import("@/components/blog-related").then(mod => ({ default: mod.BlogRelated })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
})

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
  // SEO dinámico basado en contenido
  const generateDynamicSEO = (post: MediumPost) => {
    // Extraer keywords del contenido
    const contentKeywords = post.content
      .replace(/<[^>]*>/g, ' ')
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 4)
      .filter(word => !['para', 'como', 'este', 'esta', 'desde', 'hasta', 'donde', 'cuando', 'porque', 'aunque', 'mientras', 'durante'].includes(word))
      .slice(0, 10)

    // Generar descripción optimizada
    const cleanContent = post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    const sentences = cleanContent.split(/[.!?]+/).filter(s => s.trim().length > 20)
    const dynamicDescription = sentences.slice(0, 2).join('. ').substring(0, 155) + '...'

    // Determinar categoría principal para schema
    const primaryCategory = post.categories[0] || 'Tecnología'
    const isFintech = post.categories.some(cat => 
      ['fintech', 'banking', 'payment', 'financial'].some(term => 
        cat.toLowerCase().includes(term)
      )
    )

    return {
      keywords: [...new Set([...post.categories, ...contentKeywords])],
      description: dynamicDescription,
      category: primaryCategory,
      isFintech,
      readingLevel: post.content.length > 5000 ? 'Advanced' : post.content.length > 2000 ? 'Intermediate' : 'Beginner'
    }
  }

  const post = await getCachedMediumPostBySlug(slug)
  
  const dynamicSEO = post ? generateDynamicSEO(post) : null
  
  if (!post) {
    return {
      title: "Artículo no encontrado",
      description: "El artículo que buscas no está disponible.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

    // Descripción SEO optimizada dinámicamente
    const seoDescription = dynamicSEO?.description || post.description || `Artículo de ${post.author} sobre ${post.categories.join(', ')}. Tiempo de lectura: ${post.readingTime} minutos.`
    
    // Keywords dinámicas basadas en contenido
    const dynamicKeywords = [
      ...(dynamicSEO?.keywords || []),
      ...post.categories,
      post.author,
      'desarrollo software',
      'tech leader',
      'sistemas financieros',
      'yummy inc',
      'blog tecnología',
      ...(post.tags || [])
    ].filter((keyword, index, arr) => arr.indexOf(keyword) === index) // Eliminar duplicados

  return {
    title: post.title,
    description: seoDescription,
    keywords: [
        ...dynamicKeywords,
        dynamicSEO?.isFintech ? 'fintech' : '',
        `nivel ${dynamicSEO?.readingLevel?.toLowerCase() || 'intermedio'}`,
        `categoría ${dynamicSEO?.category?.toLowerCase() || 'tecnología'}`
      ].filter(Boolean).join(', '),
    authors: [{ name: post.author, url: "https://carrillo.app" }],
    creator: post.author,
    publisher: "José Carrillo",
    alternates: {
      canonical: `https://carrillo.app/blog/${slug}`,
      types: {
        "application/rss+xml": "https://carrillo.app/blog/rss.xml",
      },
    },
    openGraph: {
      title: post.title,
      description: seoDescription,
      url: `https://carrillo.app/blog/${slug}`,
      siteName: "José Carrillo - Tech Leader & Senior Software Developer",
      images: post.thumbnail ? [{
        url: post.thumbnail,
        width: 1200,
        height: 630,
        alt: post.title,
      }] : [{
        url: "https://carrillo.app/logo.webp",
        width: 1200,
        height: 630,
        alt: `${post.title} - José Carrillo`,
      }],
      type: "article",
      publishedTime: post.pubDate,
      modifiedTime: post.lastModified || post.pubDate,
      authors: [post.author],
      section: post.categories[0] || "Tecnología",
      tags: post.categories,
      locale: "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: seoDescription,
      creator: "@carrilloapps",
      site: "@carrilloapps",
      images: post.thumbnail ? [post.thumbnail] : ["https://carrillo.app/logo.webp"],
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
      "article:reading_time": post.readingTime?.toString() || "5",
      "article:word_count": post.wordCount?.toString() || "1000",
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post: MediumPost | null = await getCachedMediumPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  // SEO dinámico basado en contenido (reutilizado del metadata)
  const generateDynamicSEO = (post: MediumPost) => {
    // Extraer keywords del contenido
    const contentKeywords = post.content
      .replace(/<[^>]*>/g, ' ')
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 4)
      .filter(word => !['para', 'como', 'este', 'esta', 'desde', 'hasta', 'donde', 'cuando', 'porque', 'aunque', 'mientras', 'durante'].includes(word))
      .slice(0, 10)

    // Generar descripción optimizada
    const cleanContent = post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    const sentences = cleanContent.split(/[.!?]+/).filter(s => s.trim().length > 20)
    const dynamicDescription = sentences.slice(0, 2).join('. ').substring(0, 155) + '...'

    // Determinar categoría principal para schema
    const primaryCategory = post.categories[0] || 'Tecnología'
    const isFintech = post.categories.some(cat => 
      ['fintech', 'banking', 'payment', 'financial'].some(term => 
        cat.toLowerCase().includes(term)
      )
    )

    return {
      keywords: [...new Set([...post.categories, ...contentKeywords])],
      description: dynamicDescription,
      category: primaryCategory,
      isFintech,
      readingLevel: post.content.length > 5000 ? 'Advanced' : post.content.length > 2000 ? 'Intermediate' : 'Beginner'
    }
  }

  // We know post is not null here since we checked above with notFound()
  const dynamicSEO = generateDynamicSEO(post as MediumPost)
  
  // Keywords dinámicas basadas en contenido
  const dynamicKeywords = [
    ...(dynamicSEO?.keywords || []),
    ...(post as MediumPost).categories,
    (post as MediumPost).author,
    'desarrollo software',
    'tech leader',
    'sistemas financieros',
    'yummy inc',
    'blog tecnología',
    ...((post as MediumPost).tags || [])
  ].filter((keyword, index, arr) => arr.indexOf(keyword) === index) // Eliminar duplicados
  
  // Datos estructurados para JSON-LD optimizados
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": (post as MediumPost).title,
    "description": (post as MediumPost).description,
    "image": {
      "@type": "ImageObject",
      "url": (post as MediumPost).thumbnail || "https://carrillo.app/placeholder.jpg",
      "width": 1200,
      "height": 630,
      "caption": (post as MediumPost).title
    },
    "author": {
      "@type": "Person",
      "name": (post as MediumPost).author,
      "jobTitle": "Tech Leader & Senior Software Developer",
      "url": "https://carrillo.app",
      "image": "https://carrillo.app/logo.webp",
      "sameAs": [
        "https://medium.com/@carrilloapps",
        "https://linkedin.com/in/carrilloapps",
        "https://github.com/carrilloapps",
        "https://twitter.com/carrilloapps"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Yummy Inc.",
        "url": "https://yummysuperapp.com"
      },
      "knowsAbout": [
        "Software Development",
        "Technical Leadership", 
        "Financial Systems",
        "Open Banking",
        "Payment Systems"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "José Carrillo",
      "url": "https://carrillo.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://carrillo.app/logo.webp",
        "width": 400,
        "height": 400
      },
      "sameAs": [
        "https://linkedin.com/in/carrilloapps",
        "https://github.com/carrilloapps"
      ]
    },
    "datePublished": (post as MediumPost).pubDate,
    "dateModified": new Date((post as MediumPost).lastModified || (post as MediumPost).pubDate).toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://carrillo.app/blog/${slug}`,
      "url": `https://carrillo.app/blog/${slug}`
    },
    "url": `https://carrillo.app/blog/${slug}`,
    "wordCount": (post as MediumPost).wordCount || (post as MediumPost).content.split(" ").length,
    "timeRequired": `PT${(post as MediumPost).readingTime || 5}M`,
    "keywords": [
      ...(post as MediumPost).categories,
      ...dynamicKeywords,
      "desarrollo software",
      "sistemas financieros", 
      "tech leader",
      "yummy inc",
      dynamicSEO?.isFintech ? "fintech" : "",
      `nivel ${dynamicSEO?.readingLevel?.toLowerCase() || "intermedio"}`,
      `categoría ${dynamicSEO?.category?.toLowerCase() || "tecnología"}`
    ].filter(Boolean).join(", "),
    "articleSection": (post as MediumPost).categories[0] || "Tecnología",
    "articleBody": (post as MediumPost).content.replace(/<[^>]*>/g, '').substring(0, 500) + "...",
    "inLanguage": "es-ES",
    "isAccessibleForFree": true,
    "copyrightHolder": {
      "@type": "Person",
      "name": (post as MediumPost).author,
      "url": "https://carrillo.app"
    },
    "copyrightYear": new Date((post as MediumPost).pubDate).getFullYear(),
    "license": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    "genre": ["Technology", "Software Development", "Financial Technology"],
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers, Tech Leads, Software Architects, Financial Technology Professionals"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Software Development",
        "description": "Professional software development practices and methodologies"
      },
      {
        "@type": "Thing", 
        "name": "Financial Systems",
        "description": "Banking and financial technology systems architecture"
      },
      {
        "@type": "Thing",
        "name": "Technical Leadership",
        "description": "Leadership practices in technology teams and projects"
      }
    ],
    "mentions": (post as MediumPost).categories.map(category => ({
      "@type": "Thing",
      "name": category
    })),
    "potentialAction": {
      "@type": "ReadAction",
      "target": `https://carrillo.app/blog/${slug}`
    },
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/ReadAction",
        "userInteractionCount": (post as MediumPost).claps || 0
      },
      {
        "@type": "InteractionCounter", 
        "interactionType": "https://schema.org/CommentAction",
        "userInteractionCount": (post as MediumPost).responses || 0
      }
    ]
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Fondo de partículas */}
      <ParticleHeroBackground />
      
      {/* Datos estructurados JSON-LD */}
      <JsonLd data={jsonLdData} />
      
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
