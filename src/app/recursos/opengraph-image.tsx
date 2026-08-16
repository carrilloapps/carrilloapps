import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "Recursos y casos de impacto — Junior Carrillo"
export const size = ogSize
export const contentType = ogContentType

export default async function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Recursos",
    title: "Casos de impacto y repositorios",
    subtitle:
      "Sistemas financieros que diseñé y operé, con las métricas reales detrás, más los repositorios públicos de GitHub y GitLab.",
    particulars: [
      { term: "Fuentes", value: "GitHub · GitLab" },
      { term: "Lenguajes", value: "TS · Go · Python" },
      { term: "Métricas", value: "Reales" },
      { term: "Datos", value: "En vivo" },
    ],
  })
}
