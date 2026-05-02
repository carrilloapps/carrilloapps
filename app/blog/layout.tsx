import type React from "react"
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"

const SITE_URL = getSiteUrl()

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // JSON-LD para el blog
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog de José Carrillo",
    description: "Insights, artículos y reflexiones de un Tech Leader sobre desarrollo de software, sistemas financieros, pagos y liderazgo técnico.",
    url: `${SITE_URL}/blog`,
    author: {
      "@type": "Person",
      name: "José Carrillo",
      jobTitle: "Tech Leader & Senior Software Developer",
      url: SITE_URL,
      sameAs: [
        "https://github.com/carrilloapps",
        "https://linkedin.com/in/carrilloapps",
        "https://twitter.com/carrilloapps",
        "https://medium.com/@carrilloapps"
      ],
      worksFor: {
        "@type": "Organization",
        name: "Yummy Inc.",
        url: "https://yummysuperapp.com"
      }
    },
    publisher: {
      "@type": "Organization",
      name: "José Carrillo",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.webp`
      }
    },
    inLanguage: "es-ES",
    keywords: [
      "desarrollo software",
      "sistemas financieros",
      "open banking",
      "pagos digitales",
      "liderazgo técnico",
      "backoffice financiero",
      "arquitectura microservicios",
      "fintech",
      "tech leader",
      "yummy inc"
    ],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog`
    }
  }

  return (
    <>
      {children}
      <JsonLd data={blogJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
        ]}
      />
    </>
  )
}
