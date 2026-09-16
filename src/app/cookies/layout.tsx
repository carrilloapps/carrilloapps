import type React from "react"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"

const SITE_URL = getSiteUrl()

export const metadata = buildPageMetadata({
  title: "Política de Cookies",
  description:
    "Qué cookies coloca carrillo.app y cuáles coloca el blog en Substack, con nombre y caducidad, y cómo aceptarlas o revocarlas.",
  path: "/cookies",
  keywords: [
    "política de cookies",
    "uso de cookies",
    "Junior Carrillo cookies",
    "cookies analíticas",
    "cookies de terceros",
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
