import { unstable_cache } from 'next/cache'
import type { MediumPost } from "@/types/medium"

// Configuración del servicio RSS
const RSS_CONFIG = {
  baseUrl: 'https://api.rss2json.com/v1/api.json',
  mediumFeed: 'https://medium.com/feed/@carrilloapps',
  cacheTime: 3600, // 1 hora en segundos
  revalidateTime: 3600, // 1 hora en segundos
} as const

// Tipos para la respuesta de la API RSS2JSON
interface RSSResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: RSSItem[]
}

interface RSSItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: any
  categories: string[]
}

// Función para generar un slug a partir del título
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

// Función para obtener el tiempo de lectura estimado
function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Función para extraer la imagen destacada del contenido
function extractThumbnail(content: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/
  const match = content.match(imgRegex)
  return match ? match[1] : null
}

// Función para validar si una URL de imagen es válida
function validThumbnail(content: string): string {
  return /\.(jpe?g|png|gif|webp|svg)(\?.*)?$/i.test(content) ? content : ''
}

// Función para extraer la descripción del contenido
function extractDescription(content: string): string {
  // Eliminar todas las etiquetas HTML excepto las básicas para formato
  const strippedContent = content
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "") // Eliminar scripts y estilos
    .replace(/<\/?(?!p|br|b|i|strong|em)\w+[^>]*>/gi, "") // Mantener solo etiquetas básicas

  // Tomar los primeros 160 caracteres como descripción
  const firstParagraph = strippedContent.match(/<p[^>]*>(.*?)<\/p>/i)

  if (firstParagraph && firstParagraph[1]) {
    // Si encontramos un párrafo, usamos su contenido
    return firstParagraph[1].length > 160 ? firstParagraph[1].substring(0, 160) + "..." : firstParagraph[1]
  }

  // Si no hay párrafos, usamos el texto plano
  return strippedContent.substring(0, 160) + "..."
}

// Función para transformar un item RSS a MediumPost
function transformRSSItemToMediumPost(item: RSSItem): MediumPost {
  const readingTime = getReadingTime(item.content)
  const slug = generateSlug(item.title)
  const thumbnail = item.thumbnail || extractThumbnail(item.content)
  const description = item.description || extractDescription(item.content)

  return {
    title: item.title,
    author: item.author,
    content: item.content,
    description: description,
    link: item.link,
    guid: item.guid,
    thumbnail: validThumbnail(thumbnail || ''),
    pubDate: item.pubDate,
    categories: item.categories || [],
    readingTime: readingTime,
    slug: slug,
    // Metadatos adicionales simulados
    claps: Math.floor(Math.random() * 500),
    responses: Math.floor(Math.random() * 20),
    wordCount: item.content.split(/\s+/).length,
    mediumUrl: item.link,
    canonicalUrl: item.link,
    subtitle: description.substring(0, 100),
    lastModified: item.pubDate,
    firstPublished: item.pubDate,
    language: "es",
    license: "All Rights Reserved",
    tags: item.categories || [],
    estimatedReadingTime: readingTime,
  }
}

// Función principal para obtener datos RSS (sin caché)
async function fetchRSSData(): Promise<RSSResponse | null> {
  try {
    const url = `${RSS_CONFIG.baseUrl}?rss_url=${encodeURIComponent(RSS_CONFIG.mediumFeed)}`
    
    const response = await fetch(url, {
      next: { 
        revalidate: RSS_CONFIG.revalidateTime,
        tags: ['medium-posts'] 
      },
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'CarrilloApps/1.0'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: RSSResponse = await response.json()

    if (data.status !== "ok") {
      throw new Error(`RSS API error: ${data.status}`)
    }

    return data
  } catch (error) {
    console.error("Error fetching RSS data:", error)
    return null
  }
}

// Función con caché para obtener todos los posts
export const getCachedMediumPosts = unstable_cache(
  async (): Promise<MediumPost[]> => {
    const data = await fetchRSSData()
    
    if (!data || !data.items) {
      return []
    }

    return data.items.map(transformRSSItemToMediumPost)
  },
  ['medium-posts'],
  {
    revalidate: RSS_CONFIG.cacheTime,
    tags: ['medium-posts']
  }
)

// Función con caché para obtener un post específico por slug
export const getCachedMediumPostBySlug = unstable_cache(
  async (slug: string): Promise<MediumPost | null> => {
    const posts = await getCachedMediumPosts()
    return posts.find(post => post.slug === slug) || null
  },
  ['medium-post-by-slug'],
  {
    revalidate: RSS_CONFIG.cacheTime,
    tags: ['medium-posts']
  }
)

// Función con caché para obtener posts relacionados
export const getCachedRelatedMediumPosts = unstable_cache(
  async (currentSlug: string): Promise<MediumPost[]> => {
    const allPosts = await getCachedMediumPosts()
    const currentPost = allPosts.find(post => post.slug === currentSlug)

    if (!currentPost) {
      return allPosts.slice(0, 3)
    }

    // Encontrar posts con categorías similares
    const relatedPosts = allPosts
      .filter(post => post.slug !== currentSlug)
      .sort((a, b) => {
        const aCommonCategories = a.categories.filter(cat => 
          currentPost.categories.includes(cat)
        ).length
        const bCommonCategories = b.categories.filter(cat => 
          currentPost.categories.includes(cat)
        ).length
        return bCommonCategories - aCommonCategories
      })

    return relatedPosts.slice(0, 3)
  },
  ['medium-related-posts'],
  {
    revalidate: RSS_CONFIG.cacheTime,
    tags: ['medium-posts']
  }
)

// Función con caché para obtener todas las categorías únicas
export const getCachedMediumCategories = unstable_cache(
  async (): Promise<string[]> => {
    const posts = await getCachedMediumPosts()
    const allCategories = posts.flatMap(post => post.categories)
    return [...new Set(allCategories)]
  },
  ['medium-categories'],
  {
    revalidate: RSS_CONFIG.cacheTime,
    tags: ['medium-posts']
  }
)

// Función con caché para obtener datos para el sitemap
export const getCachedSitemapData = unstable_cache(
  async () => {
    const posts = await getCachedMediumPosts()
    return posts.map(post => ({
      slug: post.slug,
      lastModified: new Date(post.pubDate),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  },
  ['medium-sitemap'],
  {
    revalidate: RSS_CONFIG.cacheTime,
    tags: ['medium-posts']
  }
)

// Función para obtener el post destacado (el más reciente)
export const getCachedFeaturedPost = unstable_cache(
  async (): Promise<MediumPost | null> => {
    const posts = await getCachedMediumPosts()
    return posts.length > 0 ? posts[0] : null
  },
  ['medium-featured-post'],
  {
    revalidate: RSS_CONFIG.cacheTime,
    tags: ['medium-posts']
  }
)

// Función para revalidar el caché manualmente (útil para webhooks)
export async function revalidateMediumCache() {
  // Esta función se puede usar con revalidateTag en el futuro
  // cuando se implemente un webhook de Medium o un cron job
  console.log('Medium cache revalidation requested')
}

// Exportar configuración para uso en otros archivos
export { RSS_CONFIG }