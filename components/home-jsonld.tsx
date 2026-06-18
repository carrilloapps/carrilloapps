import { JsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { openSourceProjects } from "@/data/open-source"

const SITE_URL = getSiteUrl()

/**
 * JSON-LD específico del home. El root layout ya inyecta WebSite +
 * Organization + Person, así que acá sólo declaramos lo que es propio
 * de la landing:
 *
 *   1. WebPage — describe la página y referencia al Person como
 *      mainEntity (le dice a Google que el sitio es sobre esta persona).
 *   2. ProfessionalService — la práctica de consultoría unipersonal,
 *      con áreas de servicio y rango geográfico (LATAM + remote-global).
 *   3. ItemList — las 6 áreas de servicio con deep-links a /servicios#<id>
 *      para habilitar resultados enriquecidos en SERPs.
 */

const personRef = {
  "@type": "Person",
  "@id": `${SITE_URL}#person`,
  name: "Junior Carrillo",
  url: SITE_URL,
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}#webpage`,
  url: SITE_URL,
  name: "Junior Carrillo — Tech Leader & Senior Software Developer",
  description:
    "Tech Leader basado en Medellín con +10 años construyendo sistemas de pago, fintech y backoffice para LATAM. Hoy en Yummy Inc.; antes Wompi (Bancolombia), Cencosud y Sky Airline.",
  inLanguage: "es-CO",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
  },
  mainEntity: personRef,
  about: personRef,
  datePublished: "2024-01-01",
  dateModified: "2026-04-29",
}

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}#consultancy`,
  name: "Junior Carrillo — Consultoría técnica",
  description:
    "Consultoría y liderazgo técnico para sistemas de pago, banking, fintech y backoffice. +10 años en producción con Yummy, Wompi, Cencosud y Sky Airline.",
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  telephone: "+57-300-332-8389",
  email: "m@carrillo.app",
  founder: personRef,
  provider: personRef,
  priceRange: "$$$",
  areaServed: [
    { "@type": "Country", name: "Colombia" },
    { "@type": "Country", name: "Chile" },
    { "@type": "Country", name: "México" },
    { "@type": "Country", name: "Argentina" },
    { "@type": "Place", name: "LATAM" },
    { "@type": "Place", name: "Remote — Global" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cra. 42b #107e-46, Santo Domingo Savio I",
    addressLocality: "Medellín",
    addressRegion: "Antioquia",
    postalCode: "050034",
    addressCountry: "CO",
  },
  knowsAbout: [
    "Payment Systems",
    "Open Banking",
    "Fintech Architecture",
    "Microservices",
    "Backoffice Automation",
    "Technical Leadership",
    "SAP Integration",
    "PCI DSS Compliance",
    "AWS Cloud",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Áreas de práctica",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Liderazgo técnico",
          url: `${SITE_URL}/servicios#technical-leadership`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sistemas financieros y fintech",
          url: `${SITE_URL}/servicios#financial-systems`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Soluciones de backoffice",
          url: `${SITE_URL}/servicios#backoffice-solutions`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Diseño de arquitectura",
          url: `${SITE_URL}/servicios#architecture-design`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Seguridad y cumplimiento",
          url: `${SITE_URL}/servicios#security-compliance`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Infraestructura cloud",
          url: `${SITE_URL}/servicios#cloud-infrastructure`,
        },
      },
    ],
  },
}

const servicesItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}#services-list`,
  name: "Áreas de práctica",
  numberOfItems: 6,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Liderazgo técnico",
      url: `${SITE_URL}/servicios#technical-leadership`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Sistemas financieros y fintech",
      url: `${SITE_URL}/servicios#financial-systems`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Backoffice y operaciones",
      url: `${SITE_URL}/servicios#backoffice-solutions`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Diseño de arquitectura",
      url: `${SITE_URL}/servicios#architecture-design`,
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Seguridad y cumplimiento",
      url: `${SITE_URL}/servicios#security-compliance`,
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Infraestructura cloud",
      url: `${SITE_URL}/servicios#cloud-infrastructure`,
    },
  ],
}

// Real open-source work shown in the "Herramientas que mantengo" section.
// Imported from the same data the UI renders, so the markup always matches
// visible content. SoftwareSourceCode has no rich-result field requirements.
const openSourceItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}#open-source`,
  name: "Herramientas open-source que mantengo",
  description:
    "Paquetes npm y proyectos en GitHub de código abierto: cifrado, fintech y herramientas para desarrolladores e IA.",
  numberOfItems: openSourceProjects.length,
  itemListElement: openSourceProjects.map((project, index) => ({
    "@type": "SoftwareSourceCode",
    position: index + 1,
    name: project.name,
    description: project.description,
    url: project.url,
    codeRepository: project.repoUrl || project.url,
    programmingLanguage: project.language,
    keywords: project.tags.join(", "),
    author: personRef,
  })),
}

export function HomeJsonLd() {
  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={professionalServiceSchema} />
      <JsonLd data={servicesItemList} />
      <JsonLd data={openSourceItemList} />
    </>
  )
}
