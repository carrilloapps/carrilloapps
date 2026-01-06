"use client";

import { useState, useEffect } from "react";
import { usePageLoading } from "@/components/page-loading-context";
import { OverlayLoading } from "@/components/unified-loading";

export function GlobalPageLoader() {
  const { isLoading } = usePageLoading();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // Show immediately when loading starts (intentional synchronous setState)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    } else {
      // Add a small delay before hiding to ensure smooth fade-out
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 100); // Small delay to ensure smooth transition

      return () => clearTimeout(hideTimer);
    }
  }, [isLoading]);

  return (
    <OverlayLoading 
      isVisible={isVisible}
    />
  );
}