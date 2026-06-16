import { getSubstackPosts } from "@/lib/substack-service"
import { getSiteUrl } from "@/lib/env"

// Regenerated every 30 min, mirroring the Substack fetch cadence.
export const revalidate = 1800

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/**
 * On-domain RSS feed that surfaces the Substack posts under carrillo.app.
 * This is the SEO/syndication-correct way to expose cross-domain content
 * (a sitemap must only contain same-host URLs, so the posts go here instead).
 * Discoverable via the <link rel="alternate"> declared in the root layout.
 */
export async function GET() {
  const site = getSiteUrl()
  const posts = await getSubstackPosts(20)

  const items = posts
    .map(
      (post) => `    <item>
      <title>${esc(post.title)}</title>
      <link>${esc(post.url)}</link>
      <guid isPermaLink="true">${esc(post.url)}</guid>
      <pubDate>${new Date(post.pubDate).toUTCString()}</pubDate>${
        post.thumbnail
          ? `\n      <enclosure url="${esc(post.thumbnail)}" type="image/jpeg" />`
          : ""
      }
    </item>`,
    )
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Junior Carrillo — Fintech, pagos y liderazgo técnico</title>
    <link>${site}</link>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Artículos de Junior Carrillo sobre desarrollo de software, fintech, sistemas de pago y liderazgo técnico.</description>
    <language>es-CO</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=1800, stale-while-revalidate=86400",
    },
  })
}
