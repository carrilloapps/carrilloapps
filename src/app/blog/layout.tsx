import type React from "react"

import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"
import { getSubstackPosts } from "@/lib/substack-service"

const SITE_URL = getSiteUrl()
const SUBSTACK_URL = "https://blog.carrillo.app/"

export const metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Incidentes reales de sistemas de pago, decisiones de arquitectura y liderazgo técnico. El índice completo de lo que publico en Substack.",
  path: "/blog",
  keywords: [
    "blog arquitectura de software",
    "artículos sistemas de pago",
    "blog ingeniería de software",
    "liderazgo técnico blog",
    "Junior Carrillo Substack",
    "ingeniería fintech LATAM",
  ],
})

/**
 * `CollectionPage` + `ItemList`, not `Blog` + `blogPost`.
 *
 * What this page is, exactly, is a register of links: the titles and excerpts
 * are here, the articles are on blog.carrillo.app. `Blog`/`BlogPosting` claimed
 * carrillo.app publishes them, which it does not, and it competed with the
 * `NewsArticle` markup Substack already emits on the real pages. It also could
 * never win a rich result — Google requires every URL in a summary-page list to
 * be on the same domain — so the accurate shape costs nothing.
 *
 * The previous version was self-contradictory as well: the `Blog` node was
 * `@id`-ed at carrillo.app/blog while its `mainEntityOfPage` pointed at
 * blog.carrillo.app, which says the entity is primarily described somewhere
 * other than where it is defined.
 *
 * The `Blog` node stays, as the Substack publication it actually is, and the
 * list is `about` it. `sameAs` on the author is the one lever with real upside
 * here: it tells Google the person writing on both hosts is one entity.
 */
export default async function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const posts = await getSubstackPosts(24)

  const author = {
    "@type": "Person",
    name: "Junior Carrillo",
    url: SITE_URL,
    sameAs: [SUBSTACK_URL, "https://substack.com/@carrilloapps"],
  }

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/blog`,
    name: "Blog de Junior Carrillo",
    description:
      "Incidentes reales de sistemas de pago, decisiones de arquitectura y liderazgo técnico.",
    url: `${SITE_URL}/blog`,
    inLanguage: "es-CO",
    author,
    isPartOf: { "@type": "WebSite", url: SITE_URL },
    about: {
      "@type": "Blog",
      "@id": SUBSTACK_URL,
      name: "Junior Carrillo",
      url: SUBSTACK_URL,
      inLanguage: "es-CO",
      author,
      publisher: author,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: post.title,
        url: post.url,
      })),
    },
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
