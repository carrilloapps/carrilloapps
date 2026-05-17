import type React from "react"
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"

const SITE_URL = getSiteUrl()

export const metadata = buildPageMetadata({
  title: "Recursos gratuitos & código abierto",
  description:
    "Proyectos de software gratuitos y de código abierto con tecnologías modernas: React, Next.js, Go, TypeScript, Python. Repositorios destacados de GitHub y GitLab.",
  path: "/recursos",
  keywords: [
    "recursos gratuitos desarrolladores",
    "código abierto finanzas",
    "repositorios github Junior Carrillo",
    "proyectos gitlab carrilloapps",
    "sistemas financieros open source",
    "medios de pago desarrollo",
    "react nextjs typescript",
    "python java javascript",
    "backoffice sistemas",
    "contribuciones open source",
    "proyectos destacados",
    "desarrollo web moderno",
    "arquitectura software",
    "fintech desarrollo",
    "carrilloapps github",
  ],
})

// JSON-LD structured data for the resources page
const resourcesJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Recursos Gratuitos & Código Abierto",
  description: "Colección de proyectos de software gratuitos y de código abierto especializados en sistemas financieros y medios de pago",
  url: `${SITE_URL}/recursos`,
  author: {
    "@type": "Person",
    name: "Junior Carrillo",
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
  },
  publisher: {
    "@type": "Organization",
    name: "carrillo.app",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.webp`,
    },
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Proyectos de Código Abierto",
    description: "Lista de repositorios y proyectos de código abierto",
    numberOfItems: 2,
    itemListElement: [
      {
        "@type": "SoftwareSourceCode",
        name: "Repositorios GitHub",
        description: "Proyectos de código abierto en GitHub especializados en desarrollo web y sistemas financieros",
        codeRepository: "https://github.com/carrilloapps",
        programmingLanguage: ["JavaScript", "TypeScript", "React", "Next.js", "Python", "Go"],
        runtimePlatform: "Web Browser",
        targetProduct: {
          "@type": "SoftwareApplication",
          applicationCategory: "DeveloperApplication",
        },
      },
      {
        "@type": "SoftwareSourceCode",
        name: "Repositorios GitLab",
        description: "Proyectos de código abierto en GitLab enfocados en sistemas financieros y medios de pago",
        codeRepository: "https://gitlab.com/carrilloapps",
        programmingLanguage: ["Java", "Python", "JavaScript", "TypeScript", "Go"],
        runtimePlatform: "Cross Platform",
        targetProduct: {
          "@type": "SoftwareApplication",
          applicationCategory: "BusinessApplication",
        },
      },
    ],
  },
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
        name: "Recursos",
        item: `${SITE_URL}/recursos`,
      },
    ],
  },
  isPartOf: {
    "@type": "WebSite",
    name: "Junior Carrillo - Tech Lead & Full Stack Developer",
    url: SITE_URL,
  },
  inLanguage: "es-CO",
  dateModified: new Date('2026-05-16').toISOString(),
  keywords: "recursos gratuitos, código abierto, sistemas financieros, desarrollo web, github, gitlab, react, nextjs, typescript, python",
};

export default function ResourcesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <JsonLd data={resourcesJsonLd} />
      {children}
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Recursos", url: `${SITE_URL}/recursos` },
        ]}
      />
    </>
  )
}
