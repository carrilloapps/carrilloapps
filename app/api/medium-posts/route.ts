import { NextResponse } from 'next/server'
import type { MediumPost } from '@/types/medium'

// Configuración del servicio RSS
const RSS_CONFIG = {
  baseUrl: 'https://api.rss2json.com/v1/api.json',
  mediumFeed: 'https://medium.com/feed/@carrilloapps',
  cacheTime: 3600, // 1 hora en segundos
} as const

// Tipos para la respuesta de la API RSS2JSON
interface RSSEnclosure {
  link?: string
  type?: string
  length?: number
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
  enclosure: RSSEnclosure
  categories: string[]
}

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

// Función para generar un slug a partir del título
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
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
  const strippedContent = content
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<\/?(?!p|br|b|i|strong|em)\w+[^>]*>/gi, '')

  const firstParagraph = strippedContent.match(/<p[^>]*>(.*?)<\/p>/i)

  if (firstParagraph && firstParagraph[1]) {
    return firstParagraph[1].length > 160
      ? firstParagraph[1].substring(0, 160) + '...'
      : firstParagraph[1]
  }

  return strippedContent.substring(0, 160) + '...'
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
    language: 'es',
    license: 'All Rights Reserved',
    tags: item.categories || [],
    estimatedReadingTime: readingTime,
  }
}

export async function GET() {
  try {
    const url = `${RSS_CONFIG.baseUrl}?rss_url=${encodeURIComponent(
      RSS_CONFIG.mediumFeed
    )}`

    const response = await fetch(url, {
      next: {
        revalidate: RSS_CONFIG.cacheTime,
      },
      headers: {
        Accept: 'application/json',
        'User-Agent': 'CarrilloApps/1.0',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: RSSResponse = await response.json()

    if (data.status !== 'ok') {
      throw new Error(`RSS API error: ${data.status}`)
    }

    const posts = data.items.map(transformRSSItemToMediumPost)

    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': `public, s-maxage=${RSS_CONFIG.cacheTime}, stale-while-revalidate=${RSS_CONFIG.cacheTime * 2}`,
      },
    })
  } catch (error) {
    console.error('Error fetching RSS data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
