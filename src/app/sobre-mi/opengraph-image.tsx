import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "Sobre mí — Junior Carrillo, Tech Leader"
export const size = ogSize
export const contentType = ogContentType

export default async function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Trayectoria",
    title: "Una década en dinero que se mueve",
    subtitle:
      "De programador a Tech Leader: pasarelas de pago, conciliación de alto volumen y core bancario en producción, con equipos que sostienen lo que construyen.",
    particulars: [
      { term: "Hoy", value: "Yummy" },
      { term: "Antes", value: "Wompi" },
      { term: "Pagadores", value: "13M" },
      { term: "Base", value: "Medellín, CO" },
    ],
  })
}
