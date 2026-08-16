import type { ReactNode } from "react"

import { buildPageMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"

export const metadata = buildPageMetadata({
  title: "Herramientas de código abierto",
  description:
    "Librerías, CLIs y servidores MCP en npm: tasas oficiales BCV/TRM/PTAX, cifrado zero-knowledge y sincronización de skills para IA.",
  path: "/herramientas",
})

export default function HerramientasLayout({ children }: { children: ReactNode }) {
  const siteUrl = getSiteUrl()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: siteUrl },
          { name: "Herramientas", url: `${siteUrl}/herramientas` },
        ]}
      />
      {children}
    </>
  )
}
