import type React from "react"
import type { Metadata } from "next"
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Blog | Insights & experiencias de desarrollo de software",
  description:
    "Insights, artículos y reflexiones de un Tech Leader en desarrollo de software, sistemas financieros, pagos y liderazgo técnico. +10 años de experiencia construyendo soluciones robustas y escalables.",
  keywords: [
    "blog tecnología",
    "josé carrillo blog",
    "tech leader",
    "yummy inc",
    "desarrollo software",
    "sistemas financieros",
    "open banking",
    "pagos digitales",
    "liderazgo técnico",
    "backoffice financiero",
    "arquitectura microservicios",
    "tutoriales programación",
    "fintech",
    "sistemas de pago",
    "mentoría técnica",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog",
    description:
      "Insights, artículos y reflexiones de un Tech Leader sobre desarrollo de software, sistemas financieros, pagos y liderazgo técnico.",
    url: "https://carrillo.app/blog",
    images: [
      {
        url: "https://carrillo.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blog - José Carrillo",
      },
    ],
  },
  twitter: {
    title: "Blog | José Carrillo",
    description:
      "Insights, artículos y reflexiones de un Tech Leader sobre desarrollo de software, sistemas financieros, pagos y liderazgo técnico.",
  },
}

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
    url: "https://carrillo.app/blog",
    author: {
      "@type": "Person",
      name: "José Carrillo",
      jobTitle: "Tech Leader & Senior Software Developer",
      url: "https://carrillo.app",
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
        url: "https://carrillo.app/logo.webp"
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
      "@id": "https://carrillo.app/blog"
    }
  }

  return (
    <>
      {children}
      <JsonLd data={blogJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://carrillo.app" },
          { name: "Blog", url: "https://carrillo.app/blog" },
        ]}
      />
    </>
  )
}
