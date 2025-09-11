import type React from "react"
import type { Metadata } from "next"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title:
    "Recursos | Repositorios de GitHub y GitLab de CarrilloApps",
  description:
    "Explora mis repositorios públicos de GitHub y GitLab. Proyectos de código abierto en sistemas financieros, backoffice y más.",
  keywords: [
    "repositorios github",
    "repositorios gitlab",
    "proyectos código abierto",
    "sistemas financieros",
    "soluciones backoffice",
    "desarrollo software",
    "josé carrillo proyectos",
  ],
  alternates: {
    canonical: "/recursos",
  },
  openGraph: {
    title: "Recursos y Proyectos",
    description:
      "Explora mis repositorios públicos de GitHub y GitLab. Proyectos de código abierto en sistemas financieros, backoffice y más.",
    url: "https://carrillo.app/recursos",
    images: [
      {
        url: "https://carrillo.app/resources-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Recursos y Proyectos - José Carrillo",
      },
    ],
  },
  twitter: {
    title: "Recursos y Proyectos | José Carrillo",
    description:
      "Explora mis repositorios públicos de GitHub y GitLab. Proyectos de código abierto en sistemas financieros, backoffice y más.",
  },
};

export default function ResourcesLayout({
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
          { name: "Recursos", url: "https://carrillo.app/resources" },
        ]}
      />
    </>
  )
}
