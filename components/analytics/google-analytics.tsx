"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, useCallback } from "react";

/**
 * Google Analytics 4 (GA4) Component
 * 
 * Integrates Google Analytics 4 for comprehensive web analytics.
 * 
 * @see https://analytics.google.com/
 * @see https://developers.google.com/analytics/devguides/collection/ga4
 * 
 * Environment Variables:
 * - NEXT_PUBLIC_GA_MEASUREMENT_ID: Your GA4 Measurement ID (e.g., "G-XXXXXXXXXX")
 * 
 * Features:
 * - Page view tracking
 * - Event tracking
 * - User engagement metrics
 * - E-commerce tracking
 * - GDPR compliant (respects user consent)
 * 
 * Usage:
 * ```tsx
 * import { GoogleAnalytics } from "@/components/analytics/google-analytics";
 * 
 * <GoogleAnalytics />
 * ```
 * 
 * Custom Event Tracking:
 * ```tsx
 * window.gtag('event', 'button_click', {
 *   event_category: 'engagement',
 *   event_label: 'Contact Button',
 *   value: 1
 * });
 * ```
 */

function GoogleAnalyticsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasConsent, setHasConsent] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Function to dynamically load Google Analytics
  const loadGoogleAnalytics = useCallback(() => {
    if (!gaId || typeof window === "undefined") return;

    // Load gtag.js script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag as typeof window.gtag;
    window.gtag("js", new Date());
    window.gtag("config", gaId, {
      page_path: window.location.pathname,
      send_page_view: true,
    });
  }, [gaId]);

  // Check for user consent and load scripts dynamically
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookieConsent");
      if (consent) {
        try {
          const parsed = JSON.parse(consent);
          if (parsed.analytics === true) {
            setHasConsent(true);
            // Load scripts immediately when consent is given
            if (!scriptsLoaded) {
              loadGoogleAnalytics();
              setScriptsLoaded(true);
            }
          }
        } catch {
          setHasConsent(false);
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
  }, [scriptsLoaded, loadGoogleAnalytics]);

  // Track page views on route change
  useEffect(() => {
    if (!gaId || !hasConsent || !scriptsLoaded) return;

    const url = pathname + searchParams.toString();
    
    // Send pageview with custom parameters
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", gaId, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, gaId, hasConsent, scriptsLoaded]);

  // Scripts are loaded dynamically, no need to render anything
  return null;
}

/**
 * Google Analytics wrapper with Suspense boundary
 * Required for Next.js pre-rendering compatibility
 */
export function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsContent />
    </Suspense>
  );
}

/**
 * Type declaration for gtag global function
 */
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
