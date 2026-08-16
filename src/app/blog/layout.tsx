import type React from "react"

import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"
import { getSubstackPosts } from "@/lib/substack-service"

const SITE_URL = getSiteUrl()
const SUBSTACK_URL = "https://carrilloapps.substack.com/"

export const metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Incidentes reales de sistemas de pago, decisiones de arquitectura y liderazgo técnico. El índice completo de lo que publico en Substack.",
  path: "/blog",
  keywords: [
    "blog arquitectura de software",
    "artículos sistemas de pago",
    "liderazgo técnico blog",
    "Junior Carrillo Substack",
    "ingeniería fintech LATAM",
  ],
})

/**
 * `Blog` with real `blogPost` entries, built from the same feed the page
 * renders. Marking this as a `Blog` whose posts live on another origin is the
 * honest description: the index is here, the articles are on Substack, and each
 * `url` points where the reader actually lands.
 */
export default async function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const posts = await getSubstackPosts(24)

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog`,
    name: "Blog de Junior Carrillo",
    description:
      "Incidentes reales de sistemas de pago, decisiones de arquitectura y liderazgo técnico.",
    url: `${SITE_URL}/blog`,
    inLanguage: "es-CO",
    author: {
      "@type": "Person",
      name: "Junior Carrillo",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Junior Carrillo",
      url: SITE_URL,
    },
    isPartOf: { "@type": "WebSite", url: SITE_URL },
    mainEntityOfPage: SUBSTACK_URL,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: post.url,
      datePublished: post.pubDate,
      ...(post.excerpt ? { description: post.excerpt } : {}),
      ...(post.thumbnail ? { image: post.thumbnail } : {}),
      author: { "@type": "Person", name: "Junior Carrillo", url: SITE_URL },
    })),
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
