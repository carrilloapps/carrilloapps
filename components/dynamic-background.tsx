"use client";

import { useState, useEffect } from "react";

/**
 * Background atmosphere — restrained palette aligned with the brand:
 *  - Two pulsing orbs (blue / purple) that match the CTA gradient.
 *  - A radial vignette that anchors the eye to the page centre.
 *  - A faint blue grid for technical character.
 *
 * Cyan / pink orbs were removed in the design refresh (orphan colours not
 * present anywhere else in the UI).
 */
export function DynamicBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = window.requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <>
      {/* Base black background — always visible (LCP-safe) */}
      <div className="fixed inset-0 -z-50 bg-black" />

      {isLoaded && (
        <>
          {/* Brand-aligned orbs only — blue + purple, anchored to opposite corners */}
          <div
            className="fixed inset-0 -z-50 animate-in fade-in duration-500"
            style={{ contain: "layout style paint" }}
          >
            <div
              className="absolute top-[-12%] left-[-8%] w-[600px] h-[600px] bg-blue-600/12 rounded-full blur-3xl will-change-opacity"
              style={{ animation: "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
            />
            <div
              className="absolute bottom-[-12%] right-[-8%] w-[700px] h-[700px] bg-purple-600/12 rounded-full blur-3xl will-change-opacity"
              style={{
                animation: "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                animationDelay: "2.5s",
              }}
            />
          </div>

          {/* Radial vignette — pulls focus toward the centre */}
          <div
            className="fixed inset-0 -z-40 animate-in fade-in duration-500"
            style={{ contain: "layout style paint" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-zinc-950/60 to-black" />
          </div>

          {/* Subtle technical grid — finer (40px), softer (8% opacity) than the previous */}
          <div
            className="fixed inset-0 -z-30 opacity-[0.08] animate-in fade-in duration-700"
            style={{ contain: "layout style paint" }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.5) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(148, 163, 184, 0.5) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
                animation: "gridMove 30s linear infinite",
                willChange: "transform",
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
