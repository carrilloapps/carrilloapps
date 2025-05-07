import type React from "react"
import type { Metadata } from "next"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso del sitio web carrillo.app y los servicios ofrecidos por José Carrillo.",
  keywords: [
    "términos y condiciones",
    "condiciones de uso",
    "josé carrillo términos",
    "acuerdo legal",
    "derechos de propiedad intelectual",
  ],
  alternates: {
    canonical: "/terms-conditions",
  },
  openGraph: {
    title: "Términos y Condiciones | José Carrillo",
    description:
      "Términos y condiciones de uso del sitio web carrillo.app y los servicios ofrecidos por José Carrillo.",
    url: "https://carrillo.app/terms-conditions",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function TermsConditionsLayout({
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
          { name: "Términos y Condiciones", url: "https://carrillo.app/terms-conditions" },
        ]}
      />
    </>
  )
}
