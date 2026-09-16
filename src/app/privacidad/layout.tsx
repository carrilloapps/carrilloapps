import type React from "react"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"

const SITE_URL = getSiteUrl()

export const metadata = buildPageMetadata({
  title: "Política de Privacidad",
  description:
    "Qué datos recoge carrillo.app, qué proveedores los procesan, qué implica suscribirse al blog en Substack y cómo ejerces tus derechos.",
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
