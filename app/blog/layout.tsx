import type React from "react"
import type { Metadata } from "next"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Blog | Insights sobre Tecnología Financiera y Desarrollo | José Carrillo",
  description:
    "Artículos, tutoriales y reflexiones sobre desarrollo de software, sistemas financieros y liderazgo técnico.",
  keywords: [
    "blog tecnología",
    "desarrollo software",
    "sistemas financieros",
    "liderazgo técnico",
    "backoffice",
    "tutoriales programación",
    "josé carrillo blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | José Carrillo",
    description:
      "Artículos, tutoriales y reflexiones sobre desarrollo de software, sistemas financieros y liderazgo técnico.",
    url: "https://carrillo.app/blog",
    images: [
      {
        url: "https://carrillo.app/blog-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blog - José Carrillo",
      },
    ],
  },
  twitter: {
    title: "Blog | José Carrillo",
    description:
      "Artículos, tutoriales y reflexiones sobre desarrollo de software, sistemas financieros y liderazgo técnico.",
  },
}

export default function BlogLayout({
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
          { name: "Blog", url: "https://carrillo.app/blog" },
        ]}
      />
    </>
  )
}
