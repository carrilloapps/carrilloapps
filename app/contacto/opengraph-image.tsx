import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "Contacto profesional — José Carrillo"
export const size = ogSize
export const contentType = ogContentType

export default function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Contacto",
    title: "Conversemos sobre tu proyecto",
    subtitle: "Desarrollo de software, liderazgo técnico, consultoría fintech y arquitecturas empresariales.",
    tags: ["Consultoría", "Tech Lead", "Fintech", "Arquitectura", "Remoto"],
    accent: "Respuesta en 24h",
  })
}
