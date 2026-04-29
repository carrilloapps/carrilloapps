import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "Servicios — Tech Lead & Arquitecto de Software"
export const size = ogSize
export const contentType = ogContentType

export default function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Servicios",
    title: "Tech Lead & Arquitecto de Software",
    subtitle: "Liderazgo técnico, sistemas financieros, arquitectura, seguridad/compliance, cloud e IA.",
    tags: ["Liderazgo", "Fintech", "Arquitectura", "Cloud", "IA"],
    accent: "Consultoría disponible",
  })
}
