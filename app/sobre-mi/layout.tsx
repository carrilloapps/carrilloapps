import type React from "react"
import type { Metadata } from "next"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Sobre Mí | Senior Software Developer & Tech Leader | José Carrillo",
  description:
    "Conoce más sobre mi trayectoria, experiencia y enfoque en el desarrollo de software y liderazgo técnico. Más de 10 años de experiencia en sistemas financieros.",
  keywords: [
    "josé carrillo biografía",
    "experiencia desarrollador senior",
    "líder técnico",
    "trayectoria profesional",
    "sistemas financieros",
    "backoffice",
    "desarrollo software",
  ],
  alternates: {
    canonical: "/sobre-mi",
  },
  openGraph: {
    title: "Sobre Mí | José Carrillo",
    description:
      "Conoce más sobre mi trayectoria, experiencia y enfoque en el desarrollo de software y liderazgo técnico. Más de 10 años de experiencia en sistemas financieros.",
    url: "https://carrillo.app/sobre-mi",
    images: [
      {
        url: "https://carrillo.app/about-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sobre Mí - José Carrillo",
      },
    ],
  },
  twitter: {
    title: "Sobre Mí | José Carrillo",
    description:
      "Conoce más sobre mi trayectoria, experiencia y enfoque en el desarrollo de software y liderazgo técnico. Más de 10 años de experiencia en sistemas financieros.",
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
          { name: "Sobre Mí", url: "https://carrillo.app/about" },
        ]}
      />
    </>
  )
}
