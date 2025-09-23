import type React from "react"
import type { Metadata } from "next"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Sobre mí | Senior Software Developer & Tech Leader",
  description:
    "Tech Leader con +10 años de experiencia construyendo sistemas financieros robustos y escalables. Especializado en pagos, Open Banking y liderazgo técnico.",
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
  alternates: {
    canonical: "/sobre-mi",
  },
  openGraph: {
    title: "Sobre mí",
    description:
      "Tech Leader con +10 años de experiencia construyendo sistemas financieros robustos y escalables. Especializado en pagos, Open Banking y liderazgo técnico.",
    url: "https://carrillo.app/sobre-mi",
    images: [
      {
        url: "https://carrillo.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sobre Mí",
      },
    ],
  },
  twitter: {
    title: "Sobre mí",
    description:
      "Tech Leader con +10 años de experiencia construyendo sistemas financieros robustos y escalables. Especializado en pagos, Open Banking y liderazgo técnico.",
  },
}

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
          { name: "Inicio", url: "https://carrillo.app" },
          { name: "Sobre Mí", url: "https://carrillo.app/sobre-mi" },
        ]}
      />
    </>
  )
}
