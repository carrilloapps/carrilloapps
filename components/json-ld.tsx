export function JsonLd({ data }: { data: any }) {
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
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "José Carrillo",
          url: "https://carrillo.app",
          logo: "https://carrillo.app/logo.webp",
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
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "José Carrillo",
          jobTitle: "Senior Software Developer & Tech Leader",
          url: "https://carrillo.app",
          sameAs: [
            "https://github.com/carrilloapps",
            "https://linkedin.com/in/carrilloapps",
            "https://twitter.com/carrilloapps",
          ],
          worksFor: {
            "@type": "Organization",
            name: "Carrillo.app",
          },
          knowsAbout: [
            "Software Development",
            "Technical Leadership",
            "Financial Systems",
            "Backoffice Solutions",
            "Architecture Design",
          ],
        }),
      }}
    />
  )
}

export function ServiceJsonLd({ service }: { service: string }) {
  const services = {
    "technical-leadership": {
      name: "Liderazgo Técnico",
      description: "Dirección estratégica y liderazgo para equipos de desarrollo y proyectos tecnológicos.",
    },
    "financial-systems": {
      name: "Sistemas Financieros",
      description: "Desarrollo e implementación de soluciones tecnológicas para el sector financiero y bancario.",
    },
    "backoffice-solutions": {
      name: "Soluciones de Backoffice",
      description: "Automatización y optimización de procesos internos y operaciones de backoffice empresarial.",
    },
    "architecture-design": {
      name: "Diseño de Arquitectura",
      description:
        "Diseño de arquitecturas de software escalables, resilientes y mantenibles para sistemas empresariales.",
    },
    "security-compliance": {
      name: "Seguridad y Cumplimiento",
      description: "Implementación de soluciones de seguridad y cumplimiento normativo para sistemas financieros.",
    },
    "cloud-infrastructure": {
      name: "Infraestructura Cloud",
      description: "Diseño e implementación de infraestructuras cloud escalables, seguras y optimizadas en costos.",
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
          serviceType: serviceData.name,
          provider: {
            "@type": "Person",
            name: "José Carrillo",
            url: "https://carrillo.app",
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
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "José Carrillo | Senior Software Developer & Tech Leader",
          url: "https://carrillo.app",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://carrillo.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
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
