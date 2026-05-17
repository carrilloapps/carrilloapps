import type React from "react"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"

const SITE_URL = getSiteUrl()

export const metadata = buildPageMetadata({
  title: "Política de Cookies",
  description:
    "Política de cookies que explica cómo se utilizan las cookies en el sitio web carrillo.app, incluyendo cookies analíticas, técnicas y de terceros.",
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
