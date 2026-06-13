import type { ReactNode } from "react"
import Image from "next/image"

import { SurfaceCard } from "@/components/ui/surface-card"
import { cn } from "@/lib/utils"

interface MediaCardProps {
  image: string
  /** Descriptive alt text for the image. */
  alt: string
  title: string
  /** Body copy (description). */
  children: ReactNode
  /** next/image `sizes` hint. */
  sizes?: string
  className?: string
}

/**
 * Image-led card: full-bleed photo with a hover zoom + bottom gradient and the
 * title overlaid on the image, then body copy below. Same premium treatment as
 * the home project cards, so editorial/gallery cards (e.g. /sobre-mi hobbies)
 * stop looking flat. Reusable wherever an image + title + text card is needed.
 */
export function MediaCard({ image, alt, title, children, sizes, className }: MediaCardProps) {
  return (
    <SurfaceCard
      as="article"
      className={cn(
        "group h-full overflow-hidden flex flex-col transition-transform duration-300 ease-out hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />
        {/* Cinematic bottom gradient — guarantees the title reads on any photo. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent"
          aria-hidden="true"
        />
        {/* Emerald wash that blooms in on hover for a touch of life. */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        {/* Accent-barred title overlaid on the image. */}
        <div className="absolute inset-x-5 bottom-4 flex items-center gap-3">
          <span
            className="h-7 w-1 shrink-0 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500 transition-all duration-300 group-hover:h-9"
            aria-hidden="true"
          />
          <h3 className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight drop-shadow-md">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-6 flex-1">
        <p className="text-zinc-300 leading-relaxed">{children}</p>
      </div>
    </SurfaceCard>
  )
}
