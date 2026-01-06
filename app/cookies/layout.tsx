import type React from "react"
import type { Metadata } from "next"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Política de cookies que explica cómo se utilizan las cookies en el sitio web carrillo.app.",
  keywords: [
    "política de cookies",
    "uso de cookies",
    "josé carrillo cookies",
    "cookies analíticas",
    "cookies esenciales",
  ],
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: "Política de Cookies | José Carrillo",
    description: "Política de cookies que explica cómo se utilizan las cookies en el sitio web carrillo.app.",
    url: "https://carrillo.app/cookies",
  },
  robots: {
    index: false,
    follow: true,
  },
}

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
          { name: "Inicio", url: "https://carrillo.app" },
          { name: "Política de Cookies", url: "https://carrillo.app/cookies" },
        ]}
      />
    </>
  )
}
