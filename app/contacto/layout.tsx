import type React from "react"
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"
import { contactFaq } from "@/data/contact-faq"

const SITE_URL = getSiteUrl()

export const metadata = {
  ...buildPageMetadata({
    title: "Contacto — Consultoría Tecnológica",
    description:
      "¿Tienes un proyecto en mente? Conversemos sobre desarrollo de software, liderazgo técnico, consultoría fintech o arquitecturas empresariales.",
    path: "/contacto",
    keywords: [
      "contacto Junior Carrillo",
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
      "contacto desarrollador medellín",
      "consultor tecnológico colombia",
      "consultoría cloud aws",
    ],
  }),
  other: {
    "contact:country-name": "Colombia",
    "contact:region": "Antioquia",
    "contact:locality": "Medellín",
  },
}

// JSON-LD structured data for the contact page with security considerations
const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto Profesional - Junior Carrillo",
  description: "Página de contacto profesional para consultoría tecnológica y servicios de desarrollo de software",
  url: `${SITE_URL}/contacto`,
  mainEntity: {
    "@type": "Person",
    name: "Junior Carrillo",
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
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contacto",
        item: `${SITE_URL}/contacto`,
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
  keywords: "contacto profesional, consultoría tecnológica, tech lead, desarrollo software, liderazgo técnico",
  // Security measures implemented:
  // 1. No direct email/phone in JSON-LD to prevent automated scraping
  // 2. Generic contact types instead of specific personal details
  // 3. Professional focus rather than personal information
  // 4. Limited address information for privacy
};

// FAQPage structured data — built from the same source the page renders, so
// the schema always matches the visible content. Boosts eligibility for rich
// results and citations in AI Overviews / answer engines.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/contacto#faq`,
  inLanguage: "es-CO",
  mainEntity: contactFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <JsonLd data={contactJsonLd} />
      <JsonLd data={faqJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Contacto", url: `${SITE_URL}/contacto` },
        ]}
      />
    </>
  )
}
