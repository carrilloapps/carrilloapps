import type React from "react"
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"

const SITE_URL = getSiteUrl()

export const metadata = buildPageMetadata({
  title: "Junior Carrillo — Tech Leader y Senior Software Developer",
  description:
    "Tech Leader con 10 años construyendo sistemas de pago en LATAM. Actualmente en Yummy Inc.; antes Wompi (Bancolombia), Cencosud y Sky Airline.",
  path: "/sobre-mi",
  ogType: "profile",
  keywords: [
    "tech leader colombia",
    "desarrollador senior medellín",
    "open banking developer",
    "microservicios fintech",
    "consultor desarrollo software",
    "arquitecto de pagos",
    "Junior Carrillo",
  ],
})

/**
 * Person + ProfilePage schema específico de /sobre-mi. Le dice a Google
 * que esta es la página canónica de la entidad "Junior Carrillo" — incluye
 * los roles del timeline como `hasOccupation` y la geolocalización para
 * SEO local.
 */
const personProfileSchema = {
  "@context": "https://schema.org",
  "@type": ["Person", "ProfilePage"],
  name: "Junior Carrillo",
  givenName: "José",
  familyName: "Carrillo",
  jobTitle: "Tech Leader & Senior Software Developer",
  description:
    "Tech Leader y Senior Software Developer con 10 años construyendo sistemas de pago en LATAM.",
  url: `${SITE_URL}/sobre-mi`,
  mainEntityOfPage: `${SITE_URL}/sobre-mi`,
  image: `${SITE_URL}/profile.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Medellín",
    addressRegion: "Antioquia",
    addressCountry: "CO",
  },
  knowsLanguage: ["es", "en"],
  knowsAbout: [
    "Software Development",
    "Technical Leadership",
    "Payment Systems",
    "Open Banking",
    "Financial Systems",
    "Microservices Architecture",
    "Backoffice Solutions",
    "Software Mentoring",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Yummy Inc.",
    url: "https://yummysuperapp.com",
  },
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Tech Leader",
      description:
        "Lidero el equipo de pagos en Yummy Inc. — diseño e implementación de medios de pago y arquitectura de microservicios.",
      occupationLocation: {
        "@type": "City",
        name: "Medellín, Colombia",
      },
    },
    {
      "@type": "Occupation",
      name: "Developer Lead",
      description:
        "En Cencosud lideré el desarrollo de módulos contables con integración SAP que mueven 2M+ transacciones semanales.",
    },
    {
      "@type": "Occupation",
      name: "Senior Software Engineer",
      description:
        "En Sky Airline construí microservicios mobile que soportaron 1M+ transacciones mensuales en iOS y Android.",
    },
  ],
  sameAs: [
    "https://github.com/carrilloapps",
    "https://linkedin.com/in/carrilloapps",
    "https://twitter.com/carrilloapps",
  ],
}

export default function AboutLayout({
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
          { name: "Sobre Mí", url: `${SITE_URL}/sobre-mi` },
        ]}
      />
      <JsonLd data={personProfileSchema} />
    </>
  )
}
