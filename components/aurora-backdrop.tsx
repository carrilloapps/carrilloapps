"use client"

/**
 * Aurora — backdrop de mesh de gradientes que se mueve lentamente. Cuatro
 * capas apiladas:
 *
 *   1. Base sólida (`bg-slate-950`) que da el "color de papel" del segmento
 *      y se diferencia del `bg-zinc-950` que usan otras secciones del home
 *   2. Tres "blobs" radiales (azul, violeta, cian) muy difuminados con
 *      `mix-blend-screen`, cada uno animado con `transform: translate+scale`
 *      en periodos distintos (18–25s) para que la combinación nunca se
 *      repita visiblemente
 *   3. Hairlines de color en el borde superior e inferior — la "firma" que
 *      delimita el segmento sin pesar como un border-y duro
 *   4. Gradient overlay tenue para asegurar contraste del contenido encima
 *
 * Honra `prefers-reduced-motion` (los blobs se quedan quietos).
 *
 * Reusable: pegalo dentro de cualquier `<div className="relative">` para
 * darle identidad propia a un segmento de página. La intensidad por defecto
 * está calibrada para una sección con cards encima (no satura el contenido).
 */
interface AuroraBackdropProps {
  /** Tono de la sección — define los 3 colores del mesh. */
  tone?: "blog" | "studio" | "warm"
  /** Multiplicador de opacidad del mesh — 1 = default, 0.5 = más sutil. */
  intensity?: number
}

const TONE_COLORS: Record<
  NonNullable<AuroraBackdropProps["tone"]>,
  [string, string, string]
> = {
  /** Editorial / Blog — azul + violeta + cian. Sensación "writing space". */
  blog: ["59, 130, 246", "168, 85, 247", "6, 182, 212"],
  /** Studio / portfolio — azul + magenta + verde-azul. Más vibrante. */
  studio: ["59, 130, 246", "236, 72, 153", "34, 211, 238"],
  /** Warm — naranja + violeta + ámbar. Para zonas más cálidas. */
  warm: ["249, 115, 22", "168, 85, 247", "245, 158, 11"],
}

export function AuroraBackdrop({
  tone = "blog",
  intensity = 1,
}: AuroraBackdropProps) {
  const [c1, c2, c3] = TONE_COLORS[tone]

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base más cálida que zinc-950 — slate tiene un undertone azulado que
          sintoniza con el resto del sistema visual sin gritar. */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Mesh — tres blobs radiales animados. Cada uno usa una escala mayor
          al viewport para que el blur se extienda y no se vean los bordes. */}
      <div className="absolute inset-0">
        <div
          className="absolute -top-1/3 -right-1/4 w-[640px] h-[640px] rounded-full blur-[120px] mix-blend-screen aurora-blob-a"
          style={{
            background: `radial-gradient(circle, rgba(${c1}, ${0.55 * intensity}), transparent 65%)`,
          }}
        />
        <div
          className="absolute -bottom-1/3 -left-1/4 w-[640px] h-[640px] rounded-full blur-[120px] mix-blend-screen aurora-blob-b"
          style={{
            background: `radial-gradient(circle, rgba(${c2}, ${0.5 * intensity}), transparent 65%)`,
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[440px] h-[440px] rounded-full blur-[110px] mix-blend-screen aurora-blob-c"
          style={{
            background: `radial-gradient(circle, rgba(${c3}, ${0.4 * intensity}), transparent 60%)`,
          }}
        />
      </div>

      {/* Capa de oscurecimiento sutil para asegurar contraste del contenido. */}
      <div className="absolute inset-0 bg-slate-950/40" />

      {/* Hairlines de borde — coloreadas (no flat zinc) para "firmar" la sección. */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, rgba(${c1}, 0.45), transparent)`,
        }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, rgba(${c2}, 0.4), transparent)`,
        }}
      />
    </div>
  )
}
