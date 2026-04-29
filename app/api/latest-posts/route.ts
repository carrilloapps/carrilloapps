import { NextResponse } from "next/server"
import { getCachedBlogPosts } from "@/lib/wordpress-service"

export const revalidate = 1800 // 30 min

export async function GET() {
  try {
    const all = await getCachedBlogPosts()
    const posts = all.slice(0, 4).map((p) => ({
      title: p.title,
      slug: p.slug,
      pubDate: p.pubDate,
      readingTime: p.readingTime,
      thumbnail: p.thumbnail,
      thumbnailAlt: p.thumbnailAlt ?? p.title,
    }))
    return NextResponse.json({ posts })
  } catch {
    return NextResponse.json({ posts: [] })
  }
}
