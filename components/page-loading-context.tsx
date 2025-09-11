"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface PageLoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const PageLoadingContext = createContext<PageLoadingContextType | undefined>(undefined);

export function PageLoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  // Reset loading state on route change
  useEffect(() => {
    setIsLoading(true);
    
    // Auto-hide after exactly 2 second as requested
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Exactly 2 second as requested by user

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]); // Trigger on pathname change

  // Also handle initial page load
  useEffect(() => {
    const handleLoad = () => {
      // Still respect the 1 second minimum, but hide if page loads after 1 second
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100); // Small delay to ensure smooth transition
      
      return () => clearTimeout(timer);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      // If already loaded, still show for 1 second
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  return (
    <PageLoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </PageLoadingContext.Provider>
  );
}

export function usePageLoading() {
  const context = useContext(PageLoadingContext);
  if (context === undefined) {
    throw new Error('usePageLoading must be used within a PageLoadingProvider');
  }
  return context;
}