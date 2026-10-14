import { NextResponse } from "next/server"
import { getSubstackPosts } from "@/lib/substack-service"

export const revalidate = 1800 // 30 min

/**
 * The four most recent Substack posts, for the home page aside.
 *
 * This used to answer `{ posts: [] }` with a `200` whenever the feed fetch
 * threw. That is the failure mode AGENTS.md rule 15 exists to prevent, pointed
 * the other way: a status code that claims success for a request that did not
 * succeed. The symptom is a home page that quietly shows no writing at all —
 * no error in the UI, nothing in the logs of whoever is watching status codes,
 * and no way for the client to tell "there are no posts" apart from "the feed
 * is down". It happens: Substack sits behind Cloudflare and the fetch times
 * out often enough to matter.
 *
 * Now an upstream failure answers `503` with a `Retry-After`. `useLatestPosts`
 * already normalises a missing array to `[]`, so the page still degrades to an
 * empty aside — but the response says which of the two situations it is, and
 * React Query retries a 5xx instead of caching an empty list as the truth.
 */
export async function GET() {
  try {
    const posts = await getSubstackPosts(4)
    return NextResponse.json({ posts })
  } catch (error) {
    console.error("[latest-posts] Substack feed unreachable:", error)
    return NextResponse.json(
      { posts: [], error: "Upstream feed unavailable." },
      { status: 503, headers: { "Retry-After": "300" } },
    )
  }
}
