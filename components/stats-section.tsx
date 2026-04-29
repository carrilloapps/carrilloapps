interface Stat {
  value: string
  label: string
}

interface StatsSectionProps {
  stats: Stat[]
  /** ARIA label describing the stat group. */
  label?: string
  /** Optional Tailwind override for the outer section. */
  className?: string
}

/**
 * Numerical anchor row — large tabular numbers + small labels.
 * Lives between major sections to break the wall-of-cards rhythm.
 */
export function StatsSection({
  stats,
  label = "Métricas y trayectoria",
  className = "py-12 md:py-16 relative border-y border-zinc-800/50 bg-zinc-950/40 backdrop-blur-sm",
}: StatsSectionProps) {
  const cols = stats.length === 4 ? "md:grid-cols-4" : stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
  return (
    <section className={className} role="region" aria-label={label}>
      <div className="container mx-auto px-4 relative z-10">
        <div className={`grid grid-cols-2 ${cols} gap-y-10 gap-x-6 md:gap-x-12`}>
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-zinc-400 leading-snug max-w-[18ch]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
