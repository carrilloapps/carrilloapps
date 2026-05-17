import type React from "react"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"

const SITE_URL = getSiteUrl()

export const metadata = buildPageMetadata({
  title: "Política de Cookies — Uso y Tipos en carrillo.app",
  description:
    "Cómo se utilizan las cookies en carrillo.app: cookies analíticas, técnicas y de terceros, y cómo gestionar tu consentimiento.",
  path: "/cookies",
  keywords: [
    "política de cookies",
    "uso de cookies",
    "Junior Carrillo cookies",
    "cookies analíticas",
    "cookies esenciales",
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

export default function CookiePolicyLayout({
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
          { name: "Política de Cookies", url: `${SITE_URL}/cookies` },
        ]}
      />
    </>
  )
}
