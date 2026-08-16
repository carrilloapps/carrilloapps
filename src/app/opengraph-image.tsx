import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "carrillo.app — Tech Leader en pagos e infraestructura financiera"
export const size = ogSize
export const contentType = ogContentType

export default async function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Tech Leader · Pagos e infraestructura",
    title: "Junior Carrillo",
    subtitle:
      "Construyo sistemas de pago de alta transaccionalidad en LATAM. Lo que aprendo operándolos lo publico como herramientas instalables y como texto.",
    particulars: [
      { term: "Rol", value: "Tech Leader" },
      { term: "Base", value: "Medellín, CO" },
      { term: "Trayectoria", value: "10+ años" },
      { term: "Enfoque", value: "Pagos y fintech" },
    ],
  })
}
