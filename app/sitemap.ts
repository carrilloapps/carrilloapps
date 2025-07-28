import { MetadataRoute } from 'next'
import { getCachedSitemapData } from '@/lib/rss-service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://carrillo.app'
  const currentDate = new Date()
  
  // URLs estáticas principales
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre-mi`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/recursos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/agendamiento`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
  
  // URLs dinámicas de blog usando el servicio centralizado con caché
  try {
    const blogPosts = await getCachedSitemapData()
    const blogUrls: MetadataRoute.Sitemap = blogPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.lastModified,
      changeFrequency: post.changeFrequency,
      priority: post.priority,
    }))
    
    return [...staticUrls, ...blogUrls]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticUrls
  }
}