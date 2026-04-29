import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "Blog — José Carrillo"
export const size = ogSize
export const contentType = ogContentType

export default function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Blog",
    title: "Insights de un Tech Leader",
    subtitle: "Artículos sobre desarrollo de software, sistemas financieros, pagos y liderazgo técnico.",
    tags: ["Software", "Fintech", "Liderazgo", "Arquitectura", "Open Banking"],
  })
}
