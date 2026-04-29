import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "carrillo.app — Senior Software Developer & Tech Leader"
export const size = ogSize
export const contentType = ogContentType

export default function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Tech Leader · Senior Full Stack",
    title: "José Carrillo",
    subtitle: "Sistemas de pagos · Open Banking · Liderazgo técnico",
    tags: ["Microservicios", "Fintech", "Backoffice", "Cloud/AWS", "+10 años"],
  })
}
