import { unstable_cache } from 'next/cache'
import type { BlogPost, WPPost } from "@/types/blog"

// Cache duration constant (does not depend on env)
const CACHE_TIME = 3600 // 1 hour in seconds

// WordPress REST API configuration (reads from env on every call)
function getWPConfig() {
  const apiUrl = process.env.WORDPRESS_API_URL
  if (!apiUrl) {
    throw new Error('WORDPRESS_API_URL environment variable is required')
  }
  return {
    baseUrl: `${apiUrl}/wp/v2`,
    tokenUrl: `${apiUrl}/jwt-auth/v1/token`,
    perPage: 100,
  }
}

// JWT token cache (in-memory, server-side only)
let jwtToken: string | null = null
let jwtExpiry = 0

// Obtain a JWT token from WordPress
async function getJWTToken(): Promise<string | null> {
  if (jwtToken && Date.now() < jwtExpiry - 300000) {
    return jwtToken
  }

  const username = process.env.WORDPRESS_USERNAME
  const password = process.env.WORDPRESS_PASSWORD

  if (!username || !password) {
    return null
  }

  try {
    const { tokenUrl } = getWPConfig()
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('WordPress JWT auth failed:', response.status)
      return null
    }

    const data = await response.json()
    jwtToken = data.token || null
    jwtExpiry = Date.now() + 2 * 60 * 60 * 1000
    return jwtToken
  } catch (error) {
    console.error('Error obtaining WordPress JWT token:', error)
    return null
  }
}

// Build auth headers for WP requests
async function getAuthHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'User-Agent': 'CarrilloApps/1.0',
  }

  const token = await getJWTToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

// Reading time estimate (200 words/min)
function getReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, ' ').trim()
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / 200)
}

// Strip HTML and extract plain text description
function extractDescription(content: string): string {
  const stripped = content
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return stripped.length > 160 ? stripped.substring(0, 160) + '...' : stripped
}

// Normalize WordPress HTML for consistent server/client parsing
function normalizeWPContent(html: string): string {
  let normalized = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const blockTags = 'figure|div|table|blockquote|pre|ul|ol|h[1-6]|section|aside|article|nav|header|footer|details|summary|hr|iframe'
  normalized = normalized.replace(
    new RegExp(`<p[^>]*>\\s*(<(?:${blockTags})[\\s>/])`, 'gi'), '$1'
  )
  normalized = normalized.replace(
    new RegExp(`(</(?:${blockTags})>)\\s*</p>`, 'gi'), '$1'
  )
  normalized = normalized.replace(/<p[^>]*>\s*<\/p>/gi, '')
  return normalized.trim()
}

// Transform WordPress post to BlogPost
function transformWPPostToBlogPost(post: WPPost): BlogPost {
  const content = normalizeWPContent(post.content.rendered)
  const readingTime = getReadingTime(content)
  const wordCount = content.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length

  const author = post._embedded?.author?.[0]?.name || 'José Carrillo'
  const authorBio = post._embedded?.author?.[0]?.description || undefined
  const authorAvatar = post._embedded?.author?.[0]?.avatar_urls?.['96'] || undefined
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]
  const thumbnail = featuredMedia?.source_url || null
  const thumbnailAlt = featuredMedia?.alt_text || undefined
  const thumbnailCaption = featuredMedia?.caption?.rendered
    ? featuredMedia.caption.rendered.replace(/<[^>]*>/g, '').trim()
    : undefined
  const thumbnailWidth = featuredMedia?.media_details?.width || undefined
  const thumbnailHeight = featuredMedia?.media_details?.height || undefined

  const categories = post._embedded?.['wp:term']?.[0]
    ?.filter(term => term.taxonomy === 'category')
    ?.map(term => term.name) || []

  const tags = post._embedded?.['wp:term']?.[1]
    ?.filter(term => term.taxonomy === 'post_tag')
    ?.map(term => term.name) || []

  const description = post.excerpt.rendered
    ? post.excerpt.rendered.replace(/<[^>]*>/g, '').trim()
    : extractDescription(content)

  return {
    title: post.title.rendered.replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&amp;/g, '&'),
    author,
    authorBio,
    authorAvatar,
    content,
    description,
    link: post.link,
    guid: post.id.toString(),
    thumbnail,
    thumbnailAlt,
    thumbnailCaption,
    thumbnailWidth,
    thumbnailHeight,
    pubDate: post.date_gmt ? `${post.date_gmt}Z` : post.date,
    categories,
    readingTime,
    slug: post.slug,
    wordCount,
    canonicalUrl: post.link,
    subtitle: description.substring(0, 100),
    lastModified: post.modified_gmt ? `${post.modified_gmt}Z` : post.modified,
    firstPublished: post.date_gmt ? `${post.date_gmt}Z` : post.date,
    language: 'es',
    license: 'All Rights Reserved',
    tags,
    estimatedReadingTime: readingTime,
    commentStatus: post.comment_status,
    format: post.format,
    sticky: post.sticky,
  }
}

