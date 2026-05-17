import { NextResponse } from "next/server"
import { getSubstackPosts } from "@/lib/substack-service"

export const revalidate = 1800 // 30 min

export async function GET() {
  try {
    const posts = await getSubstackPosts(4)
    return NextResponse.json({ posts })
  } catch {
    return NextResponse.json({ posts: [] })
  }
}
