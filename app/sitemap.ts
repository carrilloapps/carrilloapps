import { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/env'
import { getSubstackPosts } from '@/lib/substack-service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()
  const currentDate = new Date('2025-09-22')

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { 'es-CO': baseUrl, 'x-default': baseUrl } },
    },
    {
      url: `${baseUrl}/sobre-mi`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: { 'es-CO': `${baseUrl}/sobre-mi`, 'x-default': `${baseUrl}/sobre-mi` } },
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: { 'es-CO': `${baseUrl}/servicios`, 'x-default': `${baseUrl}/servicios` } },
    },
    {
      url: `${baseUrl}/recursos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { 'es-CO': `${baseUrl}/recursos`, 'x-default': `${baseUrl}/recursos` } },
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: { 'es-CO': `${baseUrl}/contacto`, 'x-default': `${baseUrl}/contacto` } },
    },
    {
      url: `${baseUrl}/agendamiento`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: { 'es-CO': `${baseUrl}/agendamiento`, 'x-default': `${baseUrl}/agendamiento` } },
    },
  ]

  try {
    const posts = await getSubstackPosts(20)
    const substackUrls: MetadataRoute.Sitemap = posts.map((post) => ({
      url: post.url,
      lastModified: new Date(post.pubDate),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
    return [...staticUrls, ...substackUrls]
  } catch {
    return staticUrls
  }
}
