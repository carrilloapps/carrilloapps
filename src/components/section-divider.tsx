/**
 * Hairline divider with an editorial section index — e.g. `01 — Experiencia`.
 * Use between major sections to break the wall-of-cards rhythm and give the
 * page a magazine-like cadence.
 */
interface SectionDividerProps {
  /** Two-digit index, displayed in monospace. */
  index: string
  /** Short label rendered next to the index. */
  label: string
  /** Tailwind class controlling the surrounding spacing. */
  className?: string
}

export function SectionDivider({ index, label, className = "py-2" }: SectionDividerProps) {
  return (
    <div
      className={`container mx-auto flex items-center gap-4 px-4 ${className}`}
      aria-hidden="true"
    >
      <span className="font-mono text-xs tracking-[0.2em] text-zinc-500">{index}</span>
      <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">{label}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 via-zinc-700 to-transparent" />
    </div>
  )
}
