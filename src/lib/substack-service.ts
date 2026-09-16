/**
 * The publication's own origin. Substack serves it from the blog.carrillo.app
 * custom domain, so the feed, the subscribe page and the subscription endpoint
 * all hang off this one constant — change the domain in a single place.
 */
export const BLOG_URL = "https://blog.carrillo.app"

/** Substack's hosted subscribe page — where every signup on this site finishes. */
export const BLOG_SUBSCRIBE_URL = `${BLOG_URL}/subscribe`

/**
 * The subscribe page with the address already in the field.
 *
 * Substack's own signup endpoint cannot be called from a server. It sits behind
 * Cloudflare bot management, which rejects datacenter IPs — Vercel's included —
 * regardless of headers, and it fails in a way that is worse than an error: a
 * request it does not trust still answers `200`, just without the
 * `subscription_id` that proves anything happened. A route that read the status
 * code reported success to readers who were never subscribed, which is exactly
 * what this site did.
 *
 * Not a captcha, despite appearances: the `captcha_behavior` on a Substack page
 * belongs to `pub_creation_captcha_behavior`, and their reCAPTCHA is wired only
 * to login and publication creation. The signup form carries no captcha at all.
 * Which is why there is no token to go and fetch — the wall is at the transport
 * layer, and the same request is accepted from curl and dropped from Node's
 * fetch on the same machine and IP.
 *
 * Calling it from a server would also breach Substack's own terms, which forbid
 * reverse engineering the product and circumventing its restrictions. The risk
 * of that lands on the publication, which is the whole subscriber list.
 *
 * So the form here validates the address and hands it to Substack, which runs
 * the captcha, takes the signup and sends the confirmation mail. One click on
 * a page that is already filled in, and no way to claim a subscription that
 * does not exist.
 */
export function blogSubscribeUrl(email?: string): string {
  return email ? `${BLOG_SUBSCRIBE_URL}?email=${encodeURIComponent(email)}` : BLOG_SUBSCRIBE_URL
}

const FEED_URL = `${BLOG_URL}/feed`

/**
 * What Substack's RSS actually serves — the ceiling on every register here.
 *
 * `/feed` returns the twenty most recent posts and nothing else, and it takes
 * no paging parameter: `?limit=`, `?page=` and `?offset=` are ignored or 404,
 * and the same twenty items come back whatever the query string says. Verified
 * against this publication and against two large ones (newsletter.pragmatic
 * engineer.com, noahpinion.blog), both of which answer with exactly twenty.
 *
 * So there is no page two to build: the source cannot be paged, and asking for
 * more than this silently returns less than requested. The archive beyond the
 * twentieth post lives on the publication itself, which is where /blog sends a
 * reader once the feed is full.
 *
 * Substack's own archive endpoint does return everything, and it is not an
 * option: it is a private API, and their terms forbid crawling a page and
 * storing a significant portion of its content. The register indexes the feed
 * and links out — nothing here copies a post.
 */
export const SUBSTACK_FEED_MAX = 20

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

/**
 * The most recent posts, newest first, capped by what the feed can serve.
 *
 * A `limit` above `SUBSTACK_FEED_MAX` is not an error but it is a lie: the loop
 * simply runs out of items. Callers that mean "everything available" should
 * pass `SUBSTACK_FEED_MAX` and check whether the result came back full.
 */
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
