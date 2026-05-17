const FEED_URL = "https://carrilloapps.substack.com/feed"

export interface SubstackPost {
  title: string
  url: string
  pubDate: string
  thumbnail: string | null
  thumbnailAlt: string
  readingTime: number | null
}

function between(str: string, open: string, close: string): string {
  const start = str.indexOf(open)
  if (start === -1) return ""
  const inner = start + open.length
  const end = str.indexOf(close, inner)
  if (end === -1) return ""
  return str.slice(inner, end).trim()
}

function extractAttr(tag: string, attr: string): string {
  const re = new RegExp(`\\b${attr}="([^"]*)"`)
  return tag.match(re)?.[1] ?? ""
}

function stripCdata(s: string): string {
  return s.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim()
}

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  const words = text.split(" ").filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export async function getSubstackPosts(limit = 4): Promise<SubstackPost[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 1800 } })
    if (!res.ok) return []

    const xml = await res.text()
    const posts: SubstackPost[] = []
    let cursor = 0

    while (posts.length < limit) {
      const start = xml.indexOf("<item>", cursor)
      if (start === -1) break
      const end = xml.indexOf("</item>", start)
      if (end === -1) break
      const item = xml.slice(start + 6, end)
      cursor = end + 7

      const title = stripCdata(between(item, "<title>", "</title>"))
      const url = stripCdata(between(item, "<link>", "</link>")) ||
                  stripCdata(between(item, "<guid>", "</guid>"))
      const pubDateRaw = between(item, "<pubDate>", "</pubDate>")

      const enclosureMatch = item.match(/<enclosure\s[^>]*>/) ?? item.match(/<enclosure\s[^>]*\/>/)
      const mediaMatch = item.match(/<media:content\s[^>]*>/) ?? item.match(/<media:content\s[^>]*\/>/)
      const imgTag = enclosureMatch?.[0] ?? mediaMatch?.[0] ?? ""
      const thumbnail = imgTag ? extractAttr(imgTag, "url") || null : null

      const rawContent =
        between(item, "<content:encoded>", "</content:encoded>") ||
        between(item, "<description>", "</description>")
      const content = stripCdata(rawContent)

      posts.push({
        title: title || "Sin título",
        url: url || FEED_URL,
        pubDate: pubDateRaw ? new Date(pubDateRaw).toISOString() : new Date().toISOString(),
        thumbnail: thumbnail || null,
        thumbnailAlt: title || "Artículo",
        readingTime: content ? estimateReadingTime(content) : null,
      })
    }

    return posts
  } catch {
    return []
  }
}
