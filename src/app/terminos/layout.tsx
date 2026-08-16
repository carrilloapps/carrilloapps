import type React from "react"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"

const SITE_URL = getSiteUrl()

export const metadata = buildPageMetadata({
  // The title carried "— carrillo.app" before the template appended
  // "| Junior Carrillo" too, which put it 108px past what Google renders.
  title: "Términos y condiciones de uso",
  description:
    "Condiciones de uso de carrillo.app y los servicios de consultoría: propiedad intelectual, limitaciones y acuerdos legales.",
  path: "/terminos",
  keywords: [
    "términos y condiciones",
    "condiciones de uso",
    "Junior Carrillo términos",
    "acuerdo legal",
    "derechos de propiedad intelectual",
  ],
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-image-preview": "large",
    },
  },
})

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
          { name: "Inicio", url: SITE_URL },
          { name: "Términos y Condiciones", url: `${SITE_URL}/terminos` },
        ]}
      />
    </>
  )
}
