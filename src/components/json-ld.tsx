import { getSiteUrl } from "@/lib/env"

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

export function OrganizationJsonLd() {
  const url = getSiteUrl()
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Junior Carrillo",
          url,
          logo: `${url}/logo.webp`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Cra. 42b #107e-46, Santo Domingo Savio I",
            addressLocality: "Medellín",
            addressRegion: "Antioquia",
            postalCode: "050034",
            addressCountry: "CO",
          },
          sameAs: [
            "https://github.com/carrilloapps",
            "https://linkedin.com/in/carrilloapps",
            "https://twitter.com/carrilloapps",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+57-300-332-8389",
            contactType: "customer service",
            email: "m@carrillo.app",
            availableLanguage: ["English", "Spanish"],
          },
        }),
      }}
    />
  )
}

export function PersonJsonLd() {
  const url = getSiteUrl()
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Junior Carrillo",
          givenName: "José",
          familyName: "Carrillo",
          jobTitle: "Senior Software Developer & Tech Leader",
          url,
          image: `${url}/profile.jpg`,
          sameAs: [
            "https://github.com/carrilloapps",
            "https://linkedin.com/in/carrilloapps",
            "https://twitter.com/carrilloapps",
          ],
          worksFor: {
            "@type": "Organization",
            name: "Yummy Inc",
            url: "https://yummysuperapp.com",
          },
          alumniOf: [
            { "@type": "Organization", name: "Wompi", url: "https://wompi.co" },
            { "@type": "Organization", name: "Falabella", url: "https://www.falabella.com" },
            { "@type": "Organization", name: "Cencosud S.A.", url: "https://www.cencosud.com" },
            { "@type": "Organization", name: "Sky Airline", url: "https://www.skyairline.com" },
            { "@type": "Organization", name: "Acid Labs", url: "https://acidlabs.com" },
          ],
          knowsAbout: [
            "Software Development",
            "Technical Leadership",
            "Financial Systems",
            "Backoffice Solutions",
            "Architecture Design",
            "Payment Systems",
            "Microservices",
            "Open Banking",
          ],
        }),
      }}
    />
  )
}

export function ServiceJsonLd({ service }: { service: string }) {
  const url = getSiteUrl()
  const services = {
    "technical-leadership": {
      name: "Liderazgo Técnico",
      description:
        "Dirección estratégica y liderazgo para equipos de desarrollo y proyectos tecnológicos.",
    },
    "financial-systems": {
      name: "Sistemas Financieros",
      description:
        "Desarrollo e implementación de soluciones tecnológicas para el sector financiero y bancario.",
    },
    "backoffice-solutions": {
      name: "Soluciones de Backoffice",
      description:
        "Automatización y optimización de procesos internos y operaciones de backoffice empresarial.",
    },
    "architecture-design": {
      name: "Diseño de Arquitectura",
      description:
        "Diseño de arquitecturas de software escalables, resilientes y mantenibles para sistemas empresariales.",
    },
    "security-compliance": {
      name: "Seguridad y Cumplimiento",
      description:
        "Implementación de soluciones de seguridad y cumplimiento normativo para sistemas financieros.",
    },
    "cloud-infrastructure": {
      name: "Infraestructura Cloud",
      description:
        "Diseño e implementación de infraestructuras cloud escalables, seguras y optimizadas en costos.",
    },
    "ai-integration": {
      name: "Integración de IA",
      description:
        "Incorporación de soluciones de inteligencia artificial y machine learning en sistemas financieros y de backoffice.",
    },
  } as Record<string, { name: string; description: string }>

  const serviceData = services[service] || {
    name: "Servicios de Consultoría Tecnológica",
    description: "Servicios profesionales de consultoría y desarrollo tecnológico para empresas.",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: serviceData.name,
          serviceType: serviceData.name,
          provider: {
            "@type": "Person",
            name: "Junior Carrillo",
            url,
          },
          description: serviceData.description,
          areaServed: {
            "@type": "Country",
            name: "Global",
          },
        }),
      }}
    />
  )
}

export function WebsiteJsonLd() {
  const url = getSiteUrl()
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Junior Carrillo | Senior Software Developer & Tech Leader",
          alternateName: "Junior Carrillo",
          url,
          inLanguage: "es-CO",
          author: {
            "@type": "Person",
            name: "Junior Carrillo",
            url,
          },
          publisher: {
            "@type": "Person",
            name: "Junior Carrillo",
            url,
          },
        }),
      }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        }),
      }}
    />
  )
}
