import type React from "react"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"

const SITE_URL = getSiteUrl()

export const metadata = buildPageMetadata({
  title: "Sobre mí",
  description:
    "Tech Leader con +10 años de experiencia construyendo sistemas financieros robustos y escalables. Especializado en pagos, Open Banking y liderazgo técnico.",
  path: "/sobre-mi",
  ogType: "profile",
  keywords: [
    "josé carrillo biografía",
    "tech leader yummy",
    "experiencia desarrollador senior",
    "líder técnico",
    "medios de pago",
    "trayectoria profesional",
    "sistemas financieros",
    "backoffice financiero",
    "desarrollo software",
    "open banking",
    "pagos digitales",
    "arquitectura microservicios",
    "mentoría técnica",
  ],
})

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Sobre Mí", url: `${SITE_URL}/sobre-mi` },
        ]}
      />
    </>
  )
}
