import type { ReactNode } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"
import { SERVICES, getService } from "@/lib/data/services"

const SITE_URL = getSiteUrl()

/**
 * All seven services are known at build time, so all seven prerender. Nothing
 * about a service is fetched, and `dynamicParams = false` makes an unknown slug
 * a 404 at the routing layer instead of rendering an empty shell.
 */
export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  return buildPageMetadata({
    // The catalogue label, not the page's own heading: a heading like "Pagos
    // que no pueden fallar" is right above the fold and wrong in a result list,
    // where the reader is scanning for the service they came looking for.
    title: service.title,
    // `metaDescription` and not `summary`: the summary is written to sit under
    // a heading that already gave the context, so on its own in a result it
    // reads like a fragment. Each service writes its own.
    description: service.metaDescription,
    path: `/servicios/${service.slug}`,
    keywords: service.keywords,
    ogTitle: service.heading,
    ogDescription: service.summary,
  })
}

export default async function ServiceLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const url = `${SITE_URL}/servicios/${service.slug}`

  /**
   * One `Service` node per page, which is what a search engine can actually do
   * something with. The old single page declared an `OfferCatalog` of seven
   * nested offers on one URL — technically valid, but every offer pointed at
   * the same address, so none of them could be surfaced on its own.
   */
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    description: service.summary,
    url,
    serviceType: service.title,
    inLanguage: "es-CO",
    provider: {
      "@type": "Person",
      name: "Junior Carrillo",
      url: SITE_URL,
      jobTitle: "Tech Leader & Senior Software Developer",
    },
    areaServed: { "@type": "Place", name: "LATAM" },
    availableLanguage: ["es", "en"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Alcance — ${service.title}`,
      itemListElement: service.benefits.map((benefit, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: benefit },
      })),
    },
    // The engineering practices and the stack, so the node says what the page
    // says rather than repeating the title in three fields.
    keywords: [...service.keywords, ...service.practices].join(", "),
    termsOfService: `${SITE_URL}/terminos`,
    isPartOf: { "@type": "WebSite", name: "carrillo.app", url: SITE_URL },
  }

  /**
   * The questions on the page, as a `FAQPage`. Built from the same array the
   * page renders, so the graph can never claim an answer the visitor cannot
   * read — which is the one thing that gets this markup penalised.
   */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: "es-CO",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }

  return (
    <>
      {children}
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Servicios", url: `${SITE_URL}/servicios` },
          { name: service.title, url },
        ]}
      />
    </>
  )
}
