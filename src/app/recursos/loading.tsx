import { PageLoading } from "@/components/unified-loading"

/**
 * Suspense fallback for this route.
 *
 * Replaces a hand-built skeleton from the previous design — `bg-slate-950`,
 * gradient placeholder bars, cards — none of which the site uses anymore.
 * `PageLoading` is already a whole page shell in the current world, header and
 * footer included, so there is nothing to wrap it in.
 */
export default function Loading() {
  return <PageLoading title="Cargando recursos" />
}
