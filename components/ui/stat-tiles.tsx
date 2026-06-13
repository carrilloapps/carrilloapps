import type { ProjectMetric } from "@/types/project"

import { cn } from "@/lib/utils"

/**
 * The repeated "3 stat tiles" block (value + label on a subtle surface). One
 * component so the metric grid looks identical everywhere. Tiles center their
 * content and share a min-height, so labels of different lengths no longer make
 * the tiles look uneven/deformed. `size` keeps the two existing scales.
 */
const SIZES = {
  sm: { tile: "px-2.5 py-4 min-h-[96px]", value: "text-xl md:text-2xl", label: "text-[10px] md:text-[11px]" },
  md: { tile: "px-3 py-5 md:px-4 min-h-[116px]", value: "text-2xl md:text-3xl", label: "text-[11px] md:text-xs" },
} as const

/** Column layouts. 4 stays 2-up on mobile so tiles never get too narrow. */
const COLUMNS = {
  3: "grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
} as const

interface StatTilesProps {
  metrics: ProjectMetric[]
  size?: keyof typeof SIZES
  /** How many tiles per row. Defaults to 3. */
  columns?: keyof typeof COLUMNS
  /**
   * "card" (default) → boxed surface tiles, used inside project/experience
   * cards. "plain" → borderless metric strip with gradient numbers and hairline
   * dividers, for hero stat rows where boxed tiles read as tappable buttons.
   */
  variant?: "card" | "plain"
  ariaLabel?: string
  className?: string
}

export function StatTiles({
  metrics,
  size = "md",
  columns = 3,
  variant = "card",
  ariaLabel = "Métricas",
  className,
}: StatTilesProps) {
  const s = SIZES[size]
  const plain = variant === "plain"
  return (
    <ul
      className={cn(
        "grid gap-2 md:gap-3 list-none p-0 m-0",
        COLUMNS[columns],
        // Hairline dividers between columns on the single-row (sm+) layout, so
        // the strip reads as one connected set of figures rather than chips.
        plain &&
          "gap-y-6 [&>li:not(:first-child)]:sm:border-l [&>li:not(:first-child)]:sm:border-white/10",
        className,
      )}
      aria-label={ariaLabel}
    >
      {metrics.slice(0, columns).map((metric) => (
        <li
          key={metric.label}
          className={cn(
            "flex flex-col items-center justify-center text-center gap-1.5",
            plain ? "px-2" : ["surface-card-subtle", s.tile],
          )}
        >
          <span
            className={cn(
              "font-extrabold tracking-tight tabular-nums leading-none",
              s.value,
              plain
                ? "bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent"
                : "text-white",
            )}
          >
            {metric.value}
          </span>
          <span
            className={cn(
              "text-zinc-300 leading-tight",
              s.label,
              plain && "uppercase tracking-wide",
            )}
          >
            {metric.label}
          </span>
        </li>
      ))}
    </ul>
  )
}
