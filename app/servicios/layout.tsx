import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Servicios profesionales | Consultoría tecnológica",
  description:
    "Servicios especializados en liderazgo técnico, sistemas financieros, soluciones de backoffice, diseño de arquitectura y más.",
  keywords: [
    "servicios tecnológicos",
    "liderazgo técnico",
    "sistemas financieros",
    "soluciones backoffice",
    "diseño arquitectura",
    "seguridad y cumplimiento",
    "infraestructura cloud",
    "integración IA",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Servicios profesionales",
    description:
      "Servicios especializados en liderazgo técnico, sistemas financieros, soluciones de backoffice, diseño de arquitectura y más.",
    url: "https://carrillo.app/services",
    images: [
      {
        url: "https://carrillo.app/services-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Servicios profesionales",
      },
    ],
  },
  twitter: {
    title: "Servicios profesionales",
    description:
      "Servicios especializados en liderazgo técnico, sistemas financieros, soluciones de backoffice, diseño de arquitectura y más.",
  },
}

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
