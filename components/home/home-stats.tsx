interface Metric {
  /** Big numerical / short string — rendered at headline scale. */
  value: string
  /** Caption underneath the value. */
  label: string
}

interface HomeStatsProps {
  /** Defaults to the home-page metrics; pass your own to reuse on other pages. */
  metrics?: Metric[]
  /** Override the wrapper `aria-label` if used outside the home. */
  ariaLabel?: string
}

const DEFAULT_METRICS: Metric[] = [
  { value: "10+", label: "Años de trayectoria" },
  { value: "7", label: "Personas en mi equipo" },
  { value: "2M", label: "Tx/día procesadas" },
  { value: "40%", label: "Mejora en confiabilidad" },
]

/**
 * Numerical anchor row — four big tabular numbers that break the wall-of-cards
 * rhythm between hero and the first content section. Reusable on any page that
 * wants a similar "by-the-numbers" splash; pass a custom `metrics` array.
 */
export function HomeStats({
  metrics = DEFAULT_METRICS,
  ariaLabel = "Métricas y trayectoria",
}: HomeStatsProps) {
  return (
    <section
      className="py-12 md:py-16 relative border-y border-zinc-800/50 bg-zinc-950/40 backdrop-blur-sm"
      role="region"
      aria-label={ariaLabel}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-x-12">
          {metrics.map((stat) => (
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
