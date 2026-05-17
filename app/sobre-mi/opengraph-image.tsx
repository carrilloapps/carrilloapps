import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "Sobre mí — Junior Carrillo"
export const size = ogSize
export const contentType = ogContentType

export default function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Sobre mí",
    title: "Tech Leader & Senior Full Stack",
    subtitle: "+10 años construyendo sistemas financieros robustos. Pagos, Open Banking, microservicios y liderazgo técnico.",
    tags: ["Yummy Inc", "Pagos", "Open Banking", "Liderazgo", "Microservicios"],
  })
}
