import type React from "react"
import type { Metadata } from "next"
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Recursos gratuitos & código abierto",
  description:
    "Descubre proyectos de software gratuitos y de código abierto con tecnologías modernas como React, Go, Next.js, TypeScript y Python.",
  keywords: [
    "recursos gratuitos desarrolladores",
    "código abierto finanzas",
    "repositorios github josé carrillo",
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
  authors: [{ name: "José Carrillo", url: "https://carrillo.app" }],
  creator: "José Carrillo",
  publisher: "CarrilloApps",
  alternates: {
    canonical: "/recursos",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "Recursos gratuitos & código abierto - José Carrillo",
    description:
      "Descubre proyectos de software gratuitos y de código abierto con tecnologías modernas como React, Go, Next.js, TypeScript y Python.",
    url: "https://carrillo.app/recursos",
    siteName: "José Carrillo - Tech Lead & Full Stack Developer",
    images: [
      {
        url: "https://carrillo.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Recursos gratuitos & código abierto - José Carrillo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@carrilloapps",
    creator: "@carrilloapps",
    title: "Recursos gratuitos & código abierto - José Carrillo",
    description:
      "Descubre proyectos de software gratuitos y de código abierto con tecnologías modernas como React, Go, Next.js, TypeScript y Python.",
    images: ["https://carrillo.app/og-image.jpg"],
  },
  category: "Technology",
};

// JSON-LD structured data for the resources page
const resourcesJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Recursos Gratuitos & Código Abierto",
  description: "Colección de proyectos de software gratuitos y de código abierto especializados en sistemas financieros y medios de pago",
  url: "https://carrillo.app/recursos",
  author: {
    "@type": "Person",
    name: "José Carrillo",
    url: "https://carrillo.app",
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
    name: "CarrilloApps",
    url: "https://carrillo.app",
    logo: {
      "@type": "ImageObject",
      url: "https://carrillo.app/logo.png",
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
        item: "https://carrillo.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Recursos",
        item: "https://carrillo.app/recursos",
      },
    ],
  },
  isPartOf: {
    "@type": "WebSite",
    name: "José Carrillo - Tech Lead & Full Stack Developer",
    url: "https://carrillo.app",
  },
  inLanguage: "es-ES",
  dateModified: new Date('2025-09-22').toISOString(),
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
          { name: "Inicio", url: "https://carrillo.app" },
          { name: "Recursos", url: "https://carrillo.app/recursos" },
        ]}
      />
    </>
  )
}
