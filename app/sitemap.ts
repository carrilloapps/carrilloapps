import { MetadataRoute } from 'next'
import { getCachedSitemapData } from '@/lib/wordpress-service'
import { getSiteUrl } from '@/lib/env'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()
  const currentDate = new Date('2025-09-22')
  
  // URLs estáticas principales
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          'es-CO': baseUrl,
          'x-default': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/sobre-mi`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/sobre-mi`,
          'x-default': `${baseUrl}/sobre-mi`,
        },
      },
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/servicios`,
          'x-default': `${baseUrl}/servicios`,
        },
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/blog`,
          'x-default': `${baseUrl}/blog`,
        },
      },
    },
    {
      url: `${baseUrl}/recursos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/recursos`,
          'x-default': `${baseUrl}/recursos`,
        },
      },
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/contacto`,
          'x-default': `${baseUrl}/contacto`,
        },
      },
    },
    {
      url: `${baseUrl}/agendamiento`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/agendamiento`,
          'x-default': `${baseUrl}/agendamiento`,
        },
      },
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
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/blog/${post.slug}`,
          'x-default': `${baseUrl}/blog/${post.slug}`,
        },
      },
    }))
    
    return [...staticUrls, ...blogUrls]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticUrls
  }
}