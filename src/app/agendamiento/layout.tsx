import type React from "react"
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"

const SITE_URL = getSiteUrl()

export const metadata = buildPageMetadata({
  title: "Agendar una asesoría",
  description:
    "60 minutos sobre tu arquitectura de pagos: el problema concreto, los riesgos priorizados y siguientes pasos. Calendario en vivo.",
  path: "/agendamiento",
  keywords: [
    "agendar consulta",
    "consultoría tecnológica",
    "Junior Carrillo consulta",
    "asesoría técnica",
    "desarrollo software",
    "sistemas financieros",
    "backoffice",
  ],
})

const schedulingJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Agenda una Consulta — Junior Carrillo",
  description:
    "Reserva una sesión de consultoría personalizada con Junior Carrillo, Tech Leader especializado en sistemas de pago y liderazgo técnico.",
  url: `${SITE_URL}/agendamiento`,
  mainEntity: {
    "@type": "Person",
    name: "Junior Carrillo",
    jobTitle: "Tech Leader & Senior Software Developer",
    worksFor: { "@type": "Organization", name: "Yummy Inc." },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      availableLanguage: ["es", "en"],
      areaServed: "Global",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
        timeZone: "America/Bogota",
      },
    },
  },
  isPartOf: {
    "@type": "WebSite",
    name: "Junior Carrillo | Senior Software Developer & Tech Leader",
    url: SITE_URL,
  },
  inLanguage: "es-CO",
  dateModified: new Date("2026-05-16").toISOString(),
}

export default function ScheduleLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <JsonLd data={schedulingJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Agenda una Consulta", url: `${SITE_URL}/agendamiento` },
        ]}
      />
    </>
  )
}
