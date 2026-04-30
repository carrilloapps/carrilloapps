import { cn } from "@/lib/utils"

/**
 * Skeleton placeholder — usar mientras se carga contenido real.
 *
 * Color base: `bg-white/[0.04]` — superficie glass discreta que matchea
 * el fondo del surface-card. Animación: pulso suave (animate-pulse) +
 * gradient shimmer para que se sienta vivo, no estático.
 *
 * Tamaños/forma: heredados de la shape del contenido real (alto, ancho,
 * rounded). Pasar como className: `<Skeleton className="h-4 w-32" />`.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-white/[0.04] border border-white/[0.04]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
