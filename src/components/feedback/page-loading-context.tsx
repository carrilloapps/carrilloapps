"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

interface PageLoadingContextType {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

const PageLoadingContext = createContext<PageLoadingContextType | undefined>(undefined)

/**
 * Holds the state of a deliberate, app-driven loading overlay.
 *
 * It used to drive one itself, and that was the single worst thing about moving
 * around this site: a `useEffect` on `pathname` forced `isLoading` true on every
 * route change and cleared it on a hard-coded 2000ms `setTimeout`, with another
 * 100ms fade after it. Navigation cost 2.1 seconds of full-screen overlay
 * whether the route was ready in 50ms or not — invented latency, on top of a
 * first load that sat behind the same overlay for another second.
 *
 * Route-level waiting is the framework's job and it was already doing it: seven
 * `loading.tsx` files cover the routes through Suspense, and they show only when
 * a route genuinely suspends. So this provider no longer invents anything. It is
 * a plain state container for the cases where the app itself wants to block the
 * screen, and `isLoading` stays false until something calls `setLoading(true)`.
 */
export function PageLoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  // Memoised so consumers do not re-render on every parent render — the root
  // layout wraps the whole tree in this.
  const value = useMemo(() => ({ isLoading, setLoading }), [isLoading, setLoading])

  return <PageLoadingContext.Provider value={value}>{children}</PageLoadingContext.Provider>
}

export function usePageLoading() {
  const context = useContext(PageLoadingContext)
  if (context === undefined) {
    throw new Error("usePageLoading must be used within a PageLoadingProvider")
  }
  return context
}
