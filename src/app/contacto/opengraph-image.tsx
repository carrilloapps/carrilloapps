import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "Contacto — Junior Carrillo"
export const size = ogSize
export const contentType = ogContentType

export default async function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Contacto",
    title: "Conversemos sobre tu proyecto",
    subtitle:
      "Cuéntame qué estás construyendo y dónde se está atascando. Respondo en menos de 24 horas hábiles.",
    particulars: [
      { term: "Respuesta", value: "< 24 h hábiles" },
      { term: "Base", value: "Medellín, CO" },
      { term: "Idiomas", value: "Español · Inglés" },
      { term: "Modalidad", value: "Remoto" },
    ],
  })
}
