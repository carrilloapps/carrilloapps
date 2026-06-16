"use client"

import { useState, type ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NuqsAdapter } from "nuqs/adapters/next/app"

/**
 * Client-side providers shared across the whole app.
 *
 * - TanStack Query: caches + dedupes the client-side fetches against our
 *   `/api/*` route handlers (GitHub/GitLab repos, Substack posts, repository
 *   details, newsletter status). The QueryClient is created lazily in state so
 *   it is stable across re-renders but never shared between requests on the server.
 * - nuqs: type-safe URL search-param state (filters on /recursos, etc.).
 */
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Upstream data (repos, posts) changes slowly — keep it fresh for
            // 5 min and cached for 30 to avoid refetch storms on navigation.
            staleTime: 5 * 60 * 1000,
            gcTime: 30 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>{children}</NuqsAdapter>
    </QueryClientProvider>
  )
}
