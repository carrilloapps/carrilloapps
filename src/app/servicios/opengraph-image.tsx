import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "Servicios — Tech Lead y arquitectura de pagos"
export const size = ogSize
export const contentType = ogContentType

export default async function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Servicios",
    title: "Arquitectura de pagos que aguanta",
    subtitle:
      "Consultoría, auditoría y liderazgo técnico para plataformas financieras: microservicios, conciliación, observabilidad y cumplimiento desde el diseño.",
    particulars: [
      { term: "Formato", value: "Consultoría" },
      { term: "Frentes", value: "Arquitectura" },
      { term: "Volumen", value: "$50B COP/año" },
      { term: "Modalidad", value: "Remoto · LATAM" },
    ],
  })
}
