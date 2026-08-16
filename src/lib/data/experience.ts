import type { ProjectMetric } from "@/types/project"

export interface ExperienceEntry {
  id: string
  /** Período — "2024 — Presente". */
  period: string
  /** Short form for the axis of the horizontal timeline: "2024". */
  since: string
  role: string
  company: string
  /** Optional brand logo (committed under /public/brands). */
  logo?: string
  /** Headline orientado a outcome — protagonista visual de la entrada. */
  outcome: string
  /** Descripción rica de lo que hiciste / contexto. */
  description: string
  /** Hasta 3 cifras que acompañan la entrada. */
  metrics?: ProjectMetric[]
  /** Stack técnico — se renderiza como línea sutil al pie. */
  technologies: string[]
}

/**
 * The career record, in one place.
 *
 * It used to live inside `experience-section.tsx`, which meant the horizontal
 * timeline on /sobre-mi could not read it without importing a component. Static
 * arrays belong in `src/lib/data` — see the AGENTS.md in this directory — so
 * both the home's compact list and the interactive timeline now render the same
 * source and can never drift apart.
 *
 * Ordered newest first; the timeline reverses it to run left to right.
 */
export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "yummy",
    period: "2024 — Presente",
    since: "2024",
    role: "Tech Leader",
    company: "Yummy Inc.",
    logo: "/brands/yummy.png",
    outcome: "Liderando pagos para una super-app de LATAM",
    description:
      "Conduzco un equipo de 7 desarrolladores en el diseño e implementación de herramientas de Pagos y Finanzas. Implementación de medios de pago y arquitectura de microservicios que mejoraron la confiabilidad del sistema en un 40%.",
    metrics: [
      { value: "7", label: "Team players" },
      { value: "+40%", label: "Confiabilidad" },
      { value: "2M", label: "Tx/día" },
    ],
    technologies: ["Node.js", "React", "Azure", "AWS", "Microservicios"],
  },
  {
    // Recovered verbatim from the pre-redesign /sobre-mi (commit 6402124),
    // which dated it "may. 2023 - mar. 2024" and carried all three figures.
    // Shown as years here only to match the axis format of the other stops.
    id: "wompi",
    period: "2023 — 2024",
    since: "2023",
    role: "Sr. Developer Full Stack",
    company: "Wompi",
    outcome: "Open Banking con 99,9% de disponibilidad",
    description:
      "Participé en el desarrollo de la plataforma de pagos: integraciones con múltiples entidades bancarias y financieras, y mejoras de experiencia en checkout, dashboard y un flujo completo del panel administrativo. Ayudé a rediseñar la arquitectura del backend para soportar transacciones de Open Banking como iniciadores de pago, y trabajé con producto y UX en soluciones de pago que subieron la conversión de los comercios.",
    metrics: [
      { value: "99,9%", label: "Disponibilidad" },
      { value: "−35%", label: "Tiempo de proceso" },
      { value: "+28%", label: "Conversión" },
    ],
    technologies: ["Open Banking", "Pasarelas de pago", "Azure", "AWS", "Backend"],
  },
  {
    id: "cencosud",
    period: "2022 — 2023",
    since: "2022",
    role: "Developer Lead",
    company: "Cencosud S.A.",
    logo: "/brands/cencosud.png",
    outcome: "2M+ transacciones semanales conciliadas con SAP",
    description:
      "Desarrollé herramientas y módulos de contabilidad con integración en SAP que gestionan cerca de 2 millones de transacciones semanales. Optimicé consultas de bases de datos y procesos batch, recortando el tiempo de procesamiento en un 60%.",
    metrics: [
      { value: "2M+", label: "Tx/semana" },
      { value: "−60%", label: "Tiempo" },
      { value: "SAP", label: "Integración" },
    ],
    technologies: ["TypeScript", "Amazon Redshift", "Terraform"],
  },
  {
    id: "sky",
    period: "2021 — 2022",
    since: "2021",
    role: "Sr. Software Engineer",
    company: "Sky Airline",
    logo: "/brands/sky.png",
    outcome: "1M+ transacciones mensuales en mobile",
    description:
      "Construí varios microservicios — entre ellos la gestión de perfiles — y escalé hasta Tech Leader Backup. Junto a mi equipo desarrollé la nueva versión de AppSales mientras se sostenía la versión anterior con más de 1 millón de transacciones mensuales en Android e iOS.",
    metrics: [
      { value: "1M+", label: "Tx/mes mobile" },
      // Was `{ value: "iOS+", label: "Android" }`, which only read correctly
      // when value and label sat side by side. In a term/figure table it came
      // out as "ANDROID → iOS+".
      { value: "iOS · Android", label: "Plataformas" },
      { value: "5+", label: "Microservicios" },
    ],
    technologies: ["React Native", "NestJS", "Firebase", "GCP"],
  },
]
