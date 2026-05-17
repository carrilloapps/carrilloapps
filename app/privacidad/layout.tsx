import type React from "react"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"

const SITE_URL = getSiteUrl()

export const metadata = buildPageMetadata({
  title: "Política de Privacidad — Protección de Datos en carrillo.app",
  description:
    "Cómo se recopila, utiliza y protege tu información en carrillo.app: derechos GDPR, datos analíticos y tratamiento de información personal.",
  path: "/privacidad",
  keywords: [
    "política de privacidad",
    "protección de datos",
    "Junior Carrillo privacidad",
    "uso de cookies",
    "información personal",
    "GDPR",
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

export default function PrivacyPolicyLayout({
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
          { name: "Política de Privacidad", url: `${SITE_URL}/privacidad` },
        ]}
      />
    </>
  )
}