// Fetch posts from WordPress REST API
async function fetchWPPosts(): Promise<WPPost[]> {
  try {
    const { baseUrl, perPage } = getWPConfig()
    const url = `${baseUrl}/posts?_embed&per_page=${perPage}&orderby=date&order=desc`
    const headers = await getAuthHeaders()

    const response = await fetch(url, {
      next: {
        revalidate: CACHE_TIME,
        tags: ['blog-posts']
      },
      headers,
    })

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`)
    }

    return await response.json() as WPPost[]
  } catch (error) {
    console.error('Error fetching WordPress posts:', error)
    return []
  }
}

// Cached: Get all blog posts
export const getCachedBlogPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    const posts = await fetchWPPosts()
    if (!Array.isArray(posts)) return []
    return posts.map(transformWPPostToBlogPost)
  },
  ['blog-posts'],
  {
    revalidate: CACHE_TIME,
    tags: ['blog-posts']
  }
)

// Cached: Get a single post by slug
export const getCachedBlogPostBySlug = unstable_cache(
  async (slug: string): Promise<BlogPost | null> => {
    try {
      const { baseUrl } = getWPConfig()
      const url = `${baseUrl}/posts?_embed&slug=${encodeURIComponent(slug)}`
      const headers = await getAuthHeaders()

      const response = await fetch(url, {
        next: {
          revalidate: CACHE_TIME,
          tags: ['blog-posts']
        },
        headers,
      })

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`)
      }

      const posts: WPPost[] = await response.json()
      if (!Array.isArray(posts) || posts.length === 0) return null

      return transformWPPostToBlogPost(posts[0])
    } catch (error) {
      console.error('Error fetching WordPress post by slug:', error)
      return null
    }
  },
  ['blog-post-by-slug'],
  {
    revalidate: CACHE_TIME,
    tags: ['blog-posts']
  }
)

// Cached: Get related posts (by shared categories)
export const getCachedRelatedBlogPosts = unstable_cache(
  async (currentSlug: string): Promise<BlogPost[]> => {
    const allPosts = await getCachedBlogPosts()
    const currentPost = allPosts.find(post => post.slug === currentSlug)

    if (!currentPost) {
      return allPosts.slice(0, 3)
    }

    const relatedPosts = allPosts
      .filter(post => post.slug !== currentSlug)
      .sort((a, b) => {
        const aCommon = a.categories.filter(cat =>
          currentPost.categories.includes(cat)
        ).length
        const bCommon = b.categories.filter(cat =>
          currentPost.categories.includes(cat)
        ).length
        return bCommon - aCommon
      })

    return relatedPosts.slice(0, 3)
  },
  ['blog-related-posts'],
  {
    revalidate: CACHE_TIME,
    tags: ['blog-posts']
  }
)

// Cached: Get all unique categories
export const getCachedBlogCategories = unstable_cache(
  async (): Promise<string[]> => {
    const posts = await getCachedBlogPosts()
    const allCategories = posts.flatMap(post => post.categories)
    return [...new Set(allCategories)]
  },
  ['blog-categories'],
  {
    revalidate: CACHE_TIME,
    tags: ['blog-posts']
  }
)

// Cached: Get sitemap data
export const getCachedSitemapData = unstable_cache(
  async () => {
    const posts = await getCachedBlogPosts()
    return posts.map(post => ({
      slug: post.slug,
      lastModified: new Date(post.lastModified || post.pubDate),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  },
  ['blog-sitemap'],
  {
    revalidate: CACHE_TIME,
    tags: ['blog-posts']
  }
)

// Cached: Get featured post (most recent)
export const getCachedFeaturedPost = unstable_cache(
  async (): Promise<BlogPost | null> => {
    const posts = await getCachedBlogPosts()
    return posts.length > 0 ? posts[0] : null
  },
  ['blog-featured-post'],
  {
    revalidate: CACHE_TIME,
    tags: ['blog-posts']
  }
)

// Revalidate cache (for webhooks)
export async function revalidateBlogCache() {
  console.log('Blog cache revalidation requested')
}

export { getWPConfig }
