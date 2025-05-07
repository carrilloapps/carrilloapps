export interface MediumPost {
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
  // Metadatos adicionales de Medium
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
