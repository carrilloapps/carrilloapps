"use client";

import { useEffect, useState, useCallback } from "react";

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
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  // Function to dynamically load Microsoft Clarity
  const loadMicrosoftClarity = useCallback(() => {
    if (!clarityId || typeof window === "undefined") return;

    // Initialize Clarity
    (function(c: Window, l: Document, a: string, r: string, i: string, t: HTMLScriptElement, y: HTMLScriptElement) {
      c[a] = c[a] || function(...args: unknown[]) { (c[a].q = c[a].q || []).push(args); };
      t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0] as HTMLScriptElement;
      y.parentNode?.insertBefore(t, y);
    })(window as Window & { clarity?: { q?: unknown[] } }, document, "clarity", "script", clarityId, {} as HTMLScriptElement, {} as HTMLScriptElement);
  }, [clarityId]);

  // Check for user consent and load scripts dynamically
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookieConsent");
      if (consent) {
        try {
          const parsed = JSON.parse(consent);
          if (parsed.analytics === true) {
            // Load scripts immediately when consent is given
            if (!scriptsLoaded && clarityId) {
              loadMicrosoftClarity();
              setScriptsLoaded(true);
            }
          }
        } catch {
          // Invalid consent format
        }
      }
    };

    checkConsent();

    // Listen for consent changes (when user accepts cookies)
    const handleConsentChange = () => checkConsent();
    window.addEventListener("cookieConsentChange", handleConsentChange);

    return () => {
      window.removeEventListener("cookieConsentChange", handleConsentChange);
    };
  }, [scriptsLoaded, clarityId, loadMicrosoftClarity]);

  return null;
}
