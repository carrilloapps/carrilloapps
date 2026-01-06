import type { MediumPost } from "@/types/medium"

// Configuración del servicio RSS
const RSS_CONFIG = {
  baseUrl: 'https://api.rss2json.com/v1/api.json',
  mediumFeed: 'https://medium.com/feed/@carrilloapps',
  cacheTime: 3600000, // 1 hora en milisegundos
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

interface RSSEnclosure {
  link?: string;
  type?: string;
  length?: number;
}

export interface RSSItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: RSSEnclosure
  categories: string[]
}

// Cache en memoria para el cliente
interface CacheEntry<T> {
  data: T
  timestamp: number
}

const clientCache = new Map<string, CacheEntry<unknown>>()

// Función para verificar si el cache es válido
function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < RSS_CONFIG.cacheTime
}

// Función para obtener del cache o ejecutar la función
async function getFromCacheOrFetch<T>(
  key: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  const cached = clientCache.get(key)
  
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data
  }

  const data = await fetchFn()
  clientCache.set(key, {
    data,
    timestamp: Date.now()
  })

  return data
}

// Función para generar un slug a partir del título
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
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
  return /\.(jpe?g|png|gif|webp|svg)(\?.*)?$/i.test(content) ? content : '';
}

// Función para extraer la descripción del contenido
function extractDescription(content: string): string {
  const strippedContent = content
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<\/?(?!p|br|b|i|strong|em)\w+[^>]*>/gi, "")

  const firstParagraph = strippedContent.match(/<p[^>]*>(.*?)<\/p>/i)

  if (firstParagraph && firstParagraph[1]) {
    return firstParagraph[1].length > 160 ? firstParagraph[1].substring(0, 160) + "..." : firstParagraph[1]
  }

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
  };
}

// Función principal para obtener datos RSS
async function fetchRSSData(): Promise<RSSResponse | null> {
  try {
    const url = `${RSS_CONFIG.baseUrl}?rss_url=${encodeURIComponent(RSS_CONFIG.mediumFeed)}`
    
    const response = await fetch(url, {
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

// Función para obtener todos los posts (con cache del cliente)
export async function getCachedMediumPosts(): Promise<MediumPost[]> {
  return getFromCacheOrFetch('medium-posts', async () => {
    const data = await fetchRSSData()
    
    if (!data || !data.items) {
      return []
    }

    return data.items.map(transformRSSItemToMediumPost)
  })
}

// Función para obtener un post específico por slug
export async function getCachedMediumPostBySlug(slug: string): Promise<MediumPost | null> {
  const posts = await getCachedMediumPosts()
  return posts.find(post => post.slug === slug) || null
}

// Función para obtener posts relacionados
export async function getCachedRelatedMediumPosts(currentSlug: string): Promise<MediumPost[]> {
  const allPosts = await getCachedMediumPosts()
  const currentPost = allPosts.find(post => post.slug === currentSlug)

  if (!currentPost) {
    return allPosts.slice(0, 3)
  }

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
}

// Función para obtener todas las categorías únicas
export async function getCachedMediumCategories(): Promise<string[]> {
  const posts = await getCachedMediumPosts()
  const allCategories = posts.flatMap(post => post.categories)
  return [...new Set(allCategories)]
}

// Función para obtener datos para el sitemap
export async function getCachedSitemapData() {
  const posts = await getCachedMediumPosts()
  return posts.map(post => ({
    slug: post.slug,
    lastModified: new Date(post.pubDate),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))
}

// Función para obtener el post destacado
export async function getCachedFeaturedPost(): Promise<MediumPost | null> {
  const posts = await getCachedMediumPosts()
  return posts.length > 0 ? posts[0] : null
}

// Exportar configuración
export { RSS_CONFIG }