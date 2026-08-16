"use client"

import { useEffect, useState } from "react"
import { SectionHeader } from "@/components/section-header"
import { Code2 } from "lucide-react"

/**
 * Skills section — two contra-rotating infinite marquees.
 *
 * The whole stack scrolls horizontally on its own:
 *   • row 1 drifts left-to-right (slower)
 *   • row 2 drifts right-to-left (slightly faster)
 *
 * Each row is a duplicated track so the loop is seamless. Edge fades (CSS
 * mask) hide the wrap point. Hovering anywhere on the carousel pauses both
 * rows. `prefers-reduced-motion` halts the animation completely.
 */

interface Skill {
  name: string
  /** Category — drives the small coloured dot to the left of the chip. */
  group: "lang" | "framework" | "infra" | "domain"
}

const ROW_TOP: Skill[] = [
  { name: "TypeScript", group: "lang" },
  { name: "Next.js", group: "framework" },
  { name: "Go", group: "lang" },
  { name: "React", group: "framework" },
  { name: "Node.js", group: "framework" },
  { name: "Python", group: "lang" },
  { name: "NestJS", group: "framework" },
  { name: "Java", group: "lang" },
  { name: "React Native", group: "framework" },
  { name: "Kotlin", group: "lang" },
  { name: "GraphQL", group: "framework" },
  { name: "SQL", group: "lang" },
  { name: "Vue.js", group: "framework" },
  { name: "REST", group: "framework" },
  { name: "tRPC", group: "framework" },
]

const ROW_BOTTOM: Skill[] = [
  { name: "AWS", group: "infra" },
  { name: "Open Banking", group: "domain" },
  { name: "Kubernetes", group: "infra" },
  { name: "Payments", group: "domain" },
  { name: "Docker", group: "infra" },
  { name: "Microservices", group: "domain" },
  { name: "GCP", group: "infra" },
  { name: "Fintech", group: "domain" },
  { name: "Terraform", group: "infra" },
  { name: "PCI-DSS", group: "domain" },
  { name: "PostgreSQL", group: "infra" },
  { name: "Backoffice", group: "domain" },
  { name: "Redis", group: "infra" },
  { name: "Stripe", group: "domain" },
  { name: "Kafka", group: "infra" },
  { name: "Plaid", group: "domain" },
  { name: "CI/CD", group: "infra" },
  { name: "ISO 27001", group: "domain" },
]

const dotByGroup: Record<Skill["group"], string> = {
  lang: "bg-blue-400",
  framework: "bg-purple-400",
  infra: "bg-emerald-400",
  domain: "bg-amber-400",
}

/**
 * Halo de color (drop-shadow) que envuelve al dot de cada chip — refuerza la
 * categoría sin necesidad de leyenda y le da al chip ese "glow" moderno
 * estilo Vercel/Linear. Definido como utility de Tailwind con valor arbitrario
 * para que la sombra mantenga el mismo color que el dot.
 */
const dotGlowByGroup: Record<Skill["group"], string> = {
  lang: "shadow-[0_0_10px_rgb(96_165_250_/_0.7)]",
  framework: "shadow-[0_0_10px_rgb(192_132_252_/_0.7)]",
  infra: "shadow-[0_0_10px_rgb(52_211_153_/_0.7)]",
  domain: "shadow-[0_0_10px_rgb(251_191_36_/_0.7)]",
}

const labelByGroup: Record<Skill["group"], string> = {
  lang: "Lang",
  framework: "FW",
  infra: "Infra",
  domain: "Domain",
}

/**
 * Solo los dos marquees contra-rotativos — sin section wrapper ni header.
 * Útil para incrustar las skills como "identity band" dentro del footer (o
 * en cualquier otro lugar donde se quiera mostrar el stack sin el contexto
 * completo de una sección dedicada).
 */
export function SkillsMarquee() {
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = () => setReduceMotion(mq.matches)
    handler()
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const animationState = paused || reduceMotion ? "paused" : "running"

  return (
    <div
      className="relative w-full space-y-4 md:space-y-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <MarqueeRow skills={ROW_TOP} direction="ltr" duration={70} state={animationState} />
      <MarqueeRow
        skills={ROW_BOTTOM}
        direction="rtl"
        duration={55}
        state={animationState}
        className="pb-3"
      />
    </div>
  )
}

/**
 * Sección standalone con header + leyenda + los dos marquees. Pensada para
 * páginas como `/sobre-mi` que quieran mostrar el stack como una sección
 * dedicada. El home ahora pone los marquees en el footer (`<SkillsMarquee>`),
 * pero este wrapper queda disponible para reuso.
 */
export function SkillsHorizontalSection() {
  return (
    <section
      className="relative w-full py-16 md:py-24"
      role="region"
      aria-labelledby="skills-heading"
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader
          eyebrow="Stack"
          eyebrowIcon={Code2}
          title="Habilidades técnicas"
          description="Mi caja de herramientas — lo que uso cada día para construir sistemas financieros, microservicios y experiencias de desarrollador."
          headingId="skills-heading"
          align="left"
        />

        <Legend />
      </div>

      <div className="mt-10 md:mt-12">
        <SkillsMarquee />
      </div>
    </section>
  )
}

function Legend() {
  return (
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-[0.18em] text-zinc-500 uppercase">
      {(Object.entries(dotByGroup) as [Skill["group"], string][]).map(([group, color]) => (
        <span key={group} className="inline-flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${color}`} aria-hidden="true" />
          {labelByGroup[group]}
        </span>
      ))}
    </div>
  )
}

function MarqueeRow({
  skills,
  direction,
  duration,
  state,
  className = "",
}: {
  skills: Skill[]
  direction: "ltr" | "rtl"
  duration: number
  state: "running" | "paused"
  /** Padding extra para la fila (típicamente `pb-X` en la última fila para que
   *  el halo del hover no se recorte en el borde de la sección). */
  className?: string
}) {
  // Duplicate the track once so the loop wraps seamlessly. The animation
  // translates the whole strip by exactly -50% (one full set width).
  const track = [...skills, ...skills]
  const animationName = direction === "ltr" ? "marqueeLTR" : "marqueeRTL"
  return (
    // `overflow-x-clip` (no `overflow-hidden`) recorta sólo en horizontal —
    // necesario para esconder el truco del track duplicado, pero deja que el
    // halo del hover se desborde verticalmente sin recortarse.
    <div
      className={`relative overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className="flex w-max gap-3 will-change-transform"
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
          animationPlayState: state,
        }}
      >
        {track.map((skill, i) => (
          <SkillChip key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  )
}

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <span className="group/chip relative inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium tracking-tight text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-200 select-none hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_22px_-6px_rgba(59,130,246,0.22)] md:text-[15px]">
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${dotByGroup[skill.group]} ${dotGlowByGroup[skill.group]}`}
        aria-hidden="true"
      />
      {skill.name}
    </span>
  )
}
