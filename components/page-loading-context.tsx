"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PageLoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const PageLoadingContext = createContext<PageLoadingContextType | undefined>(undefined);

export function PageLoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <PageLoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </PageLoadingContext.Provider>
  );
}

export function usePageLoading() {
  const context = useContext(PageLoadingContext);
  if (context === undefined) {
    throw new Error("usePageLoading must be used within a PageLoadingProvider");
  }
  return context;
}