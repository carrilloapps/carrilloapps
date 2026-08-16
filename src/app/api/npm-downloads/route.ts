import { NextResponse } from "next/server"
import { unstable_cache } from "next/cache"

/**
 * Monthly download counts for the packages surfaced on the home ledger.
 *
 * The registry's downloads endpoint is public and unauthenticated, but it is a
 * third party: the home page must never call it from the client. Numbers are
 * cached for an hour — download counts move slowly and the ledger reads better
 * when the figure is stable across a session.
 */

const ALLOWED = new Set(["zefer-cli", "bcv-exchange-rate", "skill-rules", "hfo-cli"])

interface PackageDownloads {
  /** Last 30 days. */
  month: number | null
  /** Everything the registry has recorded since the package was published. */
  total: number | null
}

/**
 * A monthly rate read cold understates a small library's reach, so the ledger
 * shows the running total beside it — the same pair a statement prints: the
 * period's movement and the accumulated balance. Both come from the registry;
 * neither is estimated.
 */
const getCachedDownloads = unstable_cache(
  async (pkg: string): Promise<PackageDownloads> => {
    const read = async (range: string): Promise<number | null> => {
      const res = await fetch(`https://api.npmjs.org/downloads/point/${range}/${pkg}`, {
        headers: { Accept: "application/json" },
      })
      if (!res.ok) return null
      const data = (await res.json()) as { downloads?: number }
      return typeof data.downloads === "number" ? data.downloads : null
    }

    // npm's range endpoint accepts an explicit start date; 2015 predates every
    // package here, so this is "all time" without hardcoding a per-package date.
    const today = new Date().toISOString().slice(0, 10)
    const [month, total] = await Promise.all([read("last-month"), read(`2015-01-01:${today}`)])

    return { month, total }
  },
  ["npm-downloads"],
  { revalidate: 3600, tags: ["npm-downloads"] },
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const requested = (searchParams.get("packages") ?? "")
    .split(",")
    .map((p) => p.trim())
    .filter((p) => ALLOWED.has(p))

  if (requested.length === 0) {
    return NextResponse.json({ error: "No known packages requested." }, { status: 422 })
  }

  const entries = await Promise.all(
    requested.map(async (pkg) => [pkg, await getCachedDownloads(pkg)] as const),
  )

  // A package whose count could not be read returns null, never zero: an
  // unlit cell and a cell reading zero mean different things in this ledger.
  return NextResponse.json({ downloads: Object.fromEntries(entries) })
}
