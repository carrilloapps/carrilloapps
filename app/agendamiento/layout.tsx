import type React from "react"
import type { Metadata } from "next"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Agenda una Consulta | Servicios de Consultoría | José Carrillo",
  description:
    "Agenda una consulta personalizada para discutir tu proyecto, resolver dudas técnicas o explorar oportunidades de colaboración en desarrollo de software.",
  keywords: [
    "agendar consulta",
    "consultoría tecnológica",
    "josé carrillo consulta",
    "asesoría técnica",
    "desarrollo software",
    "sistemas financieros",
    "backoffice",
  ],
  alternates: {
    canonical: "/agendamiento",
  },
  openGraph: {
    title: "Agenda una Consulta | José Carrillo",
    description:
      "Agenda una consulta personalizada para discutir tu proyecto, resolver dudas técnicas o explorar oportunidades de colaboración en desarrollo de software.",
    url: "https://carrillo.app/agendamiento",
    images: [
      {
        url: "https://carrillo.app/schedule-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Agenda una Consulta - José Carrillo",
      },
    ],
  },
  twitter: {
    title: "Agenda una Consulta | José Carrillo",
    description:
      "Agenda una consulta personalizada para discutir tu proyecto, resolver dudas técnicas o explorar oportunidades de colaboración en desarrollo de software.",
  },
}

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
          { name: "Inicio", url: "https://carrillo.app" },
          { name: "Agenda una Consulta", url: "https://carrillo.app/agendamiento" },
        ]}
      />
    </>
  )
}
