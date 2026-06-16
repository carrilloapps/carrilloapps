import { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl()
  
  // Note: legal/thank-you pages (privacidad, terminos, cookies,
  // agendamiento/gracias) are intentionally NOT disallowed here — they carry a
  // `robots: { index: false }` meta tag, and Google must be allowed to crawl a
  // page to actually see (and honor) that noindex directive. Blocking them in
  // robots.txt would risk URL-only indexing without a snippet.
  //
  // AI crawlers are allowed (no blanket disallow) so the site stays eligible
  // for citations in AI search engines (AEO). Re-add per-bot rules here if you
  // ever want to opt out of AI training/retrieval.
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}