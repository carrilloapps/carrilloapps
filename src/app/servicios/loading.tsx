import { PageLoading } from "@/components/unified-loading"

/**
 * The Suspense fallback for /servicios and everything under it.
 *
 * The previous one was written in the old visual world — `bg-slate-950`,
 * gradient skeletons, cards, blue-to-purple washes — none of which exists on
 * this site anymore. `PageLoading` is already a whole page shell in the current
 * one, header and footer included, so there is nothing to wrap it in.
 */
export default function ServicesLoading() {
  return <PageLoading title="Cargando servicios" />
}
