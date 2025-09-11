"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

interface UnifiedLoadingProps {
  variant: 
    | "page" // Full page loading with header/footer
    | "overlay" // Full screen overlay
    | "spinner" // Simple spinner
    | "card" // Single card skeleton
    | "grid" // Grid of cards
    | "blog-featured" // Blog featured article
    | "blog-grid" // Blog posts grid
    | "blog-article" // Single blog article
    | "blog-related" // Related articles
    | "repositories" // Repository cards
    | "form" // Form skeleton
    | "hero"; // Hero section skeleton
  
  count?: number; // For grid variants
  showPagination?: boolean; // For repository/blog grids
  title?: string; // Custom loading title
  description?: string; // Custom loading description
  className?: string; // Additional CSS classes
  isVisible?: boolean; // Control visibility for overlay
}

export function UnifiedLoading({
  variant,
  count = 6,
  showPagination = false,
  title = "Cargando...",
  description = "Por favor, espere mientras cargamos el contenido.",
  className = "",
  isVisible = true
}: UnifiedLoadingProps) {
  
  // Tech-inspired loading animation with rocket and aurora effect
  const TechSpinner = () => {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Aurora background effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20 blur-md"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary aurora layer */}
      <motion.div
        className="absolute inset-1 rounded-full bg-gradient-to-l from-primary/15 via-transparent to-primary/15 blur-sm"
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.4, 0.7, 0.4],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Outer orbital ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-primary/40"
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Rocket icon */}
      <motion.div
        className="relative z-10 w-8 h-8 flex items-center justify-center"
        animate={{
          y: [-2, 2, -2],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-primary"
        >
          <path
            d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
            fill="currentColor"
            className="opacity-90"
          />
          <motion.path
            d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="opacity-60"
            animate={{
              pathLength: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>
      
      {/* Particle trail effect */}
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-primary/60 rounded-full"
          style={{
            bottom: "20%",
            left: "50%",
            marginLeft: "-2px",
          }}
          animate={{
            y: [0, -20, -40],
            opacity: [0.8, 0.4, 0],
            scale: [1, 0.5, 0.2],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Energy pulses */}
      {[0, 120, 240].map((rotation, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-primary/40 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "0 0",
          }}
          animate={{
            rotate: [rotation, rotation + 360],
            x: [0, 35, 0],
            y: [0, 0, 0],
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.25,
          }}
        />
      ))}
    </div>
  );
};

  // Card skeleton component
  const CardSkeleton = ({ type = "default" }: { type?: "default" | "blog" | "repository" }) => {
    if (type === "blog") {
      return (
        <Card className="bg-zinc-900 border-zinc-800">
          <div className="aspect-video bg-zinc-800 animate-pulse"></div>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-6 w-3/4 bg-zinc-800" />
            <Skeleton className="h-4 w-full bg-zinc-800" />
            <Skeleton className="h-4 w-full bg-zinc-800" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-6 w-20 bg-zinc-800" />
              <Skeleton className="h-6 w-20 bg-zinc-800" />
            </div>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
            <Skeleton className="h-4 w-24 bg-zinc-800" />
            <Skeleton className="h-4 w-24 bg-zinc-800" />
          </CardFooter>
        </Card>
      );
    }
    
    if (type === "repository") {
      return (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <div className="space-y-2">
              <Skeleton className="h-6 w-2/3 bg-zinc-800" />
              <Skeleton className="h-4 w-full bg-zinc-800" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4 bg-zinc-800" />
              <Skeleton className="h-4 w-full bg-zinc-800" />
              <Skeleton className="h-4 w-full bg-zinc-800" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-16 bg-zinc-800" />
              <Skeleton className="h-4 w-16 bg-zinc-800" />
            </div>
            <Skeleton className="h-9 w-28 bg-zinc-800" />
          </CardFooter>
        </Card>
      );
    }
    
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-6 w-3/4 bg-zinc-800" />
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-2/3 bg-zinc-800" />
        </CardContent>
      </Card>
    );
  };

  // Grid component
  const GridSkeleton = ({ type, itemCount }: { type: "blog" | "repository" | "default", itemCount: number }) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array(itemCount).fill(0).map((_, i) => (
        <CardSkeleton key={i} type={type} />
      ))}
    </div>
  );

  // Hero section skeleton
  const HeroSkeleton = () => (
    <section className="py-12 md:py-24 space-y-8">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="w-32 h-6 bg-gradient-to-r from-blue-800/50 to-purple-800/50" />
            <Skeleton className="w-full h-12 bg-gradient-to-r from-zinc-800 to-zinc-700" />
            <Skeleton className="w-3/4 h-8 bg-gradient-to-r from-zinc-800 to-zinc-700" />
          </div>
          <Skeleton className="w-full h-24 bg-gradient-to-r from-zinc-800 to-zinc-700" />
          <div className="flex gap-4">
            <Skeleton className="w-40 h-10 bg-gradient-to-r from-blue-800/50 to-purple-800/50" />
            <Skeleton className="w-40 h-10 bg-zinc-800/50 border border-zinc-700" />
          </div>
        </div>
        <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-blue-800/20 to-purple-800/20 border border-zinc-800/50 animate-pulse"></div>
      </div>
    </section>
  );

  // Form skeleton
  const FormSkeleton = () => (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <Skeleton className="h-6 w-48 bg-zinc-800" />
        <Skeleton className="h-4 w-full bg-zinc-800" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-zinc-800" />
              <Skeleton className="h-10 w-full bg-zinc-800" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-zinc-800" />
              <Skeleton className="h-10 w-full bg-zinc-800" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-zinc-800" />
            <Skeleton className="h-10 w-full bg-zinc-800" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-zinc-800" />
            <Skeleton className="h-32 w-full bg-zinc-800" />
          </div>
          <Skeleton className="h-10 w-full bg-zinc-800" />
        </div>
      </CardContent>
    </Card>
  );

  // Blog featured skeleton
  const BlogFeaturedSkeleton = () => (
    <Card className="bg-zinc-900 border-zinc-800">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="aspect-video bg-zinc-800 animate-pulse"></div>
        <div className="p-6 space-y-4">
          <Skeleton className="h-6 w-3/4 bg-zinc-800" />
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-3/4 bg-zinc-800" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-6 w-20 bg-zinc-800" />
            <Skeleton className="h-6 w-20 bg-zinc-800" />
          </div>
          <Skeleton className="h-10 w-40 bg-zinc-800 mt-4" />
        </div>
      </div>
    </Card>
  );

  // Render based on variant
  switch (variant) {
    case "page":
      return (
        <div className={`min-h-screen bg-black text-white ${className}`}>
          <SiteHeader />
          <main className="container py-12 min-h-[70vh] flex items-center justify-center" id="main-content">
            <div className="text-center space-y-4">
              <TechSpinner />
              {title && title !== "Cargando..." && <h1 className="text-2xl font-bold">{title}</h1>}
              {description && description !== "Por favor, espere mientras cargamos el contenido." && <p className="text-zinc-400">{description}</p>}
            </div>
          </main>
          <SiteFooter />
        </div>
      );

    case "overlay":
      return (
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.4, 0.0, 0.2, 1] // Custom cubic-bezier for smooth easing
              }}
              className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center ${className}`}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                className="flex flex-col items-center justify-center"
              >
                <TechSpinner />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      );

    case "spinner":
      return (
        <div className={`flex items-center justify-center p-4 ${className}`}>
          <TechSpinner />
        </div>
      );

    case "card":
      return <CardSkeleton />;

    case "grid":
      return <GridSkeleton type="default" itemCount={count} />;

    case "blog-featured":
      return <BlogFeaturedSkeleton />;

    case "blog-grid":
      return <GridSkeleton type="blog" itemCount={count} />;

    case "blog-article":
      return (
        <div className={`space-y-8 ${className}`}>
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4 bg-zinc-800" />
            <Skeleton className="h-6 w-1/2 bg-zinc-800" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 bg-zinc-800" />
              <Skeleton className="h-6 w-20 bg-zinc-800" />
            </div>
          </div>
          <div className="aspect-video bg-zinc-800 animate-pulse rounded-lg"></div>
          <div className="space-y-4">
            {Array(8).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full bg-zinc-800" />
            ))}
          </div>
        </div>
      );

    case "blog-related":
      return (
        <div className={`space-y-4 ${className}`}>
          <Skeleton className="h-8 w-48 bg-zinc-800" />
          <GridSkeleton type="blog" itemCount={3} />
        </div>
      );

    case "repositories":
      return (
        <div className={`space-y-6 ${className}`}>
          <GridSkeleton type="repository" itemCount={count} />
          {showPagination && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                {Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-9 w-9 bg-zinc-800 rounded-md" />
                ))}
              </div>
            </div>
          )}
        </div>
      );

    case "form":
      return <FormSkeleton />;

    case "hero":
      return <HeroSkeleton />;

    default:
      return (
        <div className={`flex items-center justify-center p-4 ${className}`}>
          <TechSpinner />
        </div>
      );
  }
}

// Export individual components for backward compatibility
export const PageLoading = (props: Omit<UnifiedLoadingProps, 'variant'>) => 
  <UnifiedLoading {...props} variant="page" />;

export const OverlayLoading = (props: Omit<UnifiedLoadingProps, 'variant'>) => 
  <UnifiedLoading {...props} variant="overlay" />;

export const SpinnerLoading = (props: Omit<UnifiedLoadingProps, 'variant'>) => 
  <UnifiedLoading {...props} variant="spinner" />;

export const CardLoading = (props: Omit<UnifiedLoadingProps, 'variant'>) => 
  <UnifiedLoading {...props} variant="card" />;

export const GridLoading = (props: Omit<UnifiedLoadingProps, 'variant'>) => 
  <UnifiedLoading {...props} variant="grid" />;

export const BlogFeaturedLoading = (props: Omit<UnifiedLoadingProps, 'variant'>) => 
  <UnifiedLoading {...props} variant="blog-featured" />;

export const BlogGridLoading = (props: Omit<UnifiedLoadingProps, 'variant'>) => 
  <UnifiedLoading {...props} variant="blog-grid" />;

export const BlogArticleLoading = (props: Omit<UnifiedLoadingProps, 'variant'>) => 
  <UnifiedLoading {...props} variant="blog-article" />;

export const BlogRelatedLoading = (props: Omit<UnifiedLoadingProps, 'variant'>) => 
  <UnifiedLoading {...props} variant="blog-related" />;

export const RepositoriesLoading = (props: Omit<UnifiedLoadingProps, 'variant'>) => 
  <UnifiedLoading {...props} variant="repositories" />;

export const FormLoading = (props: Omit<UnifiedLoadingProps, 'variant'>) => 
  <UnifiedLoading {...props} variant="form" />;

export const HeroLoading = (props: Omit<UnifiedLoadingProps, 'variant'>) => 
  <UnifiedLoading {...props} variant="hero" />;