import type React from "react"
import type { Metadata } from "next"
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Contacto profesional",
  description:
    "Ponte en contacto conmigo para discutir tu proyecto o posibles oportunidades de colaboración en desarrollo de software y liderazgo técnico.",
  keywords: [
    "contacto josé carrillo",
    "consultoría tecnológica contacto",
    "tech lead disponible",
    "desarrollo software consultor",
    "liderazgo técnico servicios",
    "sistemas financieros experto",
    "contactar desarrollador senior",
    "consultor fintech disponible",
    "arquitecto software contacto",
    "freelance tech lead",
    "consultoría sistemas bancarios",
    "desarrollo aplicaciones financieras",
    "contacto desarrollador medellín",
    "servicios desarrollo remoto",
    "consultor tecnológico colombia",
    "experto microservicios contacto",
    "lider técnico disponible",
    "consultoría cloud aws",
    "desarrollador full stack contacto",
    "servicios transformación digital",
  ],
  authors: [{ name: "José Carrillo", url: "https://carrillo.app" }],
  creator: "José Carrillo",
  publisher: "carrilloapps",
  alternates: {
    canonical: "/contacto",
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
    title: "Contacto profesional de José Carrillo",
    description:
      "¿Tienes un proyecto en mente? Contacta conmigo para discutir oportunidades de colaboración en desarrollo de software, liderazgo técnico y consultoría tecnológica. Especializado en sistemas financieros y arquitecturas empresariales.",
    url: "https://carrillo.app/contacto",
    siteName: "José Carrillo - Tech Lead & Full Stack Developer",
    images: [
      {
        url: "https://carrillo.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contacto profesional - José Carrillo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@carrilloapps",
    creator: "@carrilloapps",
    title: "Contacto profesional de José Carrillo",
    description:
      "¿Tienes un proyecto en mente? Contacta conmigo para discutir oportunidades de colaboración en desarrollo de software y liderazgo técnico.",
    images: ["https://carrillo.app/og-contacto.jpg"],
  },
  category: "Technology",
  other: {
    "contact:phone_number": "+57 300 332 8389",
    "contact:email": "m@carrilloa.app",
    "contact:country-name": "Colombia",
    "contact:region": "Antioquia",
    "contact:locality": "Medellín",
  },
}

// JSON-LD structured data for the contact page with security considerations
const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto Profesional - José Carrillo",
  description: "Página de contacto profesional para consultoría tecnológica y servicios de desarrollo de software",
  url: "https://carrillo.app/contacto",
  mainEntity: {
    "@type": "Person",
    name: "José Carrillo",
    jobTitle: "Tech Lead & Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Yummy Inc.",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Professional Inquiries",
        availableLanguage: ["es", "en"],
        areaServed: "Global",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
          timeZone: "America/Bogota",
        },
        // Note: Sensitive contact info intentionally omitted from structured data for security
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
      // Specific address details omitted for privacy
    },
    sameAs: [
      "https://github.com/carrilloapps",
      "https://linkedin.com/in/carrilloapps",
      "https://x.com/carrilloapps",
    ],
    knowsAbout: [
      "Software Development",
      "Technical Leadership",
      "Financial Systems",
      "Fintech Solutions",
      "Software Architecture",
      "Cloud Infrastructure",
      "Microservices",
      "Full Stack Development",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Tech Lead & Software Consultant",
      occupationLocation: {
        "@type": "City",
        name: "Medellín, Colombia",
      },
      skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Go",
        "Python",
        "AWS",
        "Docker",
        "Kubernetes",
      ],
    },
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
        name: "Contacto",
        item: "https://carrillo.app/contacto",
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
  keywords: "contacto profesional, consultoría tecnológica, tech lead, desarrollo software, liderazgo técnico",
  // Security measures implemented:
  // 1. No direct email/phone in JSON-LD to prevent automated scraping
  // 2. Generic contact types instead of specific personal details
  // 3. Professional focus rather than personal information
  // 4. Limited address information for privacy
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <JsonLd data={contactJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://carrillo.app" },
          { name: "Contacto", url: "https://carrillo.app/contacto" },
        ]}
      />
    </>
  )
}
