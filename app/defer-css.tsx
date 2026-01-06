"use client";

import { useEffect } from "react";

/**
 * Component to defer non-critical CSS loading
 * Loads CSS after initial page render to improve LCP/FCP
 */
export function DeferCSS() {
  useEffect(() => {
    // Defer CSS loading using requestIdleCallback or RAF
    const deferCSS = () => {
      const links = document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]');
      
      links.forEach((link) => {
        // Skip already loaded stylesheets
        if (link.hasAttribute('data-deferred')) return;
        
        // Mark as deferred
        link.setAttribute('data-deferred', 'true');
        
        // Change media to load async
        const media = link.media || 'all';
        link.media = 'print';
        
        // Switch back after load
        link.onload = () => {
          link.media = media;
          link.onload = null;
        };
      });
    };

    // Use requestIdleCallback if available, otherwise RAF
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(deferCSS, { timeout: 2000 });
    } else {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(deferCSS);
      });
    }
  }, []);

  return null;
}
