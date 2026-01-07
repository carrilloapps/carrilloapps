"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Check for user consent (cookie consent banner)
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookieConsent");
      if (consent) {
        try {
          const parsed = JSON.parse(consent);
          setHasConsent(parsed.analytics === true);
        } catch {
          setHasConsent(false);
        }
      }
    };

    checkConsent();

    // Listen for consent changes
    const handleConsentChange = () => checkConsent();
    window.addEventListener("cookieConsentChange", handleConsentChange);

    return () => {
      window.removeEventListener("cookieConsentChange", handleConsentChange);
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!gaId || !hasConsent) return;

    const url = pathname + searchParams.toString();
    
    // Send pageview with custom parameters
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", gaId, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, gaId, hasConsent]);

  // Don't load if no measurement ID or no consent
  if (!gaId || !hasConsent) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 - gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
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
