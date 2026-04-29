export interface ProjectMetric {
  /** Número o cifra grande — se renderiza con tipografía display. */
  value: string
  /** Etiqueta corta debajo del valor (máx ~16 chars para que no rompa). */
  label: string
}

export interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  technologies: string[]
  imageEmoji: string
  year: string
  demoUrl?: string
  repoUrl?: string
  image?: string
  imageAlt?: string
  shortTitle: string
  shortDescription: string
  /** Industria — "Retail", "Pasarela de pagos", "Banca", etc. */
  type?: string
  category?: string
  /** Mi rol durante el proyecto — se muestra en el chip al pie de la imagen. */
  role?: string
  /** Titular orientado a outcome ("2M facturas conciliadas al día") — reemplaza
   *  al `shortTitle` como heading principal del card. Si está vacío, cae back
   *  a `shortTitle`. */
  outcome?: string
  /** 3 stat tiles que reemplazan a la fila de badges de tecnologías. */
  metrics?: ProjectMetric[]
}
