"use client"

import { useEffect, useState, useCallback } from "react"

import { CONSENT_CHANGED_EVENT, hasAnalyticsConsent } from "@/lib/cookie-consent"

/**
 * Microsoft Clarity Analytics Component
 *
 * Integrates Microsoft Clarity for user behavior analytics, heatmaps, and session recordings.
 *
 * @see https://clarity.microsoft.com/
 *
 * Environment Variables:
 * - NEXT_PUBLIC_CLARITY_PROJECT_ID: Your Clarity project ID (e.g., "abc123def")
 *
 * Features:
 * - User session recordings
 * - Heatmaps and click tracking
 * - Scroll depth analytics
 * - GDPR compliant (respects user consent)
 *
 * Usage:
 * ```tsx
 * import { MicrosoftClarity } from "@/components/analytics/microsoft-clarity";
 *
 * <MicrosoftClarity />
 * ```
 */
export function MicrosoftClarity() {
  const [scriptsLoaded, setScriptsLoaded] = useState(false)
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

  // Function to dynamically load Microsoft Clarity
  const loadMicrosoftClarity = useCallback(() => {
    if (!clarityId || typeof window === "undefined") return

    // Initialize Clarity
    type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] }
    type ClarityWindow = Window & Record<string, ClarityFn>
    ;(function (c: ClarityWindow, l: Document, a: string, r: string, i: string) {
      c[a] =
        c[a] ||
        (Object.assign(
          function (...args: unknown[]) {
            ;(c[a].q = c[a].q || []).push(args)
          },
          { q: [] as unknown[] },
        ) as ClarityFn)
      const t = l.createElement(r) as HTMLScriptElement
      t.async = true
      t.src = "https://www.clarity.ms/tag/" + i
      const y = l.getElementsByTagName(r)[0]
      y?.parentNode?.insertBefore(t, y)
    })(window as unknown as ClarityWindow, document, "clarity", "script", clarityId)
  }, [clarityId])

  // Check for user consent and load scripts dynamically
  useEffect(() => {
    const checkConsent = () => {
      const granted = hasAnalyticsConsent()
      const clarity = (window as unknown as { clarity?: (...args: unknown[]) => void }).clarity

      if (granted) {
        if (!scriptsLoaded && clarityId) {
          loadMicrosoftClarity()
          setScriptsLoaded(true)
        }
        clarity?.("consent")
        return
      }

      /*
        Refused, or withdrawn from the footer. Clarity's own consent API is the
        only way to stop a tag that is already running: `clarity("consent",
        false)` halts collection for the session. When nothing was loaded there
        is no global to call and the optional chain simply does nothing.
      */
      clarity?.("consent", false)
    }

    checkConsent()

    // Re-run on every decision, in both directions.
    const handleConsentChange = () => checkConsent()
    window.addEventListener(CONSENT_CHANGED_EVENT, handleConsentChange)

    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, handleConsentChange)
    }
  }, [scriptsLoaded, clarityId, loadMicrosoftClarity])

  return null
}
