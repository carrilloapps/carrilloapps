import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "Agenda una consulta — José Carrillo"
export const size = ogSize
export const contentType = ogContentType

export default function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Agenda",
    title: "Agenda una consulta",
    subtitle: "Discutamos tu proyecto, resolvemos dudas técnicas o exploramos oportunidades de colaboración.",
    tags: ["Discovery", "Consultoría", "Sin compromiso"],
    accent: "Slots semanales",
  })
}
