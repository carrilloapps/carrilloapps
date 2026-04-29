import type React from "react"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"

const SITE_URL = getSiteUrl()

export const metadata = buildPageMetadata({
  title: "Agenda una consulta",
  description:
    "Agenda una consulta personalizada para discutir tu proyecto, resolver dudas técnicas o explorar oportunidades de colaboración en desarrollo de software.",
  path: "/agendamiento",
  keywords: [
    "agendar consulta",
    "consultoría tecnológica",
    "josé carrillo consulta",
    "asesoría técnica",
    "desarrollo software",
    "sistemas financieros",
    "backoffice",
  ],
})

export default function ScheduleLayout({
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
          { name: "Agenda una Consulta", url: `${SITE_URL}/agendamiento` },
        ]}
      />
    </>
  )
}
