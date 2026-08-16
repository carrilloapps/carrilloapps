import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "Herramientas de código abierto — Junior Carrillo"
export const size = ogSize
export const contentType = ogContentType

export default async function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Open source",
    title: "Herramientas que mantengo",
    subtitle:
      "Librerías, CLIs y servidores MCP publicados en npm y GitHub. Tasas oficiales BCV/TRM/PTAX, cifrado zero-knowledge y sincronización de skills para agentes de IA.",
    particulars: [
      { term: "Registro", value: "npm" },
      { term: "Descargas", value: "3K+" },
      { term: "Lenguaje", value: "TypeScript" },
      { term: "Licencia", value: "MIT" },
    ],
  })
}
