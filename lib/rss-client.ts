import type { MediumPost } from "@/types/medium"

// Configuración del cache del cliente
const RSS_CONFIG = {
  cacheTime: 3600000, // 1 hora en milisegundos
} as const

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
    return cached.data as T
  }

  const data = await fetchFn()
  clientCache.set(key, {
    data,
    timestamp: Date.now()
  })

  return data
}

// Función para obtener todos los posts desde la API route (con cache del cliente)
export async function getCachedMediumPosts(): Promise<MediumPost[]> {
  return getFromCacheOrFetch('medium-posts', async () => {
    try {
      // Durante SSR/build, usar URL absoluta; en cliente usar ruta relativa
      const isServer = typeof window === 'undefined'
      const baseUrl = isServer 
        ? (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
        : ''
      
      const response = await fetch(`${baseUrl}/api/medium-posts`, {
        headers: {
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const posts: MediumPost[] = await response.json()
      return posts
    } catch (error) {
      console.error("Error fetching Medium posts from API:", error)
      return []
    }
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