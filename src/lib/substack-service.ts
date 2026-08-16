const FEED_URL = "https://carrilloapps.substack.com/feed"

export interface SubstackPost {
  title: string
  url: string
  pubDate: string
  thumbnail: string | null
  thumbnailAlt: string
  readingTime: number | null
  /** First couple of sentences, tags stripped. Empty when the feed has none. */
  excerpt: string
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
  return s
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .trim()
}

/**
 * Decode the entities an RSS feed actually contains.
 *
 * Substack double-escapes: the CDATA holds HTML whose own text was already
 * entity-encoded, so `artículo` arrives as `art&#237;culo` and curly quotes as
 * `&#8220;`. Stripping tags alone left those literal on screen. Numeric
 * references cover almost everything; the five named ones below are the rest of
 * what XML guarantees.
 */
const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
}

function decodeEntities(input: string): string {
  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, body: string) => {
    if (body.startsWith("#")) {
      const code =
        body[1] === "x" || body[1] === "X"
          ? Number.parseInt(body.slice(2), 16)
          : Number.parseInt(body.slice(1), 10)
      return Number.isFinite(code) && code > 0 ? String.fromCodePoint(code) : match
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? match
  })
}

/**
 * Plain-text opening of a post.
 *
 * The cut walks back to the last space so it ends on a word rather than
 * mid-syllable.
 */
function toExcerpt(html: string, max = 220): string {
  const text = decodeEntities(decodeEntities(html).replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim()

  if (text.length <= max) return text
  const cut = text.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`
}

function estimateReadingTime(html: string): number {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
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

      // Titles carry the same entities the bodies do.
      const title = decodeEntities(stripCdata(between(item, "<title>", "</title>")))
      const url =
        stripCdata(between(item, "<link>", "</link>")) ||
        stripCdata(between(item, "<guid>", "</guid>"))
      const pubDateRaw = between(item, "<pubDate>", "</pubDate>")

      const enclosureMatch = item.match(/<enclosure\s[^>]*>/) ?? item.match(/<enclosure\s[^>]*\/>/)
      const mediaMatch =
        item.match(/<media:content\s[^>]*>/) ?? item.match(/<media:content\s[^>]*\/>/)
      const imgTag = enclosureMatch?.[0] ?? mediaMatch?.[0] ?? ""
      const thumbnail = imgTag ? extractAttr(imgTag, "url") || null : null

      const content = stripCdata(
        between(item, "<content:encoded>", "</content:encoded>") ||
          between(item, "<description>", "</description>"),
      )

      /*
        The excerpt comes from <description>, not from the body. Substack's
        body opens with the cover image and its caption, so an excerpt taken
        from it read "Portada para el artículo generada con Inteligencia
        Artificial…" on every post. <description> is the subtitle the author
        wrote. Reading time still uses the full body — that is what it measures.
      */
      const summary = stripCdata(between(item, "<description>", "</description>")) || content

      posts.push({
        title: title || "Sin título",
        url: url || FEED_URL,
        pubDate: pubDateRaw ? new Date(pubDateRaw).toISOString() : new Date().toISOString(),
        thumbnail: thumbnail || null,
        thumbnailAlt: title || "Artículo",
        readingTime: content ? estimateReadingTime(content) : null,
        excerpt: summary ? toExcerpt(summary) : "",
      })
    }

    return posts
  } catch {
    return []
  }
}
