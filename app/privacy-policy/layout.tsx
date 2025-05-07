import type React from "react"
import type { Metadata } from "next"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad que describe cómo se recopila, utiliza y protege tu información en carrillo.app.",
  keywords: [
    "política de privacidad",
    "protección de datos",
    "josé carrillo privacidad",
    "uso de cookies",
    "información personal",
  ],
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Política de Privacidad | José Carrillo",
    description:
      "Política de privacidad que describe cómo se recopila, utiliza y protege tu información en carrillo.app.",
    url: "https://carrillo.app/privacy-policy",
  },
  robots: {
    index: false,
    follow: true,
  },
}

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
          { name: "Inicio", url: "https://carrillo.app" },
          { name: "Política de Privacidad", url: "https://carrillo.app/privacy-policy" },
        ]}
      />
    </>
  )
}
