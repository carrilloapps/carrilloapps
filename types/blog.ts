// WordPress REST API response types
export interface WPPost {
  id: number
  date: string
  date_gmt: string
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: { rendered: string }
  content: { rendered: string; protected: boolean }
  excerpt: { rendered: string }
  author: number
  featured_media: number
  categories: number[]
  tags: number[]
  _embedded?: {
    author?: Array<{
      id: number
      name: string
      url: string
      description: string
      link: string
      slug: string
      avatar_urls?: Record<string, string>
    }>
    'wp:featuredmedia'?: Array<{
      id: number
      source_url: string
      alt_text: string
      media_details?: {
        width: number
        height: number
        sizes?: Record<string, {
          source_url: string
          width: number
          height: number
        }>
      }
    }>
    'wp:term'?: Array<Array<{
      id: number
      link: string
      name: string
      slug: string
      taxonomy: string
    }>>
  }
}

export interface WPCategory {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  parent: number
}

export interface WPTag {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
}

// Unified BlogPost interface (replaces MediumPost)
export interface BlogPost {
  title: string
  author: string
  content: string
  description: string
  link: string
  guid: string
  thumbnail: string | null
  pubDate: string
  categories: string[]
  readingTime: number
  slug: string
  // Additional metadata
  claps?: number
  responses?: number
  wordCount?: number
  mediumUrl?: string
  canonicalUrl?: string
  subtitle?: string
  lastModified?: string
  firstPublished?: string
  language?: string
  license?: string
  tags?: string[]
  estimatedReadingTime?: number
}
