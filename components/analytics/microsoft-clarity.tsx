"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

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
  const [hasConsent, setHasConsent] = useState(false);
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  // Check for user consent (cookie consent banner)
  useEffect(() => {
    // Check if user has accepted analytics cookies
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

  // Don't load if no project ID or no consent
  if (!clarityId || !hasConsent) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
}
