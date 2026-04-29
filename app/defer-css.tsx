"use client";

import { useEffect } from "react";

/**
 * Component to defer non-critical CSS loading
 * Loads CSS after initial page render to improve LCP/FCP
 * Optimized for Next.js 16 CSS chunks
 */
export function DeferCSS() {
  useEffect(() => {
    // Defer non-critical CSS loading
    const deferCSS = () => {
      const links = document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]');
      
      links.forEach((link) => {
        // Skip already processed or critical stylesheets
        if (link.hasAttribute('data-deferred')) return;
        
        // Skip critical layout CSS (keep it blocking for initial render)
        const href = link.href;
        if (href.includes('app/layout.css') || href.includes('globals.css')) {
          return;
        }
        
        // Mark as deferred to avoid reprocessing
        link.setAttribute('data-deferred', 'true');
        
        // Defer loading using media attribute trick
        const originalMedia = link.media || 'all';
        
        // Temporarily set media to 'print' (doesn't block render)
        link.media = 'print';
        
        // Restore original media after load
        const onLoad = () => {
          link.media = originalMedia;
          link.onload = null;
        };
        
        // Handle both load and error events
        link.addEventListener('load', onLoad, { once: true });
        link.addEventListener('error', onLoad, { once: true });
        
        // Force load if already cached
        if (link.sheet) {
          onLoad();
        }
      });
    };

    // Use requestIdleCallback for optimal timing
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(deferCSS, { timeout: 1000 });
    } else {
      // Fallback to requestAnimationFrame
      requestAnimationFrame(() => {
        setTimeout(deferCSS, 1);
      });
    }
  }, []);

  return null;
}
