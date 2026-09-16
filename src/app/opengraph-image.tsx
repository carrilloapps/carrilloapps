import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "carrillo.app — Senior Software Engineer en pagos e infraestructura financiera"
export const size = ogSize
export const contentType = ogContentType

export default async function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Senior Software Engineer · Pagos e infraestructura",
    title: "Junior Carrillo",
    subtitle:
      "Escribo sistemas de pago de alta transaccionalidad en LATAM — hoy en Wenia (Grupo Cibest), antes Tech Leader en Yummy (YC S21). Lo que aprendo operándolos lo publico como herramientas instalables y como texto.",
    particulars: [
      { term: "Rol", value: "Senior Software Engineer" },
      { term: "Base", value: "Medellín, CO" },
      { term: "Trayectoria", value: "10+ años" },
      { term: "Enfoque", value: "Pagos y fintech" },
    ],
  })
}
