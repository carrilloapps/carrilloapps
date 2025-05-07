import type React from "react"
import type { Metadata } from "next"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Contacto | Consultoría Tecnológica",
  description:
    "Ponte en contacto conmigo para discutir tu proyecto o posibles oportunidades de colaboración en desarrollo de software y liderazgo técnico.",
  keywords: [
    "contacto josé carrillo",
    "consultoría tecnológica",
    "desarrollo software",
    "liderazgo técnico",
    "sistemas financieros",
    "contactar desarrollador",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contacto | José Carrillo",
    description:
      "Ponte en contacto conmigo para discutir tu proyecto o posibles oportunidades de colaboración en desarrollo de software y liderazgo técnico.",
    url: "https://carrillo.app/contact",
    images: [
      {
        url: "https://carrillo.app/contact-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contacto - José Carrillo",
      },
    ],
  },
  twitter: {
    title: "Contacto | José Carrillo",
    description:
      "Ponte en contacto conmigo para discutir tu proyecto o posibles oportunidades de colaboración en desarrollo de software y liderazgo técnico.",
  },
}

export default function ContactLayout({
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
          { name: "Contacto", url: "https://carrillo.app/contact" },
        ]}
      />
    </>
  )
}
