import type React from "react"
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"

const SITE_URL = getSiteUrl()

export const metadata = buildPageMetadata({
  title: "Servicios",
  description:
    "Liderazgo técnico, sistemas financieros, arquitectura de software, seguridad/compliance, cloud e IA. +10 años transformando ideas en soluciones escalables.",
  path: "/servicios",
  ogDescription:
    "Transformo ideas en soluciones tecnológicas robustas y escalables. Sistemas financieros, liderazgo técnico y arquitecturas empresariales.",
  keywords: [
    "consultoría tecnológica",
    "liderazgo técnico",
    "tech lead servicios",
    "arquitectura software empresarial",
    "sistemas financieros desarrollo",
    "fintech consultoría",
    "soluciones backoffice",
    "seguridad compliance PCI DSS",
    "infraestructura cloud AWS",
    "inteligencia artificial finanzas",
    "microservicios arquitectura",
    "transformación digital",
    "automatización procesos",
    "desarrollo sistemas bancarios",
    "consultor senior tecnología",
    "arquitecto soluciones empresariales",
    "optimización sistemas",
    "migración cloud",
    "detección fraude IA",
    "cumplimiento regulatorio",
  ],
})

// JSON-LD structured data for the services page
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Servicios Profesionales de Consultoría Tecnológica",
  description: "Servicios especializados en liderazgo técnico, sistemas financieros, arquitectura de software, seguridad y compliance, cloud e inteligencia artificial",
  url: `${SITE_URL}/servicios`,
  provider: {
    "@type": "Person",
    name: "José Carrillo",
    url: SITE_URL,
    jobTitle: "Tech Lead & Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Yummy Inc.",
    },
    sameAs: [
      "https://github.com/carrilloapps",
      "https://gitlab.com/carrilloapps",
      "https://linkedin.com/in/carrilloapps",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "15+ años de experiencia en desarrollo de software",
    },
  },
  serviceType: "Technology Consulting",
  areaServed: {
    "@type": "Place",
    name: "Global",
  },
  availableLanguage: ["es", "en"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Catálogo de Servicios Tecnológicos",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Liderazgo Técnico",
          description: "Dirección estratégica y liderazgo para equipos de desarrollo y proyectos tecnológicos",
          serviceType: "Technical Leadership",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sistemas Financieros y Fintech",
          description: "Desarrollo e implementación de soluciones tecnológicas para el sector financiero y bancario",
          serviceType: "Financial Technology",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Soluciones Backoffice",
          description: "Automatización y optimización de procesos internos y operaciones de backoffice empresarial",
          serviceType: "Business Process Automation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Arquitectura de Software",
          description: "Diseño de arquitecturas de software escalables, resilientes y mantenibles para sistemas empresariales",
          serviceType: "Software Architecture",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Seguridad y Compliance",
          description: "Implementación de soluciones de seguridad y cumplimiento normativo para sistemas financieros",
          serviceType: "Security Consulting",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Infraestructura Cloud",
          description: "Diseño e implementación de infraestructuras cloud escalables, seguras y optimizadas en costos",
          serviceType: "Cloud Infrastructure",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Inteligencia Artificial",
          description: "Incorporación de soluciones de inteligencia artificial y machine learning en sistemas financieros",
          serviceType: "Artificial Intelligence",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "50",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Organization",
        name: "Institución Financiera Líder",
      },
      reviewBody: "Desarrolló una plataforma de pagos que procesa más de 2 millones de transacciones diarias con detección de fraude en tiempo real.",
    },
  ],
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: `${SITE_URL}/servicios`,
      },
    ],
  },
  isPartOf: {
    "@type": "WebSite",
    name: "José Carrillo - Tech Lead & Full Stack Developer",
    url: SITE_URL,
  },
  inLanguage: "es-ES",
  dateModified: new Date().toISOString(),
  keywords: "consultoría tecnológica, liderazgo técnico, sistemas financieros, arquitectura software, seguridad compliance, cloud, inteligencia artificial",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <JsonLd data={servicesJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Servicios", url: `${SITE_URL}/servicios` },
        ]}
      />
    </>
  )
}
