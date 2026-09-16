import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "Sobre mí — Junior Carrillo, Senior Software Engineer"
export const size = ogSize
export const contentType = ogContentType

export default async function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Trayectoria",
    title: "Una década en dinero que se mueve",
    subtitle:
      "Diez años escribiendo pasarelas de pago, conciliación de alto volumen y core bancario en producción. Tech Leader en Yummy; hoy en criptoactivos con Wenia.",
    particulars: [
      { term: "Hoy", value: "Wenia" },
      { term: "Antes", value: "Yummy · Wompi" },
      { term: "Pagadores", value: "13M" },
      { term: "Base", value: "Medellín, CO" },
    ],
  })
}
