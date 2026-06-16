"use client"

import { motion, AnimatePresence } from "@/lib/motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

interface UnifiedLoadingProps {
  variant:
    | "page" // Full page loading with header/footer
    | "overlay" // Full screen overlay
    | "spinner" // Simple spinner
    | "card" // Single card skeleton
    | "grid" // Grid of cards
    | "repositories" // Repository cards
    | "form" // Form skeleton
    | "hero" // Hero section skeleton

  count?: number // For grid variants
  showPagination?: boolean // For repository grids
  title?: string // Custom loading title
  description?: string // Custom loading description
  className?: string // Additional CSS classes
  isVisible?: boolean // Control visibility for overlay
}

// Tech-inspired loading animation with rocket and aurora effect - MOVED OUTSIDE COMPONENT
const TechSpinner = () => {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
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
        className="relative z-10 flex h-8 w-8 items-center justify-center"
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
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
          className="absolute h-1 w-1 rounded-full bg-primary/60"
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
          className="absolute h-2 w-2 rounded-full bg-primary/40"
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
  )
}

// Card skeleton component - MOVED OUTSIDE COMPONENT
const CardSkeleton = ({ type = "default" }: { type?: "default" | "repository" }) => {
  if (type === "repository") {
    return (
      <Card className="surface-card">
        <CardHeader>
          <div className="space-y-2">
            <Skeleton className="h-6 w-2/3 border border-white/[0.04] bg-white/[0.04]" />
            <Skeleton className="h-4 w-full border border-white/[0.04] bg-white/[0.04]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 border border-white/[0.04] bg-white/[0.04]" />
            <Skeleton className="h-4 w-full border border-white/[0.04] bg-white/[0.04]" />
            <Skeleton className="h-4 w-full border border-white/[0.04] bg-white/[0.04]" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-16 border border-white/[0.04] bg-white/[0.04]" />
            <Skeleton className="h-4 w-16 border border-white/[0.04] bg-white/[0.04]" />
          </div>
          <Skeleton className="h-9 w-28 border border-white/[0.04] bg-white/[0.04]" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="surface-card">
      <CardContent className="space-y-4 p-6">
        <Skeleton className="h-6 w-3/4 border border-white/[0.04] bg-white/[0.04]" />
        <Skeleton className="h-4 w-full border border-white/[0.04] bg-white/[0.04]" />
        <Skeleton className="h-4 w-2/3 border border-white/[0.04] bg-white/[0.04]" />
      </CardContent>
    </Card>
  )
}

// Grid component - MOVED OUTSIDE COMPONENT
const GridSkeleton = ({
  type,
  itemCount,
}: {
  type: "repository" | "default"
  itemCount: number
}) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array(itemCount)
      .fill(0)
      .map((_, i) => (
        <CardSkeleton key={i} type={type} />
      ))}
  </div>
)

// Hero section skeleton - MOVED OUTSIDE COMPONENT
const HeroSkeleton = () => (
  <section className="space-y-8 py-12 md:py-24">
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 bg-gradient-to-r from-blue-800/50 to-purple-800/50" />
          <Skeleton className="h-12 w-full bg-gradient-to-r from-zinc-800 to-zinc-700" />
          <Skeleton className="h-8 w-3/4 bg-gradient-to-r from-zinc-800 to-zinc-700" />
        </div>
        <Skeleton className="h-24 w-full bg-gradient-to-r from-zinc-800 to-zinc-700" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-40 bg-gradient-to-r from-blue-800/50 to-purple-800/50" />
          <Skeleton className="border-white/[0.04]/50 h-10 w-40 border border-zinc-700 bg-white/[0.04]" />
        </div>
      </div>
      <div className="relative aspect-square animate-pulse rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-blue-800/20 to-purple-800/20"></div>
    </div>
  </section>
)

// Form skeleton - MOVED OUTSIDE COMPONENT
const FormSkeleton = () => (
  <Card className="surface-card">
    <CardHeader>
      <Skeleton className="h-6 w-48 border border-white/[0.04] bg-white/[0.04]" />
      <Skeleton className="h-4 w-full border border-white/[0.04] bg-white/[0.04]" />
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 border border-white/[0.04] bg-white/[0.04]" />
            <Skeleton className="h-10 w-full border border-white/[0.04] bg-white/[0.04]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 border border-white/[0.04] bg-white/[0.04]" />
            <Skeleton className="h-10 w-full border border-white/[0.04] bg-white/[0.04]" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 border border-white/[0.04] bg-white/[0.04]" />
          <Skeleton className="h-10 w-full border border-white/[0.04] bg-white/[0.04]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 border border-white/[0.04] bg-white/[0.04]" />
          <Skeleton className="h-32 w-full border border-white/[0.04] bg-white/[0.04]" />
        </div>
        <Skeleton className="h-10 w-full border border-white/[0.04] bg-white/[0.04]" />
      </div>
    </CardContent>
  </Card>
)

export function UnifiedLoading({
  variant,
  count = 6,
  showPagination = false,
  title = "Cargando...",
  description = "Por favor, espere mientras cargamos el contenido.",
  className = "",
  isVisible = true,
}: UnifiedLoadingProps) {
  // Render based on variant
  switch (variant) {
    case "page":
      return (
        <div className={`min-h-screen bg-black text-white ${className}`}>
          <SiteHeader />
          <main
            className="container flex min-h-[70vh] items-center justify-center py-12"
            id="main-content"
          >
            <div className="space-y-4 text-center">
              <TechSpinner />
              {title && title !== "Cargando..." && <h1 className="text-2xl font-bold">{title}</h1>}
              {description &&
                description !== "Por favor, espere mientras cargamos el contenido." && (
                  <p className="text-zinc-300">{description}</p>
                )}
            </div>
          </main>
          <SiteFooter />
        </div>
      )

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
                ease: [0.4, 0.0, 0.2, 1], // Custom cubic-bezier for smooth easing
              }}
              className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md ${className}`}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -20 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
                className="flex flex-col items-center justify-center"
              >
                <TechSpinner />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )

    case "spinner":
      return (
        <div className={`flex items-center justify-center p-4 ${className}`}>
          <TechSpinner />
        </div>
      )

    case "card":
      return <CardSkeleton />

    case "grid":
      return <GridSkeleton type="default" itemCount={count} />

    case "repositories":
      return (
        <div className={`space-y-6 ${className}`}>
          <GridSkeleton type="repository" itemCount={count} />
          {showPagination && (
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-9 w-9 rounded-md border border-white/[0.04] bg-white/[0.04]"
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      )

    case "form":
      return <FormSkeleton />

    case "hero":
      return <HeroSkeleton />

    default:
      return (
        <div className={`flex items-center justify-center p-4 ${className}`}>
          <TechSpinner />
        </div>
      )
  }
}

// Export individual components for backward compatibility
export const PageLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading {...props} variant="page" />
)

export const OverlayLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading {...props} variant="overlay" />
)

export const SpinnerLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading {...props} variant="spinner" />
)

export const CardLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading {...props} variant="card" />
)

export const GridLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading {...props} variant="grid" />
)

export const RepositoriesLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading {...props} variant="repositories" />
)

export const FormLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading {...props} variant="form" />
)

export const HeroLoading = (props: Omit<UnifiedLoadingProps, "variant">) => (
  <UnifiedLoading {...props} variant="hero" />
)
